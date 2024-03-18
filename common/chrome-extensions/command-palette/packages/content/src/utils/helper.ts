import { EXTENSION_ID } from '@dcp/shared';

export function getAssets(uri: string) {
	return `chrome-extension://${EXTENSION_ID}/assets/${uri}`;
}
