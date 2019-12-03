FROM alpine:3.10.3

ENV NGINX_VERSION=1.17.4
RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz

# For latest build deps, see https://github.com/nginxinc/docker-nginx/blob/master/mainline/alpine/Dockerfile
RUN apk add --no-cache --virtual .build-deps \
  gcc \
  libc-dev \
  make \
  openssl-dev \
  pcre-dev \
  zlib-dev \
  linux-headers \
  curl \
  gnupg \
  libxslt-dev \
  gd-dev \
  geoip-dev

RUN mkdir /usr/src && \ 
  tar -zxC /usr/src -f nginx.tar.gz && \
  cd /usr/src/nginx-$NGINX_VERSION && \
  mkdir /var/cache/nginx && \
  mkdir /usr/src/ngx_http_substitutions_filter_module

WORKDIR /usr/src/nginx-$NGINX_VERSION
COPY ./ngx_http_substitutions_filter_module /usr/src/ngx_http_substitutions_filter_module

RUN ./configure \
      --prefix=/etc/nginx \
      --sbin-path=/usr/sbin/nginx \
      --modules-path=/usr/lib/nginx/modules \
      --conf-path=/etc/nginx/nginx.conf \
      --error-log-path=/var/log/nginx/error.log \
      --http-log-path=/var/log/nginx/access.log \
      --pid-path=/var/run/nginx.pid \
      --lock-path=/var/run/nginx.lock \
      --http-client-body-temp-path=/var/cache/nginx/client_temp \
      --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
      --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
      --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
      --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
      --with-perl_modules_path=/usr/lib/perl5/vendor_perl \
      --with-compat \
      --with-file-aio \
      --with-threads \
      --with-http_addition_module \
      --with-http_auth_request_module \
      --with-http_dav_module \
      --with-http_flv_module \
      --with-http_gunzip_module \
      --with-http_gzip_static_module \
      --with-http_mp4_module \
      --with-http_random_index_module \
      --with-http_realip_module \
      --with-http_secure_link_module \
      --with-http_slice_module \
      --with-http_ssl_module \
      --with-http_stub_status_module \
      --with-http_sub_module \
      --with-http_v2_module \
      --with-mail \
      --with-mail_ssl_module \
      --with-stream \
      --with-stream_realip_module \
      --with-stream_ssl_module \
      --with-stream_ssl_preread_module \
      --with-cc-opt='-Os -fomit-frame-pointer' \
      --with-ld-opt=-Wl,--as-needed \
      --add-module=/usr/src/ngx_http_substitutions_filter_module && \
    make && make install

RUN rm -rf /usr/src/nginx-$NGINX_VERSION && \
    rm -f /nginx.tar.gz
WORKDIR /

ENV BUILD_DEPS="gettext"  \
    RUNTIME_DEPS="libintl"

RUN apk add --update $RUNTIME_DEPS && \
    apk add --virtual build_deps $BUILD_DEPS &&  \
    cp /usr/bin/envsubst /usr/local/bin/envsubst && \
    apk del build_deps

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]