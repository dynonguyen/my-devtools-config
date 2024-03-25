import { detectDevicePlatform } from '@dcp/shared';
import { useMemo } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';
import { actionMenuMapping } from '~/utils/mapping';
import Kbd from '../Kbd';

export const Actions = () => {
  const category = useSearchStore(
    ({ focusedIndex, result }) => (focusedIndex !== -1 ? result[focusedIndex] : null)?.category
  );

  const platform = useMemo(() => detectDevicePlatform(), []);
  const ActionMenu = useMemo(() => (category ? actionMenuMapping(category) : null), [category]);

  const disabled = Boolean(ActionMenu);

  return (
    <div class="relative flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20)">
      <span class="text-grey-700 dark:text-grey-500 text-xs font-500">Actions</span>
      <div class="flex gap-1">
        <Kbd icon={platform === 'mac' ? 'i-ph:command' : 'i-ph:control'} />
        <Kbd text="K" />
      </div>

      <div className="absolute right-0 bottom-[calc(100%+16px)] w-80 max-h-50 bg-base-300 border border-solid border-divider rounded-3 overflow-auto">
        {ActionMenu}
      </div>
    </div>
  );
};

export default Actions;
