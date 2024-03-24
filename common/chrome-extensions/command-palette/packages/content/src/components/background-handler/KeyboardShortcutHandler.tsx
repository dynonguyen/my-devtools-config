import { Message, MessageEvent } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';

export const KeyboardShortcutHandler = () => {
	const open = useSearchStore(state => state.open);
	const setOpen = useSearchStore(state => state.setOpen);

	const handleFocusSearchItem = (up?: boolean) => {
		const items = document.querySelectorAll(
			'#_dcp_root_ .dcp-search-item',
		) as NodeListOf<HTMLElement>;
		const len = items.length;

		if (!len) return;

		let focusedIndex = -1;
		for (let i = 0; i < len; ++i) {
			if (items[i].hasAttribute('data-focused')) {
				focusedIndex = i;
				items[i].removeAttribute('data-focused');
				break;
			}
		}

		if (up) {
			if (focusedIndex > 0) focusedIndex--;
			else focusedIndex = len - 1;
		} else {
			if (focusedIndex < len - 1) focusedIndex++;
			else focusedIndex = 0;
		}

		const focusedItem = items[focusedIndex]!;
		focusedItem.setAttribute('data-focused', 'true');

		const { top, bottom } = focusedItem.getBoundingClientRect();
		if (top < 150 || bottom > 500) {
			focusedItem.scrollIntoView({
				behavior: 'instant',
				block: 'end',
				inline: 'nearest',
			});
		}

		useSearchStore.setState({ focusedIndex });
	};

	const handleKeyDown = (ev: KeyboardEvent) => {
		const key = ev.key;

		switch (key) {
			case 'ArrowDown':
				handleFocusSearchItem(false);
				ev.preventDefault();
				break;
			case 'ArrowUp':
				handleFocusSearchItem(true);
				ev.preventDefault();
				break;
			case 'Escape':
				setOpen(false);
				ev.preventDefault();
				break;
		}
	};

	// Listen keyboard message
	useEffect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeyDown);

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [open]);

	// Listen command message
	useEffect(() => {
		const handleMessage = (
			message: Message,
			_: any,
			sendResponse: (response?: any) => void,
		) => {
			if (message.event === MessageEvent.Open) {
				setOpen('toggle');
			}
			sendResponse(true);
		};

		chrome.runtime.onMessage.addListener(handleMessage);

		return () => {
			chrome.runtime.onMessage.removeListener(handleMessage);
		};
	}, []);

	return null;
};

export default KeyboardShortcutHandler;
