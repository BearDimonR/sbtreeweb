#!/bin/sh

ENV_FILE=${1:-./.env.development}

export $(grep -v '^#' $ENV_FILE | xargs)

source venv/bin/activate
cd src
python3 app.py

