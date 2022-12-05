# SBTree repository

## Hosted version (Demo): 
[Full project](https://www.sbukma.ml) 

[Only this part](https://tree.sbukma.ml)

## Development sector

### How to run project in the docker?

1. follow instructions in `backend/proxy/certs/README.md` and create self-signed certificate

2. (optional) edit `backend/src/data/test_data.py` and add more entities

    or

    add `google_creds.json` into the backend root to load test data from GoogleSheet

3. run `docker compose up`

4. visit `https://sbukma.ml:3000` and `https://sbukma.ml:3000/api/ui`

5. to enable google auth 

Go to the https://console.cloud.google.com/apis/credentials and create new `OAuth client ID` (and project if not have one).

After creation paste `Client ID` and `Client secret` to the `.env.docker`.

```
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>
```

Add `https://sbukma.ml:3000` to `Authorized JavaScript origins` and `https://sbukma.ml:3000/login/callback` to `Authorized redirect URIs`.

Also go to the https://console.cloud.google.com/apis/credentials/consent and add Test user with your email.

If you use local data modify `backend/src/data/test_data.py` auth entry with your gmail to have access. Otherwise edit sheet database or add entry via database.

6. to connect image uploading

Go to the https://api.imgbb.com, register and get key, paste it to the `.env.docker`

```
IMAGE_API_KEY=<token>
```
----------------------------------

## Deployment sector

The full initialization of infrastructure described [here](https://github.com/BearDimonR/aws_deployment)

Note!
1. Don't forget to properly create all .env files
2. Don't forget to change DNS configs for new instances

