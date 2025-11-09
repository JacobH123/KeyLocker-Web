#!/bin/sh
# entrypoint.sh

# Exit on any error
set -e

# Set default port 
DB_PORT=${DB_PORT:-5432}



# Wait until the database is ready
echo "Waiting for database to be ready at $DB_HOST:$DB_PORT..."
# Use Python socket check 
python3 -c "
import socket
import time
import sys
import os

db_host = os.environ.get('DB_HOST')
db_port = int(os.environ.get('DB_PORT', 5432))
max_retries = 30

for i in range(max_retries):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((db_host, db_port))
        sock.close()
        if result == 0:
            print('Database is ready!')
            sys.exit(0)
    except Exception:
        pass
    time.sleep(1)

print(f'Error: Could not connect to database after {max_retries} attempts')
sys.exit(1)
"

# Run Flask migrations
echo "Running database migrations..."
flask db upgrade

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn -b 0.0.0.0:5000 run:app
