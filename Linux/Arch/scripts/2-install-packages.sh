# Update local repository
sudo pacman -Syy

# Git
sudo pacman -S git --noconfirm

# Yay
cd ~
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd .. && rm -rfv yay

# All necessary applications
yay -S zsh python python-pip fd fzf pipewire pipewire-pulse bluez blueman pavucontrol vim neovim gwenview spectacle zoom noto-fonts-emoji ulauncher google-chrome ibus ibus-bamboo libreoffice-still peazip-gtk2-bin picket trash-cli notepadqq bitwarden stacer-bin pinta ntfs-3g kvantum-qt5 latte-dock docker docker-compose docker-machine xclip okular visual-studio-code-bin network-manager networkmanager-openvpn openvpn thefuck bat --noconfirm

# Oh my zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Nvm, npm, yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh
nvm install --lts
sudo npm install --global yarn

# Remove cache file
yay -Sc --noconfirm