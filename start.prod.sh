#!/bin/bash

docker image prune -f
docker container prune -f
docker volume prune -f
docker system prune -f

sleep 5

echo "starting deploying app..."

chmod -R 777 ./db

sleep 5

docker-compose -f docker-compose.prod.yml up --build -d

sleep 5

echo "app deployed."