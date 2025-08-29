from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

load_dotenv() 
app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"], supports_credentials=True)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST", "localhost")
encoded_password = quote_plus(DB_PASSWORD)

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{encoded_password}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    verified = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(512))
    
from signup import signup_bp
app.register_blueprint(signup_bp)

if __name__ == '__main__':
    app.run(debug=True)
