import { render } from 'preact';
import App from './App';
import { EXT_ID } from './constants/common';

const appElem = document.createElement('div');
appElem.id = `command-palette-extension-${EXT_ID}`;

document.documentElement.appendChild(appElem);

render(App, appElem);
