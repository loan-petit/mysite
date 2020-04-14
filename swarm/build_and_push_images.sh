#!/bin/bash
set -euo pipefail

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
SOURCE_PATH=$(readlink -e $SOURCE_DIR)

SECRETS_DIR="$SOURCE_PATH/.secrets"

function usage() {
  echo "Usage: $0 SERVICE..."
  echo "  --secrets-dir     Directory where secrets are stored"
  exit 1
}

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

SERVICES_TO_BUILD=()

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  -h | --help)
    usage
    ;;
  --secrets-dir)
    SECRETS_DIR="$2"
    shift 2
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
    "gatsby"
    "send_email"
  )
fi

for service in "${POSITIONAL[@]}"; do
  if [ "$service" == "gatsby" ]; then
    # Build Docker image for 'gatsby' service.
    DOCKER_BUILDKIT=1 docker build --no-cache --progress=plain \
      --tag mysite:gatsby \
      --build-arg GHOST_API_URL=https://www.loanpetit.com:2368 \
      --secret id=GHOST_CONTENT_API_KEY,src=$SECRETS_DIR/GHOST_CONTENT_API_KEY.txt \
      $SOURCE_DIR/../gatsby

    # Tag the builded image
    GATSBY_IMAGE_ID=$(docker image inspect mysite:gatsby --format='{{ .Id }}')
    docker tag $GATSBY_IMAGE_ID petitloan/mysite:gatsby
  fi

  if [ "$service" == "send_email" ]; then
    # Build Docker image for 'sendmail' service.
    docker build --no-cache --tag mysite:send_email $SOURCE_DIR/../send_email

    # Tag the builded image
    SEND_EMAIL_IMAGE_ID=$(docker image inspect mysite:send_email --format='{{ .Id }}')
    docker tag $SEND_EMAIL_IMAGE_ID petitloan/mysite:send_email
  fi
done

# Push builded images to Docker Hub 'petitloan/mysite' repository
docker push petitloan/mysite
