const vscode = require('vscode');
const { promises: fsPromise } = require('fs');
const fs = require('fs');
const path = require('path');

/* ============== Contanst =============== */
const DEFAULT_SEPARATOR = ',';
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
const QUICK_PICK_TITLE = {
	NEW_ITEMS: 'New Items',
	USE_TEMPLATE: 'Use Template',
	REANME: 'Rename File',
	DUPLICATE_FILE: 'Duplicate File',
};

/* ============== Helper function =============== */
function isContainSpecialChars(pathName, specialChars = SPECIAL_CHARS) {
	for (const c of specialChars) {
		if (pathName.indexOf(c) !== -1) return true;
	}
	return false;
}

function isExistExcludeFolder(folderExclude = [], folderName) {
	for (let ef of folderExclude) {
		if (folderName.indexOf(ef) !== -1) return true;
	}

	return false;
}

async function getAllFolders(root, folderExclude = []) {
	const entries = await fsPromise.readdir(root, { withFileTypes: true });
	const result = [];

	const folders = entries.filter((folder) => folder.isDirectory());

	for (const folder of folders) {
		const { name } = folder;

		if (!isExistExcludeFolder(folderExclude, name)) {
			const combinePath = `${root}${name}/`;
			result.push(combinePath);
			result.push(...(await getAllFolders(combinePath, folderExclude)));
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
		.trim()
		.split(separator)
		.map((item) => item.trim());

	nameList.forEach((path) => {
		if (path.trim().length !== 0) {
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
	vscode.workspace
		.openTextDocument(filePath)
		.then((_doc) => vscode.window.showTextDocument(_doc));
}

function getConfiguration() {
	const {
		openFile = true,
		separator = DEFAULT_SEPARATOR,
		folderExclude = [],
		confirmDelete,
		templates,
		showPopupTitle,
	} = vscode.workspace.getConfiguration('dynoFileUtils');

	return {
		openFile,
		separator,
		folderExclude,
		confirmDelete,
		templates,
		showPopupTitle,
	};
}

function getRootFolder() {
	return vscode.workspace.workspaceFolders[0].uri.path.slice(1) + '/';
}

function getActiveTextEditorPath() {
	const { activeTextEditor } = vscode.window;
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

function newItemsWithPattern(pattern, root, separator, openFile) {
	const { files, folders } = splitFilePath(pattern, separator);

	// create all folders before creating files (nested file)
	folders.forEach((folderPath) => {
		if (!isContainSpecialChars(folderPath)) {
			createFolder(root + folderPath);
		} else {
			vscode.window.showErrorMessage(NOTIFICATIONS.CONTAIN_SPECIAL_CHARS());
		}
	});

	// Create all files
	files.forEach((filePath) => {
		if (!isContainSpecialChars(filePath)) {
			const rootFilePath = root + filePath;
			createFile(rootFilePath);

			openFile && openFileInWorkspace(rootFilePath);
		} else {
			vscode.window.showErrorMessage(NOTIFICATIONS.CONTAIN_SPECIAL_CHARS());
		}
	});
}

function deleteViaVscode(filePath) {
	vscode.workspace.fs.delete(vscode.Uri.file(filePath), {
		useTrash: true,
		recursive: true,
	});
}

function deleteWarningDialog(filePath, isFile = true) {
	const { confirmDelete } = getConfiguration();

	if (confirmDelete) {
		vscode.window
			.showWarningMessage(
				`Are you sure to delete this ${isFile ? 'file' : 'folder'} ?`,
				...['No', 'Yes', "Yes & Don't show again"],
			)
			.then((answer) => {
				if (answer === 'Yes') {
					deleteViaVscode(filePath);
				} else if (answer === `Yes & Don't show again`) {
					deleteViaVscode(filePath);
					vscode.workspace
						.getConfiguration()
						.update('dynoFileUtils.confirmDelete', false, true);
				}
			});
	} else {
		deleteViaVscode(filePath);
	}
}

/* ============== Quick pick =============== */
async function chooseFolderQuickPick(root, callback, isAddRoot = true) {
	const { folderExclude } = getConfiguration();
	let folders = await getAllFolders(root, folderExclude);

	const folderList = [];
	isAddRoot && folderList.push({ label: '/', description: 'root' });
	folders.forEach((folder) => {
		const label = '/' + folder.replace(root, '');
		folderList.push({ label });
	});

	const quickPick = vscode.window.createQuickPick();
	quickPick.placeholder = PLACEHOLDERS.CHOOSE_FOLDER;
	quickPick.items = folderList;
	quickPick.matchOnDescription = true;
	quickPick.show();

	quickPick.onDidChangeSelection((folders) => {
		quickPick.hide();
		callback(root.slice(0, root.length - 1) + folders[0].label);
	});
}

async function newItemsQuickPick(root) {
	const quickPick = vscode.window.createQuickPick();
	const { separator, openFile, showPopupTitle } = getConfiguration();

	quickPick.placeholder = PLACEHOLDERS.NEW_ITEMS(separator);
	if (showPopupTitle) quickPick.title = QUICK_PICK_TITLE.NEW_ITEMS;
	quickPick.show();

	quickPick.onDidAccept(() => {
		quickPick.hide();
		newItemsWithPattern(quickPick.value, root, separator, openFile);
	});
}

async function templateQuickPick(callback) {
	const { templates = [], showPopupTitle } = getConfiguration();
	const templateQP = templates.map((tp) => ({
		label: tp.label,
		detail: `${tp.desc} - ${tp.isPattern ? tp.pattern : tp.folderPath}`,
		description: tp.isPattern ? 'Pattern' : 'Clone Folder',
	}));

	const quickPick = vscode.window.createQuickPick();
	quickPick.items = templateQP;
	quickPick.matchOnDescription = true;
	quickPick.matchOnDetail = true;
	quickPick.placeholder = PLACEHOLDERS.CHOOSE_TEMPLATE;
	if (showPopupTitle) quickPick.title = QUICK_PICK_TITLE.USE_TEMPLATE;

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
		newItemsQuickPick(folderPath);
	});
}

// dynoFileUtils.newItemsAtRoot
function newItemsAtRoot() {
	const root = getRootFolder();
	newItemsQuickPick(root);
}

// dynoFileUtils.newItemsAtCurrentPath
function newItemsAtCurrentPath() {
	let root = getRootFolder();
	const activeTextEditor = getActiveTextEditorPath();

	if (activeTextEditor) {
		const { folderPath } = splitFileName(activeTextEditor);
		root = folderPath;
	}

	newItemsQuickPick(root);
}

// dynoFileUtils.renameFile
function renameFile() {
	const activeTextEditorPath = getActiveTextEditorPath();

	if (activeTextEditorPath) {
		const { folderPath, fileName: oldName } =
			splitFileName(activeTextEditorPath);

		const { showPopupTitle } = getConfiguration();

		const quickPick = vscode.window.createQuickPick();
		quickPick.placeholder = PLACEHOLDERS.RENAME_FILE(oldName);
		if (showPopupTitle) quickPick.title = QUICK_PICK_TITLE.REANME;

		quickPick.show();

		quickPick.onDidAccept(async () => {
			quickPick.hide();

			const newFileName = quickPick.value.trim();
			const specialChars = [...SPECIAL_CHARS, '/', '\\'];
			const isInvalidName = isContainSpecialChars(newFileName, specialChars);

			if (isInvalidName) {
				vscode.window.showErrorMessage(
					NOTIFICATIONS.CONTAIN_SPECIAL_CHARS(specialChars),
				);
			} else {
				const isExistFile = fs.existsSync(folderPath + newFileName);

				if (isExistFile) {
					vscode.window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
				} else {
					await vscode.workspace.fs.rename(
						vscode.Uri.file(activeTextEditorPath),
						vscode.Uri.file(folderPath + newFileName),
						{ overwrite: true },
					);
				}
			}
		});
	}
}

// dynoFileUtils.deleteFile
function deleteFile() {
	const filePath = getActiveTextEditorPath();

	if (filePath) {
		deleteWarningDialog(filePath, true);
	}
}

// dynoFileUtils.duplicate
async function duplicateFile() {
	const pathName = getActiveTextEditorPath();
	if (!pathName) return;

	const { fileName } = splitFileName(pathName);
	const root = getRootFolder();

	chooseFolderQuickPick(root, (folderPath) => {
		const { showPopupTitle } = getConfiguration();
		const quickPick = vscode.window.createQuickPick();
		quickPick.placeholder = PLACEHOLDERS.RENAME_FILE(fileName);
		quickPick.value = fileName;
		if (showPopupTitle) quickPick.title = QUICK_PICK_TITLE.DUPLICATE_FILE;

		quickPick.show();

		quickPick.onDidAccept(() => {
			quickPick.hide();
			const newFileName = quickPick.value;

			const spc = [...SPECIAL_CHARS, '\\', '/'];
			if (isContainSpecialChars(newFileName, spc)) {
				vscode.window.showErrorMessage(
					NOTIFICATIONS.CONTAIN_SPECIAL_CHARS(spc),
				);
			} else {
				const newPath = folderPath + newFileName;
				const isExistFile = fs.existsSync(newPath);
				if (isExistFile) {
					vscode.window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
				} else {
					fs.copyFileSync(pathName, newPath);
				}
			}
		});
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
			vscode.window.showErrorMessage(NOTIFICATIONS.FILE_EXISTS);
		} else {
			vscode.workspace.fs.rename(
				vscode.Uri.file(pathName),
				vscode.Uri.file(newPath),
			);
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

// dynoFileUtils.deleteFolder
function deleteFolder() {
	const root = getRootFolder();

	chooseFolderQuickPick(
		root,
		(folderPath) => {
			deleteWarningDialog(folderPath, false);
		},
		false,
	);
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

	context.subscriptions.push(newItemsCmd);
	context.subscriptions.push(newItemsAtRootCmd);
	context.subscriptions.push(newItemsAtCurrentPathCmd);
	context.subscriptions.push(renameFileCmd);
	context.subscriptions.push(deleteFileCmd);
	context.subscriptions.push(duplicateFileCmd);
	context.subscriptions.push(moveFileCmd);
	context.subscriptions.push(useTemplateCmd);
	context.subscriptions.push(deleteFolderCmd);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
