# SBTree backend

### Setup required files

**.env**


*.env for localhost*

```
JWT_ISSUER=com.zalando.connexion
JWT_SECRET=my_secret
JWT_LIFETIME_SECONDS=1000
JWT_ALGORITHM=HS256

MYSQL_USER=librarian
MYSQL_PASSWORD=pass
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=library

FLASK_ENV=development

IMAGE_API_KEY=<imgbb token>

GOOGLE_CLIENT_ID=<id>
GOOGLE_CLIENT_SECRET=<secret>
```

**google_creds.json** - file which give access to google service account

### How to start backend for the first time?

1. `cd backend`

2. `python3 -m pip install --user virtualenv`

3. `python3 -m venv venv`

4. `source venv/bin/activate`

5. `pip install -r requirements.txt`

6. create `.env.development` from `.env.example` - or ask someone to provide you it (with mysql credentials)

8. ask someone to provide you `google_creds.json` file

10. `python src/app.py`

### How to start backend later?

1. `source venv/bin/activate`

3. `python src/app.py`