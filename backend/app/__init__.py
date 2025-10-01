from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from dotenv import load_dotenv
import os

load_dotenv()  

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

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

   
    from .models import User, VaultItem
    from .signup import auth_bp   # import blueprint
    from .verify import verify_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(verify_bp)

    return app
