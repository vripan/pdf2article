import glob
import os
import random
import sys
import random
import math
import json
from collections import defaultdict

import cv2
from PIL import Image, ImageDraw
import numpy as np
from scipy.ndimage.filters import rank_filter

color = (0, 0, 0)


def dilate(ary, N, iterations):
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (N, N))
    return cv2.dilate(ary, kernel, iterations=iterations)


def erode(ary, N, iterations):
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (N, N))
    return cv2.erode(ary, kernel, iterations=iterations)


def generate_color():
    global color
    color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


class Border:
    def __init__(self, idx, x1, y1, x2, y2): #next, previous, child, parent
        self.idx = idx
        self.x1 = x1
        self.x2 = x2
        self.y1 = y1
        self.y2 = y2


def show_image_contours(bw, name=None):
    img = cv2.merge((bw, bw, bw))
    _, contours, hierarchy = cv2.findContours(bw, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    borders = []
    for i, c in enumerate(zip(contours, hierarchy)):
        x, y, w, h = cv2.boundingRect(c[0])
        borders.append(Border(i, x, y, x + w - 1, y + h - 1))

    print borders
    new_borders = []
    for i, b in enumerate(borders):
        overlap = False
        for j, o in enumerate(borders):
            print i, j
            if b.x1 >= o.x1 and b.y1 >= o.y1 and b.x2 <= o.x2 and b.y2 <= o.y2 and i != j:
                overlap = True
        if not overlap:
            new_borders.append(b)

    borders = new_borders

    # borders.sort(key=lambda (i, x1, y1, x2, y2): (x2 - x1) * (y2 - y1), reverse=True)
    # borders = filter(lambda b: (b[4] - b[2]) < 0.5 * bw.shape[0] and (b[3] - b[1]) * (b[4] - b[2]) < 0.8 * bw.shape[1] * bw.shape[0], borders)

    for b in borders:
        generate_color()
        cv2.rectangle(img, (b.x1, b.y1), (b.x2, b.y2), color, -1)
    Image.fromarray(img).show()


def process_image(path):
    im = Image.open(path)
    edges = cv2.Canny(np.asarray(im), 150, 200)

    show_image_contours(edges)
    edges = dilate(edges, N=3, iterations=6)
    # edges = erode(edges, N=3, iterations=3)
    show_image_contours(edges)


if __name__ == '__main__':
    path = r'D:\UAIC\3.1\IA\pdf2article\samples\images\3.jpg'
    try:
        process_image(path)
    except Exception as e:
        print ('%s %s' % (path, e))
