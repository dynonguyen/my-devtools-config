import { Cookie, MessageEvent } from '@dcp/shared';
import { useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, updateSearchItem, useSearchStore } from '~/stores/search';
import { getCookieSearchItem } from '~/utils/convert';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import Dialog from '../Dialog';
import ActionMenu, { ActionMenuItem } from './ActionMenu';
import { useActionDialog } from './Actions';
import { COOKIE_FORM_ID, CookieForm, CookieFormProps } from './CookieForm';

export const CookieActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const [openEdit, setOpenEdit] = useState(false);

  const cookie = selectedItem._raw as Cookie;
  const { name, value } = cookie;

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean, Cookie>(MessageEvent.DeleteCookie, cookie);
    if (isSuccess) {
      deleteSearchItem(selectedItem.id, true);
    } else {
      pushNotification({ message: 'Failed to edit cookie', variant: 'error' });
    }
  };

  const handleCopyCookie = () => {
    const text = `${name}=${value}`;
    void copyToClipboard(text);
    pushNotification({ message: 'Copied to clipboard', variant: 'success' });
    useSearchStore.setState({ openAction: false });
  };

  const handleToggleEditDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenEdit(open);
  };

  const handleSubmit: CookieFormProps['onSubmit'] = async (form) => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.SetCookie, form);

    if (isSuccess) {
      updateSearchItem(selectedItem.id, (item) => ({
        ...item,
        ...getCookieSearchItem(form as Cookie)
      }));

      pushNotification({ message: 'Updated', variant: 'success' });
      handleToggleEditDialog(false);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const actionItems: ActionMenuItem[] = [
    {
      label: 'Copy cookie',
      icon: <span class="i-ph:copy" />,
      actionFn: handleCopyCookie
    },
    {
      label: 'Edit',
      icon: <span class="i-ph:pencil-simple" />,
      actionFn: () => handleToggleEditDialog(true)
    },
    {
      label: 'Delete',
      isDanger: true,
      icon: <span class="i-ph:trash-simple" />,
      actionFn: handleDelete
    }
  ];

  return (
    <>
      <ActionMenu items={actionItems} />

      <Dialog
        open={openEdit}
        title="Edit Cookie"
        width={520}
        onClose={() => handleToggleEditDialog(false)}
        body={<CookieForm initValues={cookie} onSubmit={handleSubmit} />}
        actions={
          <div class="flex items-center justify-end gap-2">
            <button class="btn btn-grey-500" onClick={() => handleToggleEditDialog(false)}>
              Close
            </button>
            <button type="submit" form={COOKIE_FORM_ID} class="btn btn-primary">
              Save
            </button>
          </div>
        }
      />
    </>
  );
};

export default CookieActions;
