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
