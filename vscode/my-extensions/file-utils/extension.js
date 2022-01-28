const vscode = require('vscode');
const { window, workspace } = vscode;
const fs = require('fs');
const { promises: fsPromise } = fs;
const path = require('path');

/* ============== Contanst =============== */
const DEFAULT_SEPARATOR = ',';
const DEFAULT_EXPAND_SEPARATOR = '|';
const PLACEHOLDERS = {
	CHOOSE_FOLDER: 'Choose a parent folder',
	CHOOSE_TEMPLATE: 'Choose a template',
	NEW_ITEMS: (separator = DEFAULT_SEPARATOR) =>
		`Enter the dir/file name to be created. Dirs end with '/'. Separated with '${separator}'`,
	RENAME_FILE: (oldName) => `Enter the new name - old name is "${oldName}""`,
	QUICKPICK_BOTTOM_TITLE: (featureName) =>
		`${featureName} (Press "Enter" to confirm or "Escape" to cancle)`,
};
const SPECIAL_CHARS = [':', '*', '?', '<', '>', '|'];
const NOTIFICATIONS = {
	CONTAIN_SPECIAL_CHARS: (spc = SPECIAL_CHARS) =>
		`A filename can't contain any of the following characters ${spc.join(' ')}`,
	FILE_EXISTS: 'The file already exists !',
};
const DELETE_ANSWERS = { NO: 0, YES: 1, YES_DONT_SHOW: 2 };

/* ============== Helper function =============== */
function isContainSpecialChars(pathName, specialChars = SPECIAL_CHARS) {
	for (const c of specialChars) {
		if (pathName?.indexOf(c) !== -1) return true;
	}
	return false;
}

function isExistExcludeFolder(folderExclude = [], folderName) {
	for (let ef of folderExclude) {
		if (folderName?.indexOf(ef) !== -1) return true;
	}

	return false;
}

async function getAllFileFolders(root, folderExclude = [], isGetFile = false) {
	const entries = await fsPromise.readdir(root, { withFileTypes: true });
	const result = [];

	const folders = entries.filter((folder) => folder.isDirectory());
	if (isGetFile) {
		const files = entries
			.filter((folder) => !folder.isDirectory())
			.map((file) => root + file.name);

		result.push(...files);
	}

	for (const folder of folders) {
		const { name } = folder;

		if (!isExistExcludeFolder(folderExclude, name)) {
			const combinePath = `${root}${name}/`;
			result.push(combinePath);
			result.push(
				...(await getAllFileFolders(combinePath, folderExclude, isGetFile)),
			);
		}
	}

	return result;
}

function createFolder(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
}

function createFile(path) {
	if (!fs.existsSync(path)) {
		fs.appendFileSync(path, '');
	}
}

