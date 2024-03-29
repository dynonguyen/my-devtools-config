import { useUserOptionStore } from '~/stores/user-options';
import { kbdMapping } from '~/utils/mapping';
import Kbd from '../Kbd';

type KeyboardShortcutProps = {
  shortcutId?: string;
};

export const KeyboardShortcut = (props: KeyboardShortcutProps) => {
  const { shortcutId } = props;
  const shortcuts = useUserOptionStore((state) => state.shortcuts);

  if (!shortcutId) return null;

  const shortcutKeys = shortcuts[shortcutId];

  if (!shortcutKeys) return null;

  return (
    <div class="flex gap-1">
      {shortcutKeys.map((key) => (
        <Kbd key={key} {...kbdMapping(key)} />
      ))}
    </div>
  );
};

export default KeyboardShortcut;
