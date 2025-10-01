from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from .models import User
from . import db
import secrets
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    new_user = User(email=email)
    db.session.add(new_user)
    db.session.commit()
    new_user.verification_code = generate_code()
    new_user.code_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.session.commit()
    
    
    return jsonify({
        'message': 'Email not in use',
        'redirect_to': '/emailverify',
        'user_email': email
    }), 201


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == "OPTIONS":
        return "", 200

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

    return jsonify({
        "message": "Login successful",
        "user": {"id": user.id, "email": user.email}
    }), 200


def generate_code():
    return secrets.token_hex(3) 