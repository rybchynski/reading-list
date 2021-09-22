include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: build
build:
	docker-compose up -d --force-recreate --build

.PHONY: stop    
stop:
	docker-compose stop

.PHONY: bash
bash:
# make bash c=rl_api
	docker exec -it $(c) /bin/sh

.DEFAULT_GOAL := up
