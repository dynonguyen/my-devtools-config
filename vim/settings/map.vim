" ==== Prevent use arrow key when move
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

" ==== scroll
noremap <C-d> 10j
noremap <C-u> 10k

" ==== Switch between buffers
noremap <silent> <C-k> :wincmd k<CR>
noremap <silent> <C-j> :wincmd j<CR>
noremap <silent> <C-h> :wincmd h<CR>
noremap <silent> <C-l> :wincmd l<CR>

" ==== Switch between tabs airline
nnoremap <silent> <Tab> :bnext<CR>
nnoremap <silent> <S-tab> :bprevious<CR>

" ==== AS Visual Code
" Quit buffer
map <silent> <C-q> :x<CR>
" Close current buffer and delete buffer
map <silent> <C-w> :w <bar> bd<CR>
" Save
nnoremap <silent> <C-s> :w <bar> echo ""<CR> 
inoremap <C-s> <Esc> :w <bar> echo ""<CR> 
" Select all
nnoremap <silent> <C-a> gg^vG$<CR>
inoremap <silent> <C-a> <Esc> gg^vG$<CR>
" Undo
map <silent> <C-z> u<CR> 
" Remove highlight 
nnoremap <silent> rh :nohl<CR>
" Move line
nnoremap <A-j> :m .+1<CR>
nnoremap <A-k> :m .-2<CR>
inoremap <A-j> <Esc>:m .+1<CR>
inoremap <A-k> <Esc>:m .-2<CR>
vnoremap <A-j> :m '>+1<CR>
vnoremap <A-k> :m '<-2<CR>
" Copy & move line
nnoremap <A-S-k> yy <bar> P <bar> j <CR>
nnoremap <A-S-j> yy <bar> p <bar> k <CR>

" ==== NERDTree
" Redraw & refresh NERDtree
nnoremap <silent> <leader>l :redraw <bar> NERDTreeRefreshRoot<CR>
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
nmap <leader><F2> :call feedkeys(":Rename " . expand('%@'))<CR>
nmap <leader><del> :DelFile<CR>
nmap <leader>n :call feedkeys(":NewFile " . expand('%:p:h') . '\')<CR>
