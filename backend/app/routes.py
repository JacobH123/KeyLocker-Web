from functools import wraps
from flask import request, jsonify
from .models import User
from datetime import datetime

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        session_token = request.cookies.get("session_token")
        if not session_token:
            return jsonify({"error": "Unauthorized"}), 401

        user = User.query.filter_by(session_token=session_token).first()
        if not user:
            return jsonify({"error": "Unauthorized"}), 401

        # Check expiration only if set
        if user.session_token_expires_at and user.session_token_expires_at < datetime.utcnow():
            return jsonify({"error": "Session expired"}), 401

        return f(user, *args, **kwargs)
    return decorated

