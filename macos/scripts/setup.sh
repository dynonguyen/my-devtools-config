#!/bin/sh

CONFIG_PATH=$HOME/Developer/personal/my-devtools-config

# Common setup
sh $CONFIG_PATH/common/scripts/setup.sh

# Default app
default-app Code json json5 js ts jsx tsx go html xml css sass scss vue md mdx
default-app Pixea jpg jpeg png heic heif svg gif ico bmp tiff webp mov mp4 avi mkv
