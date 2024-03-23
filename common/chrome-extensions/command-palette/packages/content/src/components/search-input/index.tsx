import { debounce } from 'lodash-es';
import { useCallback } from 'preact/compat';
import { useSearchStore } from '~/stores/search';

export const SearchInput = () => {
	const setSearchStore = useSearchStore(state => state.set);

	const handleSearchChange = useCallback(
		debounce(ev => {
			setSearchStore({ keyword: ev.target?.value?.trim() || '' });
		}, 350),
		[],
	);

	return (
		<>
			<div class='h-15 shrink-0 w-full px-3 p-3'>
				<input
					type='text'
					class='w-full h-full border-none outline-none bg-transparent text-base-content text-base'
					placeholder='Search for bookmarks, history,...'
					autoFocus
					onInput={handleSearchChange}
				/>
			</div>
			<div class='divider' />
		</>
	);
};

export default SearchInput;
