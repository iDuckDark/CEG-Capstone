#!/bin/bash



#sh ../RPi_Cam_Web_Interface/stop.sh
sudo systemctl enable redis.service
sudo systemctl start redis.service
platypush
