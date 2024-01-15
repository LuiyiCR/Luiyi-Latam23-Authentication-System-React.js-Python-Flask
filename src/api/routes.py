"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)

@api.route('/home', methods=['POST', 'GET'])
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
    confirmPassword = data.get('confirmPassword')


    # Verify that the request has the required fields
    if email is None or password is None or confirmPassword is None:
        return jsonify({"msg": "Email and password required"}), 400
    
    # Verify that the email is valid
    if "@" not in email:
        return jsonify({"msg": "Invalid email"}), 400
    
    # Verify that the password is valid
    if not password:
        return jsonify({"msg": "Please enter a password"}), 400

    # Verify that the password and confirmPassword match
    if password != confirmPassword:
        return jsonify({"msg": "Passwords do not match"}), 400
    
    # Verify that the user doesn't already exist
    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return jsonify({"msg": "User already exists"}), 400

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
    # Get the user who owns the email
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"msg": "User does not exist"}), 404
    # Verify the password
    password_is_valid = check_password_hash(
        pw_hash=user.hashed_password, 
        password=password + user.salt
        )

    # verify if the password is valid
    if not password_is_valid:
        return jsonify({"msg": "Invalid password"}), 401
    
    # Create the token
    token = create_access_token(identity=user.id)

    # Send the token to the client
    return jsonify({"token": token}), 200

@api.route("/profile")
@jwt_required()
def get_user():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify(user.serialize()), 200