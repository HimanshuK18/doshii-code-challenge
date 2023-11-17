
FROM mcr.microsoft.com/mssql/server:2017-latest

ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=Doshii165*
ENV MSSQL_PID=Developer
ENV MSSQL_TCP_PORT=1433

RUN mkdir -p /etc/mssql
RUN echo "enable TCP" >> /etc/mssql/mssql.conf

WORKDIR /usr/src/app
COPY createDB.sql .
EXPOSE 1433

RUN ( /opt/mssql/bin/sqlservr -c "tcpip1" -T100 --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Doshii165*' -i /usr/src/app/createDB.sql \
    && pkill sqlservr

