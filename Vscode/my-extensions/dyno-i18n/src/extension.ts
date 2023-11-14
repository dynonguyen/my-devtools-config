import fs from 'fs';
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
			.replace(/\$(\w+):/g, '$1:')
			.replace(/\`(.*)\`/g, "''")
			.replace(/\{\{(\$.)\}\}/g, '$$1')
			.replace(/(\w+):/g, '"$1":')
			.replace(/'([^']+)'/g, '"$1"');

		fs.writeFileSync(path.join(__dirname, 'log.txt'), value, {
			encoding: 'utf-8',
		});

		console.log(JSON.parse(value));

		return '';
	} catch (err) {
		console.log(err);
		return '';
	}
}

getTranslation(viPath).then(data => console.log(data));

// -----------------------------
function extractI18nKey(text: string) {
	const regex = /t\('([^']+)/;
	const match = text.match(regex);

	if (match && match[1]) {
		return match[1];
	}

	return null;
}

// -----------------------------
export function activate(context: vscode.ExtensionContext) {
	if (fs.existsSync(viPath) || fs.existsSync(enPath)) {
		vscode.languages.registerHoverProvider(
			{ pattern: '**/*.{ts,tsx}' },
			{
				provideHover(document, position) {
					const key = extractI18nKey(document.lineAt(position.line).text);

					if (!key) {
						return;
					}

					return new vscode.Hover(key);
				},
			},
		);
	}
}

export function deactivate() {}
