import { getAssets } from '~/utils/helper';
import EnterAction from './EnterAction';

export const SearchAction = () => {
	return (
		<div id='search-action'>
			<img
				className='shrink-0'
				src={getAssets('logo.svg')}
				style={{ width: 24, height: 24 }}
			/>

			<div className='flex'>
				<EnterAction />
			</div>
		</div>
	);
};

export default SearchAction;
