import Icon from '../Icon';

export const EnterAction = () => {
	return (
		<button class='dcp-action-button'>
			<span>Open Walkthrough</span>
			<div className='dcp-kbd'>
				<Icon icon='uil:enter' />
			</div>
		</button>
	);
};

export default EnterAction;
