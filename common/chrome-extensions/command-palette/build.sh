#!/bin/sh

rm -rf build
mkdir build
cp manifest.json ./build

yarn workspace @command-palette/content build
yarn workspace @command-palette/background build