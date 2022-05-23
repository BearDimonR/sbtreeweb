FROM python:3.8
RUN pip install --upgrade pip

COPY ./requirements.txt /app/requirements.txt
COPY ./google_creds.json /app/google_creds.json
COPY ./.env /app/.env
COPY ./proxy /app/proxy

ENV FLASK_ENV=production

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

WORKDIR /app/src

ENTRYPOINT ["python", "app.py"]