async function main() {
	const res = await chrome.storage.local.remove('foo');
	console.log(res);
}

main();
