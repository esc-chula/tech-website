#!/usr/bin/env bash

client_secret="dev-secret"
root_dir=$(git rev-parse --show-toplevel 2>&1)
env_path=$root_dir/.env
docker_compose_path=$root_dir/docker-compose.yaml

if [ $? -ne 0 ]; then
  echo $root_dir
  exit 1
fi

if [ ! -f "$env_path" ]; then
  echo ".env file not found"
  exit 1
fi

source $env_path

docker compose -f $docker_compose_path exec hydra \
    hydra perform authorization-code \
    --client-id $DEV_OAUTH_CLIENT_ID \
    --client-secret $client_secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 9090 \
    --scope $DEV_OAUTH_CLIENT_REQUESTED_SCOPE
