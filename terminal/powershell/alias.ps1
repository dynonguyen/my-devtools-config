# Alias File
# Exported by : Dyno Nguyen
# Date/Time : 03/09/2021

# --------- Common ---------
# sync setting
Function savesetting{
  cp "C:\Users\Tuan\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json" "C:\terminal-config\terminal\powershell\setting.json"

  cp "C:\Users\Tuan\AppData\Local\nvim\init.vim" "C:\terminal-config\vim"

  Copy-Item -Path 'C:\Users\Tuan\AppData\Local\nvim\settings\*' -Destination 'C:\terminal-config\vim\settings' -Recurse

  Copy-Item -Path 'C:\Users\Tuan\AppData\Local\nvim\scripts\*' -Destination 'C:\terminal-config\vim\scripts' -Recurse

  Copy-Item "C:\Users\Tuan\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1" -Destination "C:\terminal-config\terminal\powershell\profile.ps1"
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
Function no{ notepad $args }

# --------- Project Manager ---------
Function pdemo{ cd "C:\code\demo" }
Function pcode{ cd "C:\code" }
Function vimconf{ cd "C:\Users\Tuan\AppData\Local\nvim" }
Function config{ cd "C:\terminal-config" }

# --------- npm ---------
Function ni{ npm install $args }
Function nig{ npm install -g $args }
Function nid{ npm install --save-dev $args }
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
Function ya{ yarn add $args }
Function yag{ yarn add -g $args }
Function yad{ yarn add --dev $args }
Function yr{ yarn remove $args }

# --------- Git, Github ---------
Function gs{ git status }
Function gi{ git init }
Function gcf{ git clean -f $args }
Function gsh{ git show $args }
Function gl{ git log }  
Function gd{ git diff $args }
Function ga{ git add $args }
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
