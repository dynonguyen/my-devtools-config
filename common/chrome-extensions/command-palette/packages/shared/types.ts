// -----------------------------
type TypeMap<T> = {
	[K in keyof T]: T[K];
};
export type ValueMap<T> = TypeMap<T>[keyof TypeMap<T>];

// -----------------------------
export type Bookmark = Omit<
	chrome.bookmarks.BookmarkTreeNode,
	'children' | 'dateAdded' | 'dateGroupModified'
> & {
	isFolder?: boolean;
	path?: string;
	childIds?: string[];
	parentIds?: string[];
};

export type ExternalLink = {
	url: string;
};

// -----------------------------
export enum MessageEvent {
	Search = 'search',
	Open = 'open',
}

export enum CommandEvent {
	Open = 'open',
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
}

export enum ShortcutId {}

export enum ShortcutKey {
	Cmd = 'Cmd',
	Control = 'Ctrl',
	Option = 'Option',
	Shift = 'Shift',
	Alt = 'Alt',
	Window = 'Window',
}
