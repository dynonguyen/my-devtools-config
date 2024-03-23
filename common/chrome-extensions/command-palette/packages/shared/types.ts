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

// -----------------------------
export enum SearchCategory {
	Bookmark = 'bookmark',
}

export enum MessageEvent {
	Search = 'search',
}

export type Message = {
	event: MessageEvent;
	data?: any;
};
