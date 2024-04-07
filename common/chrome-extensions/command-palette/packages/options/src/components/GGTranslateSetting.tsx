import { debounce, getAssets, setUserOptions } from '@dcp/shared';
import { Flex } from '@fpt-cads/ui-core';
import { Switch, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useUserOptionStore } from '~/store/user-options';
import Setting from './Setting';

export const GGTranslateSetting = () => {
  const translate = useUserOptionStore((state) => state.translate);
  const { enabled, sl, tl } = translate;

  const handleChange = debounce((ev: ChangeEvent<HTMLInputElement>) => {
    setUserOptions({ translate: { ...translate, [ev.target.name]: ev.target.value } });
  }, 350);

  return (
    <Setting
      label="Google Translate"
      logo={{ img: getAssets('gg-translate.ico') }}
      value={
        <Flex spacing={4}>
          <Switch
            checked={enabled}
            onChange={(ev) => setUserOptions({ translate: { ...translate, enabled: ev.target.checked } })}
          />

          {enabled && (
            <Flex spacing={2}>
              <TextField
                size="small"
                name="sl"
                defaultValue={sl}
                onChange={handleChange}
                placeholder="Source"
                sx={{ width: 160 }}
              />
              <TextField
                size="small"
                name="tl"
                defaultValue={tl}
                onChange={handleChange}
                placeholder="Translate"
                sx={{ width: 160 }}
              />
            </Flex>
          )}
        </Flex>
      }
    />
  );
};

export default GGTranslateSetting;
