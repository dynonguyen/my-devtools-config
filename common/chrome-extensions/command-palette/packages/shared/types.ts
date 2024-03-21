export type Bookmark = chrome.bookmarks.BookmarkTreeNode & {
	isFolder?: boolean;
	path?: string;
};
