import { getAssets, pick } from '@dcp/shared';
import clsx from 'clsx';
import { useNotificationStore } from '~/stores/notification';
import { useSearchStore } from '~/stores/search';

export const LogoAndNotification = () => {
  const searching = useSearchStore((state) => state.searching);
  const notification = useNotificationStore((state) => pick(state, ['message', 'icon', 'variant']));

  return (
    <div class="flex items-center gap-2">
      <img
        src={getAssets('logo.svg')}
        class={clsx('w-6 shrink-0', searching && 'animate-spin', notification.message && 'animate-bounce')}
        style={{ animationDuration: '0.6s' }}
      />

      {notification.message ? (
        <div class="flex items-center gap-2">
          <span class="text-grey-700 dark:text-grey-500 text-3.25 line-clamp-1 break-all">{notification.message}</span>

          {(notification.icon || notification.variant) && (
            <div class="size-4 shrink-0 [&>span]:size-full flex-center">
              {notification.icon ? (
                notification.icon
              ) : (
                <>
                  {notification.variant === 'success' ? (
                    <span class="i-ph:check-circle-fill text-success"></span>
                  ) : notification.variant === 'warning' ? (
                    <span class="i-ph:warning-fill text-warning"></span>
                  ) : (
                    <span class="i-ph:x-circle-fill text-error"></span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <p class="text-grey-700 dark:text-grey-500 text-3.25">{searching ? 'Searching...' : 'Hi friend!'}</p>
      )}
    </div>
  );
};

export default LogoAndNotification;
