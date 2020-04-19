#!/bin/bash

# docker exec -d mongo mongo --eval 'db.getSiblingDB("testsssssssssssss") db.Users.insert({"UserName": "admin", "Password": "$2a$10$6CQq/M9yQLKCJ4aKqVMLaeOqZ2uA4cq5q4n15T2d6tArdIdYpf5qO"}) db.Users.createIndex( { "user_id": 1 }, { unique: true } )'
docker exec -d mongo sh -c '"test" &> heres.txt'

