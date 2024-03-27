import Actions from './Actions';
import EnterAction from './EnterAction';
import LogoAndNotification from './LogoAndNotification';

export const SearchBottom = () => {
  return (
    <div class="px-3 py-2 flex justify-between bg-base-300/50 h-13">
      <LogoAndNotification />

      <div class="flex items-center gap-1.5">
        <EnterAction />
        <div class="w-0.25 h-3 bg-divider"></div>
        <Actions />
      </div>
    </div>
  );
};

export default SearchBottom;
