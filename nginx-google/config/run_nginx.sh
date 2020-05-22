#!/usr/bin/env bash

set -x

# export NGINX_REWRITE="rewrite ^/function/(.*)$ /function/dev-$1 last;"
# export NGINX_PROXY_PASS="http://faas-test.aibee.cn/function"
crond
envsubst < nginx.template.conf > /etc/nginx/nginx.conf
nginx -g "daemon off;"
