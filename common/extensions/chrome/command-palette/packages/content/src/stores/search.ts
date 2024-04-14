import { SearchCategory } from '@dcp/shared';
import { ComponentChild } from 'preact';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';

export type RawSearchItem<T = any> = {
  category: SearchCategory;
} & T;

export type SearchItem<T = any> = {
  id: string;
  label: string;
  category: SearchCategory;
  description?: string;
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
    init: false,
    open: false,
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
