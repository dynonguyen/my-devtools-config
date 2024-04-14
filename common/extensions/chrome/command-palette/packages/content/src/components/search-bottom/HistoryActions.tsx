import { History, MessageEvent } from '@dcp/shared';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const HistoryActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { url } = selectedItem._raw as History;

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteHistory, { url });
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

  const handleCopyURL = () => {
    copyToClipboard(url!);
    useSearchStore.setState({ openAction: false });
    useNotificationStore.getState().setNotification({ message: 'Copied to clipboard', variant: 'success' });
  };

  const actionItems: ActionMenuItem[] = [
    { icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL },
    { icon: <span class="i-ph:trash-simple" />, label: 'Delete', isDanger: true, actionFn: handleDelete }
  ];

  return <ActionMenu items={actionItems} />;
};

export default HistoryActions;
