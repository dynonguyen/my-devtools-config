import { DEFAULT_USER_OPTIONS, UserOptions } from '@dcp/shared';
import { createWithEqualityFn } from 'zustand/traditional';

export type UseUserOptionStore = UserOptions & {
  setOptions: (state: Partial<UserOptions> | ((prev: UserOptions) => Partial<UserOptions>)) => void;
};

export const useUserOptionStore = createWithEqualityFn<UseUserOptionStore>((set) => ({
  ...DEFAULT_USER_OPTIONS,
  setOptions: set
}));
