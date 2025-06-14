import {
  Bookmark,
  Command,
  Extension,
  History,
  MessageEvent,
  Navigation,
  SearchCategory,
  ShortcutKey,
  Tab,
  Theme,
  getFavicon
} from '@dcp/shared';
import clsx from 'clsx';
import { ChipProps } from '~/components/Chip';
import { KbdProps } from '~/components/Kbd';
import BookmarkActions from '~/components/search-action/BookmarkActions';
import CookieActions from '~/components/search-action/CookieActions';
import ExtensionActions from '~/components/search-action/ExtensionActions';
import HistoryActions from '~/components/search-action/HistoryActions';
import LocalStorageActions from '~/components/search-action/LocalStorageActions';
import TabActions from '~/components/search-action/TabActions';
import { pushNotification } from '~/stores/notification';
import { RawSearchItem, SearchItem, useSearchStore } from '~/stores/search';
import { getCookieSearchItem } from './convert';
import { copyToClipboard, emitEvent, sendMessage } from './helper';

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
        label: title || '_',
        logo: getFavicon(url!, 24),
        _raw: item
      };
    }

    case SearchCategory.Tab: {
      const { id, title, url } = item as Tab;

      return {
        id: `tab-${id}`,
        category: item.category,
        description: url,
        label: title || '_',
        logo: getFavicon(url!, 24),
        _raw: item
      };
    }

    case SearchCategory.Extension: {
      const { id, name, shortName, description, enabled } = item as Extension;

      return {
        id: `extension-${id}`,
        category: item.category,
        description,
        label: name || shortName || '_',
        logo: (
          <span
            class={clsx('size-full', enabled ? 'i-material-symbols:extension' : 'i-material-symbols:extension-off')}
          />
        ),
        _raw: item
      };
    }

    case SearchCategory.Cookie: {
      return getCookieSearchItem(item);
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
        icon: 'i-ph:bookmark-simple-fill',
        color: 'blue'
      };

    case SearchCategory.InternetQuery:
      return {
        label: 'Query',
        icon: 'i-ph:globe-simple-fill',
        color: 'yellow'
      };

    case SearchCategory.Navigation:
      return {
        label: 'Navigation',
        icon: 'i-majesticons:open',
        color: 'info'
      };

    case SearchCategory.Command:
      return {
        label: 'Command',
        icon: 'i-heroicons:command-line-16-solid',
        color: 'cyan'
      };

    case SearchCategory.Theme:
      return { label: 'Theme', icon: 'i-icon-park-solid:dark-mode', color: 'purple' };

    case SearchCategory.History:
      return { label: 'History', icon: 'i-ic:round-history', color: 'success' };

    case SearchCategory.Tab:
      return { label: 'Tab', icon: 'i-material-symbols:tab', color: 'orange' };

    case SearchCategory.Extension:
      return { label: 'Extension', icon: 'i-material-symbols:extension', color: 'pink' };

    case SearchCategory.Cookie:
      return { label: 'Cookie', icon: 'i-ph:cookie', color: 'grey-500' };

    case SearchCategory.LocalStorage:
      return { label: 'Local Storage', icon: 'i-material-symbols:storage-rounded', color: 'secondary' };

    default:
      return { label: '--', color: 'grey-500' };
  }
}

export function enterActionMapping(item: SearchItem | null): {
  label?: string;
  actionFn?: () => void;
  noAction?: boolean;
} {
  if (!item) return { noAction: true };

  const closePopup = () => useSearchStore.getState().setOpen(false);

  switch (item.category) {
    case SearchCategory.Bookmark:
    case SearchCategory.History: {
      const url = item._raw.url;
      return url
        ? {
            label: 'Open',
            actionFn: () => {
              window.open(url);
              closePopup();
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
          closePopup();
        }
      };
    }

    case SearchCategory.Navigation: {
      return {
        label: 'Open',
        actionFn: () => {
          sendMessage(MessageEvent.OpenLocalResource, { url: item._raw.url });
          closePopup();
        }
      };
    }

    case SearchCategory.Command: {
      return {
        label: 'Execute',
        actionFn: () => {
          const command = item._raw as Command;

          if (command.isClient) return emitEvent(command.commandEvent!);

          sendMessage(item._raw.commandEvent);
          closePopup();
        }
      };
    }

    case SearchCategory.Theme: {
      return {
        label: 'Execute',
        actionFn: () => {
          sendMessage(MessageEvent.ChangeColorTheme);
          closePopup();
        }
      };
    }

    case SearchCategory.Tab: {
      return {
        label: 'Go to this tab',
        actionFn: () => {
          sendMessage(MessageEvent.FocusTab, { id: item._raw.id });
          closePopup();
        }
      };
    }

    case SearchCategory.Extension: {
      return { noAction: true };
    }

    case SearchCategory.Cookie: {
      return {
        label: 'Copy Cookie Value',
        actionFn: () => {
          copyToClipboard(item._raw.value);
          pushNotification({ message: 'Copied to clipboard', variant: 'success' });
        }
      };
    }

    case SearchCategory.LocalStorage: {
      return {
        label: 'Copy Value',
        actionFn: () => {
          copyToClipboard(item._raw.value);
          pushNotification({ message: 'Copied to clipboard', variant: 'success' });
        }
      };
    }

    default:
      return { noAction: true };
  }
}

export function actionMenuMapping(category: SearchCategory) {
  switch (category) {
    case SearchCategory.Bookmark:
      return BookmarkActions;
    case SearchCategory.History:
      return HistoryActions;
    case SearchCategory.Tab:
      return TabActions;
    case SearchCategory.Extension:
      return ExtensionActions;
    case SearchCategory.Cookie:
      return CookieActions;
    case SearchCategory.LocalStorage:
      return LocalStorageActions;
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
