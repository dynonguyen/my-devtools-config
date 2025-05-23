# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ===== Env
export BUN_INSTALL="$HOME/.bun"
export CONFIG_PATH="$HOME/Developer/personal/my-devtools-config"
export GO_PATH="$HOME/go"
export N_PREFIX="$HOME/.n"
export NODE_OPTIONS="--max-old-space-size=4096"

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

export PATH="$HOME/.cargo/bin:$N_PREFIX/bin:$BUN_INSTALL/bin:$GO_PATH/bin:/usr/local/go/bin:$BUN_INSTALL/bin:$PATH"

# ===== Oh-my-zsh
export ZSH="$HOME/.oh-my-zsh"

# Theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins
plugins=(zsh-z zsh-autosuggestions zsh-syntax-highlighting)

# Source oh-my-zsh
source $ZSH/oh-my-zsh.sh

# ===== Aliases
source "$CONFIG_PATH/common/zsh/be-alias.zsh"
source "$CONFIG_PATH/common/zsh/my-alias.zsh"
source "$CONFIG_PATH/linux/zsh/my-alias.zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# bun completions
[ -s "/home/dyno/.bun/_bun" ] && source "/home/dyno/.bun/_bun"
