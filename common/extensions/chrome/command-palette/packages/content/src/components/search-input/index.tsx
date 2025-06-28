import { debounce, getAliasFromKeyword } from '@dcp/shared';
import { useCallback, useEffect, useRef } from 'preact/compat';
import { useSearchStore } from '~/stores/search';
import { useUserOptionStore } from '~/stores/user-options';
import { searchCategoryMapping } from '~/utils/mapping';
import Chip from '../Chip';

const AliasCategory = () => {
  const keyword = useSearchStore((state) => state.keyword);
  const aliases = useUserOptionStore((state) => state.aliases);

  const alias = getAliasFromKeyword(keyword);
  const aliasCategory = alias ? Object.entries(aliases).find(([key]) => key === alias)?.[1] : undefined;

  if (!aliasCategory) return null;

  const category = searchCategoryMapping(aliasCategory);

  return category ? <Chip {...category} /> : null;
};

export const SearchInput = () => {
  const setSearchStore = useSearchStore((state) => state.set);
  const open = useSearchStore((state) => state.open);
  const ref = useRef<HTMLInputElement>();

  const handleSearchChange = useCallback(
    debounce((ev) => {
      setSearchStore({ keyword: ev.target?.value?.trimLeft() || '' });
    }, 250),
    []
  );

  useEffect(() => {
    if (open && ref.current) {
      ref.current.value = '';
      ref.current.focus();
    }
  }, [open]);

  return (
    <>
      <div class="h-15 shrink-0 w-full px-3 p-3 flex items-center justify-between">
        <input
          id="dcp-search-input"
          // @ts-ignore
          ref={ref}
          type="text"
          class="w-full h-full !border-none !outline-none !bg-transparent !text-base-content !text-base"
          placeholder="Search for bookmarks, histories, commands,..."
          onInput={handleSearchChange}
          autoComplete="off"
          autoFocus
        />
        <AliasCategory />
      </div>
      <div class="divider" />
    </>
  );
};

export default SearchInput;
