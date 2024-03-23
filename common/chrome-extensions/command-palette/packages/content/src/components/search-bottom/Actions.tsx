import Kbd from '../Kbd';

export const Actions = () => {
	return (
		<div class='flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20)'>
			<span class='text-grey-700 dark:text-grey-500 text-xs font-500'>
				Actions
			</span>
			<div className='flex gap-1'>
				<Kbd icon='i-ph:command' />
				<Kbd text='K' />
			</div>
		</div>
	);
};

export default Actions;
