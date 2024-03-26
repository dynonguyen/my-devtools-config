import { detectDevicePlatform, pick } from '@dcp/shared';
import { useEffect, useMemo } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';
import { actionMenuMapping } from '~/utils/mapping';
import Kbd from '../Kbd';

export const Actions = () => {
  const category = useSearchStore(
    ({ focusedIndex, result }) => (focusedIndex !== -1 ? result[focusedIndex] : null)?.category
  );
  const { set, openAction } = useSearchStore((state) => pick(state, ['openAction', 'set']));

  const platform = useMemo(() => detectDevicePlatform(), []);
  const ActionMenu = useMemo(() => (category ? actionMenuMapping(category) : null), [category]);

  const disabled = !ActionMenu;

  const handleClick = () => {
    if (disabled) return;
    set({ openAction: !openAction });
  };

  useEffect(() => {
    if (disabled || openAction) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'k' && ev.ctrlKey) {
        ev.preventDefault();
        set({ openAction: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabled, openAction]);

  return (
    <div
      class="relative flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20) data-[disabled]:(cursor-default opacity-30 !bg-transparent pointer-events-none)"
      {...(disabled && { 'data-disabled': true })}
      onClick={handleClick}
    >
      <span class="text-grey-700 dark:text-grey-500 text-xs font-500">Actions</span>
      <div class="flex gap-1">
        <Kbd icon={platform === 'mac' ? 'i-ph:command' : 'i-ph:control'} />
        <Kbd text="K" />
      </div>

      <div
        className="absolute right-0 bottom-[calc(100%+16px)] w-80 max-h-50 bg-base-300 border border-solid border-divider rounded-3 overflow-auto py-2 opacity-0 invisible transition-all"
        {...(openAction && { style: { opacity: 1, visibility: 'visible' } })}
      >
        {!disabled && <ActionMenu />}
      </div>
    </div>
  );
};

export default Actions;
