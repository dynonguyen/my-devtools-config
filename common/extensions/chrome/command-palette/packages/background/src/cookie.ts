import { hasSearchKeyword } from '@dcp/shared';

export const searchCookie = async (keyword: string): Promise<Array<chrome.cookies.Cookie>> => {
  return new Promise((resolve) => {
    if (!keyword) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          return resolve([]);
        }

        const url = tabs[0].url;

        chrome.cookies.getAll({ url }, (cookies) => {
          if (chrome.runtime.lastError) {
            return resolve([]);
          }

          return resolve(cookies);
        });
      });
    } else {
      chrome.cookies.getAll({}, (cookies) => {
        if (chrome.runtime.lastError) {
          return resolve([]);
        }

        const filteredCookies = cookies.filter(
          (cookie) =>
            hasSearchKeyword(cookie.name, keyword) ||
            hasSearchKeyword(cookie.domain, keyword) ||
            hasSearchKeyword(cookie.value, keyword)
        );

        return resolve(filteredCookies);
      });
    }
  });
};
