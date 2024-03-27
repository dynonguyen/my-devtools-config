import { pick } from '@dcp/shared';
import { useSearchStore } from '~/stores/search';
import FocusListListener from '../listener/FocusListListener';

export const SearchResultFocusHandler = () => {
  const { open, openAction } = useSearchStore((state) => pick(state, ['open', 'openAction']));

  const handleMove = (data: { focusedIndex: number }) => {
    useSearchStore.setState({ focusedIndex: data.focusedIndex });
  };

  return (
    <FocusListListener
      selector="#_dcp_root_ .dcp-search-item"
      top={190}
      bottom={520}
      enabled={open && !openAction}
      onMove={handleMove}
    />
  );
};

export default SearchResultFocusHandler;
