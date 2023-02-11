from backend.mongodb.actions import add_validator, recreate_collection, login_get_user
import os
import json
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

from google.oauth2 import id_token
from google.auth.transport import requests

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))

# from backend.middleware import middleware

app = Flask(
    __name__,
    static_folder=os.path.join(
        os.getcwd(), "frontend", "playground-frontend", "build"
    ),
)
CORS(app)
# app.wsgi_app = middleware(app.wsgi_app)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def root(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.route("/api/login", methods=["POST"])
def login():
    request_data = request.get_json()
    access_token = request_data.get("accessToken", default="", type=str)
    try:
        idinfo = id_token.verify_oauth2_token(
            access_token, requests.Request(), os.get_env("CLIENT_ID"))
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        user_id = idinfo['sub']
        
        user = login_get_user(user_id)
        return success_response({"user": user})

    except ValueError:
        return failure_response("Token is invalid", 401)


@app.route("/api/scripts", methods=["GET"])
def scripts():
    args = request.args
    script_type = args.get("type", default="", type=str)
    print(script_type)
    if (script_type == "addValidator"):
        add_validator()
    elif (script_type == "recreateCollection"):
        recreate_collection()
    return success_response()

def success_response(data: dict = {}, status_code: int = 200):
    return (json.dumps({"success": True, **data}), status_code)


def failure_response(message: str = "", status_code: int = 400):
    return (json.dumps({"success": False, "message": message}), status_code)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
