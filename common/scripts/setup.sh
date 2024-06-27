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
