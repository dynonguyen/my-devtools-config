# Pacman và AUR trong Arch Linux

## Pacman (Package Manager)

> Pacman là câu lệnh dùng để quản lý các package trên main repository, nơi chứa các package do Arch tạo nên [Pacman Wiki](https://wiki.archlinux.org/title/pacman).

### 1. Tải và đồng bộ package (-S)

> Tải và cài đặt 1 package

```
  sudo pacman -S pack_name
```

> Đồng bộ main repo và local repo

```
  sudo pacman -Sy
```

> Tải lại tất cả main repo về local repo

```
  sudo pacman -Syy
```

> Cập nhật lại package từ local repo

```
  sudo pacman -Su
```

> Đồng bộ và cập nhật package

```
  sudo pacman -Syu
  Hoặc
  sudo pacman -Syyu
```

> Tìm kiếm package trên main repo (search cả tên và mô tả), có thể dùng RegExpr

```
  pacman -Ss pack_name
```

> Xoá các dữ liệu cũ của package sau khi cập nhật

```
  sudo pacman -Sc
  Hoặc
  sudo pacman -Scc
```

> Xoá và giữ lại các package cần thiết

```
  sudo pacman -Rsu pack_name
```

> Xoá và xoá luôn các file cần thiết **(Warning)**

```
  sudo pacman -Rsc pack_name
```

### 2. Truy vấn package đã cài (-Q)

> Liệt kê tất cả packages

```
  pacman -Q
```

> Đếm số package đã cài

```
  pacman -Q | wc -l
```

> Liệt kê package chỉ vớ tên

```
  pacman -Qq
```

> Xem thông tin của package

```
  pacman -Qi pack_name
```

> Liệt kê các package cài từ main repo (tải bằng pacman)

```
  pacman -Qn
```

> Liệt kê các package cài từ AUR (tải bằng yay)

```
  pacman -Qm
```

> Liệt kê các package tự tải

```
  pacman -Qe
```

> Truy vấn xem package có tồn tại trên máy hay không ?

```
  pacman -Qs pack_name
  Hoặc
  pacman -Q | grep pack_name
```

> Hiển thị các file đã cài của một package Hoặc đếm số file đã cài

```
  pacman -Ql pack_name
  pacman -Qk pack_name
```

> Liệt kê các gói là dependency như không cần thiết

```
  pacman -Qdt
```

### Xoá package (-R)

> Xoá package, giữ dependencies

```
  sudo pacman -R pack_name
```

> Xoá package và xoá luôn các dependencies

```
  sudo pacman -Rs pack_name
```

> Xoá package và xoá các file config trong thư mục hệ thống như /etc (còn trong home phải tự xoá)

```
  sudo pacman -Rn pack_name
```

> Xoá các dependency không cần thiết **(Warning: kiểm tra trước khi xoá)**

```
  sudo pacman -Rnsc $(pacman -Qdtq)
```

---

## AUR (Arch User Repository)

> AUR là nơi chứa các packages do người dùng Arch tạo ra, không liên quan đến main repo. Vì thế không thể dùng `pacman` để tải các package này [AUR](https://aur.archlinux.org/).

> Có nhiều cácc cài 1 package từ AUR, có thể tải trực tiếp file cài đặt, thông qua `aur helper, yaourt, trizen` hoặc dùng `yay`.

> Install [yay](https://github.com/Jguer/yay)

```
  git clone https://aur.archlinux.org/yay.git
  cd yay
  makepkg -si
  cd ..
  rm -rfv yay
```

> Các câu lệnh của yay như của pacman

**Warning**: nên hạn chế cài package trên AUR, chỉ cài khi thực sự cần thiết. Tránh các package đã bị out-date hoặc đã lâu không update.

> Câu lệnh cập nhật, xoá với yay sẽ cập nhật cả các package đã cài bởi pacman.

```
  yay -Syyu
```

---

## Trick

> Cài đặt hoặc xoá tự động (không cần xác nhận, mặc định default) => thêm option `--noconfirm` vào cuối command.

> Để lọc kết quả tìm kiếm thêm lệnh `| grep keyword`
