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

client_id=$(docker compose -f $docker_compose_path exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --grant-type authorization_code \
    --response-type code,id_token \
    --format "jsonpointer a=/client_id" \
    --name "Development Client" \
    --secret $client_secret \
    --scope $DEV_OAUTH_CLIENT_REQUESTED_SCOPE \
    --redirect-uri http://127.0.0.1:9090/callback | tr -d '"')

# Overwrite existing DEV_OAUTH_CLIENT_ID or append if not exist
grep -q '^DEV_OAUTH_CLIENT_ID=' "$env_path" && \
  sed -i "s/^DEV_OAUTH_CLIENT_ID=.*/DEV_OAUTH_CLIENT_ID=$client_id/" "$env_path" || \
  echo "DEV_OAUTH_CLIENT_ID=$client_id" >> "$env_path"
echo "OAuth client successfully created!"
