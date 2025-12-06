from flask import Blueprint, request, jsonify, make_response,url_for
from flask_limiter.util import get_remote_address
from werkzeug.security import check_password_hash, generate_password_hash
from .models import User
from . import db, limiter
from .email import send_email
import secrets
from datetime import datetime, timedelta
from .routes import login_required  

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
@limiter.limit("10 per hour", key_func=get_remote_address)
def signup():
    data = request.get_json(force=True)
    email = data.get('email', '').strip().lower()

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    #add new user with entered email
    new_user = User(email=email)
    db.session.add(new_user)
    db.session.commit()
    
    """3. When the user clicks create account, the webpage application shall send a verification
code to the registered email."""
    code = generate_code()
    new_user.verification_code = code
    new_user.code_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.session.commit()
    verify_url = url_for('verify.verify_link', code=code,email=new_user.email, _external=True)

    html_body = f"""
    <p>Hello,</p>
    <p>Your verification code is: <strong style="font-size:18px;">{code}</strong></p>
    <p><a href="{verify_url}">{verify_url}</a></p>
    <p>This code expires in 10 minutes.</p>
    <p>Thanks,<br>KeyLocker Team</p>
    """
    sent = send_email(email, "Your KeyLocker Verification Code", html_body)
    if not sent:
        return jsonify({"success": False, "message": "Failed to send verification email"}), 500
    
    return jsonify({
        'message': 'Email not in use, verification code sent',
        'redirect_to': '/emailverify',
        'user_email': email
    }), 201


@auth_bp.route('/login', methods=['POST']) #, 'OPTIONS' add back later maybe
@limiter.limit("10 per hour", key_func=get_remote_address)
def login():
 #   if request.method == "OPTIONS":
#      return "", 200

    data = request.json
    email = data.get('email')
    password = data.get('password')


    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    if not user.verified:
          return jsonify({"error": "Account not verified. Please check your email."}), 403
      
      
    session_token = secrets.token_urlsafe(32)
    user.session_token = session_token
    user.session_token_expires_at = datetime.utcnow() + timedelta(days=7)  # example: 7-day session
    db.session.commit()
    
    
    return jsonify({
        "message": "Login successful",
        "token": session_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "session_token": session_token
        }
    }), 200



@auth_bp.route('/createPassword', methods=['POST']) #, 'OPTIONS' add back later maybe
@limiter.limit("10 per hour", key_func=get_remote_address)
def createPassword():
    
  
 #   if request.method == "OPTIONS":
 #       return "", 200  # respond OK to preflight

    data = request.get_json(force=True)
    temp_token = data.get("temp_token")
    password = data.get("password")

    if not temp_token or not password:
        return jsonify({'error': 'Missing token or password'}), 400

    
    user = User.query.filter_by(temp_token=temp_token).first()

    if not user:
        return jsonify({'error': 'Invalid or expired token'}), 404

    
    if not user.temp_token_expires_at or user.temp_token_expires_at < datetime.utcnow():
        return jsonify({'error': 'Token has expired'}), 409

    # Set the user's password and clear the temp token
    user.password_hash = generate_password_hash(password) #double hash the password
    user.temp_token = None
    user.temp_token_expires_at = None
    user.verified = True  
    
    db.session.commit()

    return jsonify({'message': 'Password successfully created'}), 200


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout(current_user):
    current_user.session_token = None
    current_user.session_token_expires_at = None
    db.session.commit()
    return jsonify({"message": "Logged out successfully"}), 200

def generate_code():
    return secrets.token_hex(4) 

@auth_bp.route('/delete-account', methods=['DELETE'])
@login_required
def delete_account(current_user):
    data = request.get_json()
    hashed_password = data.get('hashedPassword')
 
    if not hashed_password:
        return jsonify({"error": "Password required"}), 400
    

    if not check_password_hash(current_user.password_hash, hashed_password):
        return jsonify({"error": "Incorrect password"}), 403
    
    success, message = delete_user_account(current_user.id)
    
    if success:
        return jsonify({"message": message}), 200
    else:
        return jsonify({"error": message}), 500
    
    
def delete_user_account(user_id):
    """
    Delete a user and all their associated data.
    The CASCADE will automatically delete vault items.
    """
    try:
        user = User.query.get(user_id)
        
        if not user:
            return False, "User not found"
        
        db.session.delete(user)
        db.session.commit()
        
        return True, "User account deleted successfully"
        
    except Exception as e:
        db.session.rollback()
        return False, f"Error deleting user: {str(e)}"
    