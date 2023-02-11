from pymongo import MongoClient
import os

vexpr = {"$jsonSchema": {
    "bsonType": "object",
    "required": ["id"],
    "properties": {
        "userId": "string",
        "articles": [{
            "original": {
                "link": "string",
                "sentiment": "int",
                "topics": [{"type": "string"}],
            },
            "neutral": {
                "link": "string",
                "sentiment": "int",
                "visited": "bool",
                # "topics": [{"type": "string"}],
            },
            "opposite": {
                "link": "string",
                "sentiment": "int",
                "visited": "bool",
                # "topics": [{"type": "string"}],
            },
        }],
        "topics": [{
           "topic": "string",
           "sentiment": "int", 
        }],
    }
}}

def get_db():
    client = MongoClient()
    return client[os.getenv("MONGO_DB")]

def add_validator():
    db = get_db()
    db.command("collMod", "users", validator=vexpr, validationLevel="moderate")
    
def recreate_collection():
    db = get_db()
    db.users.drop()
    db.create_collection("users")
    # add_validator()
