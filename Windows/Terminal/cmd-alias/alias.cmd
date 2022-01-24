@echo off
cls

:: Basic command
DOSKEY ls=dir
DOSKEY touch=type nul $g $*
DOSKEY mv=move $*
DOSKEY b=cd ..
DOSKEY f=dir "\*$1*" /s
DOSKEY chocolist=choco list --localonly

:: Project Manager
DOSKEY p_demo=cd "C:\code\demo"$Tnvim
DOSKEY cd_code=cd "C:\code"

:: Config
DOSKEY viconf=cd "C:\Users\Tuan\AppData\Local\nvim"$Tnvim
DOSKEY config=cd "C:\terminal-config"
DOSKEY ali=cd "C:\terminal-config\alias"$Tnvim alias.cmd

:: Npm
DOSKEY ni=npm install
DOSKEY ns=npm start
DOSKEY nt=npm run test
DOSKEY nb=npm run build
DOSKEY nd=npm run dev
DOSKEY nig=npm install -g
DOSKEY nid=npm install --d

:: Yarn
DOSKEY yi=yarn install
DOSKEY yit=yarn init
DOSKEY ys=yarn start
DOSKEY yt=yarn test
DOSKEY yb=yarn build
DOSKEY yd=yarn dev
DOSKEY ydp=yarn deploy
DOSKEY ya=yarn add $*
DOSKEY yag=yarn add -g $*
DOSKEY yad=yarn add --dev $*
DOSKEY yr=yarn remove $*

:: Git
DOSKEY gi=git init
DOSKEY gs=git status
DOSKEY gcf=git clean -f $*
DOSKEY gsh=git show
DOSKEY gl=git log
DOSKEY gd=git diff $*
DOSKEY gcre=git config --global credential.helper cache --timeout=864000
DOSKEY ga=git add $*
DOSKEY gcm=git commit -m $*
DOSKEY gca=git commit --amend
DOSKEY gb=git branch
DOSKEY gbd=git branch -D $*
DOSKEY gch=git checkout $*
DOSKEY gchb=git checkout -b $*
DOSKEY gchm=git checkout master
DOSKEY gp=git push
DOSKEY gphm=git push heroku master
DOSKEY gpf=git push --force
DOSKEY gpuo=git push -u origin $*
DOSKEY gpl=git pull
DOSKEY gcl=git clone $*
DOSKEY gr=git remote add origin $*
DOSKEY grv=git remote -v
DOSKEY grrm=git remote rm $*
DOSKEY gf=git fetch origin
DOSKEY grs=git reset --soft $*
DOSKEY grm=git reset --mixed $*
DOSKEY grh=git reset --hard $*
DOSKEY grb=git rebase

:: Node script
DOSKEY nod=node index.js

:: Neovim script
DOSKEY vi=nvim $*
