import { DEFAULT_USER_OPTIONS, UserOptions, getUserOptions, userOptionsChangeListener } from '@dcp/shared';

export let userOptions: UserOptions = DEFAULT_USER_OPTIONS;

(async function init() {
  userOptions = await getUserOptions();

  userOptionsChangeListener(() => {
    getUserOptions().then((opts) => (userOptions = opts));
  });
})();
