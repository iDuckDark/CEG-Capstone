from pymongo import MongoClient
from bmp280 import BMP280
import time


from gps3.agps3threaded import AGPS3mechanism
agps_thread = AGPS3mechanism()  # This instantiate the mechanism, as I believe it's called.
agps_thread.stream_data()    #  Stream the data from host, port, devicepath.
agps_thread.run_thread()  #  Iterate stream as a thread with throttle control for empty look ups.

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)

# Connect to db
client = MongoClient("mongodb+srv://root:root@cluster0-8kwlj.mongodb.net/test?retryWrites=true&w=majority")
db = client.ssar
sensors = db.sensors
while(True):
    temperature = bmp280.get_temperature()
    pressure = bmp280.get_pressure()
    altitude = bmp280.get_altitude()
    gpsLat = agps_thread.data_stream.lat
    gpsLon = agps_thread.data_stream.lon
    
    print(temperature)
    print(pressure)
    print(altitude)
    print(gpsLat)
    print(gpsLon)

    sense_id = sensors.insert_one({"temperature":temperature,"pressure":pressure,"altitude":altitude, "lat":gpsLat, "lon":gpsLon,"time":time.time()}).inserted_id
    time.sleep(10)





# Example write to mongo, db = test, table = posts
# db = client.test

# post = {"author": "Mike",
#        "text": "My first blog post!",
#         "tags": ["mongodb", "python", "pymongo"]
#         }

# posts = db.posts
# post_id = posts.insert_one(post).inserted_id