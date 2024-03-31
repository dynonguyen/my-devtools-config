import {
  Bookmark,
  Command,
  History,
  MessageEvent,
  Navigation,
  SearchCategory,
  ShortcutKey,
  Theme,
  getFavicon
} from '@dcp/shared';
import { ChipProps } from '~/components/Chip';
import { KbdProps } from '~/components/Kbd';
import BookmarkActions from '~/components/search-bottom/BookmarkActions';
import HistoryActions from '~/components/search-bottom/HistoryActions';
import { RawSearchItem, SearchItem, useSearchStore } from '~/stores/search';
import { sendMessage } from './helper';

export function searchResultMapping(item: RawSearchItem): SearchItem {
  switch (item.category) {
    case SearchCategory.Bookmark: {
      const { id, isFolder, path, title, url } = item as Bookmark;

      return {
        id: `bookmark-${id}`,
        label: title,
        logo: url ? getFavicon(url, 24) : <span class="i-quill:folder size-full" />,
        category: item.category,
        tooltip: path,
        description: isFolder ? path : url,
        _raw: item
      };
    }

    case SearchCategory.Navigation: {
      const { logoUri, title, url } = item as Navigation;

      return {
        id: `navigation-${title}`,
        category: item.category,
        label: title,
        description: url,
        logo: logoUri,
        _raw: item
      };
    }

    case SearchCategory.Command: {
      const { logoUri, title, description } = item as Command;
      return {
        id: `command-${title}`,
        category: item.category,
        label: title,
        description,
        logo: logoUri,
        _raw: item
      };
    }

    case SearchCategory.Theme: {
      const { id, logoUri, title, description } = item as Theme;

      return {
        id: `theme-${id}`,
        category: item.category,
        label: title,
        description,
        logo: logoUri,
        _raw: item
      };
    }

    case SearchCategory.History: {
      const { id, title, url } = item as History;
      return {
        id: `history-${id}`,
        category: item.category,
        description: url,
        label: title || '',
        logo: getFavicon(url!, 24),
        _raw: item
      };
    }

    default:
      return {} as SearchItem;
  }
}

export function searchCategoryMapping(category: SearchCategory): Pick<ChipProps, 'color' | 'icon' | 'label'> | null {
  switch (category) {
    case SearchCategory.Bookmark:
      return {
        label: 'Bookmark',
        icon: <span class="i-ph:bookmark-simple-fill" />,
        color: 'blue'
      };

    case SearchCategory.InternetQuery:
      return {
        label: 'Query',
        icon: <span class="i-mdi:internet-search" />,
        color: 'grey-500'
      };

    case SearchCategory.Navigation:
      return {
        label: 'Navigation',
        icon: <span class="i-majesticons:open" />,
        color: 'info'
      };

    case SearchCategory.Command:
      return {
        label: 'Command',
        icon: <span class="i-octicon:command-palette-16" />,
        color: 'yellow'
      };

    case SearchCategory.Theme:
      return { label: 'Theme', icon: <span class="i-icon-park-solid:dark-mode" />, color: 'purple' };

    case SearchCategory.History:
      return { label: 'History', icon: <span class="i-ic:round-history" />, color: 'success' };

    default:
      return null;
  }
}

export function enterActionMapping(item: SearchItem | null): {
  label?: string;
  actionFn?: () => void;
  noAction?: boolean;
} {
  if (!item) return { noAction: true };

  switch (item.category) {
    case SearchCategory.Bookmark:
    case SearchCategory.History: {
      const url = item._raw.url;
      return url
        ? {
            label: 'Open',
            actionFn: () => {
              window.open(url);
              useSearchStore.getState().setOpen(false);
            }
          }
        : { noAction: true };
    }

    case SearchCategory.InternetQuery: {
      const url = item._raw.url;
      return {
        label: 'Query',
        actionFn: () => {
          window.open(url);
          useSearchStore.getState().setOpen(false);
        }
      };
    }

    case SearchCategory.Navigation: {
      return {
        label: 'Open',
        actionFn: () => {
          sendMessage(MessageEvent.OpenLocalResource, { url: item._raw.url });
          useSearchStore.getState().setOpen(false);
        }
      };
    }

    case SearchCategory.Command: {
      return {
        label: 'Execute',
        actionFn: () => {
          sendMessage(item._raw.commandEvent);
          useSearchStore.getState().setOpen(false);
        }
      };
    }

    case SearchCategory.Theme: {
      return {
        label: 'Execute',
        actionFn: () => {
          sendMessage(MessageEvent.ChangeColorTheme);
          useSearchStore.getState().setOpen(false);
        }
      };
    }
  }
}

export function actionMenuMapping(category: SearchCategory) {
  switch (category) {
    case SearchCategory.Bookmark:
      return BookmarkActions;
    case SearchCategory.History:
      return HistoryActions;
    default:
      return null;
  }
}

export function kbdMapping(key: string): Partial<Pick<KbdProps, 'icon' | 'text'>> {
  switch (key) {
    case ShortcutKey.Cmd:
      return { icon: 'i-ph:command' };
    case ShortcutKey.Control:
      return { icon: 'i-ph:control' };
    case ShortcutKey.Option:
      return { icon: 'i-ph:option' };
    case ShortcutKey.Shift:
      return { icon: 'i-bi:shift' };
    case ShortcutKey.Alt:
      return { icon: 'i-bi:alt' };
    case ShortcutKey.Window:
      return { icon: 'i-ph:windows-logo' };
    default:
      return { text: key };
  }
}
