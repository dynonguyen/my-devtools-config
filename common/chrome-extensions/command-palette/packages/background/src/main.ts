// Development mode
import { Message, MessageEvent } from '@dcp/shared';
import { hotReloadExtension } from './_hot-reload_';
hotReloadExtension();

chrome.runtime.onMessage.addListener(
	(message: Message, _sender, sendResponse) => {
		const { event, data = {} } = message;

		switch (event) {
			case MessageEvent.Search: {
				const { keyword } = data;
				if (!keyword) return sendResponse([]);

				// TODO: Handle search
				return true;
			}

			default:
				sendResponse(null);
		}
	},
);
