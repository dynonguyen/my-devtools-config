import { Command, MessageEvent, getAssets, hasSearchKeyword } from '@dcp/shared';

const commands: Command[] = [
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
    logoUri: getAssets('empty.svg'),
    commandEvent: MessageEvent.EmptyCacheAndHardReload
  },
  { title: 'Close Window', logoUri: getAssets('close-window.svg'), commandEvent: MessageEvent.CloseWindow },
  { title: 'New Window', logoUri: getAssets('new-window.svg'), commandEvent: MessageEvent.NewWindow },
  { title: 'New Incognito Window', logoUri: getAssets('incognito.svg'), commandEvent: MessageEvent.NewIncognitoWindow },
  {
    title: 'Close Other Windows',
    logoUri: getAssets('close-window.svg'),
    commandEvent: MessageEvent.CloseOtherWindows
  },
  { title: 'Merge All Windows', logoUri: getAssets('merge-window.svg'), commandEvent: MessageEvent.MergeAllWindows },

  // Chrome
  { title: 'Quit Chrome', logoUri: getAssets('exit.svg'), commandEvent: MessageEvent.QuitChrome },
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
  }
];

export const searchCommands = (keyword: string) => {
  return commands.filter((item) => hasSearchKeyword(item.title.toLowerCase(), keyword));
};
