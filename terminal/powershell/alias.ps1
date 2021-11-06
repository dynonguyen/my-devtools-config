# Alias File
# Exported by : Dyno Nguyen
# Date/Time : 03/09/2021

# --------- Common ---------
# sync setting
Function savesetting{
  cp "C:\Users\Tuan\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json" "C:\terminal-config\terminal\powershell\setting.json"

  cp "C:\Users\Tuan\AppData\Local\nvim\init.vim" "C:\terminal-config\vim"
  
  cp "C:\Users\Tuan\AppData\Local\nvim\coc-settings.json" "C:\terminal-config\vim"

  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\settings\*" -Destination "C:\terminal-config\vim\settings" -Recurse

  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\scripts\*" -Destination "C:\terminal-config\vim\scripts" -Recurse
  
  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\snippets\*" -Destination "C:\terminal-config\vim\snippets" -Recurse

  Copy-Item -Path "C:\Users\Tuan\AppData\Roaming\Code\User\snippets\*" -Destination "C:\terminal-config\vscode\snippets" -Recurse -ErrorAction SilentlyContinue

  cp "C:\Users\Tuan\AppData\Roaming\Code\User\keybindings.json" "C:\terminal-config\vscode"

  cp "C:\Users\Tuan\AppData\Roaming\Code\User\settings.json" "C:\terminal-config\vscode"

  cp "C:\Users\Tuan\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"  "C:\terminal-config\terminal\powershell\profile.ps1"

}
# quick open file
Function ovimtutor{
  vi "C:\terminal-config\vim\README.md"
}
Function ovimmap{
  vi "C:\terminal-config\vim\settings\map.vim"
}
Function oalias{
  vi "C:\terminal-config\terminal\powershell\alias.ps1"
}
Function osnippet{
  cd "C:\Users\Tuan\AppData\Local\nvim\snippets"
  vi
}

# go back windows home
Function home{ cd "C:\" }
# back dir
Function b{ cd .. }
# new file
Function touch{ New-Item -Path . -Name $args[0] }
# view choco list
Function chocolist{ choco list --localonly }
# open $profile with nodepad
Function op{ notepad $PROFILE }
# open file with notepad
Function no{ notepad $args[0] }
# show all file
Function lsa{ ls -Force }
# touch folder and go to this folder
Function mdg{
  md $args[0]
  cd $args[0]
}
# new multiple folder
Function mmd{
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    md $args[$i]
  } 
}
# new multiple files
Function new{
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    touch $args[$i]
  } 
}

# --------- Project Manager ---------
Function pcode{ cd "C:\code" }
Function vimconf{ cd "C:\Users\Tuan\AppData\Local\nvim" }
Function config{ cd "C:\terminal-config" }

# --------- npm ---------
Function ni{ 
  $cmd = "npm install"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function nig{
  $cmd = "npm install -g"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function nid{
  $cmd = "npm install --save-dev"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function ns{ npm start }
Function nt{ npm run test }
Function nb{ npm run build }
Function nd{ npm run dev }

# --------- yarn ---------
Function yi{ yarn install }
Function ys{ yarn start }
Function yt{ yarn test }
Function yb{ yarn build }
Function yd{ yarn dev }
Function ydp{ yarn deploy }
Function ya{ 
  $cmd = "yarn add"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function yc{ yarn create $args }
Function yag{ 
  $cmd = "yarn add -g"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function yad{ 
  $cmd = "yarn add --dev"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function yr{ 
  $cmd = "yarn remove"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}

# --------- Git, Github ---------
Function gs{ git status }
Function gi{ git init }
Function gcf{ git clean -f $args }
Function gsh{ git show $args }
Function gl{ git log }  
Function gd{ git diff $args }
Function ga{ git add $args }
Function grsta{ git restore --staged $args }
Function gaex{
  git add .
  $cmd = "git reset --"
  for ( $i = 0; $i -lt $args.count; $i++ ) {
    $cmd += ' ' + $args[$i]
  } 
  Invoke-Expression $cmd
}
Function gcm{ git commit -m $args }
Function gca{ git commit --amend }
Function gb{ git branch }
Function gbd{ git branch -D $args }
Function gch{ git checkout $args }
Function gchb{ git checkout -b $args }
Function gchm{ git checkout master }
Function gp{ git push }
Function gpf{ git push --force }
Function gpuo{ git push -u origin $args }
Function gpl{ git pull }
Function gcl{ git clone $args }
Function gra{ git remote add $args }
Function grv{ git remote -v }
Function grs{ git reset --soft $args }
Function grh{ git reset --hard $args }
Function grm{ git reset --mixed $args }
Function grb{ git rebase $args }

# --------- Neovim ---------
Function vi{ nvim $args }

# --------- NodeJS Script ---------
Function nod{ node index.js }
Function ts{ ts-node -T $args }
