# Lập trình Shell Script

## Tạo file shell script

> Để chạy file shell script, thì file đó phải có quyền thực thi. Ex:

```sh
  echo 'echo Hello' > shell
  ls -l | grep shell
  chmod u+x shell
  ./shell
```

## Một vài quy tắc đặt tên biến

- Phải bắt đầu bằng chữ hoặc `_`.
- Không chứa `space` giữa 2 đầu `=`.
- Có phân biệt chữ hoa thường.
- Không sử dụng ký tự đặc biệt.
- Sử dụng biến dùng ký tự `$`. Ex: `$var_name`
