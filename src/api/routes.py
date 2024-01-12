"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt

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
    # Verify that the request has the required fields
    # Verify that the user doesn't already exist
    # Create the salt
    salt = str(gensalt())
    # Create the hashed_password password + salt
    # Create the user
    # Save the user in the DB
    # Return 201
    return jsonify({"salt": salt}), 200