#!/bin/bash
set -eo pipefail

function usage() {
  echo "Usage: $0 [OPTIONS]"
  echo "  -i, --identity-file     Identity file supplied to ssh command for tunneling"
  echo "  --remote-destination    Remote server destination in user@host format"
  echo "  -u, --traefik-user      Username for secured authentication to Traefik dashboard"
  echo "  -p, --traefik-password  Password for secured authentication to Traefik dashboard"
  echo "  --access-key-id         Your AWS access key id"
  echo "  --secret-access-key     Your AWS secret access key"
  exit 1
}

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  -h | --help)
    usage
    ;;
  -i | --identity-file)
    IDENTITY_FILE="$2"
    shift 2
    ;;
  --remote-destination)
    REMOTE_DESTINATION="$2"
    shift 2
    ;;
  -u | --traefik-user)
    TRAEFIK_USER="$2"
    shift 2
    ;;
  -p | --traefik-password)
    TRAEFIK_PASSWORD="$2"
    shift 2
    ;;
  --access-key-id)
    AWS_ACCESS_KEY_ID="$2"
    shift 2
    ;;
  --secret-access-key)
    AWS_SECRET_ACCESS_KEY="$2"
    shift 2
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

# Usage: remove_secret SECRET_NAME
remove_secret() {
  if [ "$(docker $DOCKER_HOST_LIST secret ls -f name=$1 -q)" ]; then
    docker $DOCKER_HOST_LIST secret rm $1
  fi
}

# Generate user:password secret key pair to connect to Traefik dashboard.
if [ ${TRAEFIK_USER+x} ] && [ ${TRAEFIK_PASSWORD+x} ]; then
  remove_secret TRAEFIK_USERS
  echo $(htpasswd -nb $TRAEFIK_USER $TRAEFIK_PASSWORD) |
    docker $DOCKER_HOST_LIST secret create TRAEFIK_USERS -
fi

# Generate secrets to store AWS credentials
if [ ${AWS_ACCESS_KEY_ID+x} ] && [ ${AWS_SECRET_ACCESS_KEY+x} ]; then
  remove_secret AWS_ACCESS_KEY_ID
  remove_secret AWS_SECRET_ACCESS_KEY
  echo -n $AWS_ACCESS_KEY_ID | docker $DOCKER_HOST_LIST secret create AWS_ACCESS_KEY_ID -
  echo -n $AWS_SECRET_ACCESS_KEY | docker $DOCKER_HOST_LIST secret create AWS_SECRET_ACCESS_KEY -
fi

# Generate MYSQL database random secrets
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

# Close SSH tunnel
if [ ${REMOTE_DESTINATION+x} ]; then
  ssh -S $REMOTE_DOCKER_SOCK_PATH -O exit $REMOTE_DESTINATION
fi
