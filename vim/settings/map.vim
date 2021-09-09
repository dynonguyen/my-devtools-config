" ==== Prevent use arrow key when move
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

" ==== Auto pairs
inoremap " ""<left>
inoremap ' ''<left>
inoremap ` ``<left>
inoremap ( ()<left>
inoremap [ []<left>
inoremap { {}<left>

" ==== Switch between buffers
noremap <silent> <C-k> :wincmd k<CR>
noremap <silent> <C-j> :wincmd j<CR>
noremap <silent> <C-h> :wincmd h<CR>
noremap <silent> <C-l> :wincmd l<CR>

" ==== Switch between tabs airline
nnoremap <silent> tf :bfirst<CR>
nnoremap <silent> tn :bnext<CR>
nnoremap <silent> tp :bprevious<CR>
nnoremap <silent> tl :blast<CR>

" Quit buffer
map <silent> <C-q> :x<CR>
" Close current buffer and delete buffer
map <silent> <C-w> :w <bar> bd<CR> 
" Save
map <silent> <C-s> :w<CR> 
" Undo
map <silent> <C-z> u<CR> 
" Remove highlight 
nnoremap <silent> rh :nohl<CR>

" ==== NERDTree
" Redraw & refresh NERDtree
nnoremap <silent> <leader>l :redraw <bar> NERDTreeRefreshRoot<CR>
" Nerdtree
map <silent> <C-b> :NERDTreeToggle<CR>

" ==== Fzf
map <silent> <C-A-p> :Files<CR>
map <silent> <C-p> :GFiles<CR>
map <silent> <leader>h :History<CR>
map <silent> <leader>b :Buffer<CR>
map <silent> <leader>g :Rg<CR>

" ==== Leader mapping
" quit vim & save all files !
map <silent> <leader>q :xa!<CR> 
" Save all files
map <silent> <leader>s :wa!<CR>
" Close others buffer
map <silent> <leader>w :wa <bar> %bd <bar> e# <bar> bd# <CR>
" Split windows
nnoremap <leader>` :vsplit<CR>

" ==== File ultils
" Rename
nmap <F2> :call feedkeys(":Rename " . expand('%@'))<CR>
nmap <leader>r :call feedkeys(":Rename " . expand('%@'))<CR>
nmap <leader><del> :DelFile<CR>
nmap <leader>n :call feedkeys(":NewFile " . expand('%:p:h') . '\')<CR>
