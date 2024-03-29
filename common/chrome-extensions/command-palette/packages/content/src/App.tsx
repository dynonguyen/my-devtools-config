import { getUserOptions, userOptionsChangeListener } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import ClosePopupHandler from './components/background-handler/ClosePopupHandler';
import MessageHandler from './components/background-handler/MessageHandler';
import SearchHandler from './components/background-handler/SearchHandler';
import SearchResultFocusHandler from './components/background-handler/SearchResultFocusHandler';
import SearchBottom from './components/search-bottom';
import SearchInput from './components/search-input';
import SearchResult from './components/search-result';
import { INPUT_Z_INDEX } from './constants/common';
import { useSearchStore } from './stores/search';
import { useUserOptionStore } from './stores/user-options';

export const App = () => {
  const init = useSearchStore((state) => state.init);

  useEffect(() => {
    const handleGetUserOptions = () => {
      getUserOptions().then((userOptions) => {
        const mode = userOptions.theme;
        const root = document.getElementById('_dcp_root_')!;

        const newThemMode =
          mode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
        root.classList.remove(newThemMode === 'dark' ? 'light' : 'dark');
        root.classList.add(newThemMode);

        useUserOptionStore.getState().setOptions(userOptions);
      });
    };

    handleGetUserOptions();

    return userOptionsChangeListener(handleGetUserOptions);
  }, []);

  return (
    <>
      {init && (
        <div class="fixed top-0 flex justify-center w-screen h-screen" style={{ zIndex: INPUT_Z_INDEX }}>
          {/* Overlay */}
          <div
            id="dcp-overlay"
            class='before:content-[""] before:bg-grey-900/50 before:w-full before:h-full before:absolute before:top-0 before:left-0'
            style={{ zIndex: INPUT_Z_INDEX - 1 }}
          />

          {/* Wrapper */}
          <div
            id="dcp-wrapper"
            class="mt-32 w-3xl h-max max-w-9/10 flex flex-col border border-solid border-divider overflow-hidden rounded-2xl bg-base-100"
            style={{
              zIndex: INPUT_Z_INDEX + 1,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
          >
            <SearchInput />
            <SearchResult />
            <SearchBottom />

            <SearchHandler />
            <ClosePopupHandler />
          </div>
        </div>
      )}

      <MessageHandler />
      <SearchResultFocusHandler />
    </>
  );
};

export default App;
