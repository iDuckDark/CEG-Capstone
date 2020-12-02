#!/usr/bin/env python
import psutil
# gives a single float value
a = psutil.cpu_percent()
print(a)
# gives an object with many fields
b= psutil.virtual_memory()
print(b)
# you can convert that object to a dictionary 
c = dict(psutil.virtual_memory()._asdict())
print(c)
# you can have the percentage of used RAM
d = psutil.virtual_memory().percent
print(d)
# 79.2
# you can calculate percentage of available memory
e = psutil.virtual_memory().available * 100 / psutil.virtual_memory().total
print(e)
# 20.8