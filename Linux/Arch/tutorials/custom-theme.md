# Make your KDE look COOL

[Youtube Reference](https://youtu.be/aVsekrMD_24)

1. Chỉnh Settings > Window Management > KWin Scripts

- Thêm script `Force Blur` & `Latte Window Color`

2. Chỉnh Application Style

   - Install `kvantum manager` từ terminal

   ```
     sudo pacman -S kvantum-qt5
   ```

   - Mở Kvantum > Select theme folder > Chọn Layan-solid trong resources.

   - Change / Delete theme > chọn Latte-solid

3. Chỉnh Plasma style > Thêm `Layan plasma theme` từ store.

4. Chỉnh Colors > Thêm `Layan color schema` từ store.

5. Chỉnh Window Decorations > Thêm `Layan aurorae theme` từ store.

6. Chỉnh Icons > Thêm `Fluent icon theme` từ store.

7. Chỉnh Fonts > Chọn font `Roboto`

8. Chỉnh Cursors > Thêm `Layan cursors` từ store.

9. Install plasmoids: Desktop > Right click > Add Widgets > Get new widgets > Download ...

   - Better inline clock
   - Kpple menu
   - Latte separator
   - Latte Spacer
   - Application Title

10. Install `latte-dock`

    ```
      sudo pacman -S latte-dock
    ```

    - Mở Latte
    - Right click the dock > Configure Latte ... > Import file > chọn `latte-dock-custom.layout.latte` trong resources > Apply > Switch.

11. Chỉnh sửa shortcut: Settings > Shortcuts > Import Schema > file `system-shortcut.kksrc` trong resources.

12. Install `ULauncher`

    ```
      yay -S ulauncher
    ```

    - Cài đặt shortcut cho ULauncher nếu dùng `Wayland`:
      - Cài package sau: `sudo pacman -S wmctrl`
      - Vào `ULauncher`, xoá hotkey đi.
      - System > Custom Shortcut > Add Shortcut > Command `ulauncher-toggle`
      - Tuỳ chỉnh shortcut.

13. Tuỳ chỉnh login screen: Settings > sddm > Get new sddm theme > layan
