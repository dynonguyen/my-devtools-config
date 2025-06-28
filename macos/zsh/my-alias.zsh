function push-my-settings() {
  # Neovim
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  # Warp
  cp $HOME/.warp/keybindings.yaml $CONFIG_PATH/macos/warp
  cp -rp $HOME/.warp/themes/* $CONFIG_PATH/macos/warp/themes

  # Zsh
  cp $HOME/.gitignore $CONFIG_PATH/common/zsh/.gitignore-global
  cp $HOME/.zshrc $CONFIG_PATH/macos/zsh
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh

  # VSCode snippets
  cp -rp $HOME/Library/Application\ Support/Code/User/snippets/* $CONFIG_PATH/common/vscode/snippets
  cp -rp $HOME/Library/Application\ Support/Code/User/settings.json $CONFIG_PATH/common/vscode/settings
  cp -rp $HOME/Library/Application\ Support/Code/User/keybindings.json $CONFIG_PATH/common/vscode/settings
  cp -rp $HOME/Library/Application\ Support/Code/User/profiles/ce00a09/settings.json $CONFIG_PATH/common/vscode/settings/profiles/ce00a09
  cp -rp $HOME/Library/Application\ Support/Code/User/profiles/ce00a09/keybindings.json $CONFIG_PATH/common/vscode/settings/profiles/ce00a09

  # Auto commit & push
  currentPath=$(pwd)

  cd $CONFIG_PATH
  git add .
  git commit -m "Update"
  git push

  cd $currentPath
}

function pull-my-settings() {
  # Pull setting from github
  currentPath=$(pwd)
  cd $CONFIG_PATH
  git pull
  cd $currentPath

  # Neovim
  cp -rp $CONFIG_PATH/common/nvim/* $HOME/.config/nvim

  # Warp
  cp -rp $CONFIG_PATH/macos/warp/themes/* $HOME/.warp/themes
  cp -rp $CONFIG_PATH/macos/warp/keybindings.yaml $HOME/.warp

  # Zsh
  cp $CONFIG_PATH/common/zsh/.gitignore-global $HOME/.gitignore
  cp $CONFIG_PATH/macos/zsh/.zshrc $HOME/.zshrc
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME/.p10k.zsh

  source $HOME/.zshrc
}

function gopen() {
  open $(git config remote.origin.url)
}

function find-bid() {
  local app_name="$1"
  osascript -e "id of app \"$app_name\""
}

function default-app() {
  local app_name="$1"
  local ext="$2"

  local app_id=$(find-bid "$app_name")

  duti -s "$app_id" "$ext" all
}
