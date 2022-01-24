# Cài đặt tính năng "Commit Signature Verification" trên Github

> Tính năng dùng để xác minh Commit chính chủ, tránh giả mạo commit.

- B1: Tải và cài đặt GPG [(GnuPG binary releases)](https://www.gnupg.org/download/index.html)

- B2: Tạo key với lệnh, chọn và điền các thông tin cần thiết:

```
  gpg --full-generate-key
```

- B3: Chạy lệnh dưới đây để hiện long form của GPG key:

```
  gpg --list-secret-keys --keyid-format=long
```

- B4: Copy long form của GPG key ID ở phần sec Alg/{ Key }
- B5: Tạo GPG cho Github bằng:

```
  gpg --armor --export { key ở B4 }
```

- B5: Truy cập Github > Settings > GPG Key > Add GPG Key > Dán mã vừa tạo ở bước 5 vào.

- B6: Cấu hình git dưới local (Áp dụng với tất cả Repo)

```
  git config --global user.signingkey { key }
```

- B6 (Áp dụng với 1 repo cụ thể):

```
  git config user.signingkey { key }
```

- B7: Commit với Signature:

```
  git commit -S -m "message"
```

- B8: Áp dụng với mọi commit:

```
  git config --global commit.gpgsign true
```

- B9:

```
  git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
```

- B10: Để không cần nhập lại mật khẩu mỗi lần commit chạy lệnh sau (cần xác nhận 2 lần việc bỏ trống password)

```
  gpg --passwd { yourId or email }
```

> Bật chế độ `Vigilant Mode` trong GPG key github để tránh giả mạo commit, nó sẽ hiện lên `Unverified` nếu người khác commit với tên của mình.
