#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Set DNS for CADS VPN
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🛜

# Documentation:
# @raycast.author tuan

networksetup -setdnsservers Wi-Fi 172.27.11.145 172.27.11.146 8.8.8.8 8.8.4.4 