import os
from pymongo import MongoClient
from backend.mongodb.schema import schema
from typing import List

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]


def add_validator():
    db.command("collMod", "users", validator=schema,
               validationLevel="moderate")


def recreate_collection():
    try:
        db.users.drop()
    except:
        pass
    db.create_collection("users")
    add_validator()


def create_user(user_id: str):
    res = db.users.insert_one({"userId": user_id})
    return db.users.find_one({"_id": res.inserted_id})


def login_get_user(user_id):
    return db.users.find_one({"userId": user_id}) or create_user(user_id)


def add_article(user_id: str, article_link: str, article_sentiment: int, article_topics: List[str], neutral_link: str,
                neutral_sentiment: int, opposite_link: str, opposite_sentiment: int):
    res = db.users.find_one({
        "userId": user_id,
    })

    found = False
    for article in res.get("articles", []):
        found = found or article["original"]["link"] == article_link

    if (not found):
        add_topics_records = []
        remove_topics_records = []
        topics = res.get("topics", [])
        for article_topic in article_topics:
            for topic_record in topics:
                print(
                    article_topic, topic_record["topic"], article_topic == topic_record["topic"])
                if article_topic == topic_record["topic"]:
                    new_sentiment = (
                        topic_record["sentiment"] * topic_record["count"] + article_sentiment) / (topic_record["count"] + 1)
                    new_count = topic_record["count"] + 1
                    add_topics_records.append(
                        {"topic": article_topic, "count": new_count, "sentiment": new_sentiment})
                    remove_topics_records.append(topic_record["topic"])
                    break
            else:
                add_topics_records.append(
                    {"topic": article_topic, "count": 1, "sentiment": article_sentiment})

        db.users.update_one({
            "userId": user_id
        }, {
            "$push": {
                "articles": {
                    "original": {
                        "link": article_link,
                        "sentiment": article_sentiment,
                        "topics": article_topics,
                    },
                    "neutral": {
                        "link": neutral_link,
                        "sentiment": neutral_sentiment,
                        "visited": False,
                    },
                    "opposite": {
                        "link": opposite_link,
                        "sentiment": opposite_sentiment,
                        "visited": False,
                    },
                },
            },
            "$pull": {
                "topics": {
                    "topic": {
                        "$in": remove_topics_records,
                    },
                },
            },
        })
        db.users.update_one({
            "userId": user_id
        }, {
            "$push": {
                "topics": {
                    "$each": add_topics_records,
                },
            },
        })
        res = db.users.find_one({
            "userId": user_id,
        })
    return res
