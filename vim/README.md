# My Neo vim configuration

- NERD Font Icon cheat sheet: https://www.nerdfonts.com/cheat-sheet
- Vim Cheat Sheet 1: https://vim.rtorr.com/
- Vim Cheat Sheet 2: https://devhints.io/vim

## My Vim Cheat Sheet

### Thao tác với file
- Lưu và thoát một buffer => :wq hoặc :x => <C-w>
- Lưu file => :w => <C-s>
- Lưu tất cả và thoát => :wqa hoặc :xa => <leader>q
- Tìm file dùng fzf:
  + Tìm trong các buffer(tab) đang bật => :Buffer => <leader>b
  + Tìm các file trong thư mục gốc => :Files => <C-A-p>
  + Tìm các file và loại bỏ các thư mục có trong .gitignore => :GFiles => <C-p>
  + Tìm file khớp với một từ nào đó => :Rg => <leader>h
