import { getUserOptions, userOptionsChangeListener } from '@dcp/shared';
import React from 'react';
import { useUserOptionStore } from '../store/user-options';

export const InitWrapper = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    const handleGetUserOptions = () => {
      getUserOptions().then((userOptions) => {
        const mode = userOptions.theme;
        const root = document.getElementById('dcp_opt_root')!;

        const newThemMode =
          mode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
        root.classList.remove(newThemMode === 'dark' ? 'light' : 'dark');
        root.classList.add(newThemMode);

        useUserOptionStore.getState().setOptions(userOptions);
        setInit(true);
      });
    };

    handleGetUserOptions();

    return userOptionsChangeListener(handleGetUserOptions);
  }, []);

  return init ? children : null;
};

export default InitWrapper;
