import { Bookmark, MessageEvent, getFavicon } from '@dcp/shared';
import { useRef, useState } from 'preact/hooks';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, updateSearchItem, useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import AutoFocus from '../AutoFocus';
import Dialog from '../Dialog';
import LabelValue, { LabelValueProps } from '../LabelValue';
import ActionMenu, { ActionMenuItem } from './ActionMenu';
import { useActionDialog } from './Actions';

type EditFormKey = 'title' | 'url';
type EditForm = Partial<Record<EditFormKey, HTMLInputElement | null>>;

export const BookmarkActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const bookmark = selectedItem._raw as Bookmark;
  const { isFolder, url, id, title, path, childIds } = bookmark;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const editFormRefs = useRef<EditForm>({});

  const handleCopyURL = () => {
    copyToClipboard(url!);
    pushNotification({ message: 'Copied to clipboard', variant: 'success' });
    useSearchStore.setState({ openAction: false });
  };

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteBookmark, { id, isFolder });
    if (isSuccess) {
      deleteSearchItem(selectedItem.id, true);
      handleOpenConfirmDialog(false);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleOpenConfirmDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenConfirm(open);
  };

  const handleToggleDetailDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenDetail(open);
  };

  const handleToggleEditDialog = (open: boolean) => {
    useActionDialog.setState({ openModal: open });
    setOpenEdit(open);
  };

  const handleSaveEdit = async () => {
    const { title, url } = editFormRefs.current;

    const updatedData = { title: title?.value || '', url: url?.value || '' };
    const isSuccess = await sendMessage<boolean>(MessageEvent.UpdateBookmark, { id, ...updatedData });

    if (isSuccess) {
      updateSearchItem(selectedItem.id, (item) => ({
        ...item,
        label: updatedData.title,
        description: isFolder ? item.description : updatedData.url,
        _raw: { ...item._raw, ...updatedData }
      }));

      pushNotification({ message: 'Updated', variant: 'success' });
      handleToggleEditDialog(false);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleInputRef = (field: EditFormKey) => (ref: HTMLInputElement | null) => {
    if (ref) {
      editFormRefs.current[field] = ref;
      ref.value = bookmark[field] || '';
    }
  };

  const actionItems: ActionMenuItem[] = [
    {
      icon: <span class="i-majesticons:checkbox-list-detail" />,
      label: 'View details',
      actionFn: () => handleToggleDetailDialog(true)
    },
    { icon: <span class="i-ph:pencil-simple" />, label: 'Edit', actionFn: () => handleToggleEditDialog(true) },
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
      <ActionMenu items={actionItems} />

      {/* Edit */}
      <Dialog
        open={openEdit}
        onClose={() => handleToggleEditDialog(false)}
        title="Edit bookmark"
        body={
          <form
            id="dcp-bookmark-edit-form"
            onSubmit={(ev) => {
              ev.preventDefault();
              handleSaveEdit();
            }}
          >
            <div class="flex flex-col gap-3">
              <AutoFocus>
                <input
                  id="dcp-bookmark-edit-title-input"
                  autoComplete="off"
                  ref={handleInputRef('title')}
                  class="input"
                  placeholder="Title"
                  required
                />
              </AutoFocus>
              {!isFolder && <input ref={handleInputRef('url')} class="input" placeholder="URL" required />}
            </div>
          </form>
        }
        actions={
          <div class="flex items-center justify-end gap-2">
            <button className="btn btn-grey-500" onClick={() => handleToggleEditDialog(false)}>
              Close
            </button>
            <button type="submit" form="dcp-bookmark-edit-form" className="btn btn-primary">
              Save
            </button>
          </div>
        }
      />

      {/* Delete folder */}
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
              onClick={() => {
                handleOpenConfirmDialog(false);
              }}
            >
              Close
            </button>

            <AutoFocus>
              <button id="dcp-bookmark-delete-btn" className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </AutoFocus>
          </div>
        }
      />

      {/* Detail */}
      <Dialog
        open={openDetail}
        onClose={() => handleToggleDetailDialog(false)}
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
                  handleToggleDetailDialog(false);
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
