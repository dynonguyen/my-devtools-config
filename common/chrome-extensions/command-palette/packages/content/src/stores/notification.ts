import { ComponentChild } from 'preact';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';

let timeoutId: NodeJS.Timeout;

type NotificationState = {
  message: string;
  variant?: 'success' | 'warning' | 'error';
  icon?: ComponentChild;
};

type NotificationAction = {
  setNotification: (notification: NotificationState, timeout?: number) => void;
};

type NotificationStore = NotificationState & NotificationAction;

export const useNotificationStore = createWithEqualityFn<NotificationStore>(
  (set) => ({
    message: '',
    setNotification: (notification, timeout = 3000) => {
      set(notification);

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        set({ message: '', icon: undefined, variant: undefined });
      }, timeout);
    }
  }),
  isEqual
);
