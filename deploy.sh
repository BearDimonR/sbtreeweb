#!/bin/sh

# import .env
. .env

# certificate name
EC2_KEY_NAME_WITH_EXTENSION="${EC2_KEY_NAME}.pem"
EC2_KEY_NAME_WITH_EXTENSION_PUB="${EC2_KEY_NAME}.pub"

# add permission to the certificate
chmod 400 $EC2_KEY_NAME_WITH_EXTENSION
# copy .env to the ec2
# scp -i $EC2_KEY_NAME_WITH_EXTENSION .env ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/
# scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/.env ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend.env
# # copy google_creds
# scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/google_creds.json ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/
# # copy .pem to the ec2
# scp -i $EC2_KEY_NAME_WITH_EXTENSION $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP:~/.ssh
# copy build to the ec2
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./frontend/build/* ec2-user@$EC2_PUBLIC_IP:/var/www/$DOMAIN_NAME/html
# generate and copy nginx config
envsubst '${DOMAIN_NAME}' < nginx_ec2.conf.template > nginx_ec2.conf
scp -i $EC2_KEY_NAME_WITH_EXTENSION  nginx_ec2.conf ec2-user@$EC2_PUBLIC_IP:/etc/nginx/nginx.conf
# establish ssh and execute the following script
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP << "ENDSSH"
# install git
# sudo yum install git -y
# launch ssh agent
# eval `ssh-agent -s`
# add ssh key
#ssh-add ~/.ssh/key_name.pem
# clone current repo into ec2
#git clone git@github.com:BearDimonR/sbtreeweb.git
# import .env
# set -a
# . .env
# . frontend.env
# . backend.env
# set +a
# copy .env file to the folders
# sudo cp .env /home/ec2-user/sbtreeweb/.env
# sudo cp frontend.env /home/ec2-user/sbtreeweb/frontend/.env
# sudo cp backend.env /home/ec2-user/sbtreeweb/backend/.env
# move google.creds.json
#mv google_creds.json /home/ec2-user/sbtreeweb/backend
#cd sbtreeweb
# branch
# git switch aws
# pull changes if they exist
# git pull
# setup Flask project
# cd backend
# python3 -m venv venv
# source venv/bin/activate
# pip3 install -r requirements.txt
# cd ..
# # start services
# sudo cp backend/backend.service /etc/systemd/system/backend.service
# chmod +x app/backend.sh
#sudo systemctl daemon-reload
# sudo systemctl start backend
# sudo systemctl enable backend



# install nginx and stop it to configure SSL
sudo amazon-linux-extras install nginx1 -y
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl stop nginx

# install certbot
sudo wget -r --no-parent -A 'epel-release-*.rpm' https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
sudo yum-config-manager --enable epel*
sudo yum install -y certbot 
sudo yum install -y python-certbot-nginx

# generate sertificate for your domain
sudo certbot certonly --noninteractive --agree-tos --standalone --debug -d $DOMAIN_NAME -m $DOMAIN_EMAIL

# restart nginx
sudo systemctl restart nginx

exit

ENDSSH