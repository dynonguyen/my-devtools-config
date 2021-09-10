" ==== Color highlight vim-hexokinase
" Requied: make (choco install make) & Golang
let g:Hexokinase_highlighters = ['backgroundfull']
let g:Hexokinase_optInPatterns = 'full_hex,rgb,rgba,hsl,hsla,colour_names'

" ==== Close tag
let g:closetag_filenames = '*.html,*.js,*.jsx,*.vue'
let g:closetag_emptyTags_caseSensitive = 1
let g:jsx_ext_required = 0

" ==== Tagalong
let g:tagalong_filetypes = ['html', 'xml', 'jsx', 'eruby', 'ejs', 'eco', 'php', 'htmldjango', 'javascriptreact', 'typescriptreact']
let g:tagalong_additional_filetypes = ['javascript', 'typescript']

" ==== NERDcommenter
let g:NERDSpaceDelims = 1
let g:NERDToggleCheckAllLines = 1
let g:NERDCreateDefaultMappings = 1
let g:NERDCommentEmptyLines = 1
let g:NERDDefaultAlign = 'right'

" ==== Indent rainbow
let g:indentLine_enabled = 1
let g:indentLine_char = '.'
let g:indentLine_concealcursor = 'inc'
let g:indentLine_conceallevel = 1
