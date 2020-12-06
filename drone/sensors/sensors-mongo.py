from pymongo import MongoClient
from bmp280 import BMP280
import time
import psutil


from gps3.agps3threaded import AGPS3mechanism
agps_thread = AGPS3mechanism()  # This instantiate GPSs
agps_thread.stream_data()    #  Stream data
agps_thread.run_thread()  #  Run stream as a thread

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

    #get bmp280 data
    temperature = bmp280.get_temperature()
    pressure = bmp280.get_pressure()
    altitude = bmp280.get_altitude()

    #get gps data
    gpsLat = agps_thread.data_stream.lat
    gpsLon = agps_thread.data_stream.lon

    #cpu stats
    cpu_percent = psutil.cpu_percent()
    print(cpu_percent)

    # gives an object with many fields
    vram= psutil.virtual_memory()
    print(vram)

    # you can convert that object to a dictionary 
    dict_vram = dict(psutil.virtual_memory()._asdict())
    print(dict_vram)

    # you can have the percentage of used RAM
    ram_percent = psutil.virtual_memory().percent
    print(ram_percent)

    # available memory
    available_mem = psutil.virtual_memory().available * 100 / psutil.virtual_memory().total
    print(available_mem)

    print(temperature)
    print(pressure)
    print(altitude)
    print(gpsLat)
    print(gpsLon)

    #insert all data into mongo db with timestamp
    sense_id = sensors.insert_one({
        "temperature":temperature,
        "pressure":pressure,
        "altitude":altitude, 
        "lat":gpsLat, 
        "lon":gpsLon,
        "cpu_percent":cpu_percent,
        "vram":vram,
        "dict_vram":dict_vram,
        "ram_percent":ram_percent,
        "available_mem":available_mem
        "time":time.time()
        }).inserted_id
    
    #stall for 2 seconds
    time.sleep(2)
