import { Message, MessageEvent, SearchCategory, getAssets } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { RawSearchItem, useSearchStore } from '~/stores/search';
import { searchResultMapping } from '~/utils/mapping';

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
				const rawResult: RawSearchItem[] =
					(await chrome.runtime.sendMessage<Message>({
						event: MessageEvent.Search,
						data: { keyword },
					})) || [];

				const result = rawResult.map(item => searchResultMapping(item));
				result.push(
					{
						category: SearchCategory.Google,
						id: SearchCategory.Google,
						label: 'Search Google',
						description: `https://www.google.com/search?q=${keyword}`,
						logo: getAssets('google.ico'),
						raw: {
							category: SearchCategory.Google,
							url: `https://www.google.com/search?q=${keyword}`,
						},
					},
					{
						category: SearchCategory.Youtube,
						id: SearchCategory.Youtube,
						label: 'Search Youtube',
						description: `https://www.youtube.com/results?search_query=${keyword}`,
						logo: getAssets('youtube.png'),
						raw: {
							category: SearchCategory.Youtube,
							url: `https://www.youtube.com/results?search_query=${keyword}`,
						},
					},
				);

				set({ searching: false, result, error: null });
			} catch (error) {
				set({ searching: false, result: [], error: error as Error });
			}
		})();
	}, [keyword]);

	return null;
};

export default SearchHandler;
