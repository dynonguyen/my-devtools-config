# Exported by : Dyno Nguyen
# Date/Time : 03/09/2021

# --------- Common ---------
# sync setting
Function savesetting{
  cp "C:\Users\Tuan\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json" "C:\tool-config\Windows\Terminal\powershell\setting.json"

  cp "C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\6.2.2\themes\mt.omp.json" "C:\tool-config\Windows\Terminal\powershell\themes\mt.json"

  cp "C:\Users\Tuan\AppData\Local\nvim\init.vim" "C:\tool-config\Windows\Vim"
  
  cp "C:\Users\Tuan\AppData\Local\nvim\coc-settings.json" "C:\tool-config\Windows\Vim"

  cp "C:\Users\Tuan\AppData\Roaming\Code\User\keybindings.json" "C:\tool-config\Vscode"

  cp "C:\Users\Tuan\AppData\Roaming\Code\User\settings.json" "C:\tool-config\Vscode"

  cp "C:\Users\Tuan\.vscode\extensions\dyno dark theme\themes\Dyno Nguyen-color-theme.json" "C:\tool-config\Vscode\my-extensions\dyno dark theme\themes\Dyno Nguyen-color-theme.json"


  cp "C:\Users\Tuan\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"  "C:\tool-config\Windows\Terminal\powershell\profile.ps1"

  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\settings\*" -Destination "C:\tool-config\Windows\Vim\settings" -Recurse

  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\scripts\*" -Destination "C:\tool-config\Windows\Vim\scripts" -Recurse
  
  Copy-Item -Path "C:\Users\Tuan\AppData\Local\nvim\snippets\*" -Destination "C:\tool-config\Windows\Vim\snippets" -Recurse

  Copy-Item -Path "C:\Users\Tuan\AppData\Roaming\Code\User\snippets\*" -Destination "C:\tool-config\Vscode\snippets" -Recurse -ErrorAction SilentlyContinue
}

# quick open file
Function oalias{
  code "C:\tool-config\Windows\Terminal\powershell\alias.ps1"
}
Function open-vsc-ws {
  code "C:\Users\Tuan\AppData\Roaming\Code\storage.json"
}

# --------- Project Manager ---------
Function vimconf{ cd "C:\Users\Tuan\AppData\Local\nvim" }
Function config{ cd "C:\tool-config" }

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
# open vscode
Function vsc{ code . }

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
Function ys{ yarn start }
Function yt{ yarn test }
Function yb{ yarn build }
Function yd{ yarn dev }
Function ya{ 
  $cmd = "yarn add"
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
Function yi{ yarn info $args }
Function yiv{ yarn info $args version }

# --------- Git, Github ---------
Function gs{ git status }
Function gi{ git init }
Function gcf{ git clean -f $args }
Function gsh{ git show $args }
Function gl{ git log }  
Function glo{ git log --oneline }  
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
Function gcane{ git commit --amend --no-edit }
Function gb{ git branch $args }
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
Function gh{
  $branch = git config remote.origin.url;
  start $branch;
}

# --------- Neovim ---------
Function vi{ nvim $args }

# --------- NodeJS Script ---------
Function nod{ node index.js }
Function ts{ ts-node -T $args }

# --------- Util functions ---------
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

# remove node_modules
Function rm-node{ 
  Remove-Item .\node_modules\ -Recurse -Force
}

# copy all
Function cpa{  
  Copy-Item -Path $args[0] -Destination $args[1] -Recurse
}

# --------- Temp ---------
Function run-smarket {
  cd "C:\code\PTUDHD\Smarket";
  $Host.UI.RawUI.WindowTitle = "Smarket";

  wt -w 0 -d C:\code\PTUDHD\Smarket\Views_NodeJS -p "Windows PowerShell" --title "View_NodeJS" powershell -noExit "yarn dev"; 
  wt -w 0 -d C:\code\PTUDHD\Smarket\API_DOTNETCore\API_.NET -p "Windows PowerShell" --title "C# API" powershell -noExit "dotnet run watch"; 
  wt -w 0 -d C:\code\PTUDHD\Smarket\API_JAVASpringBoot\API_JAVA -p "Windows PowerShell" --title "Java API" powershell -noExit "mvn spring-boot:run";
  wt -w 0 focus-tab -t 0;

  if( $args[0] -eq 'j' ){
    code "C:\code\PTUDHD\Smarket\API_JAVASpringBoot\API_JAVA"
  } elseif ( $args[0] -eq 'c' ){
    code "C:\code\PTUDHD\Smarket\API_DOTNETCore\API_.NET";
  } elseif ( $args[0] -eq 'jc' ){
    code "C:\code\PTUDHD\Smarket\API_JAVASpringBoot\API_JAVA"
    code "C:\code\PTUDHD\Smarket\API_DOTNETCore\API_.NET";
  }
  code "C:\code\PTUDHD\Smarket\Views_NodeJS";

  Start-Sleep -Milliseconds 200;
  start "http://localhost:3000";
}

<# Function run-covid-project {
  cd "C:\code\ptud-web\covid-project";
  $Host.UI.RawUI.WindowTitle = "Covid Project";
  wt -w 0 split-pane -V -p "Windows PowerShell" -d "C:\code\ptud-web\covid-project-payment-system" powershell -noExit "yarn dev"; 

  code "C:\code\ptud-web\covid-project"
  if ( $args[0] -eq 'p'){
    code "C:\code\ptud-web\covid-project-payment-system";
  }

  start "https://localhost:3000";
  yarn dev;
}
 #>