#!/usr/bin/osascript

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Google Chrome - New Window
# @raycast.mode silent

# Optional parameters:
# @raycast.icon ../../Images/icons/chrome.png

# Documentation:
# @raycast.description Open Google Chrome in new window

tell application "Google Chrome"
	make New Window
end tell