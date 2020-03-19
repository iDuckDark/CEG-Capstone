#!/bin/sh -

platypush & python3 ./webstreaming.py --ip 0.0.0.0 --port 8000 & 
