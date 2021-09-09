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