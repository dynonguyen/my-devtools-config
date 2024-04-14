#!/bin/sh

rm -rf build
mkdir -p build/assets

cp manifest.json ./build
cp ./packages/shared/assets/* ./build/assets

yarn workspace @dcp/content build
yarn workspace @dcp/background build
yarn workspace @dcp/options build