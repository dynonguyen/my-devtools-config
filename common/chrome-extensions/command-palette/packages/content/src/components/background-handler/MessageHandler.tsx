import { Message, MessageEvent } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';

export const MessageHandler = () => {
  const setOpen = useSearchStore((state) => state.setOpen);

  useEffect(() => {
    const handleMessage = (message: Message, _: any, sendResponse: (response?: any) => void) => {
      if (message.event === MessageEvent.OpenPalette) {
        setOpen('toggle');
      }
      sendResponse(true);
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return null;
};

export default MessageHandler;
