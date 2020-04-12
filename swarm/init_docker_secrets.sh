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
  -i | --identity-file)
    IDENTITY_FILE="$2"
    shift # past argument
    shift # past value
    ;;
  --remote-destination)
    REMOTE_DESTINATION="$2"
    shift # past argument
    shift # past value
    ;;
  -u | --traefik-user)
    TRAEFIK_USER="$2"
    shift # past argument
    shift # past value
    ;;
  -p | --traefik-password)
    TRAEFIK_PASSWORD="$2"
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

# Open SSH tunnel to remote Docker engine
if [ ${REMOTE_DESTINATION+x} ]; then
  REMOTE_DOCKER_SOCK_PATH="./.remote-docker.sock"

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
    cat /dev/urandom |
      tr -dc '0-9a-zA-Z!@#$%^&*_+-' |
      head -c 15 |
      docker $DOCKER_HOST_LIST secret create $secret -
  fi
done

# Generate user:password secret key pair to connect to Traefik dashboard.
if [ ${TRAEFIK_USER+x} ] && [ ${TRAEFIK_PASSWORD+x} ]; then
  if [ "$(docker $DOCKER_HOST_LIST secret ls -f name=TRAEFIK_USERS -q)" ]; then
    docker $DOCKER_HOST_LIST secret rm TRAEFIK_USERS
  fi
  echo $(htpasswd -nb $TRAEFIK_USER $TRAEFIK_PASSWORD) |
    docker $DOCKER_HOST_LIST secret create TRAEFIK_USERS -
fi

# Close SSH tunnel
if [ ${REMOTE_DESTINATION+x} ]; then
  ssh -S $REMOTE_DOCKER_SOCK_PATH -O exit $REMOTE_DESTINATION
fi
