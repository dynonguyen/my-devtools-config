import {
	Box,
	Input,
	List,
	ListItem,
	ListItemButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/joy';
import React from 'react';
// @ts-ignore
import useKeypress from 'react-use-keypress';
import { debounce } from 'underscore';
import Icon from './Icon';

const extensionId = chrome.runtime.id;

function getFavicon(url?: string) {
	// return `http://www.google.com/s2/favicons?domain=${url}`;
	return `chrome-extension://${extensionId}/_favicon/?pageUrl=${encodeURIComponent(
		url || '',
	)}&size=32`;
}

const configure = { maxItems: 15 };
type Bookmark = Pick<
	chrome.bookmarks.BookmarkTreeNode,
	'id' | 'url' | 'title' | 'parentId'
> & { parentTitle?: string };

const BookmarkSearch = () => {
	const [query, setQuery] = React.useState('');
	const [searching, setSearching] = React.useState(false);
	const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
	const [selected, setSelected] = React.useState(0);

	const handleSearchChange = debounce(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value.trim());
		},
		250,
	);

	React.useEffect(() => {
		setSearching(true);
		setSelected(0);

		(async () => {
			const rawBookmarks = await chrome.bookmarks.search(query);
			const filteredBookmarks: Bookmark[] = rawBookmarks
				.filter(bookmark => Boolean(bookmark.url))
				.slice(0, configure.maxItems);

			const promises: Promise<any>[] = [];

			filteredBookmarks.forEach((bookmark, index) => {
				if (bookmark.parentId) {
					promises.push(
						chrome.bookmarks.get(bookmark.parentId).then(item => {
							if (item.length) {
								filteredBookmarks[index].parentTitle = item[0].title;
							}
						}),
					);
				}
			});

			await Promise.all(promises);

			setBookmarks(filteredBookmarks);
		})();

		setSearching(false);
	}, [query]);

	useKeypress('ArrowDown', () => {
		if (selected < bookmarks.length - 1) {
			setSelected(selected + 1);
		} else {
			setSelected(0);
		}
	});

	useKeypress('ArrowUp', () => {
		if (!selected) {
			setSelected(bookmarks.length - 1);
		} else {
			setSelected(selected - 1);
		}
	});

	useKeypress('Enter', () => {
		if (bookmarks.length && bookmarks[selected]) {
			chrome.tabs.create({ url: bookmarks[selected].url, active: true });
		}
	});

	React.useEffect(() => {
		if (bookmarks[selected]) {
			document.getElementById(`bookmark-${selected}`)?.scrollIntoView();
		}
	}, [selected]);

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
							{bookmarks.map((bookmark, index) => (
								<ListItem key={bookmark.id} id={`bookmark-${index}`}>
									<Tooltip
										title={bookmark.url}
										arrow
										sx={{
											'&.MuiTooltip-root': {
												maxWidth: 200,
												display: '-webkit-box',
												overflow: 'hidden',
												WebkitBoxOrient: 'vertical',
												WebkitLineClamp: 1,
											},
										}}
									>
										<ListItemButton
											onClick={() => {
												chrome.tabs.create({ url: bookmark.url, active: true });
											}}
											{...(selected === index && {
												sx: { bgcolor: 'primary.100' },
											})}
										>
											<Stack
												direction='row'
												alignItems='flex-start'
												spacing={2}
											>
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
												<Stack>
													<Typography
														sx={{
															color: 'neutral.600',
															fontSize: 15,
															fontWeight: 500,
														}}
													>
														{bookmark.title}
													</Typography>
													{bookmark.parentTitle && (
														<Typography
															sx={{ color: 'neutral.400', fontSize: 13 }}
														>
															{bookmark.parentTitle}
														</Typography>
													)}
												</Stack>
											</Stack>
										</ListItemButton>
									</Tooltip>
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
