" Plug 'voldikss/vim-floaterm'    " Quick open sub terminal

let g:floaterm_position = 'center'
let g:floaterm_width = 0.6
let g:floaterm_height = 0.6
let g:floaterm_title = 'Terminal $1/$2'
let g:floaterm_wintype = 'float'
let g:floaterm_rootmarkers = ['.pro']
if has('win32')
	let g:floaterm_shell = 'powershell'
endif

" Set color
hi Floaterm guibg=#1E1C2A
hi FloatermBorder guifg=#E659A9

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Hotkey to manage terminals
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <silent> <leader>to :FloatermNew<CR>
tnoremap <silent> <leader>to <C-\><C-n>:FloatermNew<CR>
" Kill current terminal 
nnoremap <silent>	<leader>tk :FloatermKill<CR>:FloatermPrev<CR>
tnoremap <silent>	<leader>tk <C-\><C-n>:FloatermKill<CR>:FloatermPrev<CR>
" Navigation next and previous terminal 
nnoremap <silent> <leader>tn :FloatermNext<CR>
tnoremap <silent> <leader>tn <C-\><C-n>:FloatermNext<CR>
nnoremap <silent> <leader>tp :FloatermPrev<CR>
tnoremap <silent> <leader>tp <C-\><C-n>:FloatermPrev<CR>
" Toggle terminal
nnoremap <silent> <leader>tt :FloatermToggle<CR>
tnoremap <silent>	<leader>tt <C-\><C-n>:FloatermToggle<CR>
" Focus terminal 
nnoremap <silent>	<leader>tf <C-\><C-n><C-W><Left>
tnoremap <silent> <leader>tf <C-\><C-n><C-W><Left>

