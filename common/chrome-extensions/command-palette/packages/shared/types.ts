// -----------------------------
type TypeMap<T> = {
  [K in keyof T]: T[K];
};
export type ValueMap<T> = TypeMap<T>[keyof TypeMap<T>];

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

// -----------------------------
export enum MessageEvent {
  Search = 'search',
  OpenPalette = 'open-palette',
  DeleteBookmark = 'delete-bookmark',
  UpdateBookmark = 'update-bookmark',
  OpenLocalResource = 'open-local-resource'
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
  Google = 'google',
  Youtube = 'youtube',
  Navigation = 'navigation'
}

export enum ShortcutId {}

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
  shortcuts: Record<string, string[]>;
};
