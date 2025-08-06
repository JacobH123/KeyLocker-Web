from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, app
from app import User  

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
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

    return jsonify({
        'message': 'Email not in use', 
        'redirect_to': '/emailverify', 
        'user_email': email  
    }), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Return user data 
    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,

        }
    }), 200