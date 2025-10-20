from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from dotenv import load_dotenv
import os

load_dotenv()  

mail = Mail()
db = SQLAlchemy()
migrate = Migrate()
frontend_url = os.getenv("FRONTEND_URL", "http://127.0.0.1:5173")
allowed_origins = [frontend_url, "http://localhost:5173"]

limiter = Limiter(
     key_func=get_remote_address,  
     default_limits=[]             
)



def create_app():
    app = Flask(__name__)
    CORS(app,origins=allowed_origins,
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "OPTIONS","DELETE"],)
    

    # Database config
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    

    # Initialize extensions
    limiter.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    from . import models 
    
    from .signup import auth_bp   # import blueprint
    from .verify import verify_bp
    from .vault import vault_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(verify_bp)
    app.register_blueprint(vault_bp)

    return app
