from . import db
from flask import Blueprint, request, jsonify,redirect
import os
from .models import User
from datetime import datetime, timedelta
import secrets
verify_bp = Blueprint("verify", __name__)

@verify_bp.route("/emailverify", methods=["POST", "OPTIONS"])
def verify_email():
    
    if request.method == "OPTIONS":
        return "", 200  # respond OK to preflight
    
    data = request.get_json(force=True)
    code = data.get('verification_code')
    
    user = User.query.filter_by(verification_code=code).first()
    
    if not user:
        return jsonify({'error': 'Invalid verification code'}), 404
    
    #updated in case codeexpiration is somehow None
    if not user.code_expires_at or user.code_expires_at < datetime.utcnow():
        return jsonify({'error': 'Verification code has expired'}), 409
    
    user.verified = True
    user.verification_code = None
    user.code_expires_at = None
    
    # generate a temporary token for password creation
    temp_token = secrets.token_urlsafe(32)
    user.temp_token = temp_token
    user.temp_token_expires_at = datetime.utcnow() + timedelta(minutes=15)

    db.session.commit()
    
    
    return jsonify({
        "message": "User Verified",
        "temp_token": temp_token,
        "user": {"id": user.id, "email": user.email}
    }), 200
    
    
    
    
@verify_bp.route("/verify-token", methods=["GET"])
def verify_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Unauthorized"}), 401

    token = auth_header.split()[1]
    user = User.query.filter_by(session_token=token).first()
    if not user or (user.session_token_expires_at and user.session_token_expires_at < datetime.utcnow()):
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({"user": {"id": user.id, "email": user.email}})


FRONTEND_URL = os.getenv("FRONTEND_URL", "http://127.0.0.1:5173")
@verify_bp.route("/verify/<code>", methods=["GET"])
def verify_link(code):
    user = User.query.filter_by(verification_code=code).first()

    if not user:
        return jsonify({'error': 'Invalid verification link'}), 404

    if not user.code_expires_at or user.code_expires_at < datetime.utcnow():
        return jsonify({'error': 'Verification link expired'}), 409

    
    user.verified = True
    user.verification_code = None
    user.code_expires_at = None

    
    temp_token = secrets.token_urlsafe(32)
    user.temp_token = temp_token
    user.temp_token_expires_at = datetime.utcnow() + timedelta(minutes=15)

    db.session.commit()

    return redirect(f"{FRONTEND_URL}/createpassword?temp_token={temp_token}&email={user.email}")




        

