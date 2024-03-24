import { EXTENSION_ID } from '../constants/common';

// -----------------------------
export function omit<T extends object, K extends keyof T>(
	obj: T,
	keys: K[] = [],
): Omit<T, K> {
	const omitted: any = {};

	Object.entries(obj).forEach(([key, value]) => {
		if (!keys.includes(key as K)) omitted[key] = value;
	});

	return omitted as Omit<T, K>;
}

export function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K[] = [],
): Pick<T, K> {
	const picked: any = {};

	Object.entries(obj).forEach(([key, value]) => {
		if (keys.includes(key as K)) picked[key] = value;
	});

	return picked as Pick<T, K>;
}

type TimerId = ReturnType<typeof setTimeout>;
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timerId: TimerId;

	return function (...args: Parameters<T>): void {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			// @ts-ignore
			func.apply(this, args);
		}, delay);
	};
}

// -----------------------------
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
