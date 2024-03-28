import { MessageEvent, SearchCategory, getAssets } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { RawSearchItem, useSearchStore } from '~/stores/search';
import { sendMessage } from '~/utils/helper';
import { searchResultMapping } from '~/utils/mapping';

export const SearchHandler = () => {
  const keyword = useSearchStore((state) => state.keyword);
  const set = useSearchStore((state) => state.set);

  useEffect(() => {
    (async function searching() {
      if (!keyword) {
        return set({ searching: false, result: [] });
      }

      set({ searching: true });

      try {
        const rawResult = await sendMessage<RawSearchItem[]>(MessageEvent.Search, { keyword });

        const result = rawResult.map((item) => searchResultMapping(item));

        const query = keyword.split(' ').join('+');
        result.push(
          {
            category: SearchCategory.Google,
            id: SearchCategory.Google,
            label: 'Search Google',
            description: `https://www.google.com/search?q=${query}`,
            logo: getAssets('google.ico'),
            _raw: {
              category: SearchCategory.Google,
              url: `https://www.google.com/search?q=${query}`
            }
          },
          {
            category: SearchCategory.Youtube,
            id: SearchCategory.Youtube,
            label: 'Search Youtube',
            description: `https://www.youtube.com/results?search_query=${query}`,
            logo: getAssets('youtube.png'),
            _raw: {
              category: SearchCategory.Youtube,
              url: `https://www.youtube.com/results?search_query=${query}`
            }
          }
        );

        set({ searching: false, result, error: null, focusedIndex: 0 });
      } catch (error) {
        set({ searching: false, result: [], error: error as Error });
      }
    })();
  }, [keyword]);

  return null;
};

export default SearchHandler;
