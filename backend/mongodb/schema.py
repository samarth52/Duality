schema = {"$jsonSchema": {
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