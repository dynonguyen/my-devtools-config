import { useEffect } from 'preact/hooks';

type UseFocusListOptions = {
  enabled?: boolean;
  selector: string;
  top: number;
  bottom: number;
  onMove?: (data?: any) => void;
};

export const useFocusList = (opts: UseFocusListOptions) => {
  const { enabled = false, selector, top, bottom, onMove } = opts;

  useEffect(() => {
    if (!enabled) return;

    const handleFocusSearchItem = (up?: boolean) => {
      const items = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      const len = items.length;

      if (!len) return;

      let focusedIndex = -1;
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

      onMove?.({ focusedIndex });
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
  }, [enabled]);

  return null;
};

export default useFocusList;
