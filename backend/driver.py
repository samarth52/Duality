import os
import json
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))

from backend.utils.generate_urls import return_links
from backend.utils.RetValues import get_imp_info
from backend.mongodb.actions import add_validator, recreate_collection, login_get_id, get_user, check_article, add_article, get_topic_sentiments, visited_opposite

app = Flask(
    __name__,
    static_folder=os.path.join(
        os.getcwd(), "frontend", "playground-frontend", "build"
    ),
)
CORS(app)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def root(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.route("/api/login", methods=["POST"])
def login():
    request_data = json.loads(request.data)
    uid = request_data.get("uid", "")
    try:
        id = login_get_id(uid)
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


@app.route("/api/new_article", methods=["POST"])
def new_article():
    request_data = json.loads(request.data)
    id = ObjectId(request_data.get("id", ""))
    article_link = request_data.get("url", "")
    text = request_data.get("text", "")

    try:
        res = check_article(id, article_link)
        if (res):
            return success_response({
                "original_link": article_link,
                "opposite_link": res["articles"][0]["opposite_link"],
                "opposite_sentiment": res["articles"][0]["opposite_sentiment"],
            })
            
        [article_sentiment, article_topics, opposite_link, opposite_sentiment] = get_imp_info(text)
        add_article(id, article_link, article_sentiment, article_topics, opposite_link, opposite_sentiment)
        return success_response({
            "original_link": article_link,
            "opposite_link": opposite_link,
            "opposite_sentiment": opposite_sentiment,
        })
    except Exception as e:
        return failure_response(str(e), 500)


@app.route("/api/dummy_article", methods=["POST"])
def dummy_article():
    request_data = json.loads(request.data)
    article_data = request_data
    res = return_links(article_data)
    print(res)
    return success_response({"data": res})


@app.route("/api/recommendation_click", methods=["POST"])
def recommendation_click():
    request_data = json.loads(request.data)
    id = ObjectId(request_data.get("id", ""))
    original_link = request_data.get("originalLink", "")
    visited_opposite(id, original_link)
    return success_response()

@app.route("/api/sentiment_graph", methods=["POST"])
def sentiment_graph():
    request_data = json.loads(request.data)
    id = ObjectId(request_data.get("id", ""))
    topics = list(request_data.get("topics", []))
    
    num_lists = len(topics)
    topics = [get_topic_sentiments(id, topic)["sentiments"] for topic in topics]

    lengths = [len(l["sentiments"]) for l in topics]
    max_num_elements = max(lengths)
    sums = [0] * max_num_elements
    for i in range(max_num_elements):
        for j in range(num_lists):
            if i < len(lengths[j]):
                sums[i] += topics[j]['sentiments'][i]
    avg_sentiment = [sum / num_lists for sum in sums]
    
    return success_response({"avgSentiment": avg_sentiment})

@app.route("/api/dashboard_data", methods=["GET"])
def dashboard_data():
    args = request.args
    id = args.get("id", default="", type=ObjectId)
    user = get_user(id)
    if (user):
        topic_frequency = []
        total_abs_sentiment = 0
        sentiment_count = 0
        for topic_record in user["topics"]:
            topic_frequency.append([topic_record["topic"], len(topic_record["sentiments"])])
            sentiment_count += len(topic_record["sentiments"])
            total_abs_sentiment += topic_record["absolute_sentiment"]
        avg_abs_sentiment = round(total_abs_sentiment / sentiment_count * 100) if sentiment_count > 0 else 0
        
        articles = user["articles"]
        
        recent_20_articles = articles[:-21:-1]
        num_visited = 0
        for article in recent_20_articles:
            num_visited += int(article["opposite"]["visited"])
        duality_ratio = [num_visited / len(recent_20_articles) if len(recent_20_articles) > 0 else 0, num_visited, len(recent_20_articles)]
        
        recent_10_articles = articles[:-11:-1]        
        return success_response({
            "topicFrequency": topic_frequency,
            "avgSentiment": avg_abs_sentiment,
            "dualityRatio": duality_ratio,
            "recentArticles": recent_10_articles,
        })
    else:
        return failure_response("User not found", 401)

@app.route("/api/test", methods=["GET"])
def test():
    # print(get_topics(ObjectId("63e7c2b7c76d10c07348c2f3")))
    return success_response()


def success_response(data: dict = {}, status_code: int = 200):
    return (json.dumps({"success": True, **data}), status_code)


def failure_response(message: str = "", status_code: int = 400):
    return (json.dumps({"success": False, "message": message}), status_code)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
