FROM hujingn/nginx-build:1.17.4

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /root

RUN mkdir -p /root/config
RUN mkdir -p /etc/nginx/logs
RUN mkdir -p /etc/nginx/ssl
COPY ./config ./config
COPY ./ssl /etc/nginx/ssl

ARG LOG_PATH="/var/log/nginx"
ENV LOG_PATH=${LOG_PATH}
RUN mkdir -p ${LOG_PATH}

RUN apk add --update coreutils && rm -rf /var/cache/apk/*
RUN chmod a+x /root/config/cut_nginx_log.sh && \
    echo "0 0 * * * sh /root/config/cut_nginx_log.sh" >> /var/spool/cron/crontabs/root

ARG PROXY_PASS="www.baidu.com"
ENV PROXY_PASS=${PROXY_PASS}
ENV DOLLAR="$"

WORKDIR /root/config

EXPOSE 80
CMD ["sh", "run_nginx.sh"]
