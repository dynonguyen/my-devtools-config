const vscode = require('vscode');
const { window, workspace } = vscode;
const axios = require('axios').default;

const DEFAULT_LANGUAGE_TO = 'en';
const DEFAULT_LANGUAGE_FROM = 'vi';
const BASE_URL = 'https://microsoft-translator-text.p.rapidapi.com/translate';
const RAPID_HOST = 'microsoft-translator-text.p.rapidapi.com';
const API_KEY = workspace.getConfiguration('dynoTranslator').apiKeys;
const TRANSLATION_TYPES = {
	SHOW_MSG: 0,
	REPLACE: 1,
};
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

// input: str = "vi:en Xin chào"
// output: { languages: "vi:en", text: "Xin chào" }
function splitLanguage(str = '') {
	const strSplit = str.match(/[a-zA-Z]+:[a-zA-Z]+/gi);
	if (strSplit && strSplit.length) {
		const languages = strSplit[0].trim().toLowerCase();
		const text = str.slice(languages.length + 1).trim();
		return { languages, text };
	}

	return { languages: null, text: str };
}

// core functions
async function translatorBox() {
	const { languageFrom, languageTo } = getConfiguration();

	const inputBox = window.createInputBox();
	inputBox.placeholder = `Enter a word or a sentence. Default: ${languageFrom}->${languageTo}`;
	inputBox.show();

	inputBox.onDidAccept(async () => {
		if (!isTranslating) {
			const { value } = inputBox;
			if (value && value.trim().length) {
				isTranslating = true;
				inputBox.prompt = 'Translating ...';

				const { languages, text } = splitLanguage(value);
				let langFrom = languageFrom,
					langTo = languageTo;
				if (languages) {
					const langSplit = languages.split(':');
					langFrom = langSplit[0];
					langTo = langSplit[1];
				}

				try {
					const translatedText = await translator(langFrom, langTo, text);

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

async function translateWithSelection(
	type = TRANSLATION_TYPES.SHOW_MSG,
	isReverse = false,
) {
	if (isTranslating) return;

	const editor = window.activeTextEditor;
	const { selection } = editor;
	const text = editor.document.getText(selection).trim();

	try {
		if (text.length) {
			let { languageFrom, languageTo } = getConfiguration();
			if (isReverse) [languageFrom, languageTo] = [languageTo, languageFrom];

			isTranslating = true;
			const translatedText = await translator(languageFrom, languageTo, text);

			switch (type) {
				case TRANSLATION_TYPES.SHOW_MSG:
					window.showInformationMessage(translatedText);
					break;
				case TRANSLATION_TYPES.REPLACE:
					editor.edit((builder) => {
						builder.replace(selection, translatedText);
					});
					break;
				default:
					window.showInformationMessage(translatedText);
					break;
			}

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

	let translateCmd = vscode.commands.registerCommand(
		'dyno-translator.translate',
		() => translateWithSelection(TRANSLATION_TYPES.SHOW_MSG),
	);

	let translateAndReplaceCmd = vscode.commands.registerCommand(
		'dyno-translator.translate-replace',
		() => translateWithSelection(TRANSLATION_TYPES.REPLACE),
	);

	let translateReverseCmd = vscode.commands.registerCommand(
		'dyno-translator.translate-reverse',
		() => translateWithSelection(TRANSLATION_TYPES.SHOW_MSG, true),
	);

	let translateReverseAndReplaceCmd = vscode.commands.registerCommand(
		'dyno-translator.translate-reverse-replace',
		() => translateWithSelection(TRANSLATION_TYPES.REPLACE, true),
	);

	context.subscriptions.push(translatorBoxCmd);
	context.subscriptions.push(translateCmd);
	context.subscriptions.push(translateAndReplaceCmd);
	context.subscriptions.push(translateReverseCmd);
	context.subscriptions.push(translateReverseAndReplaceCmd);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
