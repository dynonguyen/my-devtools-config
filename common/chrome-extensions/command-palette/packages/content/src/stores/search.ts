import { isEqual } from 'lodash-es';
import { createWithEqualityFn } from 'zustand/traditional';

export type SearchResult = {};

type SearchState = {
	keyword: string;
	searching: boolean;
	result: SearchResult[];
};

type SearchAction = {
	setKeyword: (keyword: string) => void;
	set: (state: Partial<SearchState>) => void;
};

export type SearchStore = SearchState & SearchAction;

export const useSearchStore = createWithEqualityFn<SearchStore>(
	set => ({
		keyword: '',
		searching: false,
		result: [],
		setKeyword: keyword => set({ keyword }),
		set,
	}),
	isEqual,
);
