import { getAssets, pick } from '@dcp/shared';
import clsx from 'clsx';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';

export const LogoAndNotification = () => {
  const searching = useSearchStore((state) => state.searching);
  const notification = useNotificationStore((state) => pick(state, ['message', 'icon']));

  console.log(notification);

  return (
    <div class="flex items-center gap-2">
      <img src={getAssets('logo.svg')} class={clsx('w-6 shrink-0', searching && 'animate-spin')} />
      {notification.message ? (
        <div class="flex items-center gap-2">
          <span class="text-grey-700 dark:text-grey-500 text-3.25">{notification.message}</span>
          {notification.icon && <div class="size-4 shrink-0 [&>span]:size-full flex-center">{notification.icon}</div>}
        </div>
      ) : (
        <p class="text-grey-700 dark:text-grey-500 text-3.25">{searching ? 'Searching...' : 'Hi friend!'}</p>
      )}
    </div>
  );
};

export default LogoAndNotification;
