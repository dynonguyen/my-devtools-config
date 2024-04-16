import { CommandEvent, Message, MessageEvent, SearchCategory, getAliasFromKeyword, setUserOptions } from '@dcp/shared';
import { searchBookmarks } from './bookmark';
import { searchCommands } from './command';
import { searchExtension } from './extension';
import { searchHistory } from './history';
import { searchNavigation } from './navigation';
import { searchTab } from './tab';
import { searchThemeOptions, userOptions } from './user-options';

// -----------------------------
const allowSearch = (aliasCategory = '', category = '') => {
  return !aliasCategory || aliasCategory === category;
};
async function search(query = '') {
  let result: any[] = [];
  const promises: Promise<any>[] = [];

  const aliases = userOptions.aliases;
  const alias = getAliasFromKeyword(query);
  const aliasCategory = alias ? Object.entries(aliases).find(([key]) => key === alias)?.[1] : undefined;

  const keyword = aliasCategory ? query.replace(alias, '').trim() : query;
  const lowerKeyword = keyword.toLowerCase();

  // Bookmark
  if (allowSearch(aliasCategory, SearchCategory.Bookmark))
    promises.push(
      searchBookmarks(keyword).then((bookmarks) => {
        result = result.concat(bookmarks.map((item) => ({ ...item, category: SearchCategory.Bookmark })));
      })
    );

  // History
  if (allowSearch(aliasCategory, SearchCategory.History))
    promises.push(
      searchHistory(keyword).then((histories) => {
        result = result.concat(histories.map((item) => ({ ...item, category: SearchCategory.History })));
      })
    );

  // Tab
  if (allowSearch(aliasCategory, SearchCategory.Tab))
    promises.push(
      searchTab(lowerKeyword).then((tabs) => {
        result = result.concat(tabs.map((item) => ({ ...item, category: SearchCategory.Tab })));
      })
    );

  // Extension
  if (allowSearch(aliasCategory, SearchCategory.Extension))
    promises.push(
      searchExtension(lowerKeyword).then((extensions) => {
        result = result.concat(extensions.map((item) => ({ ...item, category: SearchCategory.Extension })));
      })
    );

  await Promise.all(promises);

  if (allowSearch(aliasCategory, SearchCategory.Navigation))
    result = result.concat(
      searchNavigation(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Navigation }))
    );

  if (allowSearch(aliasCategory, SearchCategory.Command))
    result = result.concat(searchCommands(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Command })));

  if (allowSearch(aliasCategory, SearchCategory.Theme))
    result = result.concat(
      searchThemeOptions(lowerKeyword).map((item) => ({ ...item, category: SearchCategory.Theme }))
    );

  return result.sort((a, b) => a.title?.length - b.title?.length).slice(0, userOptions.limitItems);
}

function openCommandPalette(tab: chrome.tabs.Tab) {
  if (tab.url?.includes('chrome://') && userOptions.newTabRedirectUri) {
    chrome.tabs.update(tab.id!, { url: userOptions.newTabRedirectUri }).then(() => {
      setTimeout(() => {
        chrome.tabs.sendMessage<Message>(tab.id as number, { event: MessageEvent.OpenPalette }, () => {});
      }, 750);
    });
  } else {
    chrome.tabs.sendMessage<Message>(tab.id as number, { event: MessageEvent.OpenPalette }, () => {});
  }
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
      sendBooleanResponse(chrome.tabs.remove(data.id ?? activeTabId));
      break;
    }

    case MessageEvent.CloseOtherTabs: {
      const tabId = data.id ?? activeTabId;

      chrome.tabs
        .query({ currentWindow: true })
        .then((tabs) => {
          tabs.forEach((tab) => tab.id !== tabId && chrome.tabs.remove(tab.id!));
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

    case MessageEvent.FocusTab: {
      sendBooleanResponse(chrome.tabs.update(data.id, { active: true }));
      break;
    }

    case MessageEvent.TogglePinTab: {
      const tabId = data.id ?? activeTabId;
      sendBooleanResponse(chrome.tabs.get(tabId).then((tab) => chrome.tabs.update(tabId, { pinned: !tab.pinned })));

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

    // Extension
    case MessageEvent.ToggleExtension: {
      sendBooleanResponse(chrome.management.setEnabled(data.id, data.enabled));
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

chrome.action.onClicked.addListener(openCommandPalette);

// Auto redirect when new tab
/*
chrome.tabs.onCreated.addListener((tab) => {
  if (userOptions.newTabRedirectUri && tab.pendingUrl?.includes('chrome://newtab')) {
    chrome.tabs.update(tab.id!, { url: userOptions.newTabRedirectUri });
  }
});
*/

// Unblock Medium
/* chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (userOptions.unblockMedium && changeInfo.status === 'loading') {
    const url = new URL(tab.url || '');
    const host = url.host;
    if (host.includes('medium.com')) {
      const redirectUrl =
        url.protocol +
        '//' +
        `${host.split('.').join('-')}` +
        '.translate.goog' +
        url.pathname +
        (url.search ? '?' : '&') +
        `_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp&_x_tr_hist=true`;

      chrome.tabs.update(tabId, { url: redirectUrl });
    }
  }
}); */

// Dev mode
/* (function reload() {
  chrome.tabs.query({ currentWindow: true, url: 'http://localhost:8888/*' }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id as number);
    }
  });
  chrome.action.onClicked.addListener(function reloadExtension(tab) {
    chrome.runtime.reload();
  });
})(); */
