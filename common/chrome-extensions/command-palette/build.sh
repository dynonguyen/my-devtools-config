#!/bin/sh

rm -rf build
mkdir build
cp manifest.json ./build

yarn workspace @dcp/content build
yarn workspace @dcp/background build