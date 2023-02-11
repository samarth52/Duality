import os
from pymongo import MongoClient
from typing import List
from backend.mongodb.schema import schema

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
    res = db.users.insert_one({"userId": user_id, "articles": [], "topics": []})
    return res.inserted_id


def login_get_id(user_id: str):
    res = db.users.find_one({"userId": user_id}, {"_id": 1})
    return str((res and res["_id"]) or create_user(user_id))

def get_user(id: str):
    return db.users.find_one({"_id": id})

def check_article(id: str, article_link: str):
    return db.users.find_one({
        "_id": id,
        "articles.original.link": article_link
    }, {
        "_id": 0,
        "articles": {
            "$elemMatch": {
                "original.link": article_link
            }
        }
    })

def add_article(id: str, article_link: str, article_sentiment: int, article_topics: List[str], neutral_link: str,
                neutral_sentiment: int, opposite_link: str, opposite_sentiment: int):
    res = db.users.find_one({"_id": id}, {"topics": 1})
    add_topics = []
    update_topics = []
    
    topics = res.get("topics", [])
    for article_topic in article_topics:
        for topic_record in topics:
            if article_topic == topic_record["topic"]:
                count = len(topic_record["sentiments"])
                new_sentiment = (topic_record["sentiments"][-1] * count + article_sentiment) / (count + 1)
                new_absolute_sentiment = (topic_record["absolute_sentiment"] * count + abs(article_sentiment)) / (count + 1)
                update_topics.append([article_topic, new_sentiment, new_absolute_sentiment])
                break
        else:
            add_topics.append(
                {"topic": article_topic, "sentiments": [article_sentiment], "absolute_sentiment": abs(article_sentiment)})

    db.users.update_one({
        "_id": id,
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
            "topics": {
                "$each": add_topics,
            },
        },
    })
    for [topic, sentiment, absolute_sentiment] in update_topics:
        db.users.update_one({
            "_id": id,
            "topics": {
                "$elemMatch": {
                    "topic": topic
                }
            }
        }, {
            "$set": {
                "topics.$.absolute_sentiment": absolute_sentiment,
            },
            "$push": {
                "topics.$.sentiments": sentiment,
            },
        })

def recommendation_click(id: str, original_link: str, sentiment: float):
    
    db.users.update_one({
        "_id": id, "articles.neutral.link": original_link
    }, {"_id": 1})
