#!/bin/sh

ENV_FILE=${1:-./.env.development}

. $ENV_FILE

export MYSQL_USER=$MYSQL_USER
export MYSQL_PASSWORD=$MYSQL_PASSWORD
export MYSQL_HOST=$MYSQL_HOST
export MYSQL_DB=$MYSQL_DB
export MYSQL_PORT=$MYSQL_PORT
export GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
export GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
export JWT_ISSUER=$JWT_ISSUER
export JWT_SECRET=$JWT_SECRET
export JWT_LIFETIME_SECONDS=$JWT_LIFETIME_SECONDS
export JWT_ALGORITHM=$JWT_ALGORITHM
export FLASK_ENV=$FLASK_ENV

source venv/bin/activate
cd src
python3 app.py

