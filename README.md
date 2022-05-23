## SBTree repository

# How to start frontend for the first time?

1. `npm i --legacy-peer-deps` - there is conflict with react v17 and graph lib, to be fixed

2. create `.env` from `.env.example` - or ask someone to provide you it

3. `npm start`

# How to start frontend later?

1. `npm start`

# How to start backend in the docker?

1. create `.env` from `.env.example` - or ask someone to provide you it

2. ask someone to provide you `google_creds.json` file

3. create `proxy/certs/sbtree.local.cert` and `proxy/certs/sbtree.local.key`

3.1. you can use https://github.com/FiloSottile/mkcert

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
