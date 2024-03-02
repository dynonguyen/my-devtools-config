<img src="https://res.cloudinary.com/dynonary/image/upload/v1637850850/vscode-extension/dyno-file-utils/logo.png" alt="Logo" width="128" />

# Dyno File Utils - VSCode Extension

> The best way to create, copy, move, rename and delete files and folders (multiple files) & create templates.

Inspired by [File Utils VSCode Extension](https://github.com/sleistner/vscode-fileutils)

---

## Features

- Create a file / folder.
- Create multiple files / folders.
- Create nested files/folders.
- Create files/folders at root (at current path).
- Delete a file / folder.
- Delete mutiple files / folders.
- Rename a file.
- Duplicate / Move file.
- Create a project with a template.

## Configuration

> Open file settings.json:

- `dynoFileUtils.confirmDelete - boolean`: Controls whether file utils should ask for confirmation when deleting a file.

![Confirm Delete](https://res.cloudinary.com/dynonary/image/upload/v1637835344/vscode-extension/dyno-file-utils/zww9hhuvk8zbrdnhb1sd.png)

- `dynoFileUtils.folderExclude - [String]`: Configure glob for excluding folders when searching.

- `dynoFileUtils.separator - string`: Separator when you create multiple files/folders.

- `dynoFileUtils.expandSeparator - string`: Separator when you create multiple files/folders with Brace Expansion. `Note` that it must be different from the `separator`.

- `dynoFileUtils.openFile - boolean`: Should be open file when done.

![Popup Title](https://res.cloudinary.com/dynonary/image/upload/v1637839649/vscode-extension/dyno-file-utils/pimhajo45mpxqdrgk7mk.png)

- `dynoFileUtils.templates [Object]`: Create folder templates quickly in 2 ways
  - folderPath (isPattern: false): Copy your template folder path here.
  - pattern (isPattern: true): Pattern to create template.

![Configuration](https://res.cloudinary.com/dynonary/image/upload/v1637938688/vscode-extension/dyno-file-utils/i8knmye3tzbh9ulnomfr.jpg)

## How To Use

### 1. Using the command palette:

- Bring up the command palette, and select `File Utils`.
- Select one of the commands mentioned below.
- Press `Enter` to confirm, or `Escape` to cancel.

![Use Command Palette](https://res.cloudinary.com/dynonary/image/upload/v1637840706/vscode-extension/dyno-file-utils/qbe6prmgyynwbyidclsz.png)

### 2. Use Keyboard shortcuts

- Open Keyboard shortcuts `Ctrl+k Ctrl+s`
- Search `File Utils`.
- Add your key binding then use it.

![Use Keyboard Shortcut](https://res.cloudinary.com/dynonary/image/upload/v1637840705/vscode-extension/dyno-file-utils/looufamdyx3xmg4nu6oc.png)

## Demo

### Create a file / folder

![Demo](https://res.cloudinary.com/dynonary/image/upload/v1637841906/vscode-extension/dyno-file-utils/p8hjkjjgqoxsvauocdxf.gif)

### Create multiple files / folder

Example input

```
input.html, style.css, script.js, public/styles/scss/index.scss, public/lib/js/, public/lib/css/
```

Will generate the following files

```bash
/demo
├── public
│   ├── lib
│   ├── styles
|   |---|-- scss
|   |-------|-- index.scss
│   └── js
│   └── css
├── index.cpp
├── index.scss
└── index.ts
```

![Demo](https://res.cloudinary.com/dynonary/image/upload/v1637842397/vscode-extension/dyno-file-utils/e8njqzysrnqkaydxek9t.gif)

### Brace Expansion

> Brace expansion is a mechanism by which arbitrary strings may be generated.

Example file name input (separator = "," & expandSeparator = "|")

```
tmp/a/{index|script|style-1|style-2}{js|css}
```

```
/tmp
├── a
│   ├── index.js
│   ├── script.js
│   └── style-1.css
│   └── style-2.css
```

### Rename & delete a file

![Demo](https://res.cloudinary.com/dynonary/image/upload/v1637843324/vscode-extension/dyno-file-utils/qsoid8gbahpixodnepcd.gif)

### Duplicate / Move a file

![Demo](https://res.cloudinary.com/dynonary/image/upload/v1637843814/vscode-extension/dyno-file-utils/bwrirlr41niyvut6vq7l.gif)

### Create a template

![Demo](https://res.cloudinary.com/dynonary/image/upload/v1637848103/vscode-extension/dyno-file-utils/ynqfagzya8p9k1bsheru.gif)

## Changelog

- https://github.com/TuanNguyen2504/coding-tool-config/blob/windows/vscode/my-extensions/file-utils/CHANGELOG.md

## Disclaimer

> **Important**: This extension due to the nature of it's purpose will create files on your hard drive and if necessary create the respective folder structure. While it should not override any files during this process, I'm not giving any guarantees or take any responsibility in case of lost data.

## License

MIT @Dyno Nguyen

## Acknowledgements

- Logo [Folder App Icon by Avian Rizky](https://dribbble.com/shots/16139947-Folder-App-Icon)

- Inspired by [File Utils VSCode Extension](https://github.com/sleistner/vscode-fileutils)
