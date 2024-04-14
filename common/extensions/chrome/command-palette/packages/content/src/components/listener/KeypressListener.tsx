import { useEffect } from 'preact/hooks';

type KeypressListenerProps = {
  enabled?: boolean;
  keyName: string;
  compose?: Array<'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>;
  onKeyPress?: () => void;
  type?: 'keydown' | 'keyup';
};

export const KeypressListener = (props: KeypressListenerProps) => {
  const { enabled, keyName, compose, type = 'keydown', onKeyPress } = props;

  useEffect(() => {
    if (!enabled || !onKeyPress) return;

    const handleKeypress = (e: KeyboardEvent) => {
      if (e.key === keyName && (!compose?.length || compose.every((k) => e[k]))) {
        e.preventDefault();
        onKeyPress!();
      }
    };

    document.addEventListener(type, handleKeypress);
    return () => {
      document.removeEventListener(type, handleKeypress);
    };
  }, [enabled, keyName, compose?.join('')]);

  return null;
};

export default KeypressListener;
