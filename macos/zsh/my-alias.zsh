function save_settings(){
  # Neovim
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  # Warp
  cp $HOME/.warp/keybindings.yaml $CONFIG_PATH/macos/warp
  cp -rp $HOME/.warp/themes/* $CONFIG_PATH/macos/warp/themes
  defaults export dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  # Zsh
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh
  cp $HOME/.zshrc $CONFIG_PATH/macos/zsh

  # Auto commit & push
  currentPath=$(pwd)

  cd $CONFIG_PATH
  git add .
  git commit -m "Update"
  git push

  cd $currentPath
}

function sync_settings() {
  # Neovim
  cp -rp $CONFIG_PATH/common/nvim/* $HOME/.config/nvim

  # Warp
  cp -rp $CONFIG_PATH/macos/warp/themes/* $HOME/.warp/themes
  cp -rp $CONFIG_PATH/macos/warp/keybindings.yaml $HOME/.warp
  defaults import dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  # Zsh
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME
  cp $CONFIG_PATH/macos/zsh/.zshrc $HOME/.zshrc

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