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
      wrapperRef.current.querySelector('.dcp-search-item[data-focused="true"]')?.removeAttribute('data-focused');
      const firstChild = wrapperRef.current.children[0];
      firstChild?.setAttribute('data-focused', 'true');
    }
  }, [result.length, result.map((_) => _.id).join('')]);

  if (!keyword) return null;

  if (error) {
    return <div class="my-6 text-center text-grey-500">🐞 Something Went Wrong 🐞</div>;
  }

  const handleItemClick = (item: SearchItem) => {
    const { actionFn } = enterActionMapping(item);
    actionFn?.();
  };

  return (
    <>
      <div id="dcp-search-result-wrapper" class="grow overflow-auto h-84">
        {result.length > 0 ? (
          <div class="mb-2">
            <div class="text-grey-500 text-sm font-500 px-4 my-2">Results</div>
            <div ref={wrapperRef} class="flex flex-col gap-1">
              {result.map((item) => (
                <SearchResultItem {...item} key={item.id} onClick={() => handleItemClick(item)} />
              ))}
            </div>
          </div>
        ) : (
          <div class="flex-center flex-col h-full w-full text-center text-grey-500 gap-2">
            <span class="i-tabler:search-off size-10" />
            <div class="text-xl font-400">Search not found</div>
          </div>
        )}
      </div>
      <div class="divider" />
    </>
  );
};

export default SearchResult;
