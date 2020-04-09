#!/bin/bash
set -euo pipefail

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

cat /dev/urandom | tr -dc '0-9a-zA-Z!@#$%^&*_+-' | head -c 15 | docker secret create MYSQL_ROOT_PASSWORD -
cat /dev/urandom | tr -dc '0-9a-zA-Z!@#$%^&*_+-' | head -c 15 | docker secret create MYSQL_PASSWORD -