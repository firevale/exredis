FROM docker-registry.firevale.com/ass_base
MAINTAINER xiaobin@firevale.com

ARG MIX_ENV

COPY _build/${MIX_ENV}/rel /rel

VOLUME ["/rel/acs/lib/acs_web-0.0.1/priv/static"]

RUN { \
        echo '#/bin/sh'; \
        echo 'mkdir -p /etc/rsyslog.d'; \
        echo 'echo "*.* @@$RSYSLOG_HOST:$RSYSLOG_PORT" > /etc/rsyslog.d/forward.conf'; \
        echo 'rsyslogd'; \
        echo 'alias acs=/rel/acs/bin/acs'; \
        echo '/rel/acs/bin/acs start'; \
        echo 'mkdir -p /var/log/acs'; \
        echo 'touch /var/log/acs/info.log'; \
        echo 'tail -f /var/log/acs/info.log'; \
    } > /start.sh && \
    chmod a+x /start.sh 

ENTRYPOINT ["/bin/sh"]

EXPOSE 4000 9527

CMD ["/start.sh"]