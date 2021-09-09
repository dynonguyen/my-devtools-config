set nocompatible

call plug#begin('~/AppData/Local/nvim/plugged')
  " Theme
  Plug 'artanikin/vim-synthwave84'

  " syntax highlight
  Plug 'sheerun/vim-polyglot'

  " Autosuggestion
  Plug 'neoclide/coc.nvim', {'branch': 'release'}

  " Support
  Plug 'alvan/vim-closetag'       " auto close tag
  Plug 'andrewradev/tagalong.vim' " auto rename tag
  Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }   " Color highlight
  Plug 'tpope/vim-commentary'     " Quick comment
  Plug 'yggdroot/indentline'      " Indent

  " File browser
	Plug 'preservim/nerdtree'
	Plug 'ryanoasis/vim-devicons'
	Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
  
  " Git
  Plug 'tpope/vim-fugitive'           " As Git Blame
	Plug 'Xuyuanp/nerdtree-git-plugin'  " Show git status in nerdtree

  " Status bar
  Plug 'vim-airline/vim-airline'
  Plug 'vim-airline/vim-airline-themes'

  " Fuzzy finder
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'junegunn/fzf.vim'
call plug#end()

" ==========================
" Load settings and scripts
" ==========================
for f in split(glob('~\AppData\Local\nvim\settings\*.vim'), '\n')
    exe 'source' f
endfor

for f in split(glob('~\AppData\Local\nvim\scripts\*.vim'), '\n')
    exe 'source' f
endfor
