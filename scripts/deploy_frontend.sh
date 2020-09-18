#!/bin/bash

# Change API base URL
echo "export const API_BASE_URL = 'http://samperron.alwaysdata.net/';" > ./frontend/src/env.js

# Build latest React app
cd frontend
npm run build

# Push app to server
zip -r build.zip build/
scp build.zip samperron@ssh-samperron.alwaysdata.net:/home/samperron/tmp/
ssh samperron@ssh-samperron.alwaysdata.net << EOF
cd ./www/
rm -rf ./frontend/*
rm -rf ./build/
unzip ../tmp/build.zip
mv ./build/* ./frontend/
cp .htaccess ./frontend/
EOF

# Restart server
curl --basic --user cd61d7460e174eafaa22b203e23329ac: --data '' --request POST https://api.alwaysdata.com/v1/site/616175/restart/

# Clean files
rm build.zip

# Change back API base URL
cd ../
echo "export const API_BASE_URL = 'http://localhost:8000/';" > ./frontend/src/env.js
