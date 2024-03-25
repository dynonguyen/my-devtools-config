import { pick } from '@dcp/shared';
import useFocusList from '~/hooks/useFocusList';
import { useSearchStore } from '~/stores/search';

export const SearchResultFocusHandler = () => {
  const { open, openAction } = useSearchStore((state) => pick(state, ['open', 'openAction']));

  const handleMove = (data: { focusedIndex: number }) => {
    useSearchStore.setState({ focusedIndex: data.focusedIndex });
  };

  useFocusList({
    selector: '#_dcp_root_ .dcp-search-item',
    top: 150,
    bottom: 500,
    enabled: open && !openAction,
    onMove: handleMove
  });

  return null;
};

export default SearchResultFocusHandler;
