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
        "password": pw.password_encrypted.decode(),  # decode bytes to string
        "category": pw.label,  # label acts as category
        "lastUpdated": pw.updated_at.strftime("%Y-%m-%d")
    } for pw in passwords]), 200


@vault_bp.route("/vault", methods=["POST"])
@login_required
def add_password(current_user):
    data = request.get_json(force=True)
    pw = VaultItem(
        user_id=current_user.id,
        site = data["site"], 
        label=data.get("category", "Personal"),             
        username=data.get("username"),
        password_encrypted=data.get("password").encode()  
    )
    db.session.add(pw)
    db.session.commit()
    return jsonify({"message": "Password added successfully", "id": pw.id}), 201



@vault_bp.route("/vault/<int:pw_id>", methods=["DELETE"])
@login_required
def delete_password(current_user, pw_id):
    pw = VaultItem.query.filter_by(id=pw_id, user_id=current_user.id).first()
    if not pw:
        return jsonify({"error": "Password not found"}), 404
    db.session.delete(pw)
    db.session.commit()
    return jsonify({"message": "Password deleted"}), 200
