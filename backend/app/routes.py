from functools import wraps
from flask import request, jsonify
from .models import User
from datetime import datetime

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401

        session_token = auth_header.split()[1]  
        user = User.query.filter_by(session_token=session_token).first()
        if not user:
            return jsonify({"error": "Unauthorized"}), 401

        
        if user.session_token_expires_at and user.session_token_expires_at < datetime.utcnow():
            return jsonify({"error": "Session expired"}), 401

        return f(user, *args, **kwargs)  # pass user to the route
    return decorated

