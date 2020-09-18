#!/bin/bash

# Pull latest branch from git
ssh samperron@ssh-samperron.alwaysdata.net << EOF
cd ./www/food-tracker/
git fetch
git checkout $1
git reset --hard HEAD
echo 'ALLOWED_HOSTS = ["samperron.alwaysdata.net",]' >> ./api/settings.py
EOF

# Restart server
curl --basic --user cd61d7460e174eafaa22b203e23329ac: --data '' --request POST https://api.alwaysdata.com/v1/site/614831/restart/
