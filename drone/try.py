
from datetime import datetime
# datetime object containing current date and time
import time
import os
import numpy as np
import cv2

while(True):
    # grab the raw NumPy array representing the image, then initialize the timestamp
    # and occupied/unoccupied text
    now = datetime.now()
    dt_string = now.strftime("%Y%m%d%H%M%S")
    string = "curl -XPOST -H 'Content-Type: application/json' -d '{\"type\":\"request\", \"action\": \"camera.ir.mlx90640.capture\", \"args\": {\"output_file\":\"~/img/%s.jpg\", \
          \"scale_factor\":20, \"grayscale\": true}}' http://localhost:8008/execute" % (dt_string)
    os.system(string)
    #time.sleep(5)
    #img = cv2.imread('~/img/%s.png' % (dt_string))
    img = '/home/pi/img/%s.jpg' % (dt_string)
    img = cv2.imread(os.path.abspath(os.path.expanduser(img)))
    if(img.data != True):
        print("NOT LOADED")
    #img = cv2.dnn.blobFromImage(img, mean=0.5)
    cv2.imshow("Frame", img)
    cv2.waitKey(10)



