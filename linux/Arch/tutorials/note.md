# Một vài ghi chú khi sử dụng Arch Linux

> KDE Plasma không thể share screen, pick color khi sử dụng `Graphic Platform` (Desktop Session) là `Wayland` (package `plasma-wayland-session`) (như Zoom hay Google Meet ...), vì thế cần sử dụng `X11` để sử dụng. Tuy nhiên, X11 khá cũ, sẽ gây tình trạng lag khi dùng, vì thế có thể tạm disable `Wayland` khi cần share screen.

- Solution: Chọn x11 session khi login

## How to make ArchLinux faster?

- Reference
  - https://www.linkedin.com/pulse/how-make-your-archlinux-faster-sourav-goswami
  - https://wiki.archlinux.org/title/improving_performance

1. Tắt tất cả các hiệu úng: Settings > Desktop Effects
2. Tắt watchdog

```
  sudo nvim /etc/default/grub
  GRUB_CMDLINE_LINUX_DEFAULT="quiet nowatchdog ..."
  sudo grub-mkconfig -o /boot/grub/grub.cfg
```

3. Sort Services by Loading Time & Mask Unneeded Services

- Sắp xếp thời gian tải service `systemd-analyze blame`
- Tắt các service không cần thiết

```
  systemctl mask lvm2-monitor
  systemctl mask systemd-random-seed
```

- disable systemd-resolved if you have NetworkManager installed

```
  sudo nvim /etc/NetworkManager/NetworkManager.conf

  => Thêm các dòng sau:
  [main]
  dns=none
  systemd-resolved=false
```

4. Truy cập Internet nhanh hơn

```
  sudo nvim /etc/resolv.conf
  => Thêm:
  options timeout:1
  options single-request

  nameserver 8.8.8.8
  nameserver 8.8.4.4
  nameserver 1.1.1.1
```

```
  chattr +i /etc/resolv.conf
```

5. Disable Journaling

```
  sudo nvim /etc/systemd/journald.conf
  Storage=none
```

6. Sửa lỗi không thể tự động connect âm thanh pulseaudio

- Gỡ pulseaudio, pulseaudio-bluetooth
  https://gist.github.com/yejun/2c1a070a839b3a7b146ede8a998b5495
  https://www.jeremymorgan.com/tutorials/linux/how-to-bluetooth-arch-linux/
- Cài pipewire, pipewrie-pulse
- Use Volume control in system tray

7. Mount vĩnh viễn thư mục

- sudo bklid
- sudo vim /etc/fstab

```
UUID=A2B012A8B0128349   /photos         ntfs            rw,relatime     0 2
# /dev/sdc1
UUID=de92ebd1-f851-474f-912a-bbcf47dc2cc9       /storage        ext4            rw,relatime     0 2

```
