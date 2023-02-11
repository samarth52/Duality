import os
import json
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))

from backend.mongodb.schema import add_validator, recreate_collection
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


@app.route("/api/test", methods=["POST"])
def test():
    request_data = json.loads(request.data)
    test = request_data["test"]
    print(test)
    return (json.dumps({"success": True}), 200)
    
@app.route("/api/scripts", methods=["GET"])
def scripts():
    args = request.args
    script_type = args.get("type", default="", type=str)
    print(script_type)
    if (script_type == "addValidator"):
        add_validator()
    elif (script_type == "recreateCollection"):
        recreate_collection()
    return (json.dumps({"success": True}), 200)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)