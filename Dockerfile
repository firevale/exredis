FROM docker-registry.firevale.com/ass_dev:latest

EXPOSE 80

VOLUME ["/code"]

WORKDIR /code

VOLUME ['/usr/local/share/.cache', '/opt/app/.cache']

RUN  mkdir -p /run/nginx && \
     mkdir -p /code && \
     { \
        echo '#/bin/sh'; \
        echo 'cd /code && mix deps.get'; \
        echo 'cd /code && mix deps.compile'; \
        echo 'cd /code && mix compile'; \
        echo 'sysctl -e -w fs.inotify.max_user_watches=524288'; \
        echo 'cd /code/static && npm install --no-optional --verbose'; \
        echo 'cd /code && mix ecto.setup'; \
        echo 'cd /code && iex -S mix phoenix.server'; \
    } > /start.sh && \
    chmod a+x /start.sh && \
    git config --global http.sslVerify false

ENTRYPOINT ["/bin/zsh"]
