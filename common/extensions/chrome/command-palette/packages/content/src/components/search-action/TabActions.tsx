import { MessageEvent, Tab } from '@dcp/shared';
import { pushNotification } from '~/stores/notification';
import { deleteSearchItem, updateSearchItem, useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const TabActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { url, id, pinned } = selectedItem._raw as Tab;

  const handleCloseTab = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.CloseTab, { id });
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

  const handleTogglePin = async () => {
    await sendMessage<boolean>(MessageEvent.TogglePinTab, { id });

    updateSearchItem(selectedItem.id, (item) => ({ ...item, _raw: { ...item._raw, pinned: !pinned } }), true, {
      focusedIndex: 0
    });
    pushNotification({ message: pinned ? 'Unpinned' : 'Pinned', variant: 'success' });
  };

  const actionItems: ActionMenuItem[] = [
    { icon: <span class="i-ph:clipboard" />, label: 'Copy URL', actionFn: handleCopyURL },
    {
      icon: <span class={pinned ? 'i-ph:push-pin-simple-slash' : 'i-ph:push-pin-simple'} />,
      label: pinned ? 'Unpin' : 'Pin',
      actionFn: handleTogglePin
    },
    {
      icon: <span class="i-material-symbols:tab-close-outline" />,
      label: 'Close',
      isDanger: true,
      actionFn: handleCloseTab
    }
  ];

  return <ActionMenu items={actionItems} />;
};

export default TabActions;
