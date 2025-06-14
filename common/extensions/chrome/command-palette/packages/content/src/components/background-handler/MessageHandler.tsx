import { Message, MessageEvent } from '@dcp/shared';
import { useEffect } from 'preact/hooks';
import { useSearchStore } from '~/stores/search';

export const MessageHandler = () => {
  const setOpen = useSearchStore((state) => state.setOpen);

  useEffect(() => {
    const handleBackgroundMessage = (message: Message, _: any, sendResponse: (response?: any) => void) => {
      switch (message.event) {
        case MessageEvent.OpenPalette:
          setOpen('toggle');
          sendResponse(true);
          break;
        default:
          sendResponse(true);
      }
    };

    chrome.runtime.onMessage.addListener(handleBackgroundMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleBackgroundMessage);
    };
  }, []);

  return null;
};

export default MessageHandler;
