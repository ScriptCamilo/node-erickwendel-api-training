docker run \
  --name postgres \
  -e POSTGRES_USER=scriptcamilo \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker exec -it postgres /bin/bash

docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

## ---- MONGODB

docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminword \
  -d \
  mongo:4

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

docker exec -it mongodb \
  mongo --host localhost -u admin -p adminword --authenticationDatabase admin \
  --eval "db.getSiblingDB('heroes').createUser({user: 'scriptcamilo', pwd: 'mysecretpassword', roles: [{role: 'readWrite', db: 'heroes'}]})"
