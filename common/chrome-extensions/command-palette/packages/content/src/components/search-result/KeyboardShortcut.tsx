import { ShortcutKey } from '@dcp/shared';
import { kbdMapping } from '~/utils/mapping';
import Kbd from '../Kbd';

// TODO: get keyboard shortcut from config
const shortcuts: Record<string, string[]> = {
	'search-bookmark-only': [ShortcutKey.Cmd, 'B'],
};

type KeyboardShortcutProps = {
	shortcutId?: string;
};

export const KeyboardShortcut = (props: KeyboardShortcutProps) => {
	const { shortcutId } = props;

	if (!shortcutId) return null;

	const shortcutKeys = shortcuts[shortcutId];

	if (!shortcutKeys) return null;

	return (
		<div className='flex gap-1'>
			{shortcutKeys.map(key => (
				<Kbd key={key} {...kbdMapping(key)} />
			))}
		</div>
	);
};

export default KeyboardShortcut;
