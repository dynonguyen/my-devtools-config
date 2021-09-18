let g:NERDTreeLimitedSyntax = 1

let g:WebDevIconsUnicodeDecorateFolderNodes = 1
let g:DevIconsEnableFoldersOpenClose = 1
let g:DevIconsEnableFolderExtensionPatternMatching = 1
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeHighlightFoldersFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1

let g:WebDevIconsUnicodeDecorateFolderNodesDefaultSymbol=''
let g:DevIconsDefaultFolderOpenSymbol=''

" filename extensions
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['json'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['js'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['jsx'] = ''
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

" pattern file
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols['.test.'] = 'ﭧ'

" exact filename / folder
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['public'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['client'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['frontend'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['backend'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['server'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['scss'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['build'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['assets'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['images'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['image'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['imgs'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['dist'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.gitignore'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['license'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['favicon.ico'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['settings'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.vscode'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.editorconfig'] = ''
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['.env'] = ''

" folder color
let s:yellow='FBC02D'
let s:orange='EB4C2B'
let s:hbs='EA752D'

let g:NERDTreeExtensionHighlightColor = {} " this line is needed to avoid error
let g:NERDTreeExtensionHighlightColor['hbs'] = s:hbs " sets the color of css files to blue
let g:NERDTreeExtensionHighlightColor['js'] = s:yellow " sets the color of css files to blue

let g:NERDTreeExactMatchHighlightColor = {}
let g:NERDTreeExactMatchHighlightColor['.gitignore'] = s:orange
let g:NERDTreeExactMatchHighlightColor['.env'] = s:yellow
