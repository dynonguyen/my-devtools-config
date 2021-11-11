Upcap.exe là phần mềm hỗ trợ mapping phím CapsLock với các phím khác.

- Mục đích chính là để mapping CapsLock với phím ESC khi sử dụng Vim cho thuận tiện.
- Cách sử dụng.

1. Tại file uncap.exe tại đây: https://github.com/susam/uncap
2. Copy file này vào 1 thư mục nào đó, tốt nhất là C:\Windows.
3. Đặt 1 biến môi trường Path là đường dẫn ở bước 2.
4. Chạy Run (Win + R) với lệnh: `uncap` để chạy và `upcap -k` or `uncap --kill` để tắt.
5. Một vài options khác như:

- Swap Caps Lock vs ESC: `uncap 0x1b:0x14`
- Swap Caps Lock vs Left Ctrl: `uncap 0x14:0xa2 0xa2:0x14`
- Log key bindding: `uncap -f C:\keys.txt`

6. Auto run khi khởi động.
   Tạo file bat chứa các options trên.
   Win + R -> shell:startup, copy file bat trên vào đây
