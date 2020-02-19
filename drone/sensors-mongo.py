from pymongo import MongoClient

client = MongoClient("mongodb+srv://root:root@cluster0-8kwlj.mongodb.net/test?retryWrites=true&w=majority")
# Example write to mongo, db = test, table = posts
# db = client.test

# post = {"author": "Mike",
#        "text": "My first blog post!",
#         "tags": ["mongodb", "python", "pymongo"]
#         }

# posts = db.posts
# post_id = posts.insert_one(post).inserted_id