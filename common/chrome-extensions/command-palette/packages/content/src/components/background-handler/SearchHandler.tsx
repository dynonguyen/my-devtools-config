import { MessageEvent, SearchCategory, getAssets } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { RawSearchItem, SearchItem, useSearchStore } from '~/stores/search';
import { useUserOptionStore } from '~/stores/user-options';
import { sendMessage } from '~/utils/helper';
import { searchResultMapping } from '~/utils/mapping';

const internetQuerySearching = (keyword: string): SearchItem[] => {
  const query = keyword.split(' ').join('+');
  const { sl, tl } = useUserOptionStore.getState().translate;

  return [
    {
      category: SearchCategory.InternetQuery,
      id: 'internet-google',
      label: 'Search Google',
      description: `https://www.google.com/search?q=${query}`,
      logo: getAssets('google.ico'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.google.com/search?q=${query}`
      }
    },
    {
      category: SearchCategory.InternetQuery,
      id: 'internet-youtube',
      label: 'Search Youtube',
      description: `https://www.youtube.com/results?search_query=${query}`,
      logo: getAssets('youtube.png'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.youtube.com/results?search_query=${query}`
      }
    },
    {
      category: SearchCategory.InternetQuery,
      id: 'internet-translate',
      label: 'Google Translate',
      description: `${
        sl === 'auto' ? 'detect' : sl
      } > ${tl}: https://translate.google.com/?sl=${sl}&tl=${tl}&text=${query}&op=translate`,
      logo: getAssets('gg-translate.ico'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://translate.google.com/?sl=${sl}&tl=${tl}&text=${query}&op=translate`
      }
    },
    {
      category: SearchCategory.InternetQuery,
      id: 'internet-oxford',
      label: 'Oxford',
      description: `https://www.oxfordlearnersdictionaries.com/definition/english/${query}`,
      logo: getAssets('oxford.ico'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.oxfordlearnersdictionaries.com/definition/english/${query}`
      }
    },
    {
      category: SearchCategory.InternetQuery,
      id: 'internet-cambridge',
      label: 'Cambridge Dictionary',
      description: `https://dictionary.cambridge.org/dictionary/english/${query}`,
      logo: getAssets('cambridge.png'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://dictionary.cambridge.org/dictionary/english/${query}`
      }
    }
  ];
};

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

        result.push(...internetQuerySearching(keyword));

        set({ searching: false, result, error: null, focusedIndex: 0 });
      } catch (error) {
        set({ searching: false, result: [], error: error as Error });
      }
    })();
  }, [keyword]);

  return null;
};

export default SearchHandler;
