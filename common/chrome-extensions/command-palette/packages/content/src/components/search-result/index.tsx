import { pick } from '@dcp/shared';
import { SearchItem, useSearchStore } from '~/stores/search';
import { enterActionMapping } from '~/utils/mapping';
import SearchResultItem from './SearchResultItem';

export const SearchResult = () => {
	const result = useSearchStore(state => state.result);
	const { searching, error, keyword } = useSearchStore(state =>
		pick(state, ['searching', 'error', 'keyword']),
	);

	if (searching || !keyword) return null;

	if (error) {
		return (
			<div class='my-6 text-center text-grey-500'>
				🥹 🐞 🐞 Something went wrong 🐞 🐞 🥹
			</div>
		);
	}

	const handleItemClick = (item: SearchItem) => {
		const { actionFn } = enterActionMapping(item);
		actionFn?.();
	};

	return (
		<>
			<div
				id='dcp-search-result-wrapper'
				class='grow overflow-auto max-h-80 my-2'
			>
				{result.length > 0 && (
					<div class='mb-2'>
						<div class='text-grey-500 text-sm font-500 px-4 mb-2'>Result: </div>
						<div className='flex flex-col gap-2'>
							{result.map(item => (
								<SearchResultItem
									{...item}
									key={item.id}
									onClick={() => handleItemClick(item)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
			<div class='divider' />
		</>
	);
};

export default SearchResult;
