import { pick } from '@dcp/shared';
import { useEffect, useRef } from 'preact/hooks';
import { SearchItem, useSearchStore } from '~/stores/search';
import { enterActionMapping } from '~/utils/mapping';
import SearchResultItem from './SearchResultItem';

export const SearchResult = () => {
  const { error, keyword, result } = useSearchStore((state) => pick(state, ['error', 'keyword', 'result']));
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && useSearchStore.getState().focusedIndex === 0) {
      const firstChild = wrapperRef.current.children[0];
      firstChild?.setAttribute('data-focused', 'true');
    }
  }, [result.length]);

  if (!keyword) return null;

  if (error) {
    return <div class="my-6 text-center text-grey-500">🥹 🐞 🐞 Something went wrong 🐞 🐞 🥹</div>;
  }

  const handleItemClick = (item: SearchItem) => {
    const { actionFn } = enterActionMapping(item);
    actionFn?.();
  };

  return (
    <>
      <div id="dcp-search-result-wrapper" class="grow overflow-auto h-84">
        {result.length > 0 && (
          <div class="mb-2">
            <div class="text-grey-500 text-sm font-500 px-4 my-2">Result: </div>
            <div ref={wrapperRef} class="flex flex-col gap-1">
              {result.map((item) => (
                <SearchResultItem {...item} key={item.id} onClick={() => handleItemClick(item)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div class="divider" />
    </>
  );
};

export default SearchResult;
