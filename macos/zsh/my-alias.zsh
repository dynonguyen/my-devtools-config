function trash() {
  mv -fv $@ ~/.Trash
}

function push_settings() {
  # Neovim
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  # Warp
  cp $HOME/.warp/keybindings.yaml $CONFIG_PATH/macos/warp
  cp -rp $HOME/.warp/themes/* $CONFIG_PATH/macos/warp/themes
  defaults export dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  # Zsh
  cp $HOME/.zshrc $CONFIG_PATH/macos/zsh
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh

  # VSCode snippets
  cp -rp /Users/dyno/Library/Application\ Support/Code/User/snippets/* $CONFIG_PATH/common/vscode/snippets

  # Auto commit & push
  currentPath=$(pwd)

  cd $CONFIG_PATH
  git add .
  git commit -m "Update"
  git push

  cd $currentPath
}

function pull_settings() {
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
  defaults import dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  # Zsh
  cp $CONFIG_PATH/macos/zsh/.zshrc $HOME/.zshrc
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME

  # VSCode snippets
  cp -rp $CONFIG_PATH/common/vscode/snippets/* /Users/dyno/Library/Application\ Support/Code/User/profiles/ce00a09/snippets
  cp -rp $CONFIG_PATH/common/vscode/snippets/* /Users/dyno/Library/Application\ Support/Code/User/snippets

  source $HOME/.zshrc
}

function find_bid() {
  local app_name="$1"
  osascript -e "id of app \"$app_name\""
}

function default_app() {
  local app_name="$1"
  local ext="$2"

  local app_id=$(find_bid "$app_name")

  duti -s "$app_id" "$ext" all
}
