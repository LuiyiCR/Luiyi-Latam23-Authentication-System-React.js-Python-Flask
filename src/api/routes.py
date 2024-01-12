"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/user", methods=["POST"])
def handle_register():
    data = request.json
    email = data.get("email")
    password = data.get("password")   
    # Verify that the request has the required fields
    # Verify that the user doesn't already exist

    # Create the salt
    salt = str(gensalt(), encoding="utf-8")

    # Create the hashed_password password + salt
    hashed_password = str(generate_password_hash(password + salt), encoding="utf-8")

    # Create the user
    new_user = User(
        email=email,
        salt=salt,
        hashed_password=hashed_password
    )

    # Save the user in the DB
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "DB Error"}), 500 
    return "", 201