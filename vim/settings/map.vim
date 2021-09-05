" Prevent use arrow key when move
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

" Move between buffers
noremap <C-k> :wincmd k<CR>
noremap <C-j> :wincmd j<CR>
noremap <C-h> :wincmd h<CR>
noremap <C-l> :wincmd l<CR>

" Remove highlight 
nnoremap <leader>h :nohl<CR>

" Nerdtree
map <silent> <C-b> :NERDTreeToggle<CR>
nnoremap <silent> F :NERDTreeFind<CR>

" Split windows
nnoremap <leader>\ :vsplit<CR>
nnoremap <leader>/ :split<CR>

" Shortcut as VSC
map <silent> <C-w> :x<CR>
map <silent> <C-s> :w<CR>
map <silent> <C-z> u

" Others
nmap :so :source %<CR>
