# My Devtool Configuration

### Sync settings

```sh
# Install apps, tools, and plugins
sh ./linux:macos/scripts/installation.sh

# Sync zsh
cp ../linux:macos/zsh/.zshrc ~/.zshrc
source ~/.zshrc

# Sync setup
sh ./linux:macos/scripts/setup.sh
pull_settings
```
