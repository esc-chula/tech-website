#!/usr/bin/env bash

EXT=""

if [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    EXT=".exe"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    EXT=".exe"
fi

GEN_TS_PROTO_PATH="./node_modules/.bin/protoc-gen-ts_proto${EXT}"

find ./proto -name '*.proto' -exec sh -c 'protoc \
-I proto \
--plugin=protoc-gen-ts_proto=${2} \
--ts_proto_opt=outputServices=grpc-js \
--ts_proto_out=./src/generated $1' sh {} "${GEN_TS_PROTO_PATH}" \;
