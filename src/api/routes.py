"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


@api.route("/hello", methods=["GET"])
@jwt_required() 
def get_hello():
    email = get_jwt_identity()
    dictionary = {
    "message": " " + email 
    }
    return jsonify(dictionary)


@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()

    if not users:
        return jsonify(message="No users found"), 404

    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(message="Users", users=all_users), 200



