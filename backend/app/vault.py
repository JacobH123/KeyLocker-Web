from flask import Blueprint, request, jsonify
from .models import User, VaultItem
from .routes import login_required  # your decorator
from . import db
from datetime import datetime


vault_bp = Blueprint("vault", __name__)

@vault_bp.route("/vault", methods=["GET"])
@login_required
def get_passwords(current_user):
    passwords = VaultItem.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        "id": pw.id,
        "site": pw.site,
        "username": pw.username,
        "password": pw.password,
        "category": pw.category,
        "lastUpdated": pw.last_updated.strftime("%Y-%m-%d")
    } for pw in passwords]), 200


@vault_bp.route("/vault", methods=["POST"])
@login_required
def add_password(current_user):
    data = request.get_json(force=True)
    pw = VaultItem(
        user_id=current_user.id,
        label=data["site"],            
        username=data["username"],
        password_encrypted=data["password"].encode(),  
    )
    db.session.add(pw)
    db.session.commit()
    return jsonify({"message": "Password added successfully", "id": pw.id}), 201