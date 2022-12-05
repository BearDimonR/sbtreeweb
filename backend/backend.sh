#!/bin/sh

ENV_FILE=${1:-./.env.development}

export $(grep -v '^#' $ENV_FILE | xargs)

venv/bin/python src/app.py

