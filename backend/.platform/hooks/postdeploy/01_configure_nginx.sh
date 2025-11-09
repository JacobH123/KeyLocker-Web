#!/bin/bash
set -e

echo "Configuring nginx..."

# Copy nginx config directly to conf.d (not subdirectory)
cp /var/app/current/.platform/nginx/conf.d/elasticbeanstalk/00_application.conf /etc/nginx/conf.d/00_application.conf

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx

echo "Nginx configured successfully!"
