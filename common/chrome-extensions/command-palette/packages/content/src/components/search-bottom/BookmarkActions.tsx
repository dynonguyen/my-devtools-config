import { Bookmark, MessageEvent, getFavicon } from '@dcp/shared';
import { useState } from 'preact/hooks';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import AutoFocus from '../AutoFocus';
import Dialog from '../Dialog';
import LabelValue, { LabelValueProps } from '../LabelValue';
import ActionMenu, { ActionMenuItem } from './ActionMenu';
import { useActionDialog } from './Actions';

export const BookmarkActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { isFolder, url, id, title, path, childIds } = selectedItem._raw as Bookmark;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const handleCopyURL = () => {
    copyToClipboard(url!);
    useNotificationStore.getState().setNotification({ message: 'Copied to clipboard', variant: 'success' });
  };

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteBookmark, { id, isFolder });
    if (isSuccess) {
      useSearchStore.setState((prev) => ({
        result: prev.result.filter((item) => selectedItem.id !== item.id),
        focusedIndex: 0,
        openAction: false
      }));
      useNotificationStore.getState().setNotification({ message: 'Deleted', variant: 'success' });
    } else {
      useNotificationStore.getState().setNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleOpenConfirmDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenConfirm(open);
  };

  const handleOpenDetailDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenDetail(open);
  };

  const items: ActionMenuItem[] = [
    {
      icon: <span class="i-majesticons:checkbox-list-detail" />,
      label: 'View details',
      actionFn: () => handleOpenDetailDialog(true)
    },
    { icon: <span class="i-ph:pencil-simple" />, label: 'Rename' },
    ...(!isFolder ? [{ icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL }] : []),
    {
      icon: <span class="i-ph:trash-simple" />,
      label: 'Delete',
      isDanger: true,
      actionFn: isFolder ? () => handleOpenConfirmDialog(true) : handleDelete
    }
  ];

  const details: LabelValueProps[] = openDetail
    ? [
        { label: 'Path', value: path },
        ...(!isFolder
          ? [
              {
                label: 'URL',
                value: (
                  <a target="_blank" href={url}>
                    {url}
                  </a>
                )
              }
            ]
          : []),
        ...(isFolder ? [{ label: 'Num of bookmarks', value: childIds?.length }] : [])
      ]
    : [];

  return (
    <>
      <ActionMenu items={items} />

      <Dialog
        open={openConfirm}
        onClose={() => handleOpenConfirmDialog(false)}
        title="Delete bookmark folder"
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
                handleOpenConfirmDialog(false);
              }}
            >
              Close
            </button>

            <AutoFocus>
              <button
                id="dcp-bookmark-delete-btn"
                className="btn btn-error"
                onClick={(ev) => {
                  ev.preventDefault();
                  handleOpenConfirmDialog(false);
                  handleDelete();
                }}
              >
                Delete
              </button>
            </AutoFocus>
          </div>
        }
      />

      <Dialog
        open={openDetail}
        onClose={() => handleOpenDetailDialog(false)}
        title={
          <div class="flex items-center gap-2">
            {url ? <img class="size-5" src={getFavicon(url, 24)} /> : <span class="i-quill:folder size-5" />}
            <span>{title}</span>
          </div>
        }
        body={
          <div class="flex flex-col gap-2">
            {details.map((detail) => (
              <LabelValue {...detail} labelWidth={isFolder ? 160 : 60} />
            ))}
          </div>
        }
        actions={
          <div class="flex justify-end">
            <AutoFocus>
              <button
                id="dcp-bookmark-close-detail-btn"
                className="btn btn-grey-500"
                onClick={() => {
                  handleOpenDetailDialog(false);
                }}
              >
                Close
              </button>
            </AutoFocus>
          </div>
        }
      />
    </>
  );
};

export default BookmarkActions;
