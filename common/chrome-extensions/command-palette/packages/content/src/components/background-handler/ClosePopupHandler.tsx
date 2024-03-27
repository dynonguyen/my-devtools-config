import { pick } from '@dcp/shared';
import { useSearchStore } from '~/stores/search';
import ClickAwayListener from '../listener/ClickAwayListener';
import KeypressListener from '../listener/KeypressListener';

export const ClosePopupHandler = () => {
  const { open, openAction } = useSearchStore((state) => pick(state, ['open', 'openAction']));
  const setOpen = useSearchStore((state) => state.setOpen);

  const enabled = open && !openAction;

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
