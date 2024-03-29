import { CommandEvent, Message, MessageEvent, SearchCategory } from '@dcp/shared';
import { deleteBookmark, searchBookmarks, updateBookmark } from './bookmark';
import { searchNavigation } from './navigation';
import { userOptions } from './user-options';

// -----------------------------
async function search(keyword: string) {
  let result: any[] = [];
  const promises: Promise<any>[] = [];

  // Bookmark
  promises.push(
    searchBookmarks(keyword).then((bookmarks) => {
      result = result.concat(bookmarks.map((item) => ({ ...item, category: SearchCategory.Bookmark })));
    })
  );

  await Promise.all(promises);

  result = result.concat(
    searchNavigation(keyword.toLowerCase()).map((item) => ({ ...item, category: SearchCategory.Navigation }))
  );

  return result
    .sort((a, b) => (a.title?.toLowerCase() < b.title?.toLowerCase() ? -1 : 1))
    .slice(0, userOptions.limitItems);
}

function openCommandPalette(tab: chrome.tabs.Tab) {
  if (tab.url?.startsWith('chrome://')) return;

  chrome.tabs.sendMessage<Message>(tab.id as number, { event: MessageEvent.OpenPalette }, () => {});
}

// -----------------------------
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  const { event, data = {} } = message;

  switch (event) {
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

    case MessageEvent.DeleteBookmark: {
      deleteBookmark(data)
        .then(() => sendResponse(true))
        .catch(() => sendResponse(false));

      break;
    }

    case MessageEvent.UpdateBookmark: {
      updateBookmark(data)
        .then(() => sendResponse(true))
        .catch(() => sendResponse(false));
      break;
    }

    case MessageEvent.OpenLocalResource: {
      chrome.tabs.create({ url: data.url, index: (sender.tab?.index || 0) + 1 });
      sendResponse(true);
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
