# import the necessary packages
from imutils.video import VideoStream
from flask import Response
from flask import Flask
from flask import render_template
import threading
import argparse
from datetime import datetime
# datetime object containing current date and time
import time
import imutils
import time
import cv2
import numpy as np
import os

hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
pb_file = '/home/pi/Desktop/CEG-Capstone/drone/InfraredCamModel.pb'
pb_file = os.path.abspath(os.path.expanduser(pb_file))
model = cv2.dnn.readNet(pb_file)

# initialize the output frame and a lock used to ensure thread-safe
# exchanges of the output frames (useful for multiple browsers/tabs
# are viewing tthe stream)
outputFrame = None
thermalFrame = None
lock = threading.Lock()
thermalLock = threading.Lock()

# initialize a flask object
app = Flask(__name__)

# initialize the video stream and allow the camera sensor to
# warmup
vs = VideoStream(usePiCamera=1).start()
#vs = VideoStream(src=0).start()
time.sleep(2.0)

@app.route("/")
def index():
    # return the rendered template
    return render_template("index.html")

def detect_motion(frameCount):
    # grab global references to the video stream, output frame, and
    # lock variables
    global vs, outputFrame, lock

    # initialize the motion detector and the total number of frames
    # read thus far
    total = 0

    # loop over frames from the video stream
    while True:
        # read the next frame from the video stream, resize it,
        # convert the frame to grayscale, and blur it
        frame = vs.read()
        #frame = imutils.resize(frame, width=400)
        frame = imutils.rotate(frame, angle=180)
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

        # detect people in the image
        # returns the bounding boxes for the detected objects
        boxes, weights = hog.detectMultiScale(frame, winStride=(8,8) )

        boxes = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
        # grab the current timestamp and draw it on the frame
        timestamp = datetime.now()
        cv2.putText(frame, timestamp.strftime(
            "%A %d %B %Y %I:%M:%S%p"), (10, frame.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)

        # if the total number of frames has reached a sufficient
        # number to construct a reasonable background model, then
        # continue to process the frame
        
            # detect motion in the image
        for (xA, yA, xB, yB) in boxes:
                # display the detected boxes in the colour picture
                cv2.rectangle(frame, (xA, yA), (xB, yB),
                                (0, 255, 0), 2)
        total += 1

        # acquire the lock, set the output frame, and release the
        # lock
        with lock:
            outputFrame = frame.copy()
            
def thermal():
    global thermalFrame, thermalLock
    total = 0
    while True:
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
        
        img = cv2.dnn.blobFromImage(img, size=tuple([24,32]), mean=0.5)
        model.setInput(img)
        output = model.forward()
        prediction = int(np.argmax(output))
        classes = ['negative','positive']
        if classes:
            prediction = classes[prediction]
                
        imgPath = '/home/pi/img/%s.jpg' % (dt_string)
        img = cv2.imread(os.path.abspath(os.path.expanduser(imgPath)))
        colorPath = '/home/pi/colorimg/%s.jpg' % (dt_string)
        color = cv2.imread(os.path.abspath(os.path.expanduser(colorPath)))
        
        numpy_horizontal = np.hstack((color, img))
        cv2.putText(numpy_horizontal, prediction, (10, numpy_horizontal.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)
        #cv2.namedWindow("Numpy Horizontal", cv2.WINDOW_NORMAL)
        #cv2.setWindowProperty("Numpy Horizontal",cv2.WND_PROP_AUTOSIZE,cv2.WINDOW_NORMAL)
        #cv2.waitKey(10)
        os.remove(imgPath)
        os.remove(colorPath)
        with thermalLock:
            thermalFrame = numpy_horizontal.copy()
    
def generate():
    # grab global references to the output frame and lock variables
    global outputFrame, lock

    # loop over frames from the output stream
    while True:
        # wait until the lock is acquired
        with lock:
            # check if the output frame is available, otherwise skip
            # the iteration of the loop
            if outputFrame is None:
                continue

            # encode the frame in JPEG format
            (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)

            # ensure the frame was successfully encoded
            if not flag:
                continue

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
            bytearray(encodedImage) + b'\r\n')

def thermalgenerate():
    # print('hi')
    # grab global references to the output frame and lock variables
    global thermalFrame, thermalLock

    # loop over frames from the output stream
    while True:
        # wait until the lock is acquired
        with thermalLock:
            # check if the output frame is available, otherwise skip
            # the iteration of the loop
            if thermalFrame is None:
                continue

            # encode the frame in JPEG format
            (flag, encodedImage) = cv2.imencode(".jpg", thermalFrame)

            # ensure the frame was successfully encoded
            if not flag:
                continue

        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
            bytearray(encodedImage) + b'\r\n')

@app.route("/video_feed")
def video_feed():
    # return the response generated along with the specific media
    # type (mime type)
    return Response(generate(),
        mimetype = "multipart/x-mixed-replace; boundary=frame")

@app.route("/thermal_feed")
def thermal_feed():
    # return the response generated along with the specific media
    # type (mime type)
    return Response(thermalgenerate(),
        mimetype = "multipart/x-mixed-replace; boundary=frame")

# check to see if this is the main thread of execution
if __name__ == '__main__':
    # construct the argument parser and parse command line arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--ip", type=str, required=True,
        help="ip address of the device")
    ap.add_argument("-o", "--port", type=int, required=True,
        help="ephemeral port number of the server (1024 to 65535)")
    ap.add_argument("-f", "--frame-count", type=int, default=32,
        help="# of frames used to construct the background model")
    args = vars(ap.parse_args())

    # start a thread that will perform motion detection
    t = threading.Thread(target=detect_motion, args=(
        args["frame_count"],))
    t.daemon = True
    t.start()
    
    t2 = threading.Thread(target=thermal)
    t2.daemon = True
    t2.start()
    

    # start the flask app
    app.run(ssl_context=('cert.pem', 'key.pem'), host=args["ip"], port=args["port"], debug=False,
        threaded=True, use_reloader=False)

# release the video stream pointer
vs.stop()
