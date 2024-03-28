import clsx from 'clsx';
import { ComponentChild } from 'preact';
import Modal, { ModalProps } from './Modal';

export type DialogProps = Pick<ModalProps, 'onClose' | 'open' | 'width'> & {
  title?: ComponentChild;
  body?: ComponentChild;
  actions?: ComponentChild;
  slotProps?: { root?: { class?: string } };
};

export const Dialog = (props: DialogProps) => {
  const { open, width, title, body, actions, slotProps, onClose } = props;

  return (
    <Modal open={open} onClose={onClose} width={width}>
      <div class={clsx('bg-white dark:bg-base-100 p-4 rounded-lg flex flex-col gap-4 w-full', slotProps?.root?.class)}>
        {title && <div class="font-600 text-base text-base-content ">{title}</div>}
        {body && <div class="text-sm text-base-content/60">{body}</div>}
        {actions}
      </div>
    </Modal>
  );
};

export default Dialog;
