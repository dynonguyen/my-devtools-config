import Icon from '../Icon';

export const EnterAction = () => {
	return (
		<button className='dcp-action-button'>
			<span className='dcp-action-button--text'>Open Walkthrough</span>
			<div className='dcp-kbd'>
				<Icon icon='uil:enter' />
			</div>
		</button>
	);
};

export default EnterAction;
