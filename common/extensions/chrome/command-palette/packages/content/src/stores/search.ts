import { SearchCategory } from '@dcp/shared';
import { ComponentChild } from 'preact';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { pushNotification } from './notification';

export type RawSearchItem<T = any> = {
  category: SearchCategory;
} & T;

export type SearchItem<T = any> = {
  id: string;
  label: string;
  category: SearchCategory;
  description?: string | ComponentChild;
  tooltip?: string;
  logo?: ComponentChild;
  _raw: RawSearchItem<T>;
};

type SearchState = {
  init: boolean;
  open: boolean;
  openAction: boolean;
  keyword: string;
  searching: boolean;
  result: SearchItem[];
  error?: Error | null;
  focusedIndex: number;
};

type SearchAction = {
  setKeyword: (keyword: string) => void;
  setOpen: (open?: boolean | 'toggle') => void;
  set: (state: Partial<SearchState> | ((prev: SearchState) => Partial<SearchState>)) => void;
};

export type SearchStore = SearchState & SearchAction;

export const useSearchStore = createWithEqualityFn<SearchStore>(
  (set, get) => ({
    init: true, // MOCK: dev mode
    open: true, // MOCK: dev mode
    openAction: false,
    searching: false,
    keyword: '',
    result: [],
    focusedIndex: 0,
    setKeyword: (keyword) => set({ keyword }),
    setOpen: (open) => {
      let isOpen = open === 'toggle' ? !get().open : open;

      const rootElem = document.getElementById('_dcp_root_');

      if (rootElem) {
        if (isOpen) rootElem.style.removeProperty('display');
        else rootElem.style.display = 'none';
      }

      set({ open: isOpen, init: true, ...(isOpen === false && { keyword: '', result: [], focusedIndex: 0 }) });
    },
    set
  }),
  isEqual
);

export const deleteSearchItem = (id: SearchItem['id'], shouldNotify?: boolean) => {
  useSearchStore.setState((prev) => ({
    result: prev.result.filter((item) => id !== item.id),
    focusedIndex: 0,
    openAction: false
  }));

  shouldNotify && pushNotification({ message: 'Deleted', variant: 'success' });
};

export const updateSearchItem = <T = any>(
  id: SearchItem['id'],
  updateFn: (item: SearchItem<T>) => SearchItem<T>,
  closeAction = true,
  options?: Partial<SearchState>
) => {
  useSearchStore.setState((prev) => ({
    result: prev.result.map((item) => (id !== item.id ? item : updateFn(item))),
    ...(closeAction && { openAction: false }),
    ...options
  }));
};
