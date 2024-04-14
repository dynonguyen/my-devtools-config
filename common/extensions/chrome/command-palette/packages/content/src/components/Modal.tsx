import { ComponentChild } from 'preact';
import { createPortal } from 'preact/compat';
import { useId, useRef } from 'preact/hooks';
import { INPUT_Z_INDEX } from '~/constants/common';
import ClickAwayListener from './listener/ClickAwayListener';
import KeypressListener from './listener/KeypressListener';

export type ModalProps = {
  open?: boolean;
  children?: ComponentChild;
  width?: number;
  onClose?: () => void;
};

export const Modal = (props: ModalProps) => {
  const { open, children, width = 480, onClose } = props;
  const id = 'dcp-modal' + useId();
  const rootElement = useRef(document.getElementById('_dcp_root_')!);

  if (!open) return null;

  return createPortal(
    <>
      <div class="relative z-10" role="dialog" style={{ zIndex: INPUT_Z_INDEX + 9 }}>
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div class="fixed inset-0 w-screen overflow-y-auto" style={{ zIndex: INPUT_Z_INDEX + 10 }}>
          <div
            id={id}
            class="flex justify-center relative top-88.5 -translate-y-1/2 mx-auto max-w-9/10"
            style={{ width }}
          >
            {children}
          </div>
        </div>
      </div>

      <ClickAwayListener enabled={open} selector={`#${id}`} onOutsideClick={onClose} />
      <KeypressListener enabled={open} keyName="Escape" onKeyPress={onClose} />
    </>,
    rootElement.current!
  );
};

export default Modal;
