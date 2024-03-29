import { Navigation, getAssets } from '@dcp/shared';

const navigationList: Navigation[] = [
  { title: 'Extensions', url: 'chrome://extensions', logoUri: getAssets('extensions.svg') },
  { title: 'Settings', url: 'chrome://settings', logoUri: getAssets('settings.svg') },
  { title: 'Google Password Manager', url: 'chrome://password-manager/passwords', logoUri: getAssets('gpm.svg') },
  { title: 'Downloads', url: 'chrome://downloads', logoUri: getAssets('downloads.svg') },
  { title: 'Experimental Features', url: 'chrome://flags', logoUri: getAssets('experiments.svg') },
  { title: 'Bookmarks', url: 'chrome://bookmarks', logoUri: getAssets('bookmarks.svg') },
  { title: 'History', url: 'chrome://history', logoUri: getAssets('history.svg') },
  { title: "What's new", url: 'chrome://whats-new', logoUri: getAssets('chrome.svg') }
];

export function searchNavigation(keyword: string) {
  return navigationList.filter((item) => item.title.toLowerCase().includes(keyword) || item.url.includes(keyword));
}
