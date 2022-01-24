# Tạo nhanh một shortcut với windows termial

- Tạo một biến môi trường với giá trị: C:\Users*YOUR_WINDOWS_USERNAME*\AppData\Local\Microsoft\WindowsApps\Microsoft.WindowsTerminal_8wekyb3d8bbwe
- Tạo một shortcut ngoài desktop: wt
- Tạo shortcut key cho shortcut này.

# Custom theme

- Lấy theme tại đây: https://windowsterminalthemes.dev/
- thêm theme vừa copy vào "schemes"

# Cài powerline theme

- Cài `NERD Font` để tránh lỗi font: Nên dùng `CaskaydiaCove NF`
- Chi tiết tại đây: https://ohmyposh.dev/docs/pwsh
- Mở profile powershell: `notepad $profile`
- Xem danh sách theme: `Get-PoshThemes -list`
- Cài đặt 2 cái sau:

```
Install-Module oh-my-posh -Scope AllUsers
Import-Module oh-my-posh
```

- Mở profile thêm các dòng sau

```
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme {Tên theme}
```

# Thay đổi vị trí lưu $profile

`$profile = "New location"`

# Aliases

Set-Alias: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/set-alias?view=powershell-7.1

Get-Alias: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-alias?view=powershell-7.1

Import-Alias: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/import-alias?view=powershell-7.1

# Predictive IntelliSense (Gợi ý câu lệnh)

Chi tiết: https://devblogs.microsoft.com/powershell/announcing-psreadline-2-1-with-predictive-intellisense/
Khi gợi ý câu lệnh, dùng phím mũi tên để auto complete

# z - di chuyển thần tốc giữa các thư mục như z
Cài đặt tại: https://github.com/badmotorfinger/z
