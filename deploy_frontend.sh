#!/bin/sh

# build frontend
cd frontend

npm i --legacy-peer-deps

npm run build:ec2

cd ..

# import .env
set -a
. .env
set +a

# certificate name
EC2_KEY_NAME_WITH_EXTENSION="${EC2_KEY_NAME}.pem"

# add permission to the certificate
chmod 400 $EC2_KEY_NAME_WITH_EXTENSION
# copy .env to the ec2
scp -i $EC2_KEY_NAME_WITH_EXTENSION .env ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/
# copy build to the ec2
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP 'rm -rf /home/ec2-user/frontend'
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP 'mkdir -p /home/ec2-user/frontend'
scp -i $EC2_KEY_NAME_WITH_EXTENSION -r ./frontend/build/* ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/frontend
# establish ssh and execute the following script
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP << "ENDSSH"
# import .env
set -a
. .env
set +a

# create folder
sudo rm -rf /usr/share/nginx/$DOMAIN_NAME/html
sudo mkdir -p /usr/share/nginx/$DOMAIN_NAME/html

# copy build
sudo cp -r /home/ec2-user/frontend/* /usr/share/nginx/$DOMAIN_NAME/html

# restart nginx
sudo systemctl restart nginx

exit

ENDSSH