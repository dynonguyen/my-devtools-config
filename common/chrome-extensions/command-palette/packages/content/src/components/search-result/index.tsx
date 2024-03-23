import SearchResultItem from './SearchResultItem';

export const SearchResult = () => {
	return (
		<>
			<div class='grow overflow-auto max-h-80 my-2'>
				<div class='text-grey-500 text-sm font-500 px-4 mb-2'>Result: </div>
				<div className='flex flex-col gap-2'>
					{Array(10)
						.fill(1)
						.map((_, index) => (
							<SearchResultItem label='Open downloads' key={index} />
						))}
				</div>
			</div>
			<div class='divider' />
		</>
	);
};

export default SearchResult;
