" ==== Leader
let mapleader = "\<Space>"

" ==== Use one space, not two, after punctuation.
set nojoinspaces
set encoding=UTF-8
set mouse=a

" ==== Enable copy from vim to clipboard
if(has('win32'))
  set clipboard=unnamed
else
  set clipboard=unnamedplus
endif

" ==== Theme
colorscheme dracula
set background=dark
syntax on

" ==== Indent
set backspace=2   " Backspace deletes like most programs in insert mode
set nobackup
set nowritebackup
set noswapfile
set history=500
set ruler         " show the cursor position all the time
set showcmd       " display incomplete commands
set hlsearch
set incsearch     " do incremental searching
set laststatus=2  " Always display the status line
set autowrite     " Automatically :write before running commands
set autoindent
set smartindent

" ==== Softtabs, 2 spaces
set tabstop=2
set shiftwidth=2
set shiftround
set expandtab

set textwidth=80
set relativenumber
set number
set numberwidth=5

