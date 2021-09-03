Clear-Host

Import-Module posh-git
Import-Module oh-my-posh

Set-PoshPrompt -Theme jandedobbeleer

Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History

Import-Module "C:\terminal-config\terminal\powershell\alias.ps1"
Import-Module "C:\terminal-config\terminal\powershell\remove-built-in-alias.ps1"

Import-Module z

Clear-Host