function copyFileSync(source, target) {
	var targetFile = target;

	// If target is a directory, a new file with the same name will be created
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, isRoot = true) {
	var files = [];

	// Check if folder needs to be created or integrated
	var targetFolder = isRoot ? target : path.join(target, path.basename(source));

	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	// Copy
	if (fs.lstatSync(source).isDirectory()) {
		files = fs.readdirSync(source);
		files.forEach(function (file) {
			var curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder, false);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

function splitFilePath(input = '', separator = DEFAULT_SEPARATOR) {
	const files = [],
		folders = [];

	const nameList = input
		?.trim()
		.split(separator)
		.map((item) => item?.trim());

	nameList.forEach((path) => {
		if (path?.trim().length !== 0) {
			const endPath = path[path.length - 1];
			if (endPath === '\\' || endPath === '/') {
				folders.push(path);
			} else {
				files.push(path);

				// split folder in path
				const pathSplit = path.split(/\/|\\/);
				if (pathSplit.length > 1) {
					folders.push(pathSplit.slice(0, pathSplit.length - 1).join('/'));
				}
			}
		}
	});

	return { files, folders };
}

function openFileInWorkspace(filePath) {
	workspace
		.openTextDocument(filePath)
		.then((_doc) => window.showTextDocument(_doc));
}

function getConfiguration() {
	const {
		openFile = true,
		separator = DEFAULT_SEPARATOR,
		expandSeparator = DEFAULT_EXPAND_SEPARATOR,
		folderExclude = [],
		confirmDelete,
		templates,
	} = workspace.getConfiguration('dynoFileUtils');

	return {
		openFile,
		separator,
		expandSeparator,
		folderExclude,
		confirmDelete,
		templates,
	};
}

function getRootFolder() {
	return workspace.workspaceFolders[0].uri.fsPath + '/';
}

function getActiveTextEditorPath() {
	const { activeTextEditor } = window;
	if (activeTextEditor) {
		return activeTextEditor.document.fileName;
	}
	return null;
}

function splitFileName(path) {
	if (path) {
		const splited = path.split(/\/|\\/);
		const folderPath = splited.slice(0, splited.length - 1).join('/') + '/';
		const fileName = splited[splited.length - 1];

		return { folderPath, fileName };
	}

	return null;
}

/*
	input: path = abc/xyz/[file,file2,file3][js,cpp]
	output: { folder: 'abc/xyz/', fileNames: ["file","file2","file3"], extNames: ["js","cpp"] }
	wrong structure input: output = input
*/
function splitBraceBrackets(path) {
	const regex = /.+(\/|\\)\{.+\}\{.+\}/;
	if (!regex.test(path)) return path;

	const pathSplited = path.split(/\/|\\/);
	const lastItemIndex = pathSplited.length - 1;
	const folder = pathSplited.slice(0, lastItemIndex).join('/') + '/';
	const firstCloseSquareIndex = pathSplited[lastItemIndex]?.indexOf('}');

	const { expandSeparator } = getConfiguration();

	const fileNames = pathSplited[lastItemIndex]
		.substr(0, firstCloseSquareIndex + 1)
		.replace(/\{|\}/g, '')
		?.trim()
		.split(expandSeparator);

	const extNames = pathSplited[lastItemIndex]
		.substr(firstCloseSquareIndex + 1)
		.replace(/\{|\}/g, '')
		?.trim()
		.split(expandSeparator);

	return { folder, fileNames, extNames };
}

function squareBraceExpand(pathList = []) {
	const result = [];

	pathList.forEach((path) => {
		const splited = splitBraceBrackets(path);
		if (typeof splited === 'string') result.push(splited);
		else {
			const { folder, fileNames, extNames } = splited;
			const extLen = extNames.length;

			fileNames.forEach((fileName, index) => {
				result.push(
					`${folder}${fileName}.${
						extNames[index < extLen ? index : extLen - 1]
					}`,
				);
			});
		}
	});

	return result;
}

function newItemsWithPattern(pattern, root, separator, openFile) {
	let { files, folders } = splitFilePath(pattern, separator);

	files = squareBraceExpand(files);

	// create all folders before creating files (nested file)
	folders.forEach((folderPath) => {
		if (!isContainSpecialChars(folderPath)) {
			createFolder(root + folderPath);
		} else {
			window.showErrorMessage(NOTIFICATIONS.CONTAIN_SPECIAL_CHARS());
		}
	});

	// Create all files
	files.forEach((filePath) => {
		if (!isContainSpecialChars(filePath)) {
			const rootFilePath = root + filePath;
			createFile(rootFilePath);

			openFile && openFileInWorkspace(rootFilePath);
		} else {
			window.showErrorMessage(NOTIFICATIONS.CONTAIN_SPECIAL_CHARS());
		}
	});
}

function deleteViaVscode(filePath) {
	workspace.fs.delete(vscode.Uri.file(filePath), {
		useTrash: true,
		recursive: true,
	});
}

function confirmDeleteDialog(callback) {
	const { confirmDelete } = getConfiguration();

	if (confirmDelete) {
		window
			.showWarningMessage(
				`Are you sure to delete ?`,
				...['No', 'Yes', "Yes & Don't show again"],
			)
			.then((answer) => {
				if (answer === 'Yes') {
					callback(DELETE_ANSWERS.YES);
				} else if (answer === `Yes & Don't show again`) {
					workspace
						.getConfiguration()
						.update('dynoFileUtils.confirmDelete', false, true);

					callback(DELETE_ANSWERS.YES_DONT_SHOW);
				} else {
					callback(DELETE_ANSWERS.NO);
				}
			});
	} else {
		callback(DELETE_ANSWERS.YES);
	}
}

function getFileNameSelection(fileName) {
	const basename = path.basename(fileName);
	const start = fileName.length - basename.length;
	const dot = basename.lastIndexOf('.');
	const exclusiveEndIndex = dot <= 0 ? fileName.length : start + dot;

	return [start, exclusiveEndIndex];
}

/* ============== Quick pick =============== */
async function chooseFolderQuickPick(root, callback, isAddRoot = true) {
	const { folderExclude } = getConfiguration();
	let folders = await getAllFileFolders(root, folderExclude);

	const folderList = [];
	isAddRoot && folderList.push({ label: '/', description: 'root' });
	folders.forEach((folder) => {
		const label = '/' + folder.replace(root, '');
		folderList.push({ label });
	});

	const quickPick = window.createQuickPick();
	quickPick.placeholder = PLACEHOLDERS.CHOOSE_FOLDER;
	quickPick.items = folderList;
	quickPick.matchOnDescription = true;
	quickPick.show();

	quickPick.onDidChangeSelection((folders) => {
		quickPick.hide();
		callback(root.slice(0, root.length - 1) + folders[0].label);
	});
}

async function chooseMultipleQuickPick(root, callback) {
	const { folderExclude } = getConfiguration();
	const listPath = await getAllFileFolders(root, folderExclude, true);

	const quickPick = window.createQuickPick();
	quickPick.canSelectMany = true;
	quickPick.matchOnDescription = true;
	quickPick.items = listPath.map((p) => ({
		label: `/${p.replace(root, '')}`,
		description:
			p[p.length - 1] === '/' || p[p.length - 1] === '\\' ? 'Dir' : '',
	}));

	quickPick.show();

	quickPick.onDidAccept(() => {
		quickPick.hide();
		const { selectedItems } = quickPick;
		callback(selectedItems.map((i) => i.label));
	});
}

async function newItemsInputBox(root) {
	const inputBox = window.createInputBox();
	const { separator, openFile } = getConfiguration();

	inputBox.placeholder = PLACEHOLDERS.NEW_ITEMS(separator);
	inputBox.show();
	inputBox.prompt = 'New Items';

	inputBox.onDidAccept(() => {
		inputBox.hide();
		newItemsWithPattern(inputBox.value, root, separator, openFile);
	});
}

async function templateQuickPick(callback) {
	const { templates = [] } = getConfiguration();
	const templateQP = templates.map((tp) => ({
		label: tp.label,
		detail: `${tp.desc} - ${tp.isPattern ? tp.pattern : tp.folderPath}`,
		description: tp.isPattern ? 'Pattern' : 'Clone Folder',
	}));

	const quickPick = window.createQuickPick();
	quickPick.items = templateQP;
	quickPick.matchOnDescription = true;
	quickPick.matchOnDetail = true;
	quickPick.placeholder = PLACEHOLDERS.CHOOSE_TEMPLATE;

	quickPick.show();
	quickPick.onDidChangeSelection((tmps) => {
		quickPick.hide();
		const selectedLabel = tmps[0].label;
		const template = templates.find((item) => item.label === selectedLabel);
		callback(template);
	});
}

/* ============== Util command =============== */
// dynoFileUtils.newItems
function newItems() {
	const root = getRootFolder();

	chooseFolderQuickPick(root, (folderPath) => {
		newItemsInputBox(folderPath);
	});
}

// dynoFileUtils.newItemsAtRoot
function newItemsAtRoot() {
	const root = getRootFolder();
	newItemsInputBox(root);
}

// dynoFileUtils.newItemsAtCurrentPath
function newItemsAtCurrentPath() {
	let root = getRootFolder();
	const activeTextEditor = getActiveTextEditorPath();

	if (activeTextEditor) {
		const { folderPath } = splitFileName(activeTextEditor);
		root = folderPath;
	}

	newItemsInputBox(root);
}

// dynoFileUtils.renameFile
async function renameFile() {
	const activeTextEditorPath = getActiveTextEditorPath();

	if (activeTextEditorPath) {
		const { folderPath, fileName: oldName } =
			splitFileName(activeTextEditorPath);

		const newName = await window.showInputBox({
			value: oldName,
			valueSelection: getFileNameSelection(oldName),
			prompt: 'New name',
			placeHolder: PLACEHOLDERS.RENAME_FILE(oldName),
		});

		if (!newName) return;

		const newFileName = newName?.trim();
		const specialChars = [...SPECIAL_CHARS];
		const isInvalidName = isContainSpecialChars(newFileName, specialChars);

		if (isInvalidName) {
			window.showErrorMessage(
				NOTIFICATIONS.CONTAIN_SPECIAL_CHARS(specialChars),
			);
		} else {
			const isExistFile = fs.existsSync(folderPath + newFileName);

			if (isExistFile) {
				window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
			} else {
				await workspace.fs.rename(
					vscode.Uri.file(activeTextEditorPath),
					vscode.Uri.file(folderPath + newFileName),
					{ overwrite: true },
				);
			}
		}
	}
}

// dynoFileUtils.deleteFile
function deleteFile() {
	const filePath = getActiveTextEditorPath();

	if (filePath) {
		confirmDeleteDialog((answer) => {
			if (answer === DELETE_ANSWERS.NO) return;
			deleteViaVscode(filePath);
		});
	}
}

// dynoFileUtils.deleteFolder
function deleteFolder() {
	const root = getRootFolder();

	chooseFolderQuickPick(
		root,
		(folderPath) => {
			confirmDeleteDialog((answer) => {
				if (answer === DELETE_ANSWERS.NO) return;
				deleteViaVscode(folderPath);
			});
		},
		false,
	);
}

// dynoFileUtils.deleteMutipleItems
function deleteMutipleItems() {
	const root = getRootFolder();
	chooseMultipleQuickPick(root, (pathList) => {
		confirmDeleteDialog((answer) => {
			if (answer === DELETE_ANSWERS.NO) return;
			pathList.forEach((path) => deleteViaVscode(root + path));
		});
	});
}

// dynoFileUtils.duplicate
async function duplicateFile() {
	const pathName = getActiveTextEditorPath();
	if (!pathName) return;

	const { fileName } = splitFileName(pathName);
	const root = getRootFolder();

	chooseFolderQuickPick(root, async (folderPath) => {
		const newFileName = await window.showInputBox({
			value: fileName,
			valueSelection: getFileNameSelection(fileName),
			placeHolder: PLACEHOLDERS.RENAME_FILE(fileName),
			prompt: 'Duplicate File',
		});

		const spc = [...SPECIAL_CHARS, '\\', '/'];
		if (isContainSpecialChars(newFileName, spc)) {
			window.showErrorMessage(NOTIFICATIONS.CONTAIN_SPECIAL_CHARS(spc));
		} else {
			const newPath = folderPath + newFileName;
			const isExistFile = fs.existsSync(newPath);
			if (isExistFile) {
				window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
			} else {
				fs.copyFileSync(pathName, newPath);
				openFileInWorkspace(newPath);
			}
		}
	});
}

// dynoFileUtils.moveFile
function moveFile() {
	const pathName = getActiveTextEditorPath();
	if (!pathName) return;

	const { fileName } = splitFileName(pathName);
	const root = getRootFolder();

	chooseFolderQuickPick(root, (folderPath) => {
		const newPath = folderPath + fileName;
		if (fs.existsSync(newPath)) {
			window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
		} else {
			workspace.fs.rename(vscode.Uri.file(pathName), vscode.Uri.file(newPath));
		}
	});
}

// dynoFileUtils.useTemplate
function useTemplate() {
	const root = getRootFolder();

	chooseFolderQuickPick(root, (parrentFolderPath) => {
		templateQuickPick((template) => {
			if (template) {
				const { isPattern, folderPath, pattern } = template;
				const { openFile, separator } = getConfiguration();

				if (isPattern) {
					newItemsWithPattern(pattern, parrentFolderPath, separator, openFile);
				} else {
					copyFolderRecursiveSync(folderPath, parrentFolderPath);
				}
			}
		});
	});
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let newItemsCmd = vscode.commands.registerCommand(
		'dynoFileUtils.newItems',
		newItems,
	);

	let newItemsAtRootCmd = vscode.commands.registerCommand(
		'dynoFileUtils.newItemsAtRoot',
		newItemsAtRoot,
	);

	let newItemsAtCurrentPathCmd = vscode.commands.registerCommand(
		'dynoFileUtils.newItemsAtCurrentPath',
		newItemsAtCurrentPath,
	);

	let renameFileCmd = vscode.commands.registerCommand(
		'dynoFileUtils.renameFile',
		renameFile,
	);

	let deleteFileCmd = vscode.commands.registerCommand(
		'dynoFileUtils.deleteFile',
		deleteFile,
	);

	let duplicateFileCmd = vscode.commands.registerCommand(
		'dynoFileUtils.duplicateFile',
		duplicateFile,
	);

	let moveFileCmd = vscode.commands.registerCommand(
		'dynoFileUtils.moveFile',
		moveFile,
	);

	let useTemplateCmd = vscode.commands.registerCommand(
		'dynoFileUtils.useTemplate',
		useTemplate,
	);

	let deleteFolderCmd = vscode.commands.registerCommand(
		'dynoFileUtils.deleteFolder',
		deleteFolder,
	);

	let deleteMutipleItemsCmd = vscode.commands.registerCommand(
		'dynoFileUtils.deleteMutipleItems',
		deleteMutipleItems,
	);

	context.subscriptions.push(newItemsCmd);
	context.subscriptions.push(newItemsAtRootCmd);
	context.subscriptions.push(newItemsAtCurrentPathCmd);
	context.subscriptions.push(renameFileCmd);
	context.subscriptions.push(deleteFileCmd);
	context.subscriptions.push(duplicateFileCmd);
	context.subscriptions.push(moveFileCmd);
	context.subscriptions.push(useTemplateCmd);
	context.subscriptions.push(deleteFolderCmd);
	context.subscriptions.push(deleteMutipleItemsCmd);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
