FROM python:3.9.0-slim-buster
RUN pip install --upgrade pip

RUN mkdir -p /app/proxy
COPY ./requirements.txt /app/requirements.txt
COPY ./proxy /app/proxy

WORKDIR /app
RUN python3 -m venv venv
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt

EXPOSE 443

COPY . /app

ENTRYPOINT ["sh", "backend.sh", "./.env.docker"]