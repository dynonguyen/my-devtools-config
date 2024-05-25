# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ===== Env
export BUN_INSTALL="$HOME/.bun"
export CONFIG_PATH=$HOME/Developer/personal/my-devtools-config
export GOPATH="$HOME/go"

export PATH="$PATH:$HOME/.rvm/bin:$BUN_INSTALL/bin:/opt/homebrew/bin:$GOPATH/bin"

# ===== Oh-my-zsh
export ZSH="$HOME/.oh-my-zsh"

# Theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins
plugins=(git zsh-z zsh-autosuggestions zsh-syntax-highlighting)

# Source oh-my-zsh
source $ZSH/oh-my-zsh.sh

# ===== Aliases
source "$CONFIG_PATH/macos/zsh/my-alias.zsh"
source "$CONFIG_PATH/common/zsh/my-alias.zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# bun completions
[ -s "/Users/dyno/.bun/_bun" ] && source "/Users/dyno/.bun/_bun"

# pnpm
export PNPM_HOME="/Users/dyno/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
