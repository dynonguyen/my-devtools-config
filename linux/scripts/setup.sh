#!/bin/sh

CONFIG_PATH=$HOME/Developer/personal/my-devtools-config

# Common setup
sh $CONFIG_PATH/common/scripts/setup.sh

sudo usermod -aG docker ${USER}
sudo chmod 777 /var/run/docker.sock
