import { JSXInternal } from 'preact/src/jsx';
import { SearchItem } from '~/stores/search';
import Category from './Category';
import KeyboardShortcut from './KeyboardShortcut';

export type SearchResultItemProps = SearchItem & {
	onClick?: JSXInternal.MouseEventHandler<HTMLDivElement>;
};

export const SearchResultItem = (props: SearchResultItemProps) => {
	const { label, logo, description, category, shortcutId, onClick } = props;

	return (
		<div
			class='dcp-search-item flex items-center gap-3 justify-between px-4 p-2 transition-colors cursor-pointer outline-none hover:(bg-primary/20 dark:bg-primary/15) w-full overflow-hidden data-[focused=true]:(bg-primary/15 dark:bg-primary/10)'
			onClick={onClick}
			tabIndex={-1}
		>
			{/* Logo */}
			<div className='size-5 shrink-0 rounded flex-center text-base-content overflow-hidden'>
				{typeof logo === 'string' ? (
					<img src={logo} class='size-full shrink-0' />
				) : (
					logo
				)}
			</div>

			{/* Main content */}
			<div class='flex flex-col gap-1 grow-1 max-w-full overflow-hidden'>
				<div class='text-sm text-base-content line-clamp-1'>{label}</div>
				{description && (
					<div class='text-xs text-grey-400 line-clamp-1'>{description}</div>
				)}
			</div>

			<div className='flex items-center gap-2 shrink-0'>
				<KeyboardShortcut shortcutId={shortcutId} />
				<Category category={category} />
			</div>
		</div>
	);
};

export default SearchResultItem;
