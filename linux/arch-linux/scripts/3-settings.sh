# ---------------- Set directory owner
sudo chown -R dyno /
sudo chown -R dyno /home

# ---------------- Fonts
# Roboto: https://fonts.google.com/specimen/Roboto
# Fira Code: https://fonts.google.com/specimen/Fira+Code
# MesloLGS NF: https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k

# ---------------- System
# Settings > Input device > keyboard > delay time 300ms & rate 35 repeats/s

# Settings > Display > Night color > Custom time 18:00 - 06:00

# Settings > Workspace behavior > Virtual desktop > Add rows > check Navigation wraps around

# Import system-shortcut.kksrc from resources into Settings > shortcut > import scheme...
# Custom shortcuts > Run Konsole > Alt+Shift+T

# ---------------- Zsh
# Copy .zshrc from resources to ~/.zshrc
# Copy my-alias from resources to $ZSH_CUSTOM

# Install plugin powerlevel10k theme here: https://github.com/romkatv/powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
# Install plugin zsh-z: https://github.com/agkozak/zsh-z
git clone https://github.com/agkozak/zsh-z ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-z
# Install plugin zsh-autosuggestions: https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# Install plugin zsh-syntax-highlighting: https://github.com/zsh-users/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# ---------------- Konsole
# Setting Konsole > Profile > Theme dracula > zsh
# Custom shortcut like konsole-shortcut.pdf in resources

# ---------------- Ibus, Ibus-bamboo
# Add bellow code into file ~/.zlogin
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
pidof ibus-daemon > /dev/null || ibus-daemon -drx
ibus-daemon -drx

# ---------------- Theme, Ulauncher
# tutorials/custom-theme.md

# ---------------- Docker
sudo groupadd docker
sudo usermod -aG docker ${USER}
su -s ${USER}
sudo chmod 777 /var/run/docker.sock

# ---------------- Bluetooth
sudo vim /etc/bluetooth/main.conf
# => Uncomment: AutoEnable=true
sudo systemctl start bluetooth.service
sudo systemctl enable bluetooth.service