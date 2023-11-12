#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Set default DNS
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🛜

# Documentation:
# @raycast.author tuan

networksetup -setdnsservers Wi-Fi 8.8.8.8 8.8.4.4 