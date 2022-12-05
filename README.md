# SBTree repository

## Deployment sector

The full initialization of infrastructure described [here](https://github.com/BearDimonR/aws_deployment)

Note!
1. Don't forget to properly create all .env files
2. Don't forget to change DNS configs for new instances

----------------------------------

## Development sector

### How to project in the docker?

1. follow instructions in `backend/proxy/certs/README.md` and create self-signed certificate

2. run `docker compose up`

4. visit `https://sbukma.ml:3000` and `https://sbukma.ml:3000/api/ui`