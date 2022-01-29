# Các cài đặt cần thiết sau khi boot Arch Linux

## Cấu hình chủ thư mục để tạo file, folder

> Thay your_username và directory

```
  sudo chown your_username directory
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

## Settings

### System key shortcut

> Vào Settings > Shortcut

- KRunner -> Bỏ `Alt + F2` và `Search`

### Input Device

> Chuyển Delay keyboard về 300ms
