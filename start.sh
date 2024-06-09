#!/bin/bash
# Ensure, that docker-compose stopped
docker-compose stop

# Start new deployment
docker-compose up

docker exec -i mongo_db mongosh -u admin -p 123456 --authenticationDatabase admin MarketDB < mongo-init.js
