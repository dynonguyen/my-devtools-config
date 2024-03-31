#!/bin/sh

rm -rf build
mkdir -p build
cp manifest.json ./build

concurrently "yarn workspace @dcp/content dev" "yarn workspace @dcp/background dev" "npx http-server . -p 8888 -s" "nodemon --watch manifest.json --exec 'cp manifest.json ./build/manifest.json'" "mkdir -p build/assets && nodemon --watch packages/content/public/**/* --ext svg,png,jpeg,jpg --exec 'cp ./packages/content/public/* ./build/assets'"
