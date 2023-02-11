from pymongo import MongoClient
import os
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

def create_user(user_id):
    res = db.users.insert_one({"userId": user_id})
    return db.users.find_one({"_id": res.inserted_id})
    
def login_get_user(user_id):
    return db.users.find_one({"userId": user_id}) or create_user(user_id)