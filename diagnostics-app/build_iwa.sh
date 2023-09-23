#!/usr/bin/env bash

# Build the angular project
ng build --configuration iwa

# Create folders
mkdir -p dist/iwa
iwa_src=$(mktemp -d)
web_bundle=$(mktemp)

# Copy the files into the temporary folders
cp -r dist/diagnostics-app/* ${iwa_src}
cp -r iwa/public/* ${iwa_src}

# Create the bundle
wbn --dir ${iwa_src} --output ${web_bundle} --formatVersion b2
wbn-sign -i ${web_bundle} -o dist/iwa/sample-iwa.swbn -k ed25519key.pem

# Delete the resources
rm -r ${iwa_src}
rm ${web_bundle}
