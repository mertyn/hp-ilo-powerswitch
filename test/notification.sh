#!/bin/bash

url=$1
default_url="https://localhost:5000/api/notification"

if [[ -z $url ]]; then
    url=$default_url
fi

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"token": "test"}' \
    --insecure \
    $url