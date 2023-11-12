# Các cài đặt cần thiết sau khi boot Arch Linux

## Cấu hình chủ thư mục để tạo file, folder

> Thay your_username và directory

```
  sudo chown your_username directory
  hoặc (All sub-folders)
  sudo chown -R your_username directory
  hoặc
  sudo mount -o remount,rw directory
```

## Git

```
  sudo pacman -S git
```

> Cấu hình Git với GPG như file `Others/github-verification.md`

## Yay

```
  git clone https://aur.archlinux.org/yay.git
  cd yay
  makepkg -si
```

## Google chrome

```
  yay -S google-chrome
```

## Bluetooth

```
  sudo pacman -S bluez blue-utils blueman pulseaudio pulseaudio-bluetooth pavucontrol
```

```
  sudo vim /etc/bluetooth/main.conf
  => Uncomment: AutoEnable=true

  sudo systemctl start bluetooth.service
  sudo systemctl enable bluetooth.service
  sudo systemctl pulseaudio start
  pavucontrol
```

## Visual Studio Code

```
  git clone https://AUR.archlinux.org/visual-studio-code-bin.git
  cd visual-studio-code-bin/
  makepkg -s
  sudo pacman -U visual-studio-code-bin-*.pkg.tar.xz
  cd ../ && sudo rm -rfv visual-studio-code-bin/
```

## Ibus - Ibus-bamboo

[Github Repo](https://github.com/BambooEngine/ibus-bamboo)

```
  sudo pacman -S ibus
  yay -S ibus-bamboo
```

> Thêm vào file ~/.bashrc

```
  export GTK_IM_MODULE=ibus
  export XMODIFIERS=@im=ibus
  export QT_IM_MODULE=ibus
  pidof ibus-daemon > /dev/null || ibus-daemon -drx
```

> Tự động start khi login

- Tạo file tại `/usr/local/sbin/my-startup.sh`
- Thêm nội dung sau

```
  #!/bin/sh
  ibus-daemon -drx
```

> Cách 1:

- Thêm script vừa tạo vào phần `AutoStart` trong Settings

> Cách 2:

- Tạo file `/home/.config/autostart/my-startup.sh.desktop`

```
  [Desktop Entry]
  Exec=/usr/local/sbin/my-startup.sh
  Icon=dialog-scripts
  Name=my-startup.sh
  Path=
  Type=Application
  X-KDE-AutostartScript=true
```

## Screenshot with spectacle

```
  sudo pacman -S spectacle
```

## Công cụ nén và giải nén bằng command line

```
  sudo pacman -S p7zip
```

## Cài bộ WPS Office (hoặc Libre Office, Open Office) trên linux

```
  yay -S wps-office
  yay -S openoffice-bin
  yay -S libreoffice-still
```

## NodeJs, npm, nvm, yarn

```
  source ~/.zshrc
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh
  nvm install --lts
  sudo npm install --global yarn
```

## Color picker with Picket (X11)

```
  yay -S picket
```

## Mongodb

```
  yay -S mongodb-bin mongodb-tools-bin robo3t-bin mongodb-compass
```

## SQL server

```
  yay -S mssql-server mssql-tools msodbcsql --noconfirm
```

> Setup SQL Server

```
  sudo /opt/mssql/bin/mssql-conf setup
```

> Start service

```
  sudo systemctl enable mssql-server
  sudo systemctl start mssql-server
```

## Teamviewer

```
  yay -S teamviewer
```

```
  sudo systemctl enable teamviewered.service
```

> Fix lỗi: Not ready

TeamViewer > Extra > Options > Start teamviewer with system

## DBeaver, Valentina Studio, Beekeeper Studio, DBVisualizer (Navicat Alternative)

```
  pacman -S dbeaver
  yay -S valentina-studio
  yay -S beekeeper-studio-bin
  yay -S dbvis
```

## Notepad to open txt file

```
  sudo pacman -S notepadqq
```

---

## Settings

### System key shortcut

> Vào Settings > Shortcut

- KRunner -> Bỏ `Alt + F2` và `Search`

### Input Device

> Chuyển Delay keyboard về 300ms

### Connect Ethernet

```
  => Install dhcp, netctl
  sudo pacman -S netctl dhcpcd
  => Get Interface:
  ip address
  => Check dhcp enable
  systemctl list-units | grep dhcp
  systemctl start dhcpdc@interface
```

### ULauncher Extensions

- [Vscode Workspace](https://github.com/plibither8/ulauncher-vscode-recent) `@`

  - Install Python >= 3

  ```
    sudo pacman -S python python-pip
  ```

  - Install fuzzywuzzy

  ```
    pip install fuzzywuzzy
  ```

  - Open ULauncher > Extensions > Add > `https://github.com/plibither8/ulauncher-vscode-recent`

- [Google translator](https://github.com/manahter/ulauncher-translate) `tr` hoặc `tr en:vi <query>`

- [Fuzzy Finder](https://github.com/hillaryychan/ulauncher-fzf) `?`
- Install Required

```
  sudo pacman -S fd fzf
```

- Add .gitignore file
