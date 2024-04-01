import { MessageEvent, Tab } from '@dcp/shared';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { copyToClipboard, sendMessage } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const TabActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { url, id, pinned } = selectedItem._raw as Tab;

  const handleCloseTab = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.CloseTab, { id });
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

  const handleTogglePin = async () => {
    await sendMessage<boolean>(MessageEvent.TogglePinTab, { id });
    useSearchStore.setState((prev) => ({
      result: prev.result.map((item) =>
        selectedItem.id !== item.id ? item : { ...item, _raw: { ...item._raw, pinned: !pinned } }
      ),
      focusedIndex: 0,
      openAction: false
    }));
    useSearchStore.setState({ openAction: false });
    useNotificationStore.getState().setNotification({ message: pinned ? 'Unpinned' : 'Pinned', variant: 'success' });
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
