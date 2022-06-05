#!/bin/sh

# build frontend
cd frontend

npm run build:ec2

cd ..

# import .env
set -a
. .env
set +a

# certificate name
EC2_KEY_NAME_WITH_EXTENSION="${EC2_KEY_NAME}.pem"
EC2_KEY_NAME_WITH_EXTENSION_PUB="${EC2_KEY_NAME}.pub"

# generate nginx conf
envsubst '${DOMAIN_NAME}' < nginx_ec2.conf.template > nginx_ec2.conf

# add permission to the certificate
chmod 400 $EC2_KEY_NAME_WITH_EXTENSION
# copy .env to the ec2
scp -i $EC2_KEY_NAME_WITH_EXTENSION .env ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/
# copy build to the ec2
scp -i $EC2_KEY_NAME_WITH_EXTENSION -r ./frontend/build/* ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/frontend
# copy nginx config
scp -i $EC2_KEY_NAME_WITH_EXTENSION  nginx_ec2.conf ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/nginx.conf
# establish ssh and execute the following script
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP << "ENDSSH"
# import .env
set -a
. .env
set +a

# install nginx and stop it to configure SSL
sudo amazon-linux-extras enable nginx1
sudo yum -y install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl stop nginx

# install certbot
sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
sudo yum-config-manager --enable epel*
sudo yum install -y certbot 
sudo yum install -y python-certbot-nginx
sudo rm -r dl.fedoraproject.org/

# generate sertificate for your domain
sudo certbot certonly --noninteractive --agree-tos --standalone --debug -d $DOMAIN_NAME -m $DOMAIN_EMAIL

# create folders
sudo mkdir /usr/share/nginx/$DOMAIN_NAME
sudo mkdir /usr/share/nginx/$DOMAIN_NAME/html

# copy config
sudo cp /home/ec2-user/nginx.conf /etc/nginx/nginx.conf
sudo cp -r /home/ec2-user/frontend/* /usr/share/nginx/$DOMAIN_NAME/html

# restart nginx
sudo systemctl restart nginx

exit

ENDSSH