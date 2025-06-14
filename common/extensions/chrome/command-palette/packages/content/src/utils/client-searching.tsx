import { getAliasFromKeyword, getAssets, LocalStorageItem, SearchCategory } from '@dcp/shared';
import { SearchItem } from '~/stores/search';
import { useUserOptionStore } from '~/stores/user-options';
import { getLocalStorageSearchItem } from './convert';

const allowSearch = (aliasCategory = '', category = '') => {
  return !aliasCategory || aliasCategory === category;
};

const getAliasCategory = (
  keyword: string,
  lowercase?: boolean
): [keyword: string, aliasCategory: SearchCategory | undefined] => {
  const aliases = useUserOptionStore.getState().aliases;
  const alias = getAliasFromKeyword(keyword);
  const aliasCategory = alias ? Object.entries(aliases).find(([key]) => key === alias)?.[1] : undefined;

  const keywordWouthAlias = aliasCategory ? keyword.replace(alias, '').trim() : keyword;

  return [lowercase ? keywordWouthAlias.toLowerCase() : keywordWouthAlias, aliasCategory];
};

export const searchInternetQuery = (keyword: string): SearchItem[] => {
  const { googleSearch, youtubeSearch, oxfordSearch, cambridgeSearch, translate, aliases } =
    useUserOptionStore.getState();
  const { sl, tl } = translate;

  const alias = getAliasFromKeyword(keyword);
  const aliasCategory = alias ? Object.entries(aliases).find(([key]) => key === alias)?.[1] : undefined;

  if (aliasCategory && aliasCategory !== SearchCategory.InternetQuery) return [];
  const query = (aliasCategory ? keyword.replace(alias, '').trim() : keyword).split(' ').join('+');

  const result: SearchItem[] = [];

  if (googleSearch) {
    result.push({
      category: SearchCategory.InternetQuery,
      id: 'internet-google',
      label: 'Search Google',
      description: `https://www.google.com/search?q=${query}`,
      logo: getAssets('google.ico'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.google.com/search?q=${query}`
      }
    });
  }

  if (youtubeSearch) {
    result.push({
      category: SearchCategory.InternetQuery,
      id: 'internet-youtube',
      label: 'Search Youtube',
      description: `https://www.youtube.com/results?search_query=${query}`,
      logo: getAssets('youtube.png'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.youtube.com/results?search_query=${query}`
      }
    });
  }

  if (oxfordSearch) {
    result.push({
      category: SearchCategory.InternetQuery,
      id: 'internet-oxford',
      label: 'Oxford',
      description: `https://www.oxfordlearnersdictionaries.com/definition/english/${query}`,
      logo: getAssets('oxford.ico'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://www.oxfordlearnersdictionaries.com/definition/english/${query}`
      }
    });
  }

  if (cambridgeSearch) {
    result.push({
      category: SearchCategory.InternetQuery,
      id: 'internet-cambridge',
      label: 'Cambridge Dictionary',
      description: `https://dictionary.cambridge.org/dictionary/english/${query}`,
      logo: getAssets('cambridge.png'),
      _raw: {
        category: SearchCategory.InternetQuery,
        url: `https://dictionary.cambridge.org/dictionary/english/${query}`
      }
    });
  }

  if (translate.enabled) {
    result.push({
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
    });
  }

  return result;
};

export const searchLocalStorage = (keyword: string): SearchItem<LocalStorageItem>[] => {
  const [k, aliasCategory] = getAliasCategory(keyword, true);

  if (!allowSearch(aliasCategory, SearchCategory.LocalStorage)) return [];

  let result = Object.entries(localStorage);

  if (k) {
    result = result.filter(([key]) => key.toLowerCase().includes(k));
  }

  return result?.map(([key, value]) => getLocalStorageSearchItem({ key, value })) || [];
};
