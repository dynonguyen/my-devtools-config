import { EXTENSION_ID, STORAGE_KEY } from '../constants/common';
import { DEFAULT_USER_OPTIONS } from '../constants/default';
import { SearchCategory, UserOptions } from '../types';

// -----------------------------
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[] = []): Omit<T, K> {
  const omitted: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (!keys.includes(key as K)) omitted[key] = value;
  });

  return omitted as Omit<T, K>;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[] = []): Pick<T, K> {
  const picked: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (keys.includes(key as K)) picked[key] = value;
  });

  return picked as Pick<T, K>;
}

type TimerId = ReturnType<typeof setTimeout>;
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timerId: TimerId;

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
}

export function hasSearchKeyword(content: string, keyword: string) {
  if (!content) return false;
  if (content.toLowerCase().includes(keyword)) {
    return true;
  }
}

export const dateFormatter = (input: Date | string | number) => {
  const date = input instanceof Date ? input : new Date(input);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};

export const sortSearchResult = (items: any[], sortByLen: string = 'title') =>
  items.sort((a, b) => a[sortByLen]?.length - b[sortByLen]?.length);

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

export function getAliasFromCategory(aliases: UserOptions['aliases'], category: SearchCategory) {
  return Object.entries(aliases).find(([_, value]) => value === category)?.[0];
}

export function getAliasFromKeyword(keyword = '') {
  const splits = keyword.split(' ');

  if (splits.length < 2) return '';

  return splits[0];
}

export async function getUserOptions(): Promise<UserOptions> {
  const userOptions = await chrome.storage.sync.get(STORAGE_KEY.USER_OPTION);
  return userOptions?.[STORAGE_KEY.USER_OPTION] || DEFAULT_USER_OPTIONS;
}

export async function setUserOptions(options: Partial<UserOptions>) {
  const userOpts = await getUserOptions();
  return await chrome.storage.sync.set({ [STORAGE_KEY.USER_OPTION]: { ...userOpts, ...options } });
}

export function userOptionsChangeListener(onChange?: () => void) {
  const handleChange = (changed: { [key: string]: chrome.storage.StorageChange }) => {
    if (changed[STORAGE_KEY.USER_OPTION]) {
      onChange?.();
    }
  };
  chrome.storage.onChanged.addListener(handleChange);

  return () => {
    chrome.storage.onChanged.removeListener(handleChange);
  };
}
