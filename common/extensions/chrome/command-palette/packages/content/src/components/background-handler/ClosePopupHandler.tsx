import { pick } from '@dcp/shared';
import { useSearchStore } from '~/stores/search';
import ClickAwayListener from '../listener/ClickAwayListener';
import KeypressListener from '../listener/KeypressListener';
import { useActionDialog } from '../search-action/Actions';

export const ClosePopupHandler = () => {
  const { open, openAction } = useSearchStore((state) => pick(state, ['open', 'openAction']));
  const openModal = useActionDialog((state) => state.openModal);
  const setOpen = useSearchStore((state) => state.setOpen);

  const enabled = open && !openAction && !openModal;

  return (
    <>
      <ClickAwayListener
        selector="#dcp-wrapper"
        enabled={enabled}
        onOutsideClick={() => {
          setOpen(false);
        }}
      />

      <KeypressListener
        keyName="Escape"
        enabled={enabled}
        onKeyPress={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default ClosePopupHandler;
