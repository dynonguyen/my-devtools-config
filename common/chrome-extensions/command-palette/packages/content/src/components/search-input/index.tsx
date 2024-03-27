import { debounce } from '@dcp/shared';
import { useCallback, useEffect, useRef } from 'preact/compat';
import { useSearchStore } from '~/stores/search';

export const SearchInput = () => {
  const setSearchStore = useSearchStore((state) => state.set);
  const open = useSearchStore((state) => state.open);
  const ref = useRef<HTMLInputElement>();

  const handleSearchChange = useCallback(
    debounce((ev) => {
      setSearchStore({ keyword: ev.target?.value?.trim() || '', searching: true });
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
      <div class="h-15 shrink-0 w-full px-3 p-3">
        <input
          id="dcp-search-input"
          // @ts-ignore
          ref={ref}
          type="text"
          class="w-full h-full border-none outline-none bg-transparent text-base-content text-base"
          placeholder="Search for bookmarks, history,..."
          onInput={handleSearchChange}
          autoFocus
        />
      </div>
      <div class="divider" />
    </>
  );
};

export default SearchInput;
