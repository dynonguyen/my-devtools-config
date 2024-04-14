import { UserOptions, setUserOptions } from '@dcp/shared';
import { Flex } from '@fpt-cads/ui-core';
import { Switch } from '@mui/material';
import { useUserOptionStore } from '~/store/user-options';
import Setting, { SettingProps } from './Setting';

type ToggleSettingProps = Omit<SettingProps, 'value'> & {
  settingKey: keyof UserOptions;
  onToggle?: (enabled: boolean) => void;
  value?: SettingProps['value'];
};

export const ToggleSetting = (props: ToggleSettingProps) => {
  const { settingKey, onToggle, value, ...others } = props;
  const enabled = useUserOptionStore((state) => state[settingKey]) as boolean;

  return (
    <Setting
      {...others}
      value={
        <Flex spacing={4}>
          <Switch
            checked={enabled}
            onChange={(ev) => {
              const checked = ev.target.checked;
              setUserOptions({ [settingKey]: checked });
              onToggle?.(checked);
            }}
          />
          {value}
        </Flex>
      }
    />
  );
};

export default ToggleSetting;
