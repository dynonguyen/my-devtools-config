import { setUserOptions } from '@dcp/shared';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useUserOptionStore } from '~/store/user-options';
import Setting from './Setting';

export const MaxSearchItemSetting = () => {
  const limitItems = useUserOptionStore((state) => state.limitItems);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.target.value);
    if (value <= 0) return;
    setUserOptions({ limitItems: value });
  };

  return (
    <Setting
      label="Max search result limit"
      value={<TextField value={limitItems} onChange={handleChange} size="small" type="number" sx={{ width: 280 }} />}
    />
  );
};

export default MaxSearchItemSetting;
