import { debounce, setUserOptions } from '@dcp/shared';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useUserOptionStore } from '~/store/user-options';
import Setting from './Setting';

export const AutoRedirectSetting = () => {
  const newTabRedirectUri = useUserOptionStore((state) => state.newTabRedirectUri);

  const handleChange = debounce((ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.trim();
    setUserOptions({ newTabRedirectUri: value });
  }, 350);

  return (
    <Setting
      label="New tab redirect"
      logo={{ icon: 'fluent:open-16-filled' }}
      value={
        <TextField
          defaultValue={newTabRedirectUri}
          onChange={handleChange}
          size="small"
          placeholder="https://google.com"
          fullWidth
        />
      }
    />
  );
};

export default AutoRedirectSetting;
