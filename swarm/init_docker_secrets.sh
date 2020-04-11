#!/bin/bash
set -eo pipefail

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -i|--identity-file)
      IDENTITY_FILE="$2"
      shift # past argument
      shift # past value
      ;;
    --remote-destination)
      REMOTE_DESTINATION="$2"
      shift # past argument
      shift # past value
      ;;
    *)                   # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift              # past argument
      ;;
  esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

REMOTE_DOCKER_SOCK_PATH="./.remote-docker.sock"

# Open SSH tunnel to remote Docker engine
if [ ${REMOTE_DESTINATION+x} ]; then
  ssh -o StrictHostKeyChecking=no \
    -i $IDENTITY_FILE \
    -f -M -S $REMOTE_DOCKER_SOCK_PATH \
    -N -L localhost:2376:/var/run/docker.sock \
    $REMOTE_DESTINATION
      DOCKER_HOST_LIST="-H localhost:2376"
fi

# Generate secrets
secrets=(
  MYSQL_ROOT_PASSWORD
  MYSQL_PASSWORD
)
for secret in "${secrets[@]}"; do
  if [ -z "$(docker $DOCKER_HOST_LIST secret ls -f name=$secret -q)" ]; then
    cat /dev/urandom | \
      tr -dc '0-9a-zA-Z!@#$%^&*_+-' | \
      head -c 15 | \
      docker $DOCKER_HOST_LIST secret create $secret -
  fi
done

# Close SSH tunnel
if [ -n ${REMOTE_DESTINATION+x} ]; then
  ssh -S $REMOTE_DOCKER_SOCK_PATH -O exit $REMOTE_DESTINATION
fi
