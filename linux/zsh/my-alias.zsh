alias clean_cache='su -c "echo Before; free -h | head -n 2; sync; echo 3 > /proc/sys/vm/drop_caches; echo After; free -h | head -n 2"'
alias swap_key='setxkbmap -option caps:swapescape'

alias svc_start='sudo systemctl start $@'
alias svc_stop='sudo systemctl stop $@'
alias svc_restart='sudo systemctl restart $@'
alias svc_status='systemctl status $@'

alias kde_keymapping='svi /usr/share/X11/xkb/symbols/pc'
alias ii='nohup dolphin $@ &'

function save_settings(){
  # Neovim
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  # Warp terminal
  cp $HOME/.config/warp-terminal/keybindings.yaml $CONFIG_PATH/linux/warp
  cp $HOME/.config/warp-terminal/user_preferences.json $CONFIG_PATH/linux/warp
  cp -rp $HOME/.local/share/warp-terminal/themes/* $CONFIG_PATH/linux/warp/themes

  # Zsh
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh
  cp $HOME/.zshrc $CONFIG_PATH/linux/zsh

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

  # Warp terminal
  mkdir -p $HOME/.local/share/warp-terminal/themes
  cp -rp $CONFIG_PATH/linux/warp/keybindings.yaml $HOME/.config/warp-terminal
  cp -rp $CONFIG_PATH/linux/warp/user_preferences.json $HOME/.config/warp-terminal
  cp -rp $CONFIG_PATH/linux/warp/themes/* $HOME/.local/share/warp-terminal/themes

  # Zsh
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME
  cp $CONFIG_PATH/linux/zsh/.zshrc $HOME/.zshrc

  source $HOME/.zshrc
}