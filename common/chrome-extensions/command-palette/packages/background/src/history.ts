import { History } from '@dcp/shared';

export const searchHistory = (keyword: string): Promise<History[]> => {
  return chrome.history.search({ text: keyword });
};
