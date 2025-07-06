import { SearchCategory, debounce, getAliasFromCategory, setUserOptions } from '@dcp/shared';
import { Flex, Icon } from '@fpt-cads/ui-core';
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useUserOptionStore } from '~/store/user-options';

type AliasItem = { category: SearchCategory; name: string; icon?: string; color?: string };

export const AliasesSetting = () => {
  const userAliases = React.useMemo(() => useUserOptionStore.getState().aliases, []);
  const { palette } = useTheme();
  const color = (light: string, dark: string) => (palette.mode === 'dark' ? dark : light);

  const aliases: Array<AliasItem> = [
    {
      category: SearchCategory.Bookmark,
      name: 'Bookmark',
      icon: 'ph:bookmark-simple-fill',
      color: color('#3b82f6', '#4c8bf0')
    },
    {
      category: SearchCategory.InternetQuery,
      name: 'Query',
      icon: 'ph:globe-simple-fill',
      color: color('#eab308', '#d7b13c')
    },
    {
      category: SearchCategory.Navigation,
      name: 'Navigation',
      icon: 'majesticons:open',
      color: 'info.main'
    },
    {
      category: SearchCategory.Command,
      name: 'Command',
      icon: 'heroicons:command-line-16-solid',
      color: color('#06b6d4', '#23b4ce')
    },
    {
      category: SearchCategory.History,
      name: 'History',
      icon: 'ic:baseline-history',
      color: 'success.main'
    },
    {
      category: SearchCategory.Tab,
      name: 'Tab',
      icon: 'material-symbols:tab',
      color: color('#f97316', '#ea7f32')
    },
    {
      category: SearchCategory.Extension,
      name: 'Extension',
      icon: 'material-symbols:extension',
      color: color('#ec4899', '#ea55a0')
    },
    {
      category: SearchCategory.Cookie,
      name: 'Cookie',
      icon: 'ph:cookie',
      color: color('#6b7280', '#9ca3af')
    },
    {
      category: SearchCategory.LocalStorage,
      name: 'LocalStorage',
      icon: 'material-symbols:storage-rounded',
      color: color('#4FC6E0', '#68dae5')
    },
    {
      category: SearchCategory.Workspace,
      name: 'Workspace',
      icon: 'carbon:workspace',
      color: color('#f43f5e', '#f44f6b')
    }
  ];

  const handleAliasChange = debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    const category = ev.target.name as SearchCategory;
    const alias = ev.target.value.trim();

    const aliases = useUserOptionStore.getState().aliases || {};
    Object.entries(aliases).forEach(([key, value]) => {
      if (value === category) delete aliases[key];
    });
    setUserOptions({ aliases: { ...aliases, [alias]: category } });
  }, 350);

  return (
    <Stack spacing={4}>
      <Typography variant="displayXsSemiBold" color="primary.main">
        Aliases Setting
      </Typography>

      <Box
        sx={(theme) => ({
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
          border: `solid 1px ${theme.palette.divider}`
        })}
      >
        <Flex spacing={2} p={4} justifyContent="space-between">
          <Typography variant="textSmSemiBold">Name</Typography>
          <Typography flexShrink={0} width={180} variant="textSmSemiBold">
            Alias
          </Typography>
        </Flex>

        {aliases.map((item) => {
          const { category, name, icon, color = 'text.primary' } = item;
          return (
            <Flex spacing={2} p={4} borderTop="solid 1px" borderColor="divider" justifyContent="space-between">
              <Flex spacing={2}>
                {icon && <Icon icon={icon} color={color} />}
                <Typography variant="textSmSemiBold">{name}</Typography>
              </Flex>

              <TextField
                defaultValue={getAliasFromCategory(userAliases, category) || ''}
                size="small"
                sx={{ width: 180, flexShrink: 0 }}
                name={category}
                onChange={handleAliasChange}
                placeholder="Enter alias"
              />
            </Flex>
          );
        })}
      </Box>
    </Stack>
  );
};

export default AliasesSetting;
