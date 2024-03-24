import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';

export const ClickOutsideHandler = () => {
	const open = useSearchStore(state => state.open);
	const setOpen = useSearchStore(state => state.setOpen);

	useEffect(() => {
		if (open) {
			const root = document.getElementById('_dcp_root_');
			const wrapper = document.getElementById('dcp-wrapper');

			if (root) {
				const handleClick = (ev: MouseEvent) => {
					if (!wrapper?.contains(ev.target as Element)) {
						setOpen(false);
					}
				};

				root.addEventListener('click', handleClick);

				return () => root.removeEventListener('click', handleClick);
			}
		}
	}, [open]);

	return null;
};

export default ClickOutsideHandler;
