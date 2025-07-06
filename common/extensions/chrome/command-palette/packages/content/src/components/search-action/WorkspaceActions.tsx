import { MessageEvent, Workspace } from '@dcp/shared';
import { useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, updateSearchItem, useSearchStore } from '~/stores/search';
import { sendMessage } from '~/utils/helper';
import Dialog from '../Dialog';
import ActionMenu, { ActionMenuItem } from './ActionMenu';
import { useActionDialog } from './Actions';
import WorkspaceForm, { WORKSPACE_FORM_ID } from './WorkspaceForm';

export const WorkspaceActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const item = selectedItem._raw as Workspace;

  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteWorkspace, item.id);

    if (isSuccess) {
      deleteSearchItem(selectedItem.id, true);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleToggleEditDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenEdit(open);
    if (!open) useSearchStore.setState({ openAction: false });
  };

  const handleEditWorkspace = async (form: Workspace) => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.UpdateWorkspace, form);
    if (isSuccess) {
      updateSearchItem(selectedItem.id, (item) => ({
        ...item,
        label: form.name,
        _raw: { ...item._raw, ...form }
      }));

      pushNotification({ message: 'Updated', variant: 'success' });
      handleToggleEditDialog(false);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const actionItems: ActionMenuItem[] = [
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
        title="Edit Workspace"
        width={520}
        onClose={() => handleToggleEditDialog(false)}
        body={<WorkspaceForm initValues={item} onSubmit={handleEditWorkspace} />}
        actions={
          <div class="flex items-center justify-end gap-2">
            <button class="btn btn-grey-500" onClick={() => handleToggleEditDialog(false)}>
              Close
            </button>
            <button type="submit" form={WORKSPACE_FORM_ID} class="btn btn-primary">
              Save
            </button>
          </div>
        }
      />
    </>
  );
};

export default WorkspaceActions;
