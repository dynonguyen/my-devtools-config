import { ComponentChild } from 'preact';
import Chip from '../Chip';
import Kbd from '../Kbd';

export type SearchResultItemProps = {
	label: string;
	description?: string;
	logo?: ComponentChild;
};

export const SearchResultItem = (props: SearchResultItemProps) => {
	const { label, logo, description } = props;

	return (
		<div class='flex items-center gap-3 justify-between px-4 p-2 transition-colors cursor-pointer hover:(bg-grey-500/15 dark:bg-grey-500/10) focus:(bg-secondary/15)'>
			<div class='flex gap-3 items-center justify-between w-full'>
				{/* Logo */}
				<div className='size-6 shrink-0'>
					{typeof logo === 'string' ? (
						<img src={logo} class='size-full shrink-0' />
					) : (
						logo
					)}
				</div>

				{/* Main content */}
				<div class='flex flex-col gap-1 grow-1'>
					<div class='text-sm text-base-content line-clamp-1'>{label}</div>
					<div class='text-xs text-grey-400 line-clamp-1'>{description}</div>
				</div>

				<div className='flex items-center gap-2 shrink-0'>
					{/* Keyboard shortcuts */}
					<div className='flex gap-1'>
						<Kbd icon='i-ph:command' />
						<Kbd text='F11' />
					</div>

					{/* Categories */}
					<Chip
						color='secondary'
						icon={<span class='i-ph:bookmark-simple-fill size-4' />}
						label='Bookmark'
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchResultItem;
