import { Fragment } from 'preact';

export const SearchInput = () => {
	return (
		<Fragment>
			<input
				id='search-input'
				className='text-md'
				placeholder='Search for tabs, history, command & more'
				autoFocus
				tabindex={0}
			/>
		</Fragment>
	);
};

export default SearchInput;
