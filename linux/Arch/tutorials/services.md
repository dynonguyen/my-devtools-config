# Start/stop Linux services

## Bluetooth (bluez, blueman)

```
  sudo systemctl start bluetooth.service
  sudo systemctl enable bluetooth.service
  sudo systemctl pulseaudio start
```

## SQL Server

> Setup

```
  sudo /opt/mssql/bin/mssql-conf setup
```

> Thay dổi mật khẩu password `sa`

```
  sudo /opt/mssql/bin/mssql-conf set-sa-password
```

> Thay đổi đường dẫn lưu trữ data mặc định

```sh
  # Root user
  sudo su
  systemctl stop mssql-server

  # create new location
  mkdir /storage/database/mssql/data

  # change owner
  chown mssql /storage/database/mssql/data

  # change group
  chgrp mssql /storage/database/mssql/data

  # change location
  /opt/mssql/bin/mssql-conf set filelocation.defaultdatadir /storage/database/mssql/data

  # move all files to new location
  mv /var/opt/mssql/data/templog.ldf /storage/database/mssql/data
  mv /var/opt/mssql/data/tempdb.mdf /storage/database/mssql/data

  # restart server
  systemctl start mssql-server
```

> Service

```
  sudo systemctl enable mssql-server
  sudo systemctl start mssql-server
  sudo systemctl stop mssql-server
  sudo systemctl status mssql-server
```

## Mongodb

```
  sudo mongod --port 27017 --dbpath /storage/database/mongodb
```

## Postgresql

```sh
  mkdir /storage/database/postgresql/data
  sudo passwd postgres
  sudo chown postgres /storage/database/postgresql/data
  sudo chgrp postgres /storage/database/postgresql/data
  sudo -u postgres -i
  initdb --locale $LANG -E UTF8 -D /storage/database/postgresql/data
  sudo systemctl daemon-reload
  sudo nvim /usr/lib/systemd/system/postgresql.service
  # Change $PGROOT=/storage/database/postgresql/data
  sudo systemctl start postgresql.service
```

## MariaDB

```sh
  sudo pacman -S mariadb
  mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
  mysql_secure_installation
  systemctl start mariadb

  # Fix error
  sudo /usr/bin/mysqld_safe --datadir='/var/lib/mysql'
```

## Apache Server

[Document Here](../services/apache-php.md)

## Teamviewer

```
  sudo systemctl enable teamviewered.service
```

## Ethernet & Network manager

```
  ip address
  systemctl list-units | grep dhcp
  systemctl start dhcpdc@interface
```

## Connect to Iphone

```sh
  sudo pacman -S libimobiledevice # needed protocols to connect
  yay -S ifuse # needed to mount
  systemctl start usbmuxd.service # ensure service running
  idevicepair pair # pair phone
  mkdir /mnt/iphone # place to mount
  sudo ifuse -o allow_other /mnt/iphone # mount phone
  ls /mnt/iphone # go explore
```
