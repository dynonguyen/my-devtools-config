import { hasSearchKeyword } from '@dcp/shared';

export const searchTab = async (keyword: string) => {
  const tabs = await chrome.tabs.query({});
  return tabs.filter((tab) => hasSearchKeyword(tab.title!, keyword) || hasSearchKeyword(tab.url!, keyword));
};
