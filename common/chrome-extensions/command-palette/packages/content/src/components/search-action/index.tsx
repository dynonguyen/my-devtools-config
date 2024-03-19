import { getAssets } from '~/utils/helper';
import DetailAction from './DetailAction';
import EnterAction from './EnterAction';

export const SearchAction = () => {
	return (
		<div id='search-action'>
			<img
				className='shrink-0'
				src={getAssets('logo.svg')}
				style={{ width: 24, height: 24 }}
			/>

			<div className='flex items-center' style={{ gap: 8 }}>
				<EnterAction />

				<div
					style={{ width: 1.5, height: 12, backgroundColor: 'var(--divider)' }}
				/>

				<DetailAction />
			</div>
		</div>
	);
};

export default SearchAction;
