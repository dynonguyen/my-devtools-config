import { EXTENSION_ID } from '@command-palette/shared';

export function getAssets(uri: string) {
	return `chrome-extension://${EXTENSION_ID}/assets/${uri}`;
}
