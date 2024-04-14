import { Message, MessageEvent } from '@dcp/shared';

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

export function sendMessage<Response = unknown>(event: MessageEvent, data?: any): Promise<Response> {
  return chrome.runtime.sendMessage<Message>({ event, data });
}
