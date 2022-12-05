# SBTree frontend

## Setup required files

**.env**

`REACT_APP_PROXY_URL` - proxy for frontend

`REACT_APP_LANDING_URL` - url for landing page (click on logo)


*.env for localhost*

```
REACT_APP_PROXY_URL='https://localhost:3002'
REACT_APP_LANDING_URL='https://www.google.com'
HTTPS=true
PORT=3000
```

### How to start frontend for the first time?

1. `npm i --legacy-peer-deps` - there is conflict with react v17 and graph lib, to be fixed

2. create `.env` from `.env.example`

3. `npm start`

### How to start frontend later?

1. `npm start`
