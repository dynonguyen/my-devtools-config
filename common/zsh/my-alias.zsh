# remove all built-in aliases
unalias -m '*'

# basic
alias b='cd ..'
alias cls='clear'
alias ls='ls --color=tty'
alias lsd='ls -d */'
alias z='zshz 2>&1'
alias vi='nvim'
alias svi='sudo nvim'
alias del='rm -rf'
alias sdel='sudo rm -rf'

# yarn
alias ys='yarn start'
alias yd='yarn dev'
alias yb='yarn build'
alias ya='yarn add'
alias yad='yarn add --dev'
alias yr='yarn remove'
alias ycm='yarn commit'

# bun
alias bi='bun install'
alias ba='bun add'
alias bad='bun add -D'
alias br='bun remove'
alias bb='bun run build'
alias bd='bun dev'
alias bs='bun start'

# pnpm
alias pn='pnpm'
alias pni='pnpm install'
alias pna='pnpm add'
alias pnad='pnpm add -D'
alias pnr='pnpm remove'
alias pnb='pnpm build'
alias pnd='pnpm dev'
alias pns='pnpm start'
alias pnx='pnpm dlx'
alias pnex='pnpm exec'

# git
alias gs='git status'
alias gcl='git clone $1'
alias gl='git log'
alias glo='git log --oneline -15'
alias ga='git add'
alias gacm='git add . && git commit -m'
alias gcm='git commit -m'
alias gca='git commit --amend'
alias gcane='git commit --amend --no-edit'
alias gb='git branch'
alias gch='git checkout '
alias gchb='git checkout -b '
alias gp='git push'
alias gpl='git pull'
alias git-tag-ls='git tag --list --sort=-creatordate --format="🏷  %(refname:short)  🕒  %(creatordate:iso8601)  👉  %(objectname)  %(creator)"'
function gaex() {
  git add .
  git reset -- $@
}
function git-home-config() {
  git config user.name "Dyno Nguyen"
  git config user.email "tuannguyentn2504@gmail.com"
}

# Docker & kubectl
alias drac='docker rm -f $(docker ps -a -q)'
alias drav='docker volume rm $(docker volume ls -q)'
alias drai='docker rmi -f $(docker images -q)'
alias dls='docker ps -a'
alias drm='docker rm -f '
alias de='docker exec -it '
function deb() {
  docker exec -it $1 bash
}
alias k='kubectl'
function k-print-env() {
  kubectl exec -it $1 -- env
}

# External packages (depend on installation.sh)
alias ls='eza --icons=always'
alias cat='bat'
alias man='tldr'

# pm2
function kill-all-kpf-pm2() {
  pm2 delete -s $(pm2 ls --no-color | grep kpf- | awk '{print $4}')
}
