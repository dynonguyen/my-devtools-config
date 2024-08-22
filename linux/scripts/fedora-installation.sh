CONFIG_PATH=$HOME/Developer/personal/my-devtools-config

# Vscode
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo >/dev/null

sudo dnf check-update
sudo dnf install code

# MS Teams: https://github.com/IsmaelMartinez/teams-for-linux
sudo curl -1sLf -o /tmp/teams-for-linux.asc https://repo.teamsforlinux.de/teams-for-linux.asc
sudo rpm --import /tmp/teams-for-linux.asc
sudo rm -f /tmp/teams-for-linux.asc
sudo curl -1sLf -o /etc/yum.repos.d/teams-for-linux.repo https://repo.teamsforlinux.de/rpm/teams-for-linux.repo

sudo dnf install teams-for-linux

# Ultilities
sudo dnf install dnf5 vim neovim zsh eza tldr bat ulauncher fzf openssl
sudo dnf install --assumeyes python3-pip

# Docker
sudo dnf remove docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-selinux \
  docker-engine-selinux \
  docker-engine

sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Common packages
sh $CONFIG_PATH/common/script/installation.sh
