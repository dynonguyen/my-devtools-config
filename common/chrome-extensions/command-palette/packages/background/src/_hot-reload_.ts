function reloadTab() {
	chrome.tabs.query(
		{ currentWindow: true, url: 'http://localhost:8888/*' },
		function (tabs) {
			if (tabs[0]) {
				chrome.tabs.reload(tabs[0].id as number);
			}
		},
	);
}

export function hotReloadExtension() {
	const socket = new WebSocket('ws://localhost:4444');

	socket.addEventListener('message', _ => {
		chrome.runtime.reload();
	});
}

setTimeout(reloadTab, 200);

chrome.action.onClicked.addListener(() => {
	reloadTab();
	chrome.runtime.reload();
});
