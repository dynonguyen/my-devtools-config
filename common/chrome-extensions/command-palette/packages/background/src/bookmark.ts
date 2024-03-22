import { Bookmark } from '@dcp/shared';
import { omit } from 'underscore';
import { MyCache } from './cache';

// -----------------------------
type BookmarkCache = {
	dictionary: Record<string, Bookmark>;
};

const cache = new MyCache<BookmarkCache>();

// -----------------------------
const flattenBookmarkDictionary = (
	node: chrome.bookmarks.BookmarkTreeNode,
	bookmarks: Array<chrome.bookmarks.BookmarkTreeNode & { parentIds: string[] }>,
	parentIds: string[] = [],
) => {
	const currentParentId =
		node.parentId && node.parentId !== '0'
			? [...parentIds, node.parentId]
			: parentIds;

	bookmarks.push({ ...node, parentIds: currentParentId });

	if (!node.children || !node.children.length) {
		return bookmarks;
	}

	node.children.forEach(child => {
		flattenBookmarkDictionary(child, bookmarks, currentParentId);
	});

	return bookmarks;
};

const buildBookmarkDictionary = async () => {
	const dictionary: Record<string, Bookmark> = {};

	const rootNode = (await chrome.bookmarks.getTree())[0];
	const flatted = flattenBookmarkDictionary(rootNode, [], []).sort(
		(a, b) => (a.parentIds?.length || 0) - (b.parentIds?.length || 0),
	);

	flatted.forEach(b => {
		if (b.id !== '0') {
			``;
			dictionary[b.id] = {
				...omit(b, [
					'children',
					'dateGroupModified',
					'dateAdded',
					'unmodifiable',
				]),
				isFolder: !b.url,
				childIds: b.children?.map(c => c.id) || [],
				path: b.parentId && b.parentId !== '0' ? '' : '',
			};
		}
	});

	console.log(dictionary);

	cache.add('dictionary', dictionary);
};

// -----------------------------
export const searchBookmarks = async (
	_keyword: string,
): Promise<Bookmark[]> => {
	return [];
};

// -----------------------------
(function init() {
	buildBookmarkDictionary();
})();
