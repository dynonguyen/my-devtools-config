import SearchAction from './components/search-action';
import SearchInput from './components/SearchInput';

export const App = () => {
	return (
		<div id='app-wrapper'>
			<SearchInput />
			<SearchAction />
		</div>
	);
};

export default App;
