import { EXTENSION_ID, Navigation, getAssets, hasSearchKeyword } from '@dcp/shared';

const navigationList: Array<Navigation & { aliases?: string[] }> = [
  { title: 'Extensions', url: 'chrome://extensions', logoUri: getAssets('extensions.svg') },
  { title: 'Settings', aliases: ['chrome settings'], url: 'chrome://settings', logoUri: getAssets('settings.svg') },
  {
    title: 'Dyno Command Palette Settings',
    aliases: ['extension settings', 'extension options'],
    url: `chrome-extension://${EXTENSION_ID}/options/index.html`,
    logoUri: getAssets('logo.svg')
  },
  { title: 'Google Password Manager', url: 'chrome://password-manager/passwords', logoUri: getAssets('gpm.svg') },
  { title: 'Downloads', url: 'chrome://downloads', logoUri: getAssets('downloads.svg') },
  { title: 'Experimental Features', url: 'chrome://flags', logoUri: getAssets('experiments.svg') },
  { title: 'Bookmarks', url: 'chrome://bookmarks', logoUri: getAssets('bookmarks.svg') },
  { title: 'History', url: 'chrome://history', logoUri: getAssets('history.svg') },
  { title: "What's new", url: 'chrome://whats-new', logoUri: getAssets('chrome.svg') }
];

export function searchNavigation(keyword: string) {
  return navigationList.filter(
    (item) =>
      hasSearchKeyword(item.title, keyword) ||
      hasSearchKeyword(item.url, keyword) ||
      item.aliases?.some((alias) => hasSearchKeyword(alias, keyword))
  );
}
