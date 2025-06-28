import { UserOptions } from '../types';

export const DEFAULT_USER_OPTIONS: UserOptions = {
  theme: 'system',
  limitItems: 50,
  translate: { enabled: true, sl: 'auto', tl: 'en' },
  googleSearch: true,
  youtubeSearch: true,
  oxfordSearch: true,
  cambridgeSearch: true,
  aliases: {},
  workspaces: []
};
