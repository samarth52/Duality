from backend.utils.generate_urls import return_links
from backend.mongodb.actions import add_validator, recreate_collection, login_get_id, get_user, check_article, add_article
import os
import json
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
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
            access_token, requests.Request(), os.get_env("GOOGLE_CLIENT_ID"))
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        user_id = idinfo['sub']

        id = login_get_id(user_id)
        return success_response({"id": id})

    except ValueError:
        return failure_response("Token is invalid", 401)


@app.route("/api/scripts", methods=["GET"])
def scripts():
    args = request.args
    script_type = args.get("type", default="", type=str)
    if (script_type == "addValidator"):
        add_validator()
    elif (script_type == "recreateCollection"):
        recreate_collection()
    return success_response()


@app.route("/api/get_user", methods=["GET"])
def get_user():
    args = request.args
    id = args.get("id", default="", type=ObjectId)
    user = get_user(id)
    if (user):
        return success_response({"user": user})
    else:
        return failure_response("User not found", 401)


@app.route("/api/new_article", methods=["POST"])
def new_article():
    request_data = request.get_json()
    id = request_data.get("id", default="", type=ObjectId)
    article_link = request_data.get("link", default="", type=str)

    try:
        res = check_article(id, article_link)
        # get the neutral link, neutral sentiment, opposite link, opposite sentiment from db if article already exists
        if (res):
            return success_response({
                "neutral_link": res["articles"][0]["neutral_link"],
                "neutral_sentiment": res["articles"][0]["neutral_sentiment"],
                "opposite_link": res["articles"][0]["opposite_link"],
                "opposite_sentiment": res["articles"][0]["opposite_sentiment"],
            })
        # article_sentiment, article_topics, netural_link, neutral_sentiment,opposite_link, opposite_sentiment = generate_urls()
        neutral_link = opposite_link = "b"
        article_sentiment = neutral_sentiment = opposite_sentiment = 1
        article_topics = ["t1", "t2"]

        add_article(id, article_link, article_sentiment, article_topics,
                    neutral_link, neutral_sentiment, opposite_link, opposite_sentiment)
        return success_response({
            "neutral_link": neutral_link,
            "neutral_sentiment": neutral_sentiment,
            "opposite_link": opposite_link,
            "opposite_sentiment": opposite_sentiment,
        })
    except Exception as e:
        return failure_response(str(e), 500)


@app.route("/api/dummy_article", methods=["POST"])
def dummy_article():
    request_data = request.get_json()
    id = request_data.get("id", default="", type=ObjectId)
    article_data = request_data.get("data", default="", type=str)
    res = return_links(article_data)
    return success_response({"data": res})


@app.route("/api/recommendation_click", methods=["POST"])
def recommendation_click():
    request_data = request.get_json()
    id = request_data.get("id", default="", type=ObjectId)
    original_link = request_data.get("original_link", default="", type=str)
    sentiment = request_data.get("sentiment", default="", type=float)
    return success_response()


@app.route("/api/test", methods=["GET"])
def test():
    add_article("63e7c2b7c76d10c07348c2f3", "g", 5,
                ["t4", "t2", "t3"], "b", 3, "c", 2)
    return success_response()


def success_response(data: dict = {}, status_code: int = 200):
    return (json.dumps({"success": True, **data}), status_code)


def failure_response(message: str = "", status_code: int = 400):
    return (json.dumps({"success": False, "message": message}), status_code)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
