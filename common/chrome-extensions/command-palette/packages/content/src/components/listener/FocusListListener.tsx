import { useEffect } from 'preact/hooks';

type FocusListListenerProps = {
  enabled?: boolean;
  selector: string;
  top: number;
  bottom: number;
  onMove?: (data?: any, elem?: HTMLElement) => void;
};

export const FocusListListener = (props: FocusListListenerProps) => {
  const { enabled = false, selector, top, bottom, onMove } = props;

  useEffect(() => {
    if (!enabled) return;

    const handleFocusSearchItem = (up?: boolean) => {
      const items = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      const len = items.length;

      if (!len) return;

      let focusedIndex = 0;
      for (let i = 0; i < len; ++i) {
        if (items[i].hasAttribute('data-focused')) {
          focusedIndex = i;
          items[i].removeAttribute('data-focused');
          break;
        }
      }

      if (up) {
        if (focusedIndex > 0) focusedIndex--;
        else focusedIndex = len - 1;
      } else {
        if (focusedIndex < len - 1) focusedIndex++;
        else focusedIndex = 0;
      }

      const focusedItem = items[focusedIndex]!;
      focusedItem.setAttribute('data-focused', 'true');

      const focusedRect = focusedItem.getBoundingClientRect();
      if (focusedRect.top < top || focusedRect.bottom > bottom) {
        focusedItem.scrollIntoView({ behavior: 'instant', block: 'end', inline: 'nearest' });
      }

      onMove?.({ focusedIndex }, focusedItem);
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      const key = ev.key;

      switch (key) {
        case 'ArrowDown':
          handleFocusSearchItem(false);
          ev.preventDefault();
          break;
        case 'ArrowUp':
          handleFocusSearchItem(true);
          ev.preventDefault();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, selector, top, bottom]);

  return null;
};

export default FocusListListener;
