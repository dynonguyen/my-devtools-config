import { omit } from 'lodash-es';

export const App = () => {
	console.log(omit({ name: 1, age: 9 }, 'name'));
	return <div></div>;
};

export default App;
