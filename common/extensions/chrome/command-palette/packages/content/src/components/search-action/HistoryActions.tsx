import { History, MessageEvent } from '@dcp/shared';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const HistoryActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { url } = selectedItem._raw as History;

  const handleDelete = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.DeleteHistory, { url });
    if (isSuccess) {
      deleteSearchItem(selectedItem.id, true);
    } else {
      pushNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleCopyURL = () => {
    copyToClipboard(url!);
    useSearchStore.setState({ openAction: false });
    pushNotification({ message: 'Copied to clipboard', variant: 'success' });
  };

  const actionItems: ActionMenuItem[] = [
    { icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL },
    { icon: <span class="i-ph:trash-simple" />, label: 'Delete', isDanger: true, actionFn: handleDelete }
  ];

  return <ActionMenu items={actionItems} />;
};

export default HistoryActions;
