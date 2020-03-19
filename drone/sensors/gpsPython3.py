from gps3.agps3threaded import AGPS3mechanism
agps_thread = AGPS3mechanism()  # This instantiate the mechanism, as I believe it's called.
agps_thread.stream_data()    #  Stream the data from host, port, devicepath.
agps_thread.run_thread()  #  Iterate stream as a thread with throttle control for empty look ups.
import time

while  True:
                 # lines #140-ff of the client /usr/local/lib/python3.5/dist-packages/gps3/agps.py
      print('----------------')
      print(                   agps_thread.data_stream.time)
      print('Lat:{}   '.format(agps_thread.data_stream.lat))
      print('Lon:{}   '.format(agps_thread.data_stream.lon))
      print('Speed:{} '.format(agps_thread.data_stream.speed))
      print('Course:{}'.format(agps_thread.data_stream.track))
      print('----------------')
      time.sleep(10)  # Sleep, or do other things for as long as you like.