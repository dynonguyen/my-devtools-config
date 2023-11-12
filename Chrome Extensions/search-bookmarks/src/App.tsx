import { Box, ThemeProvider, extendTheme } from '@mui/joy';
import BookmarkSearch from './BookmarkSearch';

function App() {
	return (
		<ThemeProvider theme={extendTheme({ spacing: 4 })}>
			<Box width={350} borderRadius={4} overflow='hidden'>
				<BookmarkSearch />
			</Box>
		</ThemeProvider>
	);
}

export default App;
