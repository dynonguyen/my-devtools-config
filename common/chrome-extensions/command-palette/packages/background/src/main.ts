import { CommandEvent, Message, MessageEvent, SearchCategory } from '@dcp/shared';
import { deleteBookmark, searchBookmarks } from './bookmark';

// TODO: get from user options
const LIMIT = 20;

// -----------------------------
async function search(keyword: string) {
  let result: any[] = [];
  const promises: Promise<any>[] = [];

  // Bookmark
  promises.push(
    searchBookmarks(keyword).then((bookmarks) => {
      result = result.concat(bookmarks.slice(0, LIMIT).map((item) => ({ ...item, category: SearchCategory.Bookmark })));
    })
  );

  await Promise.all(promises);

  return result;
}

function openCommandPalette(tab: chrome.tabs.Tab) {
  if (tab.url?.startsWith('chrome://')) return;

  chrome.tabs.sendMessage<Message>(tab.id as number, { event: MessageEvent.Open }, () => {});
}

// -----------------------------
chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
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
        .then(() => {
          sendResponse(true);
        })
        .catch((error) => {
          console.log(error);
          sendResponse(false);
        });

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
