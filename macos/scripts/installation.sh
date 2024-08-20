#!/bin/sh

CONFIG_PATH=$HOME/Developer/personal/my-devtools-config

# Ultilities
# duti - set default app
# folderify - generate macOS folders icon
# eza - A modern, maintained replacement for ls
# bat - A cat(1) clone with wings
brew install duti folderify eza bat tlrc

# Common packages
sh $CONFIG_PATH/common/script/installation.sh
