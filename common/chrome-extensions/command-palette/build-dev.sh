#!/bin/sh

rm -rf build
mkdir -p build
cp manifest.json ./build

concurrently "node ./packages/_hot-reload_/ws.js" "yarn workspace @dcp/content dev" "yarn workspace @dcp/background dev" "nodemon" "npx http-server ./packages/_hot-reload_ -p 8888 -s"
