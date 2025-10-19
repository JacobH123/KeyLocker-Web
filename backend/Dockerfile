# Use slim Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn for production
RUN pip install gunicorn

# Copy app code
COPY . .

# Expose port Flask will run on
EXPOSE 5000

# Set Flask app entry point
ENV FLASK_APP=run:create_app
ENV FLASK_ENV=production

# Start Gunicorn **after running migrations**
CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]

