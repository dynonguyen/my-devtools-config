<div align="center">

# Vim Cheat Sheet

</div>

## Normal Mode (Chế độ trung gian trước gõ lệnh)

- Chuyển về normal mode => `<Esc>` hoặc `<C-c>`

## Insert Mode (Chế độ gõ chữ)

- Đặt con trỏ trước cursor => `i`
- Đặt con trỏ sau cursor => `a`
- Đặt con trỏ ở đầu dòng => `I`
- Đặt con trỏ ở cuối dòng => `A`
- Tạo dòng mới bên dưới => `o`
- Tạo dòng mới bên trên => `O`

## Visual Mode (Chế độ bôi đen)

- Chuyển về visual mode => `v`
- Chuyển về visual line mode (bôi đen dòng) => `V`
- Chuyển về visual block mode (bôi đen dòng) => `C-v`
- Chọn một theo tag html => `gv`
- Chọn 1 khối tag => `vat`

## Folding & Unfolding

- `set foldmethod=syntax`
- Đóng tất cả => `zm`
- Mở tất cả => `zO`
- Đóng tại dòng hiện tại => `zc`
- Mở tại dòng hiện tại => `zo`
- Tới dòng đóng tiếp theo => `zj`
- Lùi dòng đóng trước đó => `zk`
- Toggle folding => `zi`

## Command Mode (Chế độ gõ lệnh)

- Chuyển về normal mode trước và dùng `:` để gõ lệnh

## Di chuyển

- `h` trái `j` xuống `k` lên `l` phải
- Lên đầu file => `gg`
- Xuống cuối file => `G`
- Tới dòng bất kỳ => `:<number-line>` hoặc `<number-line>gg`
- Tới từ phía trước => `w`
- Tới từ phía trước (chỉ phân cách bằng khoảng trắng) => `W`
- Tới từ phía trước nhưng ở cuối từ => `e`
- Lùi lại từ trước => `b`
- về đầu dòng => `0` hoặc `^`
- Về cuối dòng => `$`
- Đến đầu màn hình hiện tại => `H`
- Đến cuối màn hình hiện tại => `L`
- Scroll lên nhanh => `<C-u>`
- Scroll xuống nhanh => `<C-d>`
- Đi đến 1 từ trong hàng hiện tại bằng chữ cái đầu của nó => `f<chữ cái đầu>`,
  dùng `;` để tìm từ tiếp theo.
- Di chuyển lên xuống giữa các đoạn văn => `{` và `}`
- Di chuyển vào giữa 1 tag html => `vit`
- Đưa dòng hiện tại lên đầu màn hình => `zt`
- Đưa dòng hiện tại xuống cuối màn hình => `zb`
- Đưa dòng hiện tại đến giữa màn hình => `zz`

## Copy and Paste

- Copy 1 dòng ở normal mode => `yy` hoặc `Y`
- Copy ở visual mode => `y`
- Cut 1 dòng ở normal mode => `dd`
- Cut ở visual mode => `d`
- Cut 1 từ dưới con trỏ => `x`
- Put (Paste) ở dòng dưới => `p`
- Put (Paste) ở dòng trên => `P`
- Xoá đến cuối dòng nhanh => `D`
- Xoá không phải cut => `"_d`

## Thay thế từ, câu

- Thay đổi 1 ký tự tại vị trí con trỏ => `r`
- Bật chế độ Replace liên tục => `R`
- Cut các ký tự từ vị trí con trỏ đến cuối từ và chuyển insert mode => `cw`
- Cut 1 từ và chuyển sang insert để gõ (change từ) => `ciw`
- Xoá đến cuối dòng vào chuyển insert mode => `C`
- xoá toàn bộ nội dung trong cặp dấu [] (tương tự với {} "") => `ci[` hoặc `ci]`
- xoá toàn bộ nội dung trong cặp tag html => `cit`
- xoá cả 1 từ tại vị trí con trỏ và cả space => `daw`
- xoá cả 1 từ tại vị trí con trỏ nhưng chừa lại space => `diw`

## Tìm kiếm và thay thế

- Tìm kiếm dùng phím => `/<từ cần tìm>`
- Tìm kiếm tất cả từ tại trùng với từ tại vị trí con trỏ => `*`
- Khi tìm kiếm -> nhấn `n` để tới từ tiếp theo và `N` đề quay lại từ trước.
- Dùng `:noh` để xoá highlight search
- Thay thế => `/%s/<từ cũ>/<từ mới>`
- Tìm dấu đóng ngoặc còn lại (matching parentheses) => `%`

## Thao tác với file

- Mở file => `:e <tên file>`
- Thoát file => `:q`
- Lưu và thoát một buffer => `:wq` hoặc `:x`
- Lưu file => `:w`
- Lưu tất cả và thoát => `:wqa` hoặc `:xa`
- Undo => `u`
- Undo the undo (redo) => `<C-r>`

## Vim tips

- Hãy kết hợp các thao tác của bạn với các con số và điều hướng (using a count
  for motion). Suy nghĩ sao thì gõ vậy 😎
  - VD: di chuyển xuống dưới 3 dòng => `3j`
  - Xoá đến cuối dòng => `d$`
- Dùng `!` để ép lệnh được thực thi.

- Auto import coc-vim => `C-g u`
