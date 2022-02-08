const vscode = require('vscode');
const { window, workspace } = vscode;
const axios = require('axios').default;

const DEFAULT_LANGUAGE_TO = 'en';
const DEFAULT_LANGUAGE_FROM = 'vi';
const BASE_URL = 'https://microsoft-translator-text.p.rapidapi.com/translate';
const RAPID_HOST = 'microsoft-translator-text.p.rapidapi.com';
const API_KEY = workspace.getConfiguration('dynoTranslator').apiKeys;
let timeout = null;
let isTranslating = false;

// helper functions
async function translator(
	from = DEFAULT_LANGUAGE_FROM,
	to = DEFAULT_LANGUAGE_TO,
	text = '',
) {
	const options = {
		method: 'POST',
		url: BASE_URL,
		params: {
			to,
			'api-version': '3.0',
			from,
			profanityAction: 'NoAction',
			textType: 'plain',
		},
		headers: {
			'content-type': 'application/json',
			'x-rapidapi-host': RAPID_HOST,
			'x-rapidapi-key': API_KEY,
		},
		data: [{ Text: text }],
	};

	try {
		const translationResult = await axios.request(options);
		const translationData = translationResult.data;
		if (translationData && translationData.length) {
			const { text } = translationData[0].translations[0];
			return text;
		}
	} catch (error) {
		throw error;
	}
}

function getConfiguration() {
	const { apiKeys, languageFrom, languageTo } =
		workspace.getConfiguration('dynoTranslator');
	return { apiKeys, languageFrom, languageTo };
}

function debounce(callback, time = 250) {
	timeout && clearTimeout(timeout);
	timeout = setTimeout(() => {
		callback();
	}, time);
}

// core functions
async function translatorBox() {
	const { languageFrom, languageTo } = getConfiguration();

	const inputBox = window.createInputBox();
	inputBox.placeholder = `Enter a word or a sentence ${languageFrom}->${languageTo}`;
	inputBox.show();

	inputBox.onDidAccept(async () => {
		if (!isTranslating) {
			const text = inputBox.value;
			if (text && text.trim().length) {
				isTranslating = true;
				inputBox.prompt = 'Translating ...';
				try {
					const translatedText = await translator(
						languageFrom,
						languageTo,
						text,
					);

					window.showInformationMessage(translatedText);
				} catch (error) {
					window.showErrorMessage('Translate Failed !');
				} finally {
					inputBox.prompt = '';
					isTranslating = false;
				}
			}
		}
	});
}

async function translateWithSelection() {
	if (isTranslating) return;

	const editor = window.activeTextEditor;
	const { selection } = editor;
	const text = editor.document.getText(selection).trim();
	try {
		if (text.length) {
			const { languageFrom, languageTo } = getConfiguration();
			isTranslating = true;
			const translatedText = await translator(languageFrom, languageTo, text);
			window.showInformationMessage(translatedText);
			isTranslating = false;
		}
	} catch (error) {
		window.showErrorMessage('Translate Failed');
		console.error('TRANSLATE ERROR: ', error);
	}
}

function activate(context) {
	let translatorBoxCmd = vscode.commands.registerCommand(
		'dyno-translator.translator-box',
		translatorBox,
	);

	let translateWithSelectionCmd = vscode.commands.registerCommand(
		'dyno-translator.translate-selection',
		translateWithSelection,
	);

	context.subscriptions.push(translatorBoxCmd);
	context.subscriptions.push(translateWithSelectionCmd);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
