import { Message, MessageEvent } from '@dcp/shared';

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator.clipboard is available in secure contexts (HTTPS)
    navigator.clipboard.writeText(text);
    return true;
  } else {
    // Fallback for insecure contexts or older browsers
    let textArea = document.createElement('textarea');
    textArea.value = text;

    // Prevent scrolling to bottom
    textArea.style.position = 'fixed';
    textArea.style.top = '-1000px';
    textArea.style.left = '-1000px';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((resolve, reject) => {
      try {
        let successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        successful ? resolve(true) : reject('Copy command was unsuccessful');
      } catch (err) {
        document.body.removeChild(textArea);
        reject(err);
      }
    });
  }
}

export function sendMessage<Response = unknown, Data = any>(event: MessageEvent, data?: Data): Promise<Response> {
  return chrome.runtime.sendMessage<Message>({ event, data });
}

export function emitEvent(key: MessageEvent, data?: any) {
  window.dispatchEvent(new CustomEvent(key, { detail: data }));
}
