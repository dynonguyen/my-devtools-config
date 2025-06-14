import { LocalStorageItem } from '@dcp/shared';
import { useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, updateSearchItem, useSearchStore } from '~/stores/search';
import { getLocalStorageSearchItem } from '~/utils/convert';
import { copyToClipboard } from '~/utils/helper';
import Dialog from '../Dialog';
import ActionMenu, { ActionMenuItem } from './ActionMenu';
import { useActionDialog } from './Actions';
import LocalStorageForm, { LS_FORM_ID, LSFormProps } from './LocalStorageForm';

export const LocalStorageActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const [openEdit, setOpenEdit] = useState(false);

  const item = selectedItem._raw as LocalStorageItem;
  const { key, value } = item;

  const handleDelete = async () => {
    localStorage.removeItem(key);
    deleteSearchItem(selectedItem.id, true);
  };

  const handleCopyCookie = () => {
    const text = JSON.stringify({ [key]: value });

    void copyToClipboard(text);
    pushNotification({ message: 'Copied to clipboard', variant: 'success' });
    useSearchStore.setState({ openAction: false });
  };

  const handleToggleEditDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenEdit(open);
    if (!open) useSearchStore.setState({ openAction: false });
  };

  const actionItems: ActionMenuItem[] = [
    {
      label: 'Copy Key-Value',
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

  const handleSubmit: LSFormProps['onSubmit'] = async (form) => {
    localStorage.setItem(form.key, form.value);

    updateSearchItem(selectedItem.id, (item) => ({
      ...item,
      ...getLocalStorageSearchItem(form as LocalStorageItem)
    }));

    pushNotification({ message: 'Updated', variant: 'success' });
    handleToggleEditDialog(false);
  };

  return (
    <>
      <ActionMenu items={actionItems} />

      <Dialog
        open={openEdit}
        title="Edit LocalStorage Item"
        width={520}
        onClose={() => handleToggleEditDialog(false)}
        body={<LocalStorageForm initValues={item} onSubmit={handleSubmit} />}
        actions={
          <div class="flex items-center justify-end gap-2">
            <button class="btn btn-grey-500" onClick={() => handleToggleEditDialog(false)}>
              Close
            </button>
            <button type="submit" form={LS_FORM_ID} class="btn btn-primary">
              Save
            </button>
          </div>
        }
      />
    </>
  );
};

export default LocalStorageActions;
