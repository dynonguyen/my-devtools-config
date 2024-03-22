import { searchBookmarks } from './bookmark';

async function main() {
	const bookmarks = await searchBookmarks('a');
	console.log(bookmarks);
}

main();
