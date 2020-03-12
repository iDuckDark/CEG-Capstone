from datetime import datetime
# datetime object containing current date and time
import time
import os

while(True):
    now = datetime.now()
    dt_string = now.strftime("%Y%m%d%H%M%S")
    hour_stamp = now.strftime("%H")
    print(hour_stamp)
    if hour_stamp == '00':
        print('time for break')
        time.sleep(28800)
    
    string = "curl -XPOST -H 'Content-Type: application/json' -d '{\"type\":\"request\", \"action\": \"camera.ir.mlx90640.capture\", \"args\": {\"output_file\":\"~/img/%s.png\", \
          \"scale_factor\":20, \"grayscale\": true}}' http://localhost:8008/execute" % (dt_string)
    os.system(string)
    '''string = "curl -XPOST -H 'Content-Type: application/json' -d '{\"type\":\"request\", \"action\": \"camera.ir.mlx90640.capture\", \"args\": {\"output_file\":\"~/colorimg/%s.png\", \
          \"scale_factor\":20}}' http://localhost:8008/execute" % (dt_string)
    os.system(string)'''
    print(now.strftime("%H:%M:%S"))
    time.sleep(30)