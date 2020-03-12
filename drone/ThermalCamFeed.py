from datetime import datetime
# datetime object containing current date and time
import time
import os
import numpy as np
import cv2
from bmp280 import BMP280
import sys

print(cv2.__version__)

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)

classes = ['negative','positive']
def predict(model2,resizeVar=None):
    model = cv2.dnn.readNet(model2)
    while(True):
        now = datetime.now()
        dt_string = now.strftime("%Y%m%d%H%M%S")
        string = "curl -XPOST -H 'Content-Type: application/json' -d '{\"type\":\"request\", \"action\": \"camera.ir.mlx90640.capture\", \"args\": {\"output_file\":\"~/img/%s.jpg\", \
              \"scale_factor\":20, \"grayscale\": true}}' http://localhost:8008/execute" % (dt_string)
        os.system(string)
        
        img = '/home/pi/img/%s.jpg' % (dt_string)
        img = cv2.imread(os.path.abspath(os.path.expanduser(img)))

        string = "curl -XPOST -H 'Content-Type: application/json' -d '{\"type\":\"request\", \"action\": \"camera.ir.mlx90640.capture\", \"args\": {\"output_file\":\"~/colorimg/%s.jpg\", \
              \"scale_factor\":20}}' http://localhost:8008/execute" % (dt_string)
        os.system(string)
        color = '/home/pi/colorimg/%s.jpg' % (dt_string)
        color = cv2.imread(os.path.abspath(os.path.expanduser(color)))
        
        img = cv2.dnn.blobFromImage(img, size=tuple(resizeVar), mean=0.5)
        model.setInput(img)
        output = model.forward()
        prediction = int(np.argmax(output))
        
        if classes:
            prediction = classes[prediction]
        
        temperature = bmp280.get_temperature()
        pressure = bmp280.get_pressure()
        altitude = bmp280.get_altitude()
                
        imgPath = '/home/pi/img/%s.jpg' % (dt_string)
        img = cv2.imread(os.path.abspath(os.path.expanduser(imgPath)))
        colorPath = '/home/pi/colorimg/%s.jpg' % (dt_string)
        color = cv2.imread(os.path.abspath(os.path.expanduser(colorPath)))
        
        font                   = cv2.FONT_HERSHEY_SIMPLEX
        bottomLeftCornerOfText = (0,50)
        fontScale              = 0.5
        fontColor              = (0,0,0)
        lineType               = 2
        
        listVal = [prediction, str(round(temperature,2)), str(round(pressure,2)), str(round(altitude,2))]
        cv2.putText(color,str(listVal), 
            bottomLeftCornerOfText, 
            font, 
            fontScale,
            fontColor,
            lineType)
        
        numpy_horizontal = np.hstack((color, img))
        #cv2.namedWindow("Numpy Horizontal", cv2.WINDOW_NORMAL)
        #cv2.setWindowProperty("Numpy Horizontal",cv2.WND_PROP_AUTOSIZE,cv2.WINDOW_NORMAL)
        
        cv2.imshow('Numpy Horizontal', numpy_horizontal)
        cv2.waitKey(10)
        
        os.remove(imgPath)
        os.remove(colorPath)
        
        print(prediction)



pb_file = '/home/pi/Desktop/CEG-Capstone/drone/InfraredCamModel.pb'
pb_file = os.path.abspath(os.path.expanduser(pb_file))

# Read the graph.
predict(pb_file, [24,32])

# allow the camera to warmup

