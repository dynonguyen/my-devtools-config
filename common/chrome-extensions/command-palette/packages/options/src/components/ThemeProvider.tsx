// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { GlobalConfigure, theme as coreTheme } from '@fpt-cads/ui-core';
import { GlobalStyles, ThemeProvider as MuiThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { useUserOptionStore } from '~/store/user-options';

const globalStyles: React.ComponentProps<typeof GlobalStyles>['styles'] = (theme) => ({
  '#dcp_opt_root': {
    '& .MuiInputBase-root *': { color: theme.palette.text.primary },
    '& .cads-radio--bg': { fill: theme.palette.background.paper },
    '& .MuiRadio-root.Mui-checked .cads-radio--bg': { fill: theme.palette.primary.main },
    '& .MuiFormControlLabel-labelPlacementEnd .MuiFormControlLabel-label': { marginLeft: 4 }
  }
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useUserOptionStore((state) => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDarkMode = mode === 'dark' || (mode === 'system' && prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        ...coreTheme,
        typography: {
          ...coreTheme.typography,
          fontFamily: '"Inter", sans-serif'
        },
        boxShadows: {
          ...coreTheme.boxShadows,
          ...(isDarkMode
            ? {
                focused: '0px 0px 0px 4px rgba(250, 107, 154, 0.30)',
                error: '0px 0px 0px 4px rgba(224, 95, 101, 0.24)'
              }
            : {
                focused: '0px 0px 0px 4px rgba(244, 83, 138, 0.30)',
                error: '0px 0px 0px 4px rgba(255, 89, 98, 0.24)'
              })
        },
        palette: isDarkMode
          ? {
              ...coreTheme.palette,
              background: { default: '#1d232a', paper: '#191e24' },
              primary: { main: '#fa6b9a' },
              secondary: { main: '#68dae5' },
              success: { main: '#30d3b0' },
              error: { main: '#e05f65' },
              warning: { main: '#f79a57' },
              info: { main: '#00b5ff' },
              divider: '#333942',
              text: { primary: '#f9fafb', secondary: '#9c9c9c' }
            }
          : {
              ...coreTheme.palette,
              background: { default: '#fefefe', paper: '#f0f0f0' },
              primary: { main: '#f4538a' },
              secondary: { main: '#59d5e0' },
              success: { main: '#39e58c' },
              error: { main: '#ff5962' },
              warning: { main: '#ff8e3b' },
              info: { main: '#0091ff' },
              divider: '#d7d7d7',
              text: { primary: '#1c1c1c', secondary: '#9c9c9c' }
            }
      }),
    [isDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalConfigure />
      <GlobalStyles styles={globalStyles} />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
