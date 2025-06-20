# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ===== Env
export BUN_INSTALL="$HOME/.bun"
export CONFIG_PATH=$HOME/Developer/personal/my-devtools-config
export GO_PATH="$HOME/go"
export N_PREFIX="$HOME/.n"
export NODE_OPTIONS="--max-old-space-size=4096"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$N_PREFIX/bin:$BUN_INSTALL/bin:$GO_PATH/bin:$HOME/.rvm/bin:$PATH"

# ===== Oh-my-zsh
export ZSH="$HOME/.oh-my-zsh"

# Theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins
if [ "$TERM_PROGRAM" = "WarpTerminal" ]
then
  plugins=(zsh-z)
else
  plugins=(zsh-z zsh-autosuggestions zsh-syntax-highlighting)
fi

# Source oh-my-zsh
source $ZSH/oh-my-zsh.sh

# ===== Aliases
source "$CONFIG_PATH/common/zsh/my-alias.zsh"
source "$CONFIG_PATH/macos/zsh/my-alias.zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# bun completions
# [ -s "/Users/dyno/.bun/_bun" ] && source "/Users/dyno/.bun/_bun"

# ===== BeGroup
if [ "$USER" = "tuan.nguyen2" ]
then
  source "$CONFIG_PATH/macos/zsh/be-alias.zsh"
  source "$CONFIG_PATH/macos/zsh/be-zshrc.zsh"
fi
