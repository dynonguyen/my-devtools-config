function save_settings(){
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  cp $HOME/.zshrc $CONFIG_PATH/macos/zsh

  cp -rp $HOME/.warp/* $CONFIG_PATH/macos/warp
  defaults export dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  cd $CONFIG_PATH
  git add .
  git commit -m "Update"
  git push
}

function sync_settings() {
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME
  cp -rp $CONFIG_PATH/common/nvim/* $HOME/.config/nvim

  cp $CONFIG_PATH/macos/zsh/.zshrc $HOME/.zshrc

  cp -rp $CONFIG_PATH/macos/warp/* $HOME/.warp
  defaults import dev.warp.Warp-Stable $CONFIG_PATH/macos/warp/warp.config

  source $HOME/.zshrc
}