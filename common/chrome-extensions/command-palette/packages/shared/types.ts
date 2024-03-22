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
