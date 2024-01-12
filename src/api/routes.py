"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token
import os

api = Flask(__name__)

#FLASK_JWT_EXTENDED
api.config["JWT_SECRET_KEY"] = os.getenv("FLASK_JWT_SECRET_KEY")
jwt = JWTManager(api)

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

@api.route("/token", methods=["POST"])
def handle_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    # Verify that we receive all the data
    # Verify that the email exist and it is valid
    # Get the the user who owns the email
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"msg": "User does not exist"}), 404
    # Verify the password
    password_is_valid = check_password_hash(
        pw_hash=user.hashed_password, 
        password=password + user.salt
        )
    
    # Create the token
    token = create_access_token(identity=user.id)

    # Send the token to the client
    return jsonify({"token": ""})

@api.route("/user/<int:id>")
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize()), 200