" ==== NERDTree ====
autocmd VimEnter * NERDTree " Start NERDTree and leave the cursor in it.
let NERDTreeShowHidden=1
let NERDTreeMinimalUI=1
let g:NERDTreeDirArrowExpandable = ''
let g:NERDTreeDirArrowCollapsible = ''

" Exclude folder/file
let g:NERDTreeIgnore = ['node_modules[[dir]]', '.git[[dir]]']

" Git status icon
let g:NERDTreeGitStatusIndicatorMapCustom = {
                \ 'Modified'  :'✗',
                \ 'Staged'    :'✚',
                \ 'Untracked' :'✭',
                \ 'Renamed'   :'➜',
                \ 'Unmerged'  :'═',
                \ 'Deleted'   :'✖',
                \ 'Dirty'     :'✗',
                \ 'Ignored'   :'☒',
                \ 'Clean'     :'✔︎',
                \ 'Unknown'   :'?',
                \ }

" ==== Vim devicons ====
let g:WebDevIconsUnicodeDecorateFolderNodes = 1
let g:DevIconsEnableFoldersOpenClose = 1
let g:DevIconsEnableFolderExtensionPatternMatching = 1
let g:NERDTreeFileExtensionHighlightFullName = 1

let g:WebDevIconsUnicodeDecorateFolderNodesDefaultSymbol=''
let g:DevIconsDefaultFolderOpenSymbol=''

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

" pattern file
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesPatternSymbols['.test.'] = 'ﭧ'

" exact filename / folder
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExactSymbols['node_modules'] = ''
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

" ==== Airline ====
let g:airline#extensions#tabline#enabled = 1
let g:airline_theme='dracula'
let g:airline_powerline_fonts = 1
let g:airline#extensions#branch#enabled = 1
let g:airline#extensions#tabline#left_sep = ' ' 					" Enable Tab seperator 
let g:airline#extensions#tabline#left_alt_sep = '|' 				" Enable Tab seperator
let g:airline#extensions#tabline#formatter = 'default'
let g:airline#extensions#whitespace#enabled = 0  					" Remove warning whitespace"
