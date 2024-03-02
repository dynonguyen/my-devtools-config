alias clean_cache='su -c "echo Before; free -h | head -n 2; sync; echo 3 > /proc/sys/vm/drop_caches; echo After; free -h | head -n 2"'
alias swap_key='setxkbmap -option caps:swapescape'

alias svc_start='sudo systemctl start $@'
alias svc_stop='sudo systemctl stop $@'
alias svc_restart='sudo systemctl restart $@'
alias svc_status='systemctl status $@'

alias kde_keymapping='svi /usr/share/X11/xkb/symbols/pc'
alias ii='nohup dolphin $@ &'
