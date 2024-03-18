#!/bin/sh

rm -rf build
mkdir -p build
cp manifest.json ./build

concurrently "yarn workspace @dcp/content dev" "yarn workspace @dcp/background dev" "nodemon"