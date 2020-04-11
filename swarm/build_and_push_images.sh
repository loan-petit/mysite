#!/bin/bash
set -euo pipefail

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
SOURCE_PATH=$(readlink -e $SOURCE_DIR)

SECRETS_DIR="$SOURCE_PATH/.secrets"

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  --secrets-dir)
    SECRETS_DIR="$2"
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

# Build Docker image for Gatsby frontend using secrets stored in SECRETS_DIR.
DOCKER_BUILDKIT=1 docker build --no-cache --progress=plain \
  --tag mysite:gatsby \
  --build-arg GHOST_API_URL=https://www.loanpetit.com:2368 \
  --secret id=GHOST_CONTENT_API_KEY,src=$SECRETS_DIR/GHOST_CONTENT_API_KEY.txt \
  $SOURCE_DIR/../gatsby

# Send the builded image to 'petitloan' Docker Hub repository
GATSBY_IMAGE_ID=$(docker image inspect mysite:gatsby --format='{{ .Id }}')
docker tag $GATSBY_IMAGE_ID petitloan/mysite:gatsby
docker push petitloan/mysite

