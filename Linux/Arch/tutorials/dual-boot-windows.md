# Cài đặt Arch Linux với dual boot với Windows theo chuẩn EFI

1. Cài đặt thời gian

```
  timedatectl set-ntp true
```

2. Kiểm tra EFI (Nếu có hiển thị thì máy đang chạy với chuẩn UEFI, còn không thì đang là Legacy). Nếu EFI thì tiếp tục

```
  ls /sys/firmware/efi
```

3. Kiểm tra internet

```
  ping google.com
```

4. Kết nối mạng nếu dùng wifi và không thể ping ở bước 3

```
  iwctl
```

```
  device list
```

Chọn một device trong list này, ví dụ `wlan0`

```
  station wlan0 get-networks
```

```
  station wlan0 connect "Wifi Name"
```

```
  exit
```

4. Sắp xếp server tải gói

```
pacman -Sy reflector
```

```
reflector -c Vietnam -c Singapore -c Japan -c India -a 12 --sort rate --save /etc/pacman.d/mirrorlist
```

5. Kiểm tra ổ đĩa

```
  lsblk
```

6. Phân vùng ổ đĩa (ví dụ chọn ổ đĩa sda)

```
  cfdisk /dev/sda
```

> Ví dụ ổ đĩa có 50GB (cần xem kỹ các phân vùng trước khi format)

- 1GB cho (Swap) (Nếu RAM ít thì thêm swap) /dev/sda2
- 30 GB cho root (Linux Filesystem) /dev/sda3
- còn lại cho home (Linux Filesystem) /dev/sda4

7. Format ổ đĩa

```
  mkswap /dev/sda2
  swapon /dev/sda2
```

```
  mkfs.ext4 /dev/sda3
```

```
  mkfs.ext4 /dev/sd4
```

8. Mount các phân vùng

```
  mount /dev/sda3 /mnt
```

> Kiểm tra xem đâu là phân vùng boot của windows, thường có EFI System 100MB (VD là /dev/sda1)

```
  mkdir /mnt/efi
  mount /dev/sda1 /mnt/efi
```

```
  mkdir /mnt/home
  mount /dev/sda4 /mnt/home
```

9. Tải các base package

```
  pacstrap /mnt base base-devel linux linux-firmware linux-headers vim

```

10. Cài đặt cơ bản

```
  genfstab -U /mnt >> /mnt/etc/fstab
```

```
  arch-chroot /mnt
```

```
  ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
```

```
  hwclock --systohc
```

```
  vim /etc/locale.gen

  => uncomment: `en_US.UTF-8 UTF-8`

  locale-gen

  echo LANG=en_US.UTF-8 > /etc/locale.conf
```

> Thay `dyno-pc` thành tên cho máy tính của bạn

```
  echo dyno-pc > /etc/hostname
```

```
  vim /etc/hosts
```

> Thêm các dòng sau:

- 127.0.0.1 localhost
- ::1 localhost
- 127.0.1.1 dyno-pc.localdomain dyno-pc

> Tạo password cho root

```
  passwd
```

11. Tạo 1 người dùng

> Thay `dyno` thành username của người dùng

```
  useradd -m dyno
  passwd dyno
  usermod -aG wheel,audio,video, ecoptical,storage,power dyno
  EDITOR=vim visudo
  dyno ALL=(ALL) ALL
  => uncomment %wheel ALL=(ALL) ALL
```

12. Tạo grub boot

```
  pacman -S grub efibootmgr networkmanager network-manager-applet dhcpcd os-prober

  systemctl enable NetworkManager

  vim /etc/default/grub
  => uncomment: OS_PROBER: false

  grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB

  grub-mkconfig -o /boot/grub/grub.cfg
```

13. Exit & Reboot

```
  exit
  umount -R /mnt
  reboot
```

14. Kết nối lại wifi sau reboot

```
  nmtui
```

15. Cài đặt DE (Desktop Environment)

> Ở đây mình dùng KDE Plasma

```
  pacman -S xorg plasma plasma-wayland-session kde-applications
```

```
  systemctl enable sddm.service
```

16. Reboot và tận hưởng

**Bonus**

> Trong trường hợp Boot Manager không vào grub menu để chọn boot option thì làm các bước sau:

- (Arch) Chỉnh lại thứ tự boot trong Linux, đảm bảo rằng Grub được ưu tiên cao hơn.

```
  efibootmgr
```

- (Windows) Chỉnh lại Boot Manager cho Windows, dùng Grub để quản lý

```
  bcdedit /set {bootmgr} path \EFI\grub\grubx64.efi
```
