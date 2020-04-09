#!/bin/bash
set -euo pipefail

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(<"${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

envs=(
	database__connection__host
	database__connection__user
	database__connection__password
	database__connection__database
)

haveConfig=
for e in "${envs[@]}"; do
	file_env "$e"
	if [ -z "$haveConfig" ] && [ -n "${!e}" ]; then
		haveConfig=1
	fi
done

#
## Default ghost docker-entrypoint.sh
#

# allow the container to be started with `--user`
if [[ "$*" == node*current/index.js* ]] && [ "$(id -u)" = '0' ]; then
	find "$GHOST_CONTENT" \! -user node -exec chown node '{}' +
	exec su-exec node "$BASH_SOURCE" "$@"
fi

if [[ "$*" == node*current/index.js* ]]; then
	baseDir="$GHOST_INSTALL/content.orig"
	for src in "$baseDir"/*/ "$baseDir"/themes/*; do
		src="${src%/}"
		target="$GHOST_CONTENT/${src#$baseDir/}"
		mkdir -p "$(dirname "$target")"
		if [ ! -e "$target" ]; then
			tar -cC "$(dirname "$src")" "$(basename "$src")" | tar -xC "$(dirname "$target")"
		fi
	done
fi

exec "$@"
