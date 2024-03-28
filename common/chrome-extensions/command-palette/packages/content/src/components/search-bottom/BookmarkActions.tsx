import { Bookmark, MessageEvent } from '@dcp/shared';
import { useState } from 'preact/hooks';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import Dialog from '../Dialog';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const BookmarkActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { isFolder, url, id, title } = selectedItem._raw as Bookmark;
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCopyURL = () => {
    copyToClipboard(url!);
    useNotificationStore.getState().setNotification({ message: 'Copied to clipboard', variant: 'success' });
  };

  const handleConfirmDelete = () => {
    setOpenConfirm(true);
  };

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteBookmark, { id, isFolder });
    if (isSuccess) {
      useSearchStore.setState((prev) => ({ result: prev.result.filter((item) => selectedItem.id !== item.id) }));
      useNotificationStore.getState().setNotification({ message: 'Deleted', variant: 'success' });
    } else {
      useNotificationStore.getState().setNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const items: ActionMenuItem[] = [
    { icon: <span class="i-ph:pencil-simple" />, label: 'Rename' },

    ...(!isFolder ? [{ icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL }] : []),

    {
      icon: <span class="i-ph:trash-simple" />,
      label: 'Delete',
      isDanger: true,
      actionFn: isFolder ? handleConfirmDelete : handleDelete
    }
  ];

  return (
    <>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Delete folder"
        body={
          <>
            Are you sure you want to delete <b class="text-secondary">"{title}"</b>? All of your bookmarks in this
            folder will be permanently removed. This action cannot be undone.
          </>
        }
        actions={
          <div class="flex items-center justify-end gap-2">
            <button
              className="btn btn-grey-500"
              onClick={(ev) => {
                ev.preventDefault();
                setOpenConfirm(false);
              }}
            >
              Close
            </button>
            <button
              className="btn btn-error"
              autoFocus
              onClick={(ev) => {
                ev.preventDefault();
                setOpenConfirm(false);
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        }
      />
      <ActionMenu items={items} />
    </>
  );
};

export default BookmarkActions;
