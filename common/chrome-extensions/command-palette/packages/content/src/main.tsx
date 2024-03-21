import 'virtual:uno.css';
import './styles/theme.scss';

import { render } from 'preact';
import App from './App';

const appElem = document.createElement('div');
appElem.id = '_dcp_root_';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	appElem.classList.add('dark');
}

document.body.appendChild(appElem);

render(<App />, appElem);
