import { hasSearchKeyword } from '@dcp/shared';

export const searchExtension = async (keyword: string): Promise<chrome.management.ExtensionInfo[]> => {
  const extensions = await chrome.management.getAll();
  return extensions.filter((ext) => hasSearchKeyword(ext.name, keyword) || hasSearchKeyword(ext.description, keyword));
};
