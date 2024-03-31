import { detectDevicePlatform, pick } from '@dcp/shared';
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { createWithEqualityFn } from 'zustand/traditional';
import { useSearchStore } from '~/stores/search';
import { actionMenuMapping } from '~/utils/mapping';
import Kbd from '../Kbd';
import ClickAwayListener from '../listener/ClickAwayListener';
import FocusListListener from '../listener/FocusListListener';
import KeypressListener from '../listener/KeypressListener';

type ActionDialogStore = { openModal: boolean };

export const useActionDialog = createWithEqualityFn<ActionDialogStore>((_) => ({ openModal: false }));

export const Actions = () => {
  const category = useSearchStore(
    ({ focusedIndex, result }) => (focusedIndex !== -1 ? result[focusedIndex] : null)?.category
  );
  const { set, openAction } = useSearchStore((state) => pick(state, ['openAction', 'set']));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedElem = useRef<HTMLElement>(null);
  const openModal = useActionDialog((state) => state.openModal);

  const platform = useMemo(() => detectDevicePlatform(), []);
  const ActionMenu = useMemo(() => (category ? actionMenuMapping(category) : null), [category]);

  const noActionMenu = !ActionMenu;

  const handleClick = () => {
    if (noActionMenu) return;
    set({ openAction: !openAction });
  };

  useEffect(() => {
    if (wrapperRef.current) {
      if (openAction) {
        const firstChild = wrapperRef.current.children[0];
        // @ts-ignore
        selectedElem.current = firstChild;
        firstChild?.setAttribute('data-focused', 'true');
      } else {
        // @ts-ignore
        selectedElem.current = null;
        wrapperRef.current.querySelector('.dcp-action-item[data-focused="true"]')?.removeAttribute('data-focused');
        document.getElementById('dcp-search-input')?.focus();
      }
    }
  }, [openAction]);

  return (
    <>
      <div
        id="dcp-action-wrapper"
        class="relative flex gap-2 px-1.5 py-1 rounded-1 items-center cursor-pointer transition-colors hover:(bg-grey-400/60 dark:bg-grey-700/20) data-[disabled]:(cursor-default opacity-30 !bg-transparent pointer-events-none)"
        {...(noActionMenu && { 'data-disabled': true })}
        onClick={handleClick}
      >
        <span class="text-grey-700 dark:text-grey-500 text-xs font-500">Actions</span>
        <div class="flex gap-1">
          <Kbd icon={platform === 'mac' ? 'i-ph:command' : 'i-ph:control'} />
          <Kbd text="K" />
        </div>

        <div
          ref={wrapperRef}
          id="dcp-action-menu"
          className="absolute right-0 bottom-[calc(100%+16px)] w-80 max-h-50 bg-base-300 border border-solid border-divider rounded-2 overflow-auto py-2 hidden"
          {...(openAction && !noActionMenu && { style: { display: 'block' } })}
        >
          {openAction && !noActionMenu && <ActionMenu />}
        </div>
      </div>

      <ClickAwayListener
        selector="#dcp-action-wrapper"
        enabled={!noActionMenu && !openModal}
        onOutsideClick={() => {
          set({ openAction: false });
        }}
      />
      <KeypressListener
        key="Escape"
        enabled={openAction && !openModal}
        keyName="Escape"
        onKeyPress={() => {
          set({ openAction: false });
        }}
      />
      <KeypressListener
        key="ctrl-k"
        enabled={!noActionMenu && !openModal}
        compose={platform === 'mac' ? ['metaKey'] : ['ctrlKey']}
        keyName="k"
        onKeyPress={() => {
          set((prev) => ({ openAction: !prev.openAction }));
        }}
      />
      <KeypressListener
        keyName="Enter"
        enabled={openAction && !openModal}
        onKeyPress={() => {
          selectedElem.current?.click();
        }}
      />
      <FocusListListener
        selector="#_dcp_root_ .dcp-action-item"
        enabled={openAction && !openModal}
        top={320}
        bottom={520}
        onMove={(_, item) => {
          // @ts-ignore
          selectedElem.current = item;
        }}
      />
    </>
  );
};

export default Actions;
