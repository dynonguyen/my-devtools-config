import { ComponentChild } from 'preact';
import { useId } from 'preact/hooks';
import { INPUT_Z_INDEX } from '~/constants/common';
import ClickAwayListener from './listener/ClickAwayListener';

export type ModalProps = {
  open?: boolean;
  children?: ComponentChild;
  width?: number;
  onClose?: () => void;
};

export const Modal = (props: ModalProps) => {
  const { open, children, width = 480, onClose } = props;
  const id = 'dcp-modal' + useId();

  if (!open) return null;

  return (
    <>
      <div id={id} class="relative z-10" role="dialog">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div class="fixed inset-0 w-screen overflow-y-auto" style={{ zIndex: INPUT_Z_INDEX + 10 }}>
          <div class="flex justify-center mt-88.5 -top-1/2 mx-auto max-w-9/10" style={{ width }}>
            {children}
          </div>
        </div>
      </div>

      <ClickAwayListener enabled={open} selector={`#${id}`} onOutsideClick={onClose} />
    </>
  );
};

export default Modal;
