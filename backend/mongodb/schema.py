from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]

vexpr = {"$jsonSchema": {
    "bsonType": "object",
    "required": ["userId"],
    "properties": {
        "userId": {"type": "string"},
        "articles": {
            "type": "array",
            "items": {
                "bsonType": "object",
                "properties": {
                    "original": {
                        "bsonType": "object",
                        "properties": {
                            "link": {"type": "string"},
                            "sentiment": {"type": "number"},
                            "topics": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                            },
                        },
                    },
                    "neutral": {
                        "bsonType": "object",
                        "properties": {
                            "link": {"type": "string"},
                            "sentiment": {"type": "number"},
                            "visited": {"type": "boolean"},
                            # "topics": {
                            #     "type": "array",
                            #     "items": {
                            #         "type": "string",
                            #     }
                            # },
                        },
                    },
                    "opposite": {
                        "bsonType": "object",
                        "properties": {
                            "link": {"type": "string"},
                            "sentiment": {"type": "number"},
                            "visited": {"type": "boolean"},
                            # "topics": {
                            #     "type": "array",
                            #     "items": {
                            #         "type": "string",
                            #     },
                            # },
                        },
                    },
                },
            },
        },
        "topics": {
            "type": "array",
            "items": {
                "bsonType": "object",
                "properties": {
                    "topic": {"type": "string"},
                    "count": {"type": "number"},
                    "sentiment": {"type": "number"},
                },
            },
        },
    }
}}


def add_validator():
    db.command("collMod", "users", validator=vexpr, validationLevel="moderate")


def recreate_collection():
    try:
        db.users.drop()
    except:
        pass
    db.create_collection("users")
    add_validator()
