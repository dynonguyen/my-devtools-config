import { Message, MessageEvent } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';

export const SearchHandler = () => {
	const keyword = useSearchStore(state => state.keyword);
	const set = useSearchStore(state => state.set);

	useEffect(() => {
		(async function searching() {
			if (!keyword) {
				return set({ searching: false, result: [] });
			}

			set({ searching: true });

			try {
				const response = await chrome.runtime.sendMessage<Message>({
					event: MessageEvent.Search,
					data: { keyword },
				});
				console.log('RES: ', response);
			} catch (error) {
				console.error('DCP Search error: ', error);
			} finally {
				set({ searching: false });
			}
		})();
	}, [keyword]);

	return null;
};

export default SearchHandler;
