#!/bin/bash
set -e

echo "Creating .env file from EB environment variables..."

cat > /var/app/staging/.env << EOF
DB_HOST=$(/opt/elasticbeanstalk/bin/get-config environment -k DB_HOST)
DB_NAME=$(/opt/elasticbeanstalk/bin/get-config environment -k DB_NAME)
DB_USER=$(/opt/elasticbeanstalk/bin/get-config environment -k DB_USER)
DB_PASSWORD=$(/opt/elasticbeanstalk/bin/get-config environment -k DB_PASSWORD)
DB_PORT=$(/opt/elasticbeanstalk/bin/get-config environment -k DB_PORT)
FRONTEND_URL=$(/opt/elasticbeanstalk/bin/get-config environment -k FRONTEND_URL)
GMAIL_CLIENT_ID=$(/opt/elasticbeanstalk/bin/get-config environment -k GMAIL_CLIENT_ID)
GMAIL_CLIENT_SECRET=$(/opt/elasticbeanstalk/bin/get-config environment -k GMAIL_CLIENT_SECRET)
GMAIL_REFRESH_TOKEN=$(/opt/elasticbeanstalk/bin/get-config environment -k GMAIL_REFRESH_TOKEN)
EOF

echo ".env file created successfully!"
