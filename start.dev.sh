#!/bin/bash

docker image prune -f
docker container prune -f
docker volume prune -f
docker system prune -f

sleep 5

echo "starting app..."

docker-compose up --build -d

sleep 5

echo "app started."