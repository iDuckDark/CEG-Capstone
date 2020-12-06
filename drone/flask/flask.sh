#!/bin/sh -
sudo systemctl enable redis.service
sudo systemctl start redis.service
# using platypush for thermal camera and starting server
platypush & python3 ./webstreaming.py --ip 0.0.0.0 --port 8000 & 
