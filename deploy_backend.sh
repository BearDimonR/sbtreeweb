#!/bin/sh

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



# copy backend files
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP 'mkdir -p backend'
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/config.py ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/google_creds.json ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/requirements.txt ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/.env.production ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/backend.sh ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION ./backend/backend.service ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/
scp -i $EC2_KEY_NAME_WITH_EXTENSION -r ./backend/src ec2-user@$EC2_PUBLIC_IP:/home/ec2-user/backend/src


# establish ssh and execute the following script
ssh -tt -i $EC2_KEY_NAME_WITH_EXTENSION ec2-user@$EC2_PUBLIC_IP << "ENDSSH"

# setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
cd ..

# start services
sudo cp backend/backend.service /etc/systemd/system/backend.service
chmod +x backend/backend.sh
sudo systemctl daemon-reload
sudo systemctl start backend
sudo systemctl enable backend
sudo systemctl restart backend

exit

ENDSSH