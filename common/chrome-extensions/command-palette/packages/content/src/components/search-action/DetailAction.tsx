import { detectDevicePlatform } from '@dcp/shared';
import Icon from '../Icon';

const platform = detectDevicePlatform();

export const DetailAction = () => {
	return (
		<button className='dcp-action-button'>
			<span className='dcp-action-button--text'>Actions</span>
			<div className='flex items-center' style={{ gap: 4 }}>
				<div className='dcp-kbd'>
					<Icon icon={platform === 'mac' ? 'ph:command' : 'ph:control'} />
				</div>
				<div className='dcp-kbd'>
					<span class='dcp-icon text'>K</span>
				</div>
			</div>
		</button>
	);
};

export default DetailAction;
