import { Bookmark } from '@dcp/shared';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { copyToClipboard } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const BookmarkActions = () => {
  const { isFolder, url } = useSearchStore((state) => state.result[state.focusedIndex])._raw as Bookmark;

  const handleCopyURL = () => {
    copyToClipboard(url!);
    useNotificationStore
      .getState()
      .setNotification({
        message: 'Copied to clipboard',
        icon: <span class="i-ph:check-circle-fill text-success"></span>
      });
  };

  const items: ActionMenuItem[] = [
    { icon: <span class="i-ph:pencil-simple" />, label: 'Rename' },

    ...(!isFolder ? [{ icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL }] : []),

    { icon: <span class="i-ph:trash-simple" />, label: 'Delete', isDanger: true },

    ...(isFolder ? [{ icon: <span class="i-ph:trash" />, label: 'Delete all entries in folder', isDanger: true }] : [])
  ];

  return <ActionMenu items={items} />;
};

export default BookmarkActions;
