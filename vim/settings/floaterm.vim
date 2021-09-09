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

