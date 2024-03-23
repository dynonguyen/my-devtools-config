import SearchHandler from './components/SearchHandler';
import SearchBottom from './components/search-bottom';
import SearchInput from './components/search-input';
import SearchResult from './components/search-result';
import { INPUT_Z_INDEX } from './constants/common';

export const App = () => {
	return (
		<div
			class='fixed top-0 flex justify-center w-screen h-screen'
			style={{ zIndex: INPUT_Z_INDEX }}
		>
			{/* Overlay */}
			<div
				id='dcp-overlay'
				class='before:content-[""] before:bg-grey-900/50 before:w-full before:h-full before:absolute before:top-0 before:left-0'
				style={{ zIndex: INPUT_Z_INDEX - 1 }}
			/>

			{/* Wrapper */}
			<div
				id='dcp-wrapper'
				class='mt-32 w-3xl h-max max-w-9/10 flex flex-col border border-solid border-divider overflow-hidden rounded-2xl bg-base-100'
				style={{
					zIndex: INPUT_Z_INDEX + 1,
					boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
				}}
			>
				<SearchInput />
				<SearchResult />
				<SearchBottom />
				<SearchHandler />
			</div>
		</div>
	);
};

export default App;
