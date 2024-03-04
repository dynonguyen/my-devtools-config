# Setup via GUI
pacman -Sy archlinux-keyring

archinstall

# Install DE
pacman -S xorg plasma plasma-wayland-session kde-applications

systemctl enable sddm.service

