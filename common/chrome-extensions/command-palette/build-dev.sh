#!/bin/sh

rm -rf build
mkdir -p build
cp manifest.json ./build

concurrently "yarn workspace @command-palette/content dev" "yarn workspace @command-palette/background dev" "nodemon"