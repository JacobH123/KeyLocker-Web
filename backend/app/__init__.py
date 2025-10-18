from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail

from dotenv import load_dotenv
import os

load_dotenv()  

mail = Mail()
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"], supports_credentials=True)

    # Database config
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Gmail SMTP config
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv("GMAIL_USER")
    app.config['MAIL_PASSWORD'] = os.getenv("GMAIL_PASS")
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv("GMAIL_USER")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

   
    from .models import User, VaultItem
    from .signup import auth_bp   # import blueprint
    from .verify import verify_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(verify_bp)

    return app
