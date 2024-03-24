import { Bookmark, SearchCategory, ShortcutKey, getFavicon } from '@dcp/shared';
import { ChipProps } from '~/components/Chip';
import { KbdProps } from '~/components/Kbd';
import { RawSearchItem, SearchItem, useSearchStore } from '~/stores/search';

export function searchResultMapping(item: RawSearchItem): SearchItem {
	switch (item.category) {
		case SearchCategory.Bookmark:
			const { id, isFolder, path, title, url } = item as Bookmark;
			return {
				id: `bookmark-${id}`,
				label: title,
				logo: url ? (
					getFavicon(url, 24)
				) : (
					<span class='i-quill:folder size-full' />
				),
				category: item.category,
				description: isFolder ? path : url,
				raw: item,
			};

		default:
			return {} as SearchItem;
	}
}

export function searchCategoryMapping(
	category: SearchCategory,
): Pick<ChipProps, 'color' | 'icon' | 'label'> | null {
	switch (category) {
		case SearchCategory.Bookmark:
			return {
				label: 'Bookmark',
				icon: <span class='i-ph:bookmark-simple-fill size-4' />,
				color: 'blue',
			};

		case SearchCategory.Google:
		case SearchCategory.Youtube:
			return {
				label: 'Command',
				icon: <span class='i-heroicons:command-line-solid size-4' />,
				color: 'grey-500',
			};

		default:
			return null;
	}
}

export function kbdMapping(
	key: string,
): Partial<Pick<KbdProps, 'icon' | 'text'>> {
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

export function enterActionMapping(item: SearchItem | null): {
	label: string;
	actionFn?: () => void;
} {
	if (!item) return { label: 'Open' };

	switch (item.category) {
		case SearchCategory.Bookmark:
		case SearchCategory.Google:
		case SearchCategory.Youtube:
			return {
				label: 'Open',
				actionFn: () => {
					window.open(item.raw.url);
					useSearchStore.getState().setOpen(false);
				},
			};
	}
}
