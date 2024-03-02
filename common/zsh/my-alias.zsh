# remove all built-in aliases
unalias -m '*'

# basic
alias b='cd ..'
alias cls='clear'
alias ls='ls --color=tty'
alias z='zshz 2>&1'
alias vi='nvim $@'
alias svi='sudo nvim $@'
alias del='rm -rf $@'
alias sdel='sudo rm -rf $@'

# yarn
alias ys='yarn start'
alias yd='yarn dev'
alias yb='yarn build'
alias ya='yarn add $@'
alias yad='yarn add --dev $@'
alias yr='yarn remove $@'
alias ycm='yarn commit'

# bun
alias bi='bun install'
alias ba='bun add $@'
alias bad='bun add -d $@'
alias br='bun remove $@'
alias bb='bun run build'
alias bd='bun dev'
alias bs='bun start'

# git
alias gs='git status'
alias gcl='git clone $1'
alias gl='git log'
alias glo='git log --oneline -15'
alias ga='git add $@'
function gaex(){
  git add .
  git reset -- $@
}
alias gacm='git add . && git commit -m $@'
alias gcm='git commit -m $@'
alias gca='git commit --amend'
alias gcane='git commit --amend --no-edit'
alias gb='git branch'
alias gch='git checkout $@'
alias gchb='git checkout -b $@'
alias gp='git push'
alias gpl='git pull'
function gopen(){
  kernel=$(uname -s)

  if [ "$kernel" = "Linux" ]; then
   xdg-open $(git config remote.origin.url) &> /dev/null &
  else
   open $(git config remote.origin.url)
  fi
}

function git_cads_config(){
	git config --global user.name "Nguyen Le Anh Tuan"
	git config --global user.email "tuannla5@fpt.com.vn"
}
function git_home_config(){
	git config --global user.name "Tuan Nguyen"
	git config --global user.email "tuannguyentn2504@gmail.com"
}

# Docker
alias drac='docker rm -f $(docker ps -a -q)'
alias drav='docker volume rm $(docker volume ls -q)'
alias drai='docker rmi -f $(docker images -q)'
alias dm='docker-machine $@'
alias dls='docker ps -a'
alias drm='docker rm -f $@'
alias de='docker exec -it $@'
function deb(){ 
  docker exec -it $1 bash
}

# quick open
alias oalias='nvim $ZSH_CUSTOM/my-alias.zsh'
alias nvim-config='nvim ~/.config/nvim/init.vim'

# Save/Sync settings
function save_settings(){
  cp $ZSH_CUSTOM/my-alias.zsh ~/Developer/personal/my-devtools-config/Zsh
  cp ~/.zshrc ~/Developer/personal/my-devtools-config/Zsh
  cp -rp ~/.config/nvim/* ~/Developer/personal/my-devtools-config/Neovim
  cp ~/.p10k.zsh ~/Developer/personal/my-devtools-config/Zsh
}

function sync_settings() {
	cp -rp ~/Developer/personal/my-devtools-config/Zsh/my-alias.zsh $ZSH_CUSTOM
	cp -rp ~/Developer/personal/my-devtools-config/Zsh/.p10k.zsh ~/
  cp -rp ~/Developer/personal/my-devtools-config/Neovim/* ~/.config/nvim
}

# Only linux
alias clean_cache='su -c "echo Before; free -h | head -n 2; sync; echo 3 > /proc/sys/vm/drop_caches; echo After; free -h | head -n 2"'
alias swap_key='setxkbmap -option caps:swapescape'

alias svc_start='sudo systemctl start $@'
alias svc_stop='sudo systemctl stop $@'
alias svc_restart='sudo systemctl restart $@'
alias svc_status='systemctl status $@'

alias kde_keymapping='svi /usr/share/X11/xkb/symbols/pc'
alias ii='nohup dolphin $@ &'
