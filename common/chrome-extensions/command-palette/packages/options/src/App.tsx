import { NextUIProvider } from '@nextui-org/react';
import Logo from './components/Logo';
import SettingTable from './components/SettingTable';

function App() {
  return (
    <NextUIProvider className="max-w-5xl px-4 mx-auto">
      <Logo />
      <SettingTable />
    </NextUIProvider>
  );
}

export default App;
