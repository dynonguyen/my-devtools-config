import { getAssets } from '@dcp/shared';
import { Divider, Stack } from '@mui/material';
import AliasesSetting from './components/AliasesSetting';
import AppLogo from './components/AppLogo';
import GGTranslateSetting from './components/GGTranslateSetting';
import InitWrapper from './components/InitWrapper';
import MaxSearchItemSetting from './components/MaxItemSearchSetting';
import ThemeProvider from './components/ThemeProvider';
import ThemeSetting from './components/ThemeSetting';
import ToggleSetting from './components/ToggleSetting';

function App() {
  return (
    <ThemeProvider>
      <InitWrapper>
        <Stack spacing={4} mx="auto" maxWidth={1200} p={4}>
          <AppLogo />

          <Divider />

          <Stack spacing={6}>
            <ThemeSetting />
            <MaxSearchItemSetting />
            <ToggleSetting label="Google search" logo={{ img: getAssets('google.ico') }} settingKey="googleSearch" />
            <ToggleSetting label="Youtube search" logo={{ img: getAssets('youtube.png') }} settingKey="youtubeSearch" />
            <ToggleSetting label="Oxford search" logo={{ img: getAssets('oxford.ico') }} settingKey="oxfordSearch" />
            <ToggleSetting
              label="Cambridge search"
              logo={{ img: getAssets('cambridge.png') }}
              settingKey="cambridgeSearch"
            />
            <GGTranslateSetting />
            <AliasesSetting />
          </Stack>
        </Stack>
      </InitWrapper>
    </ThemeProvider>
  );
}

export default App;
