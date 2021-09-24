set nocompatible

call plug#begin('~/AppData/Local/nvim/plugged')
  " Theme
  Plug 'artanikin/vim-synthwave84'

  " syntax highlight
  Plug 'sheerun/vim-polyglot'

  " Autosuggestion
  Plug 'neoclide/coc.nvim', {'branch': 'release'}

  " Support
  Plug 'andrewradev/tagalong.vim' " auto rename tag
  Plug 'tpope/vim-commentary'     " Quick comment
  Plug 'yggdroot/indentline'      " Indent
  Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }   " Color highlight (can use coc-highlight)
  Plug 'chun-yang/auto-pairs'     " Auto pair (can use coc-pairs)
  Plug 'editorconfig/editorconfig-vim' " Editorconfig
  Plug 'tpope/vim-surround'       " Wrapper tag, brackets
  Plug 'easymotion/vim-easymotion' " Quick move  Plug 'terryma/vim-multiple-cursors'
  Plug 'valloric/matchtagalways'   " Matching html tag
  Plug 'alvan/vim-closetag'
  Plug 'rodrigore/coc-tailwind-intellisense', {'do': 'npm install'},

  " File browser
	Plug 'preservim/nerdtree', { 'on':  'NERDTreeToggle' }
  Plug 'ryanoasis/vim-devicons', { 'on': 'NERDTreeToggle' }
	Plug 'tiagofumo/vim-nerdtree-syntax-highlight', { 'on': 'NERDTreeToggle' }
  
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
