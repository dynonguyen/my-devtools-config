#!/usr/bin/osascript

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title iTerm - New Window
# @raycast.mode silent

# Optional parameters:
# @raycast.icon ../../Images/icons/iterm.png

# Documentation:
# @raycast.description Open iTerm2 in new window

if application "iTerm" is running then
    tell application "iTerm"
        create window with default profile
    end tell
else
    activate application "iTerm"
end if