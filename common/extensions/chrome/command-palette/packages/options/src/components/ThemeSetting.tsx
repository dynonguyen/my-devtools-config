import { AutocompleteOption, UserOptions, setUserOptions } from '@dcp/shared';
import { Flex } from '@fpt-cads/ui-core';
import { FormControlLabel, Radio } from '@mui/material';
import { useUserOptionStore } from '~/store/user-options';
import Setting from './Setting';

export const ThemeSetting = () => {
  const mode = useUserOptionStore((state) => state.theme);

  const options: AutocompleteOption[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
  ];

  const handleThemeChange = (theme: UserOptions['theme']) => {
    setUserOptions({ theme });
  };

  return (
    <Setting
      label="Theme"
      logo={{ icon: 'icon-park-solid:dark-mode' }}
      value={
        <Flex spacing={4}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              onClick={() => handleThemeChange(option.value)}
              control={<Radio value={option.value} checked={mode === option.value} />}
            />
          ))}
        </Flex>
      }
    />
  );
};

export default ThemeSetting;
