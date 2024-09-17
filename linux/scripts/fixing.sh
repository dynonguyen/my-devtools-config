# Fix read only file system
# https://operavps.com/docs/solve-read-only-file-system-error/
mount -o remount,rw /
mount -o remount,rw /dev/sda?
