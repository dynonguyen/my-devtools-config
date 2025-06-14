import { Bookmark, omit } from '@dcp/shared';
import { MyCache } from './cache';
import { userOptions } from './user-options';

// -----------------------------
type BookmarkCache = {
  dictionary: Record<string, Bookmark>;
};

const cache = new MyCache<BookmarkCache>();

// -----------------------------
const flattenBookmarkDictionary = (
  node: chrome.bookmarks.BookmarkTreeNode,
  bookmarks: Array<chrome.bookmarks.BookmarkTreeNode & { parentIds: string[] }>,
  parentIds: string[] = []
) => {
  const currentParentId = node.parentId && node.parentId !== '0' ? [...parentIds, node.parentId] : parentIds;

  bookmarks.push({ ...node, parentIds: currentParentId });

  if (!node.children || !node.children.length) {
    return bookmarks;
  }

  node.children.forEach((child) => {
    flattenBookmarkDictionary(child, bookmarks, currentParentId);
  });

  return bookmarks;
};

const buildBookmarkDictionary = async () => {
  const dictionary: Record<string, Bookmark> = {};

  const rootNode = (await chrome.bookmarks.getTree())[0];
  const flatted = flattenBookmarkDictionary(rootNode, [], []).sort(
    (a, b) => (a.parentIds?.length || 0) - (b.parentIds?.length || 0)
  );

  const getPath = (pid: string): string => {
    const parent = dictionary[pid];

    if (!parent || !parent.parentId) return '';

    const parentPath = getPath(parent.parentId);
    return (parentPath ? `${parentPath} ・ ` : '') + parent.title;
  };

  flatted.forEach((b) => {
    if (b.id !== '0') {
      dictionary[b.id] = {
        ...omit(b, ['children', 'dateAdded', 'dateGroupModified']),
        isFolder: !b.url,
        childIds: b.children?.map((c) => c.id) || [],
        path: b.parentId && b.parentId !== '0' ? getPath(b.parentId) : ''
      };
    }
  });

  cache.add('dictionary', dictionary);

  return dictionary;
};

// -----------------------------
export const searchBookmarks = async (keyword: string): Promise<Bookmark[]> => {
  const bookmarks = await chrome.bookmarks.search(keyword);

  let dictionary = cache.get('dictionary')!;
  if (!dictionary) {
    dictionary = await buildBookmarkDictionary();
  }

  if (!keyword) {
    return Object.values(dictionary).slice(0, userOptions.limitItems);
  }

  return bookmarks.map((item) => dictionary[item.id]);
};

// -----------------------------
(function listener() {
  ['onChanged', 'onImportEnded', 'onCreated', 'onMoved', 'onRemoved'].forEach((eventKey) => {
    // @ts-ignore
    chrome.bookmarks[eventKey]?.addListener(buildBookmarkDictionary);
  });
})();
