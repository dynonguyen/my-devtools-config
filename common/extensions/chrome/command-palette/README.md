# Dyno Command Palette

> Explore Chrome effortlessly with a powerful command palette 🚀

Powerful Management Extension for Chrome:

This extension empowers you to take complete control over your Chrome browsing experience by offering comprehensive management tools for bookmarks, extensions, history, tabs, and commands, etc. Inspired by VSCode command palette and Raycast.

**Key Features**:

- **Bookmarks**: Quickly access, search, and manage your bookmarks.
- **Extensions**: Easily enable, disable, and manage your installed extensions.
- **History**: Search and navigate through your browsing history with ease.
- **Tabs**: Manage your open tabs, switch between them, and close them effortlessly.
- **Commands**: Execute commands to enhance your browsing experience (e.g., open new tabs, close current tab, detach windows, merge windows, etc.).
- **Navigation**: Navigate to chrome:// pages quickly and efficiently.
- **Cookies**: View and manage (create, update, delete) cookies.
- **Local Storage**: Access and manipulate local storage data.
- **Internet query**: Quickly search via Google, Youtube, Translate, Oxford, Cambridge.
- **Aliases**: Create and manage aliases for quick access to frequently used commands.

## Start Development

- Update `content_scripts` in `manifest.json`

```json
"content_scripts": [
    {
      "matches": ["http://localhost/*"],
      "js": ["content/index.js"],
      "css": ["content/index.css"]
    }
  ]
```

- Uncomment block code under "Dev mode: uncomment to reload extension on click" in `background/main.ts`

- Build extension on your local machine

```bash
yarn install
yarn dev
```

- Open google chrome and navigate to [`chrome://extensions/`](chrome://extensions/)
- Click on `Load unpacked` and select the `build` folder in the project root
- Try now
