FROM xiaobin/ass_base
MAINTAINER xiaobin@firevale.com

COPY rel /rel

VOLUME ["/uploads", "/var/log/acs"]

RUN { \
        echo '#/bin/sh'; \
        echo 'mkdir -p /etc/rsyslog.d'; \
        echo 'echo "*.* @@$RSYSLOG_HOST:$RSYSLOG_PORT" > /etc/rsyslog.d/forward.conf'; \
        echo 'rsyslogd'; \
        echo '/rel/acs/bin/acs start'; \
        echo 'touch /var/log/acs/info.log'; \
        echo 'tail -f /var/log/acs/info.log'; \
    } > /start.sh && \
    chmod a+x /start.sh

ENTRYPOINT ["/bin/sh"]

EXPOSE 4000

CMD ["/start.sh"]