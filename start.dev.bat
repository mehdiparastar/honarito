#!/bin/bash

docker image prune -f
docker container prune -f
docker volume prune -f
docker system prune -f

timeout  5

echo "starting app..."

icacls ./db /grant Users:F

timeout  5

docker-compose up --build -d

timeout  5

echo "app started."

timeout  60
