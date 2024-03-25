import { getAssets } from '@dcp/shared';
import { clsx } from 'clsx';
import { useSearchStore } from '~/stores/search';
import Actions from './Actions';
import EnterAction from './EnterAction';

const Logo = () => {
  const searching = useSearchStore((state) => state.searching);

  return (
    <div class="flex items-center gap-2">
      <img src={getAssets('logo.svg')} class={clsx('w-6 shrink-0', searching && 'animate-spin')} />
      <p class="text-grey-700 dark:text-grey-500 text-3.25">{searching ? 'Searching...' : 'Hi friend!'}</p>
    </div>
  );
};

export const SearchBottom = () => {
  return (
    <div class="px-3 py-2 flex justify-between bg-base-300/50 h-13">
      <Logo />

      <div class="flex items-center gap-1.5">
        <EnterAction />
        <div class="w-0.25 h-3 bg-divider"></div>
        <Actions />
      </div>
    </div>
  );
};

export default SearchBottom;
