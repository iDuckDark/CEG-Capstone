from pymongo import MongoClient
from bmp280 import BMP280
import time

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)

# Connect to db
client = MongoClient("mongodb+srv://root:root@cluster0-8kwlj.mongodb.net/test?retryWrites=true&w=majority")
db = client.ssar
# gps = db.gps
sensors = db.sensors
while(True):
    temperature = bmp280.get_temperature()
    pressure = bmp280.get_pressure()
    altitude = bmp280.get_altitude()
    sense_id = sensors.insert_one({"temperature":temperature,"pressure":pressure,"altitude":altitude}).inserted_id
    time.sleep(10)





# Example write to mongo, db = test, table = posts
# db = client.test

# post = {"author": "Mike",
#        "text": "My first blog post!",
#         "tags": ["mongodb", "python", "pymongo"]
#         }

# posts = db.posts
# post_id = posts.insert_one(post).inserted_id