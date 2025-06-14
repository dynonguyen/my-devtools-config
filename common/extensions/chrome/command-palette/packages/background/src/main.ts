import {
  CommandEvent,
  Cookie,
  Message,
  MessageEvent,
  SearchCategory,
  getAliasFromKeyword,
  omit,
  setUserOptions,
  sortSearchResult
} from '@dcp/shared';
import { searchBookmarks } from './bookmark';
import { searchCommands } from './command';
import { searchCookie } from './cookie';
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

  const pushToResult = (items: any[], category: SearchCategory) => {
    result.push(...items.map((item) => ({ ...item, category })));
  };

  if (allowSearch(aliasCategory, SearchCategory.Navigation)) {
    pushToResult(searchNavigation(lowerKeyword), SearchCategory.Navigation);
  }

  if (allowSearch(aliasCategory, SearchCategory.Command)) {
    pushToResult(searchCommands(lowerKeyword), SearchCategory.Command);
  }

  if (allowSearch(aliasCategory, SearchCategory.Theme)) {
    pushToResult(searchThemeOptions(lowerKeyword), SearchCategory.Theme);
  }

  // Bookmark
  if (allowSearch(aliasCategory, SearchCategory.Bookmark)) {
    promises.push(searchBookmarks(keyword).then((bookmarks) => pushToResult(bookmarks, SearchCategory.Bookmark)));
  }

  // History
  if (allowSearch(aliasCategory, SearchCategory.History)) {
    promises.push(searchHistory(keyword).then((histories) => pushToResult(histories, SearchCategory.History)));
  }

  // Tab
  if (allowSearch(aliasCategory, SearchCategory.Tab)) {
    promises.push(searchTab(lowerKeyword).then((tabs) => pushToResult(tabs, SearchCategory.Tab)));
  }

  // Extension
  if (allowSearch(aliasCategory, SearchCategory.Extension)) {
    promises.push(
      searchExtension(lowerKeyword).then((extensions) => pushToResult(extensions, SearchCategory.Extension))
    );
  }

  // Cookie
  if (allowSearch(aliasCategory, SearchCategory.Cookie)) {
    promises.push(searchCookie(lowerKeyword).then((cookies) => pushToResult(cookies, SearchCategory.Cookie)));
  }

  await Promise.all(promises);

  return sortSearchResult(result).slice(0, userOptions.limitItems);
}

function openCommandPalette(tab: chrome.tabs.Tab) {
  if (!tab.url?.startsWith('chrome://')) {
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

    // Cookie
    case MessageEvent.DeleteCookie: {
      const { domain, path, storeId, name, secure } = data as Cookie;
      const protocol = secure ? 'https' : 'http';
      const url = `${protocol}://${domain}${path}`;

      sendBooleanResponse(chrome.cookies.remove({ name, url, storeId }));
      break;
    }

    case MessageEvent.SetCookie: {
      const { domain, path, secure, session, expirationDate } = data as Cookie;
      const protocol = secure ? 'https' : 'http';
      const url = `${protocol}://${domain}${path}`;

      sendBooleanResponse(
        chrome.cookies.set({
          url,
          ...omit(data as Cookie, ['session', 'sameSite']),
          sameSite: data.sameSite === 'no_restriction' ? undefined : data.sameSite,
          expirationDate: session ? undefined : expirationDate
        })
      );
      break;
    }

    case MessageEvent.NewCookie: {
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

// Dev mode: un
/* (function reload() {
  chrome.tabs.query({ currentWindow: true, url: 'http://localhost:8888/*' }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id as number);
    }
  });
  chrome.action.onClicked.addListener(function reloadExtension() {
    chrome.runtime.reload();
  });
})(); */
