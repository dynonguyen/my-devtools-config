# Update ngen if it's slow to start
# . (Join-Path ([Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory()) ngen.exe) update

Clear-Host

# Import-Module posh-git
# Import-Module oh-my-posh

Set-PoshPrompt -Theme mt

# Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History

Import-Module "C:\terminal-config\terminal\powershell\alias.ps1"
Import-Module "C:\terminal-config\terminal\powershell\remove-built-in-alias.ps1"

# Import-Module z