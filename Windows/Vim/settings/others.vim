" ==== Color highlight vim-hexokinase
" Requied: make (choco install make) & Golang
let g:Hexokinase_highlighters = ['backgroundfull']
let g:Hexokinase_optInPatterns = 'full_hex,rgb,rgba,hsl,hsla,colour_names'

" ==== Close tag
let g:closetag_filenames = '*.html,*.js,*.jsx,*.tsx,*.ts,*.vue,*.hbs,*.handlebars'
let g:closetag_emptyTags_caseSensitive = 1
let g:jsx_ext_required = 0

" ==== Tagalong
let g:tagalong_filetypes = ['html', 'xml', 'jsx', 'tsx', 'eruby', 'ejs', 'eco', 'php', 'htmldjango', 'javascriptreact', 'typescriptreact']
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

" ==== Easymotion
let g:EasyMotion_do_mapping = 0 " Disable default mappings
" Turn on case-insensitive feature
let g:EasyMotion_smartcase = 1

" ==== MatchTagAlways
let g:mta_set_default_matchtag_color = 1
let g:mta_use_matchparen_group = 0
let g:mta_filetypes = {
    \ 'html' : 1,
    \ 'javascript' : 1,
    \ 'typescript': 1,
    \ 'javascriptreact': 1,
    \ 'typescriptreact': 1,
    \ '2html': 1
    \}



" List of colors that you do not want. ANSI code or #RRGGBB
let g:rainbow#blacklist = [233, 234]

" Highlight current line
let g:conoline_auto_enable = 1
let g:conoline_color_normal_dark = 'guibg=#37334D'
let g:conoline_color_insert_dark = 'guibg=#37334D'
let g:conoline_color_insert_nr_dark = 'guibg=#37334D guifg=#E9E640'
let g:conoline_color_normal_nr_dark = 'guibg=#37334D guifg=#E9E640'
