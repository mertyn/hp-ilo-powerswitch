#!/bin/bash

url=$1
default_url="https://localhost:8080/notification"

if [[ -z $url ]]; then
    url=$default_url
fi

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"token": "%7f#u7dVD35YmPCq!$&w"}' \
    --insecure \
    $url