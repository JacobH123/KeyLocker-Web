from . import db

class User(db.Model):
    __tablename__ = 'users'  
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    verified = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(512))
    verification_code = db.Column(db.String(), nullable=True)
    code_expires_at = db.Column(db.DateTime(), nullable=True)
    
    temp_token = db.Column(db.String(), nullable=True)
    temp_token_expires_at = db.Column(db.DateTime(), nullable=True)
    
    session_token = db.Column(db.String(), nullable=True)
    session_token_expires_at = db.Column(db.DateTime(), nullable=True)

class VaultItem(db.Model):
    __tablename__ = 'vault_items'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    site = db.Column(db.String, nullable=True)
    label = db.Column(db.String, nullable=False)
    username = db.Column(db.String)
    password_encrypted = db.Column(db.LargeBinary, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

