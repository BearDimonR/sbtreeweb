## SBTree repository

# Deployment sector

# Initialization of deployment

The full initialization of infrastructure described [here](https://github.com/BearDimonR/aws_deployment)

Note!
1. Don't forget to properly create all .env files
2. Don't forget to change DNS configs for new instances

# Development sector

# How to start frontend for the first time?

1. `npm i --legacy-peer-deps` - there is conflict with react v17 and graph lib, to be fixed

2. create `.env` from `.env.example` - or ask someone to provide you it

3. `npm start`

# How to start frontend later?

1. `npm start`

# How to start backend in the docker?

1. follow instructions in `proxy/certs/README.md` and create self-signed certificate

2. `cd backend`

3. create `.env` from `.env.example` - or ask someone to provide you it

4. ask someone to provide you `google_creds.json` file 

5. run `docker build -t sbtree-backend .`

6. run `docker run --rm -p 3002:443 sbtree-backend`

# How to start backend for the first time?

1. `cd backend`

2. `python3 -m pip install --user virtualenv`

3. `python3 -m venv venv`

4. `source venv/bin/activate`

5. `pip install -r requirements.txt`

6. create `.env` from `.env.example` - or ask someone to provide you it

8. ask someone to provide you `google_creds.json` file

10. `python src/app.py`

# How to start backend later?

1. `source venv/bin/activate`

3. `python src/app.py`
