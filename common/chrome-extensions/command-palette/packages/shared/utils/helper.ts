import { EXTENSION_ID } from '../constants/common';

export function detectDevicePlatform(): 'mac' | 'win' | 'linux' | 'other' {
	const userAgent = navigator.userAgent.toLowerCase();

	if (userAgent.includes('win')) {
		return 'win';
	} else if (userAgent.includes('mac')) {
		return 'mac';
	} else if (userAgent.includes('linux')) {
		return 'linux';
	} else {
		return 'other';
	}
}

export function getAssets(uri: string) {
	return `chrome-extension://${EXTENSION_ID}/assets/${uri}`;
}

export function getFavicon(uri: string, size = 32) {
	return `chrome-extension://${EXTENSION_ID}/_favicon/?pageUrl=${uri}&size=${size}`;
}
