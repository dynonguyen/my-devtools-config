#!/bin/sh

# Git
git config --global core.editor "nvim"
git config --global push.autoSetupRemote true
git config --global credential.helper store
git config --global merge.ff false
git config --global pull.ff yes
git config --global user.email tuannguyentn2504@gmail.com
git config --global core.excludesFile '~/.gitignore'
git config --global init.defaultBranch main

# Install vim plug
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
      https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
