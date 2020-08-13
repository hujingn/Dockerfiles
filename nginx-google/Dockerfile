FROM hujingn/nginx-build:1.17.4

LABEL maintainer="hujing"

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/share/nginx/html
RUN mkdir -p /etc/nginx
RUN mkdir -p /etc/nginx/logs
RUN mkdir -p /etc/nginx/ssl
RUN mkdir -p /var/log/nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./ssl /etc/nginx/ssl

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]