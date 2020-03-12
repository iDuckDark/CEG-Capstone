from gps import gps
gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)
print('latitude\tlongitude\ttime utc\t\t\taltitude\tepv\tept\tspeed\tclimb') # '\t' = TAB to try and output the data in columns.)


while True:
    report = gpsd.next() #
    if report['class'] == 'TPV':
        print(getattr(report,'lat',0.0),"\t"),
        print(getattr(report,'lon',0.0),"\t"),
    time.sleep(1) 

