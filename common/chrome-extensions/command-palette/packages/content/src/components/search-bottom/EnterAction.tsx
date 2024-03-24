import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';
import { enterActionMapping } from '~/utils/mapping';
import Kbd from '../Kbd';

export const EnterAction = () => {
	const focusedItem = useSearchStore(({ focusedIndex, result }) =>
		focusedIndex !== -1 ? result[focusedIndex] : null,
	);
	const disabled = !Boolean(focusedItem);

	const { label, actionFn } = enterActionMapping(focusedItem);

	useEffect(() => {
		if (disabled) return;

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				actionFn?.();
			}
		};

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [focusedItem]);

	return (
		<div
			class='flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20) data-[disabled]:(cursor-default opacity-30 !bg-transparent pointer-events-none)'
			{...(disabled && { 'data-disabled': true })}
			onClick={actionFn}
		>
			<span class='text-base-content text-xs font-500'>{label}</span>
			<Kbd icon='i-uil:enter' />
		</div>
	);
};

export default EnterAction;
