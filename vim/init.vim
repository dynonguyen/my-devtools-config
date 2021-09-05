call plug#begin('~/AppData/Local/nvim/plugged')
  " Theme
	Plug 'dracula/vim'

  " File browser
	Plug 'preservim/nerdtree'
	Plug 'Xuyuanp/nerdtree-git-plugin'
	Plug 'ryanoasis/vim-devicons'
	Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
  
  " Git
  Plug 'tpope/vim-fugitive'
 
  " Status bar
  Plug 'vim-airline/vim-airline'
  Plug 'vim-airline/vim-airline-themes'
call plug#end()

" ==========================
" Load settings
" ==========================
let nvim_settings_dir = '~\AppData\Local\nvim\settings\'

execute 'source '.nvim_settings_dir.'general.vim'
execute 'source '.nvim_settings_dir.'plugin.vim'
execute 'source '.nvim_settings_dir.'map.vim'
