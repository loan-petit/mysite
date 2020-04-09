#!/bin/bash
set -euo pipefail

SOURCE_DIR=$( dirname "${BASH_SOURCE[0]}")
SOURCE_PATH=$(readlink -e $SOURCE_DIR)

SECRETS_DIR=$SOURCE_PATH/.build_secrets

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

# Build Docker image for Gatsby frontend using secrets stored in SECRETS_DIR.
DOCKER_BUILDKIT=1 docker build --no-cache --progress=plain \
    --tag personal-website:gatsby \
    --build-arg GHOST_API_URL=http://loanpetit.com:8080 \
    --secret id=GHOST_CONTENT_API_KEY,src=$SECRETS_DIR/GHOST_CONTENT_API_KEY.txt \
    $SOURCE_DIR/../gatsby

# Send the builded image to 'petitloan' Docker Hub repository
GATSBY_IMAGE_ID=$(docker image inspect personal-website:gatsby --format='{{ .Id }}')
docker tag $GATSBY_IMAGE_ID petitloan/personal-website:gatsby
docker push petitloan/personal-website