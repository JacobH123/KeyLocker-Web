from . import db
from flask import Blueprint, request, jsonify

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
    

        

