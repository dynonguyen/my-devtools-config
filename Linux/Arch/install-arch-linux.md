timedatectl set-ntp true

timedatecth status

ls /sys/firmware/efi

pacman -Sy reflector

reflector -c Vietnam -c Singapore -c Japan -c India -a 12 --sort rate --save /etc/pacman.d/mirrorlist

lsblk

cfdisk /dev/sda

=> gpt

=> 1 500M cho EFI System
=> 1G cho Swap
=> 30 GB cho root
=> còn lại cho home

mkfs.fat -F32 /dev/sda1

mkfs.ext4 /dev/sda3

mkfs.ext4 /dev/sd4

# mkswap /dev/sda2

# swapon /dev/sda2

mount /dev/sda3 /mnt

mkdir /mnt/boot
mount /dev/sda1 /mnt/boot

mkdir /mnt/home
mount /dev/sda4 //mnt/home

pacstrap /mnt base base-devel linux linux-firmware linux-headers vim

genfstab -U /mnt >> /mnt/etc/fstab

arch-chroot /mnt

ln -sf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime

hwclock --systohc

vim /etc/locale.gen

=> uncommnent en_US.UTF-8 UTF-8

locale-gen

echo LANG=en_US.UTF-8 > /etc/locale.conf

echo dyno-pc > /etc/hostname

vim /etc/hosts
Thêm các dòng sau:
127.0.0.1 localhost
::1 localhost
127.0.1.1 dyno-pc.localdomain dyno-pc

passwd

Tạo 1 user
useradd -m dyno
passwd dyno
usermod -aG wheel,audio,video, ecoptical,storage,power dyno
EDITOR=vim visudo
dyno ALL=(ALL) ALL
uncomment %wheel ALL=(ALL) ALL

pacman -S grub efibootmgr networkmanager network-manager-applet

systemctl enable NetworkManager

grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB

grub-mkconfig -o /boot/grub/grub.cfg

exit

umount -R /mnt

reboot

# connect a wifi

iwctl
device list
station wlan0 get-networks
station wlan0 connect "wifi-name"

> sau khi boot
> nmtui

## install KDE Plasma

pacman -S xorg plasma plasma-wayland-session kde-applications
