import cv2

cam = cv2.VideoCapture(0)
retval, frame = cam.read()
if retval != True:
    raise ValueError("Can't read frame")

cv2.imwrite('img2.png', frame)
cv2.imshow("img1", frame)
cv2.waitKey()
