#!/bin/bash
set -euo pipefail

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
SOURCE_PATH=$(readlink -e $SOURCE_DIR)

SECRETS_DIR="$SOURCE_PATH/.secrets"

function usage() {
  echo "Usage: $0 SERVICE_TO_BUILD..."
  echo "  --no-cache   Do not use cache when building images"
  exit 1
}

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

NO_CACHE=""

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  -h | --help)
    usage
    ;;
  --no-cache)
    NO_CACHE="$1"
    shift
    ;;
  *)                   # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift              # past argument
    ;;
  esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# Build every services if none was specified
if [ ${#POSITIONAL[@]} -eq 0 ]; then
  POSITIONAL=(
    "next_app"
    "send_email"
  )
fi

for service in "${POSITIONAL[@]}"; do
  if [ "$service" == "next_app" ]; then
    DOCKER_BUILDKIT=1 docker build $NO_CACHE \
      --tag petitloan/mysite:next_app \
      --secret id=GHOST_CONTENT_API_KEY,src=$SECRETS_DIR/GHOST_CONTENT_API_KEY.txt \
      $SOURCE_DIR/../next_app
  fi

  if [ "$service" == "send_email" ]; then
    docker build $NO_CACHE --tag petitloan/mysite:send_email $SOURCE_DIR/../send_email
  fi
done

# Push builded images to Docker Hub 'petitloan/mysite' repository
docker push petitloan/mysite
