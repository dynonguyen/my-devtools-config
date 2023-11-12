let g:NERDTreeLimitedSyntax = 1

let g:WebDevIconsUnicodeDecorateFolderNodes = 1
let g:DevIconsEnableFoldersOpenClose = 1
let g:DevIconsEnableFolderExtensionPatternMatching = 1

let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1

let g:NERDTreeHighlightFolders = 1
let g:NERDTreeHighlightFoldersFullName = 1

let g:WebDevIconsUnicodeDecorateFolderNodesDefaultSymbol=''
let g:DevIconsDefaultFolderOpenSymbol=''

" filename extensions
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['json'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['js'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['jsx'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['tsx'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['ts'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['css'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['html'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['htm'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['md'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['ps1'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['vim'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['txt'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['sql'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['jpg'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['jpge'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['png'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['handlebars'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['hbs'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['pug'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['java'] = ''

" pattern file
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols['test'] = 'ﭧ'
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols['route'] = '數'

" exact filename / folder
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['public'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['hooks'] = 'ﯠ'
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['client'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['frontend'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['backend'] = '力'
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['server'] = '力'
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['scss'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['sass'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['assets'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['images'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['imgs'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['build'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['dist'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['settings'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['src'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['data'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['common'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['components'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['containers'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['pages'] = '爵'
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['helpers'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['apis'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['constants'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['styles'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['middleware'] = '擄'
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['scripts'] = ''

let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.gitignore'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['license'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['favicon.ico'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.vscode'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.editorconfig'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.env'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['package.json'] = ''

" file color
let s:yellow='F5D032'
let s:orange='EB4C2B'
let s:hbs='EA752D'
let s:react='61DAFB'
let s:ts='0fa5db'
let s:node='90C53F'

let g:NERDTreeExtensionHighlightColor = {}
let g:NERDTreeExtensionHighlightColor['hbs'] = s:hbs
let g:NERDTreeExtensionHighlightColor['js'] = s:yellow
let g:NERDTreeExtensionHighlightColor['jsx'] = s:react
let g:NERDTreeExtensionHighlightColor['tsx'] = s:ts
let g:NERDTreeExtensionHighlightColor['ts'] = s:ts 
let g:NERDTreeExtensionHighlightColor['java'] = s:orange

let g:NERDTreeExactMatchHighlightColor = {}
let g:NERDTreeExactMatchHighlightColor['.gitignore'] = s:orange
let g:NERDTreeExactMatchHighlightColor['.env'] = s:yellow
let g:NERDTreeExactMatchHighlightColor['package.json'] = s:node
