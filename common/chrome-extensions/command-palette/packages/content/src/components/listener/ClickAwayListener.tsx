import { useEffect } from 'preact/hooks';

type ClickAwayListenerProps = {
  selector: string;
  enabled?: boolean;
  onOutsideClick?: () => void;
};

export const ClickAwayListener = (props: ClickAwayListenerProps) => {
  const { enabled, selector, onOutsideClick } = props;

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const element = document.querySelector(selector);

    if (!root || !element) return;

    const handleClick = (ev: MouseEvent) => {
      if (!element?.contains(ev.target as Element)) {
        onOutsideClick?.();
      }
    };

    root.addEventListener('click', handleClick);

    return () => root.removeEventListener('click', handleClick);
  }, [enabled, selector]);

  return null;
};

export default ClickAwayListener;
