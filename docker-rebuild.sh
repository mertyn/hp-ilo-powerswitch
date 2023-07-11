#!/bin/bash
cd $(dirname $0)

image="hp-ilo-powerswitch"
container=$image


# stop compose and container
docker compose down
docker container stop $container
docker rm $container
docker rmi $image


# build and run
docker build -t $image .

if [[ $1 -eq "--run" ]]; then
    docker run -dp 5000:5000 --name $container $image
fi

if [[ $1 -eq "--compose" ]]; then
    docker compose up -d
fi
