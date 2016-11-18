#!/usr/bin/python

# Import the required modules
import cv2, os, sys


cam = sys.argv[1]
path = sys.argv[2]


try:
    cam = int(cam)
except ValueError:
    cam = cam

cap=cv2.VideoCapture(cam)

while True:
    ret, frame = cap.read()
    # cv2.imshow('image', frame)
    cv2.imwrite(path + '/tmp/stream/toto.jpg', frame)
    if cv2.waitKey(1) == 27:
        exit(0)
