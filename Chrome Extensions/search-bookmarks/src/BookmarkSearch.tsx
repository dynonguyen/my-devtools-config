import {
	Box,
	Input,
	List,
	ListItem,
	ListItemButton,
	Stack,
	Typography,
} from '@mui/joy';
import React from 'react';
import { debounce } from 'underscore';
import Icon from './Icon';

function getFavicon(url?: string) {
	return `http://www.google.com/s2/favicons?domain=${url}`;
	// return `chrome-extension://${extensionId}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

const configure = { maxItems: 15 };

const BookmarkSearch = () => {
	const [query, setQuery] = React.useState('');
	const [searching, setSearching] = React.useState(false);
	const [bookmarks, setBookmarks] = React.useState<
		chrome.bookmarks.BookmarkTreeNode[]
	>([]);

	const handleSearchChange = debounce(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value.trim());
		},
		250,
	);

	React.useEffect(() => {
		setSearching(true);

		(async () => {
			const rawBookmarks = await chrome.bookmarks.search(query);
			setBookmarks(
				rawBookmarks
					.filter(bookmark => Boolean(bookmark.url))
					.slice(0, configure.maxItems),
			);
		})();

		setSearching(false);
	}, [query]);

	return (
		<React.Fragment>
			<Input
				autoFocus
				placeholder='Search bookmarks'
				startDecorator={<Icon size='small' icon='ph:magnifying-glass' />}
				onChange={handleSearchChange}
				size='md'
			/>

			{searching && (
				<Stack
					spacing={4}
					mt={4}
					direction='row'
					justifyContent='center'
					alignItems='center'
				>
					<Icon icon='eos-icons:bubble-loading' color='neutral.500' />
					<Typography color='neutral'>Searching</Typography>
				</Stack>
			)}

			{!searching && query && (
				<Stack
					mt={2}
					p={2}
					border='solid 1px'
					borderColor='neutral.200'
					borderRadius={8}
					maxHeight={350}
					overflow='auto'
				>
					{bookmarks.length ? (
						<List
							sx={{ '& .MuiListItemButton-root': { p: 2, borderRadius: 8 } }}
						>
							{bookmarks.map(bookmark => (
								<ListItem key={bookmark.id}>
									<ListItemButton
										onClick={() => {
											chrome.tabs.create({ url: bookmark.url, active: true });
										}}
									>
										<Stack direction='row' alignItems='center' spacing={2}>
											<Stack
												justifyContent='center'
												alignItems='center'
												width={36}
												height={36}
												borderRadius={8}
												bgcolor='primary.50'
												border='solid 1px'
												borderColor='neutral.200'
											>
												<Box
													width={16}
													height={16}
													component='img'
													src={getFavicon(bookmark.url)}
												/>
											</Stack>
											<Typography
												sx={{
													color: 'neutral.600',
													fontSize: 14,
													fontWeight: 500,
												}}
											>
												{bookmark.title}
											</Typography>
										</Stack>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					) : (
						<Stack
							py={2}
							spacing={2}
							justifyContent='center'
							alignItems='center'
						>
							<Icon color='neutral.400' icon='tabler:search-off' />
							<Typography
								sx={{ color: 'neutral.400', fontSize: 16, fontWeight: 400 }}
							>
								Bookmark not found
							</Typography>
						</Stack>
					)}
				</Stack>
			)}
		</React.Fragment>
	);
};

export default BookmarkSearch;
