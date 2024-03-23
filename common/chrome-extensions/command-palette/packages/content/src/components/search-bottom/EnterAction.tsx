import Kbd from '../Kbd';

export const EnterAction = () => {
	return (
		<div class='flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20)'>
			<span class='text-base-content text-xs font-500'>Open</span>
			<Kbd icon='i-uil:enter' />
		</div>
	);
};

export default EnterAction;
