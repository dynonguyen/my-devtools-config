import { Extension, MessageEvent } from '@dcp/shared';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';
import { sendMessage } from '~/utils/helper';
import ActionMenu, { ActionMenuItem } from './ActionMenu';

export const ExtensionActions = () => {
  const selectedItem = useSearchStore((state) => state.result[state.focusedIndex]);
  const { id, enabled, optionsUrl } = selectedItem._raw as Extension;

  const handleToggleExtension = async () => {
    const isSuccess = await sendMessage<boolean>(MessageEvent.ToggleExtension, { id, enabled: !enabled });
    if (isSuccess) {
      useSearchStore.setState((prev) => ({
        result: prev.result.map((item) =>
          selectedItem.id !== item.id ? item : { ...item, _raw: { ...item._raw, enabled: !enabled } }
        ),
        openAction: false
      }));

      useNotificationStore
        .getState()
        .setNotification({ message: enabled ? 'Disabled' : 'Enabled', variant: 'success' });
    } else {
      useNotificationStore.getState().setNotification({ message: 'Failed', variant: 'error' });
    }
  };

  const handleOpenPage = async (url: string) => {
    await sendMessage(MessageEvent.OpenLocalResource, { url });
    useSearchStore.getState().setOpen(false);
  };

  const actionItems: ActionMenuItem[] = [
    {
      label: enabled ? 'Disable' : 'Enable',
      icon: <span class={enabled ? 'i-ph:toggle-left-fill' : 'i-ph:toggle-right-fill'} />,
      actionFn: handleToggleExtension
    },
    {
      label: 'Details',
      icon: <span class="i-ic:round-info" />,
      actionFn: () => handleOpenPage(`chrome://extensions/?id=${id}`)
    },
    ...(optionsUrl
      ? [
          {
            label: 'Options',
            icon: <span class="i-ph:gear-fill" />,
            actionFn: () => handleOpenPage(optionsUrl)
          }
        ]
      : [])
  ];

  return <ActionMenu items={actionItems} />;
};

export default ExtensionActions;
