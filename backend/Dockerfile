# Dockerfile
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port Flask will run on
EXPOSE 5000

# Set environment variables for Flask
ENV FLASK_APP=run:create_app
ENV FLASK_ENV=development

# Run Flask
CMD ["flask", "run", "--host=0.0.0.0"]
