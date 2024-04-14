// -----------------------------
type TypeMap<T> = {
  [K in keyof T]: T[K];
};
export type ValueMap<T> = TypeMap<T>[keyof TypeMap<T>];

export type AutocompleteOption = { label: React.ReactNode; value: any } & { [key: string]: any };

// -----------------------------
export type Bookmark = Omit<chrome.bookmarks.BookmarkTreeNode, 'children' | 'dateAdded' | 'dateGroupModified'> & {
  isFolder?: boolean;
  path?: string;
  childIds?: string[];
  parentIds?: string[];
};

export type ExternalLink = {
  url: string;
};

export type Navigation = {
  logoUri: string;
  title: string;
  url: string;
};

export type Command = {
  logoUri: string;
  title: string;
  description?: string;
  commandEvent?: MessageEvent;
};

export type Theme = {
  id: 'toggle-theme';
  logoUri: string;
  title: string;
  description?: string;
};

export type History = chrome.history.HistoryItem;

export type Tab = chrome.tabs.Tab;

export type Extension = chrome.management.ExtensionInfo;

// -----------------------------
export enum MessageEvent {
  // Other
  Search = 'search',
  OpenPalette = 'open-palette',
  OpenLocalResource = 'open-local-resource',
  ChangeColorTheme = 'change-color-theme',

  // Bookmark
  DeleteBookmark = 'delete-bookmark',
  UpdateBookmark = 'update-bookmark',

  // Tab
  CloseTab = 'close-tab',
  CloseOtherTabs = 'close-other-tabs',
  NewTab = 'new-tab',
  DetachTab = 'detach-tab',
  Reload = 'reload',
  HardReload = 'hard-reload',
  EmptyCacheAndHardReload = 'empty-cache-hard-reload',
  FocusTab = 'focus-tab',
  TogglePinTab = 'toggle-pin-tab',

  // Window
  CloseWindow = 'close-window',
  CloseOtherWindows = 'close-other-windows',
  MergeAllWindows = 'merge-all-windows',
  NewWindow = 'new-window',
  NewIncognitoWindow = 'new-incognito-window',

  // Chrome
  QuitChrome = 'quit-chrome',

  // History
  ClearHistory = 'clear-history',
  ClearHistoryLastHour = 'clear-history-last-hour',
  ClearHistoryLast24Hours = 'clear-history-last-24-hours',
  ClearHistoryLast7Days = 'clear-history-last-7-days',
  DeleteHistory = 'delete-history',

  // Extension
  ToggleExtension = 'toggle-extension'
}

export enum CommandEvent {
  Open = 'open'
}

export type Message = {
  event: MessageEvent;
  data?: any;
};

// -----------------------------
export enum SearchCategory {
  Bookmark = 'bookmark',
  InternetQuery = 'internet',
  Navigation = 'navigation',
  Command = 'command',
  Theme = 'theme',
  History = 'history',
  Tab = 'tab',
  Extension = 'extension'
}

export enum ShortcutKey {
  Cmd = 'Cmd',
  Control = 'Ctrl',
  Option = 'Option',
  Shift = 'Shift',
  Alt = 'Alt',
  Window = 'Window'
}

// -----------------------------
export type UserOptions = {
  theme: 'system' | 'dark' | 'light';
  limitItems: number;
  translate: { enabled: boolean; sl: 'auto' | string; tl: 'en' | string };
  newTabRedirectUri: string;
  googleSearch: boolean;
  youtubeSearch: boolean;
  oxfordSearch: boolean;
  cambridgeSearch: boolean;
  unblockMedium: boolean;
  aliases: { [key: string]: SearchCategory };
};
