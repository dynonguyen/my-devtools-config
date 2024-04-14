import {
  DEFAULT_USER_OPTIONS,
  Theme,
  UserOptions,
  getAssets,
  getUserOptions,
  hasSearchKeyword,
  userOptionsChangeListener
} from '@dcp/shared';

export let userOptions: UserOptions = DEFAULT_USER_OPTIONS;

export const searchThemeOptions = (keyword: string) => {
  const options: Theme[] = [
    {
      id: 'toggle-theme',
      title: `Theme: Switch To ${userOptions.theme === 'light' ? 'Dark' : 'Light'} Mode`,
      description: `Current mode: ${userOptions.theme}`,
      logoUri: getAssets('theme.svg')
    }
  ];

  return options.filter((item) => hasSearchKeyword(item.title.toLowerCase(), keyword));
};

(async function init() {
  userOptions = await getUserOptions();

  userOptionsChangeListener(() => {
    getUserOptions().then((opts) => (userOptions = opts));
  });
})();
