alias clean_cache='su -c "echo Before; free -h | head -n 2; sync; echo 3 > /proc/sys/vm/drop_caches; echo After; free -h | head -n 2"'
alias swap_key='setxkbmap -option caps:swapescape'

alias svc_start='sudo systemctl start $@'
alias svc_stop='sudo systemctl stop $@'
alias svc_restart='sudo systemctl restart $@'
alias svc_status='systemctl status $@'

alias kde_keymapping='svi /usr/share/X11/xkb/symbols/pc'
alias ii='nohup dolphin $@ &'

function save_settings(){
  cp $HOME/.p10k.zsh $CONFIG_PATH/common/zsh
  cp -rp $HOME/.config/nvim/* $CONFIG_PATH/common/nvim

  cp $HOME/.zshrc $CONFIG_PATH/linux/zsh

  cp -rp $HOME/.config/warp-terminal/* $CONFIG_PATH/linux/warp

  currentPath=$(pwd)

  cd $CONFIG_PATH
  git add .
  git commit -m "Update"
  git push

  cd $currentPath
}

function sync_settings() {
  cp $CONFIG_PATH/common/zsh/.p10k.zsh $HOME
  cp -rp $CONFIG_PATH/common/nvim/* $HOME/.config/nvim

  cp $CONFIG_PATH/linux/zsh/.zshrc $HOME/.zshrc

  cp -rp $CONFIG_PATH/linux/warp/* $HOME/.config/warp-terminal

  source $HOME/.zshrc
}