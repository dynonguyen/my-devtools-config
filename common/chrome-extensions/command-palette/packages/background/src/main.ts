import { CommandEvent, Message, MessageEvent, SearchCategory, setUserOptions } from '@dcp/shared';
import { searchBookmarks } from './bookmark';
import { searchCommands } from './command';
import { searchHistory } from './history';
import { searchNavigation } from './navigation';
import { searchThemeOptions, userOptions } from './user-options';

// -----------------------------
async function search(keyword: string) {
  let result: any[] = [];
  const promises: Promise<any>[] = [];

  const lowerKeyword = keyword.toLowerCase();

  // Bookmark
  promises.push(
    searchBookmarks(keyword).then((bookmarks) => {
      result = result.concat(bookmarks.map((item) => ({ ...item, category: SearchCategory.Bookmark })));
    })
  );

  // History
  promises.push(
    searchHistory(keyword).then((histories) => {
      result = result.concat(histories.map((item) => ({ ...item, category: SearchCategory.History })));
    })
  );

  await Promise.all(promises);

  result = result.concat(
    searchNavigation(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Navigation }))
  );

  result = result.concat(searchCommands(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Command })));

  result = result.concat(searchThemeOptions(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Theme })));

  return result.sort((a, b) => a.title?.length - b.title?.length).slice(0, userOptions.limitItems);
}

function openCommandPalette(tab: chrome.tabs.Tab) {
  if (tab.url?.startsWith('chrome://')) return;

  chrome.tabs.sendMessage<Message>(tab.id as number, { event: MessageEvent.OpenPalette }, () => {});
}

// -----------------------------
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  const { event, data = {} } = message;

  const activeWindowId = sender.tab?.windowId || 0;
  const activeTabId = sender.tab?.id || 0;
  const activeTabIndex = sender.tab?.index || 0;
  const originUri = sender.origin || '';

  const sendBooleanResponse = (promise: Promise<any>) => {
    promise
      .then(() => sendResponse(true))
      .catch((error) => {
        console.log('onMessage error: ', error);
        sendResponse(false);
      });
  };

  switch (event) {
    // Other
    case MessageEvent.Search: {
      const { keyword } = data;

      if (!keyword) {
        sendResponse([]);
        break;
      }

      search(keyword).then((result) => {
        sendResponse(result);
      });

      break;
    }

    case MessageEvent.OpenLocalResource: {
      sendBooleanResponse(chrome.tabs.create({ url: data.url, index: activeTabIndex + 1 }));
      break;
    }

    case MessageEvent.ChangeColorTheme: {
      sendBooleanResponse(setUserOptions({ theme: userOptions.theme === 'light' ? 'dark' : 'light' }));
      break;
    }

    // Bookmark
    case MessageEvent.DeleteBookmark: {
      const { id, isFolder } = data;
      sendBooleanResponse(isFolder ? chrome.bookmarks.removeTree(id) : chrome.bookmarks.remove(id));
      break;
    }

    case MessageEvent.UpdateBookmark: {
      const { id, title, url } = data;
      sendBooleanResponse(chrome.bookmarks.update(id, { title, url }));
      break;
    }

    // Tab
    case MessageEvent.CloseTab: {
      sendBooleanResponse(chrome.tabs.remove(activeTabId));
      break;
    }

    case MessageEvent.CloseOtherTabs: {
      chrome.tabs
        .query({ currentWindow: true })
        .then((tabs) => {
          tabs.forEach((tab) => tab.id !== activeTabId && chrome.tabs.remove(tab.id!));
          sendResponse(true);
        })
        .catch(() => sendResponse(false));

      break;
    }

    case MessageEvent.NewTab: {
      sendBooleanResponse(chrome.tabs.create({ index: activeTabIndex + 1 }));
      break;
    }

    case MessageEvent.DetachTab: {
      sendBooleanResponse(chrome.windows.create({ focused: true, tabId: activeTabId }));
      break;
    }

    case MessageEvent.Reload: {
      sendBooleanResponse(chrome.tabs.reload(activeTabId));
      break;
    }

    case MessageEvent.HardReload: {
      sendBooleanResponse(chrome.tabs.reload(activeTabId, { bypassCache: true }));
      break;
    }

    case MessageEvent.EmptyCacheAndHardReload: {
      chrome.browsingData.removeCache({ origins: [originUri] });
      sendBooleanResponse(chrome.tabs.reload(activeTabId, { bypassCache: true }));
      break;
    }

    // Window
    case MessageEvent.CloseWindow: {
      sendBooleanResponse(chrome.windows.remove(activeWindowId));
      break;
    }

    case MessageEvent.CloseOtherWindows: {
      sendBooleanResponse(
        chrome.tabs.query({ currentWindow: false }).then((tabs) => {
          tabs.forEach((tab) => chrome.windows.remove(tab.windowId!));
        })
      );
      break;
    }

    case MessageEvent.MergeAllWindows: {
      sendBooleanResponse(
        chrome.tabs.query({ currentWindow: false }).then((tabs) => {
          tabs.forEach((tab) => {
            chrome.tabs.move(tab.id!, { index: -1, windowId: activeWindowId });
          });
        })
      );
      break;
    }

    case MessageEvent.NewWindow: {
      sendBooleanResponse(chrome.windows.create({}));
      break;
    }

    case MessageEvent.NewIncognitoWindow: {
      sendBooleanResponse(chrome.windows.create({ incognito: true }));
      break;
    }

    // Chrome
    case MessageEvent.QuitChrome: {
      sendBooleanResponse(
        chrome.windows.getAll().then((windows) => {
          windows.forEach((wd) => {
            chrome.windows.remove(wd.id!);
          });
        })
      );
      break;
    }

    // History
    case MessageEvent.ClearHistory: {
      sendBooleanResponse(chrome.history.deleteAll());
      break;
    }

    case MessageEvent.ClearHistoryLastHour:
    case MessageEvent.ClearHistoryLast24Hours:
    case MessageEvent.ClearHistoryLast7Days: {
      const now = Date.now();
      const startTime =
        now -
        (data.event === MessageEvent.ClearHistoryLastHour
          ? 60 * 60 * 1000
          : data.event === MessageEvent.ClearHistoryLast24Hours
          ? 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000);

      sendBooleanResponse(chrome.history.deleteRange({ startTime, endTime: now }));
      break;
    }

    case MessageEvent.DeleteHistory: {
      sendBooleanResponse(chrome.history.deleteUrl({ url: data.url }));
      break;
    }

    default:
      sendResponse(null);
  }

  return true;
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === CommandEvent.Open) {
    openCommandPalette(tab);
  }
});

// chrome.action.onClicked.addListener(openCommandPalette);

(function reload() {
  chrome.tabs.query({ currentWindow: true, url: 'http://localhost:8888/*' }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id as number);
    }
  });
  chrome.action.onClicked.addListener(function reloadExtension() {
    chrome.runtime.reload();
  });
})();
