#!/bin/sh

echo "Waiting for All three DB to start..."
./scripts/wait-for -t 60 db1:27017
./scripts/wait-for -t 60 db2:27017
./scripts/wait-for -t 60 db3:27017

echo "rs initiatiing ..."
./scripts/rs-init.sh

echo "rs initiated."
