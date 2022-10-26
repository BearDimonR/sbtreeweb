## SBTree repository

# Deployment sector

# Initialization of deployment

The full initialization of infrastructure described [here](https://github.com/BearDimonR/aws_deployment)

Note!
Before running `deploy.sh`, generate and add to github public ssh key
Just run `ssh-keygen -y -f key_name.pem > key_name.pub`, where `key_name` - name of AWS key you use to connect to EC2 instance
Then add this key to the deploy keys of the repo to make EC2 instance copy this repo








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
