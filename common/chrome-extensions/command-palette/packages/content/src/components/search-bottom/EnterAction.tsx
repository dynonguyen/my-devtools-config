import { useSearchStore } from '~/stores/search';
import { enterActionMapping } from '~/utils/mapping';
import Kbd from '../Kbd';
import KeypressListener from '../listener/KeypressListener';

export const EnterAction = () => {
  const focusedItem = useSearchStore(({ focusedIndex, result }) => (focusedIndex !== -1 ? result[focusedIndex] : null));
  const openAction = useSearchStore((state) => state.openAction);

  const { label = 'Relax', actionFn, noAction } = enterActionMapping(focusedItem);
  const disabled = !Boolean(focusedItem) || noAction;

  return (
    <>
      <div
        class="flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20) data-[disabled]:(cursor-default opacity-30 !bg-transparent pointer-events-none)"
        {...(disabled && { 'data-disabled': true })}
        onClick={actionFn}
      >
        <span class="text-base-content text-xs font-500">{label}</span>
        <Kbd icon={disabled ? 'i-ph:coffee' : 'i-uil:enter'} />
      </div>

      <KeypressListener
        key={focusedItem?.id}
        enabled={!disabled && !openAction}
        keyName="Enter"
        onKeyPress={actionFn}
      />
    </>
  );
};

export default EnterAction;
