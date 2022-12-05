# SBTree backend

### Setup required files

**.env.development**

`REACT_APP_PROXY_URL` - proxy for frontend

`REACT_APP_LANDING_URL` - url for landing page (click on logo)

*.env for docker*
```
REACT_APP_PROXY_URL='https://sbtree_backend:443'
REACT_APP_LANDING_URL='https://www.google.com'
HTTPS=true
PORT=3000
```

**google_creds.json**


### How to start backend for the first time?

1. `cd backend`

2. `python3 -m pip install --user virtualenv`

3. `python3 -m venv venv`

4. `source venv/bin/activate`

5. `pip install -r requirements.txt`

6. create `.env.development` from `.env.example` - or ask someone to provide you it

8. ask someone to provide you `google_creds.json` file

10. `python src/app.py`

### How to start backend later?

1. `source venv/bin/activate`

3. `python src/app.py`