import { Command, MessageEvent, getAssets, hasSearchKeyword } from '@dcp/shared';

const commands: Array<Command & { aliases?: string[] }> = [
  // Tab
  { title: 'Close Tab', logoUri: getAssets('close-tab.svg'), commandEvent: MessageEvent.CloseTab },
  { title: 'Close Other Tabs', logoUri: getAssets('close-other-tabs.svg'), commandEvent: MessageEvent.CloseOtherTabs },
  { title: 'New Tab', logoUri: getAssets('new-tab.svg'), commandEvent: MessageEvent.NewTab },
  { title: 'Reload', logoUri: getAssets('reload.svg'), commandEvent: MessageEvent.Reload },
  { title: 'Hard Reload', logoUri: getAssets('hard-reload.svg'), commandEvent: MessageEvent.HardReload },
  { title: 'Detach Tab Into New Window', logoUri: getAssets('detach-tab.svg'), commandEvent: MessageEvent.DetachTab },
  { title: 'Pin/Unpin Tab', logoUri: getAssets('pin.svg'), commandEvent: MessageEvent.TogglePinTab },

  // Window
  {
    title: 'Empty Cache & Hard Reload',
    aliases: ['clear cache'],
    logoUri: getAssets('empty.svg'),
    commandEvent: MessageEvent.EmptyCacheAndHardReload
  },
  { title: 'Close Window', logoUri: getAssets('close-window.svg'), commandEvent: MessageEvent.CloseWindow },
  { title: 'New Window', logoUri: getAssets('new-window.svg'), commandEvent: MessageEvent.NewWindow },
  {
    title: 'New Incognito Window',
    aliases: ['new private'],
    logoUri: getAssets('incognito.svg'),
    commandEvent: MessageEvent.NewIncognitoWindow
  },
  {
    title: 'Close Other Windows',
    logoUri: getAssets('close-window.svg'),
    commandEvent: MessageEvent.CloseOtherWindows
  },
  { title: 'Merge All Windows', logoUri: getAssets('merge-window.svg'), commandEvent: MessageEvent.MergeAllWindows },

  // Chrome
  { title: 'Quit Chrome', aliases: ['exit'], logoUri: getAssets('exit.svg'), commandEvent: MessageEvent.QuitChrome },
  {
    title: 'Clear History - All time',
    logoUri: getAssets('clear-history.svg'),
    commandEvent: MessageEvent.ClearHistory
  },
  {
    title: 'Clear History - Last hour',
    logoUri: getAssets('clear-history.svg'),
    commandEvent: MessageEvent.ClearHistory
  },
  {
    title: 'Clear History - Last 24 hours',
    logoUri: getAssets('clear-history.svg'),
    commandEvent: MessageEvent.ClearHistory
  },
  {
    title: 'Clear History - Last 7 days',
    logoUri: getAssets('clear-history.svg'),
    commandEvent: MessageEvent.ClearHistory
  },

  // Client commands
  {
    title: 'New Cookie',
    aliases: ['create cookie'],
    logoUri: getAssets('cookie.svg'),
    commandEvent: MessageEvent.NewCookie,
    isClient: true
  },
  {
    title: 'New Local Storage Item',
    aliases: ['create local storage'],
    logoUri: getAssets('local-storage.svg'),
    commandEvent: MessageEvent.NewLocalStorageItem,
    isClient: true
  }
];

export const searchCommands = (keyword: string) => {
  return commands.filter(
    (item) =>
      hasSearchKeyword(item.title.toLowerCase(), keyword) ||
      item.aliases?.some((alias) => hasSearchKeyword(alias, keyword))
  );
};
