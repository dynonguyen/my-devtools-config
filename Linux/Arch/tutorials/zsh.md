# Custom Shell với ZSH (Z-Shell) - Oh-my-zsh

1. Cài các package

- Zsh

```
  sudo pacman -S zsh
```

- [Oh-my-zsh](https://ohmyz.sh/)

```
  sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

2. Cài đặt profile trong Konsole, chọn zsh làm shell mặc định

3. Cài theme [powerlevel10k](https://github.com/romkatv/powerlevel10k)

- Tải và cài font [MesloLGS NF](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k)
- Cài Theme

```
  git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Set ZSH_THEME="powerlevel10k/powerlevel10k" in ~/.zshrc.

4. Config theme

```
  p10k configure
```

5. Install Plugin

- [zsh-z](https://github.com/agkozak/zsh-z)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
