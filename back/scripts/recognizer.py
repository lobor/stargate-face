#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
import sys
import json
from multiprocessing import Pool
import time

path = sys.argv[1]

url = sys.argv[2]
collections = sys.argv[3].split(',')

with open(path + '/config/configPython.json') as data_file:
    config = json.load(data_file)

if False == cv2.useOptimized():
    cv2.setUseOptimized(True)

nameNotRecognize = 'unknown'
faceCascade = cv2.CascadeClassifier(path + config['haar_cascade'])

recognizer = cv2.createLBPHFaceRecognizer(config['radius'], config['neighbors'], config['grid_x'], config['grid_y'], config['threshold'])
recognizer.load(path + config['modelFace'])

worker = 'undefined'

try:
    url = int(url)
except ValueError:
    url = url

cap=cv2.VideoCapture(url)

def callback():
    print 'finish'

while True:
    ret, frame = cap.read()
    # cv2.imshow('image',frame)

    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    image = cv2.equalizeHist(image)

    image = np.array(image, 'uint8')
    faces = faceCascade.detectMultiScale(image)

    if len(faces):
        results = {}
        for (x, y, w, h) in faces:
            crop_image = image[y: y + h, x: x + w]
            crop_image = cv2.Canny(crop_image,50,50)
            nbr_predicted, conf = recognizer.predict(crop_image)
            if nbr_predicted not in results:
                results[nbr_predicted] = []

            # if conf < 50:
            #     print 'write img'
            #     cv2.imwrite('./visio/collections/{}/{}.jpg'.format(collections[nbr_predicted], conf), img)

            results[nbr_predicted].append(conf)
        # print results
        data = {}
        for label, confs in results.iteritems():
            calc = len(confs)
            date = time.time()
            if label == -1:
                date = time.time()
                nameImg = '{}_{}_{}.jpg'.format(nameNotRecognize, calc, date)
                cv2.imwrite(path + '/tmp/notRecognize/{}'.format(nameImg), frame)
                data[nameNotRecognize] = {'prediction': calc, 'img': nameImg}
            else:
                add = 0
                for conf in confs:
                    add += conf

                calc = add / len(confs)

                if calc == 'Infinity':
                    nameImg = '{}_{}_{}.jpg'.format(nameNotRecognize, calc, date)
                    cv2.imwrite(path + '/tmp/notRecognize/{}'.format(nameImg), frame)
                    data[nameNotRecognize] = {'prediction': calc, 'date': date}
                else:
                    data[collections[label]] = calc
        print json.dumps(data)
    if cv2.waitKey(1) == 27:
        exit(0)
