# Update local repository
sudo pacman -Sy

# Git
sudo pacman -S git --noconfirm

# Yay
cd ~
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd .. && rm -rfv yay

# Google chrome
yay -S google-chrome --noconfirm

# Bluetooth
sudo pacman -S bluez blue-utils blueman pulseaudio pulseaudio-bluetooth pavucontrol --noconfirm

# VSCode
cd ~
git clone https://AUR.archlinux.org/visual-studio-code-bin.git
cd visual-studio-code-bin/
makepkg -s
sudo pacman -U visual-studio-code-bin-1.63.2-1-x86_64.pkg.tar.zst
cd ~ && sudo rm -rfv visual-studio-code-bin/

# Ibus bamboo
sudo pacman -S ibus --noconfirm
yay -S ibus-bamboo --noconfirm

# Update all
sudo yay -Suy