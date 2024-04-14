import fs from 'fs';
import i18next from 'i18next';
import path from 'path';
import * as vscode from 'vscode';

// -----------------------------
const configuration = vscode.workspace.getConfiguration(
	'dynoI18n',
) as vscode.WorkspaceConfiguration & {
	enPath: string;
	viPath: string;
};
const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
const enPath = path.join(rootPath, configuration.enPath);
const viPath = path.join(rootPath, configuration.viPath);

async function getTranslation(filePath: string) {
	try {
		const document = await vscode.workspace.openTextDocument(filePath);
		const text = document.getText();

		const start = text.indexOf('export default') + 14;
		const end = text.lastIndexOf('}') + 1;

		const value = text
			.slice(start, end)
			.replace(/"(.*?)"/g, function (_, p1) {
				return p1.replace(/"/g, '');
			})
			.replace(/`[^`]*`/gm, '"??"')
			.replace(/\{\{(\$.)\}\}/g, '__')
			.replace(/([\w|$\w]+):(\n|\s)/g, '"$1":')
			.replace(/"\n"/gm, '')
			.replace(/'([^']+)'/g, '"$1"');

		fs.writeFileSync(path.join(__dirname, 'log.txt'), value, {
			encoding: 'utf-8',
		});

		return JSON.parse(value);
	} catch (err) {
		return {};
	}
}

// -----------------------------
function extractI18nKey(text: string) {
	const regex = /t\('([^']+?)'/g;
	const matches: string[] = [];
	let match;

	while ((match = regex.exec(text)) !== null) {
		matches.push(match[1]);
	}

	return matches;
}

async function loadI18n() {
	let vi = {},
		en = {};

	await Promise.all([
		getTranslation(viPath).then(data => {
			vi = data;
		}),
		getTranslation(enPath).then(data => {
			en = data;
		}),
	]);

	return await i18next.init({
		lng: 'vi',
		resources: {
			vi: { translation: vi },
			en: { translation: en },
		},
	});
}

// -----------------------------
export async function activate(context: vscode.ExtensionContext) {
	if (fs.existsSync(viPath) || fs.existsSync(enPath)) {
		loadI18n().then(() => {
			const content = new vscode.MarkdownString();
			content.supportHtml = true;
			content.isTrusted = true;

			vscode.languages.registerHoverProvider(
				{ pattern: '**/*.{ts,tsx}' },
				{
					provideHover(document, position) {
						const keys = extractI18nKey(document.lineAt(position.line).text);
						if (keys.length) {
							content.value = '';

							keys.forEach(key => {
								content.appendMarkdown(
									`<span style="color:#E057A5;">Vi:&nbsp;</span>${i18next.t(
										key,
										{ lng: 'vi' },
									)}`,
								);
								content.appendMarkdown('<br/>');
								content.appendMarkdown(
									`<span style="color:#E057A5;">En:&nbsp;</span>${i18next.t(
										key,
										{ lng: 'en' },
									)}`,
								);
								content.appendMarkdown('<br/>');
							});

							return new vscode.Hover(content);
						}
					},
				},
			);
		});
	}

	context.subscriptions.push(
		vscode.commands.registerCommand('dyno-i18n.load-script', loadI18n),
	);
}

export function deactivate() {}
