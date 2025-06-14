import { MessageEvent, sortSearchResult } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { RawSearchItem, useSearchStore } from '~/stores/search';
import { useUserOptionStore } from '~/stores/user-options';
import { searchInternetQuery, searchLocalStorage } from '~/utils/client-searching';
import { sendMessage } from '~/utils/helper';
import { searchResultMapping } from '~/utils/mapping';

export const SearchHandler = () => {
  const keyword = useSearchStore((state) => state.keyword);
  const { limitItems } = useUserOptionStore();
  const set = useSearchStore((state) => state.set);

  useEffect(() => {
    (async function searching() {
      if (!keyword) {
        return set({ searching: false, result: [] });
      }

      set({ searching: true });

      try {
        // Background search result mapping
        const backgroundResult = await sendMessage<RawSearchItem[]>(MessageEvent.Search, { keyword });

        // Client search result mapping
        const clientResult = [];
        clientResult.push(...searchLocalStorage(keyword));

        // Combine both results
        let result = [...backgroundResult.map((item) => searchResultMapping(item)), ...clientResult];

        // Sort & limit results
        if (result.length > limitItems) {
          result = sortSearchResult(result, 'label').slice(0, limitItems);
        }

        // Always show internet search results
        result.push(...searchInternetQuery(keyword));

        set({ searching: false, result, error: null, focusedIndex: 0 });
      } catch (error) {
        set({ searching: false, result: [], error: error as Error });
      }
    })();
  }, [keyword]);

  return null;
};

export default SearchHandler;
