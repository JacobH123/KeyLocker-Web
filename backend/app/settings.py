from flask import Blueprint, request, jsonify,redirect
from .routes import login_required  
from . import db, limiter
from flask_limiter.util import get_remote_address
settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/update-email-notifications', methods=['POST'])
@login_required
@limiter.limit("10 per hour", key_func=get_remote_address)
def update_email_notifications(user):
    data = request.get_json()
    email_notifications = data.get('emailNotifications')
    
    if email_notifications is None:
        return jsonify({"error": "emailNotifications field required"}), 400
    
    user.email_notifications = email_notifications
    db.session.commit()
    
    return jsonify({"success": True, "emailNotifications": email_notifications}), 200