FROM postgres:15

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=adminpass
ENV POSTGRES_DB=mydatabase

COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/

EXPOSE 5432
