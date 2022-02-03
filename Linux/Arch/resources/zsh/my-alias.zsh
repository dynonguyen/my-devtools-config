# remove all built-in aliases
unalias -m '*'

# basic
alias b='cd ..'
alias cls='clear'
alias ls='ls --color=tty'
alias lsa='ls -a'
alias z='zshz 2>&1'
alias vi='nvim $@'
alias vsc='code .'
alias ii='dolphin .'

# npm
alias ni='npm install $@'
alias nig='sudo npm --global install $@'
alias nid='npm install --save-dev $@'
alias ns='npm start'
alias nd='npm run dev'
alias nt='npm run test'
alias nb='npm run build'

# yarn
alias ys='yarn start'
alias yd='yarn dev'
alias yb='yarn build'
alias ya='yarn add $@'
alias yad='yarn add --dev $@'
alias yag='yarn global add $@'
alias yr='yarn remove $@'
alias yi='yarn info $@'
alias yiv='yarn info $@ version'

# git
alias gs='git status'
alias gcf='git clean -f $@'
alias gsh='git show $@'
alias gl='git log'
alias glo='git log --oneline'
alias ga='git add $@'
alias grsta='git restore --staged $@'
function gaex(){
  git add .
  git reset -- $@
}
alias gcm='git commit -m $@'
alias gca='git commit --amend'
alias gcane='git commit --amend --no-edit'
alias gb='git branch'
alias gch='git checkout $@'
alias gp='git push'
alias gpf='git push --force'
alias gpuo='git push -u origin $@'
alias grv='git remote -v'
alias gpl='git pull'
function gh(){
	nohup xdg-open $(git config remote.origin.url) &
	rm nohup.out
}

# utils
function save_setting(){
  cp $ZSH_CUSTOM/my-alias.zsh $HOME/dev/my-devtools-config/Linux/Arch/resources/zsh/my-alias.zsh
  cp $HOME/.config/Code/User/settings.json $HOME/dev/my-devtools-config/Vscode/settings.json
  cp $HOME/.zshrc $HOME/dev/my-devtools-config/Linux/Arch/resources/zsh/.zshrc
  echo 'Save settings successfully'
}

# quick open
alias oalias='nvim $ZSH_CUSTOM/my-alias.zsh'
