import cv2
from PIL import Image, ImageDraw
import numpy as np
from scipy.ndimage.filters import rank_filter
import random

color = (0, 0, 0)


def auto_canny(image, sigma=0.33):
    v = np.median(image)
    lower = int(max(0, (1.0 - sigma) * v))
    upper = int(min(255, (1.0 + sigma) * v))
    edged = cv2.Canny(image, lower, upper, True)
    return edged


def dilate(image, kernel, iterations):
    dilated_image = cv2.dilate(image, kernel, iterations=iterations)
    return dilated_image


def downscale_image(im, max_dim=2048):
    """Shrink im until its longest dimension is <= max_dim.
    Returns new_image, scale (where scale <= 1)."""
    a, b = im.shape[:2]
    if max(a, b) <= max_dim:
        return 1.0, im

    scale = 1.0 * max_dim / max(a, b)
    new_im = cv2.resize(im, (int(b * scale), int(a * scale)), cv2.INTER_AREA)
    return scale, new_im


def find_components(im, max_components=16):
    """Dilate the image until there are just a few connected components.
    Returns contours for these components."""
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    dilation = dilate(im, kernel, 6)

    dbg(dilation)

    count = 21
    n = 0
    sigma = 0.000

    while count > max_components:
        n += 1
        sigma += 0.005
        result = cv2.findContours(dilation, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        if len(result) == 3:
            _, contours, hierarchy = result
        elif len(result) == 2:
            contours, hierarchy = result
        possible = find_likely_rectangles(contours, sigma)
        count = len(possible)

    return (dilation, possible, n)


def find_likely_rectangles(contours, sigma):
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
    possible = []
    for c in contours:
        # approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, sigma * peri, True)
        box = make_box(approx)
        possible.append(box)

    return possible


def make_box(poly):
    x = []
    y = []
    for p in poly:
        for point in p:
            x.append(point[0])
            y.append(point[1])
    xmax = max(x)
    ymax = max(y)
    xmin = min(x)
    ymin = min(y)
    return (xmin, ymin, xmax, ymax)


def rect_union(crop1, crop2):
    """Union two (x1, y1, x2, y2) rects."""
    x11, y11, x21, y21 = crop1
    x12, y12, x22, y22 = crop2
    return min(x11, x12), min(y11, y12), max(x21, x22), max(y21, y22)


def rect_area(crop):
    return max(0, crop[2] - crop[0]) * max(0, crop[3] - crop[1])


def crop_image(im, rect, scale):
    xmin, ymin, xmax, ymax = rect
    crop = [xmin, ymin, xmax, ymax]
    xmin, ymin, xmax, ymax = [int(x / scale) for x in crop]
    cropped = im[ymin:ymax, xmin:xmax]
    return cropped


def reduce_noise_raw(im):
    bilat = cv2.bilateralFilter(im, 9, 75, 75)
    blur = cv2.medianBlur(bilat, 3)
    return blur


def reduce_noise_edges(im):
    structuring_element = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
    opening = cv2.morphologyEx(im, cv2.MORPH_OPEN, structuring_element)
    maxed_rows = rank_filter(opening, -4, size=(1, 20))
    maxed_cols = rank_filter(opening, -4, size=(20, 1))
    debordered = np.minimum(np.minimum(opening, maxed_rows), maxed_cols)
    return debordered


def rects_are_vertical(rect1, rect2):
    xmin1, ymin1, xmax1, ymax1 = rect1
    xmin2, ymin2, xmax2, ymax2 = rect2

    midpoint1 = (xmin1 + xmax1) / 2
    midpoint2 = (xmin2 + xmax2) / 2
    dist = abs(midpoint1 - midpoint2)

    rectarea1 = rect_area(rect1)
    rectarea2 = rect_area(rect2)
    if rectarea1 > rectarea2:
        thres = (xmax1 - xmin1) * 0.1
    else:
        thres = (xmax2 - xmin2) * 0.1
    if thres > dist:
        align = True
    else:
        align = False
    return align


def find_final_crop(im, rects):
    current = None
    for rect in rects:
        if current is None:
            current = rect
            continue

        aligned = rects_are_vertical(current, rect)

        if not aligned:
            continue
        current = rect_union(current, rect)
    return current


def dilate_wrapper(im):
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (10, 10))
    dilation = dilate(im, kernel, 2)
    return dilation


def process_image(orig_im):
    # scale, im = downscale_image(orig_im)
    scale = 1

    blur = reduce_noise_raw(orig_im.copy())

    edges = auto_canny(blur.copy())
    edges = cv2.Canny(np.asarray(blur), 150, 200)

    dbg(edges)

    # dilation = dilate_wrapper(edges)
    # dilation, rrr, _ = find_components(edges)
    # show_image_contours(orig_im, rrr)
    # bw = dilation
    bw = edges
    ########################
    _, contours, hierarchy = cv2.findContours(bw, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    borders = []
    print(hierarchy.shape)
    for i, c in enumerate(contours):
        x, y, w, h = cv2.boundingRect(c)
        borders.append((x, y, x + w - 1, y + h - 1, i, hierarchy[0][i][3]))

    def fbordd(border):
        if (rect_area(border) * 100 / (orig_im.shape[0] * orig_im.shape[1])) > 0.9:
            lst = list(border)
            lst[4] = -1
            border = tuple(lst)

    for i, border in enumerate(borders):
        if (rect_area(border) / (orig_im.shape[0] * orig_im.shape[1])) > 0.9:
            lst = list(borders[i])
            lst[4] = -1
            borders[i] = tuple(lst)

    borders = sorted(borders, key=lambda box: rect_area(box), reverse=True)
    mean = rect_area(borders[len(borders) // 2])
    print(mean)
    borders = list(filter(lambda b: b[5] == -1 or borders[b[5]][4] == -1, borders))
    # borders = list(filter(lambda b: rect_area(b) > mean, borders))

    ####################
    show_image_contours(orig_im, borders)

    return borders


def rad_to_deg(theta):
    return theta * 180 / np.pi


def rotate(image, theta):
    (h, w) = image.shape[:2]
    center = (w / 2, h / 2)
    M = cv2.getRotationMatrix2D(center, theta, 1)
    rotated = cv2.warpAffine(image, M, (int(w), int(h)), cv2.INTER_LINEAR,
                             borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
    return rotated


def estimate_skew(image):
    edges = auto_canny(image)
    lines = cv2.HoughLines(edges, 1, np.pi / 90, 200)
    new = edges.copy()

    thetas = []

    for line in lines:
        for rho, theta in line:
            a = np.cos(theta)
            b = np.sin(theta)
            x0 = a * rho
            y0 = b * rho
            x1 = int(x0 + 1000 * (-b))
            y1 = int(y0 + 1000 * (a))
            x2 = int(x0 - 1000 * (-b))
            y2 = int(y0 - 1000 * (a))
            if theta > np.pi / 3 and theta < np.pi * 2 / 3:
                thetas.append(theta)
                new = cv2.line(new, (x1, y1), (x2, y2), (255, 255, 255), 1)

    theta_mean = np.mean(thetas)
    theta = rad_to_deg(theta_mean) if len(thetas) > 0 else 0

    return theta


def compute_skew(theta):
    # We assume a perfectly aligned page has lines at theta = 90 deg
    diff = 90 - theta

    # We want to reverse the difference.
    return -diff


def process_skewed_crop(image):
    theta = compute_skew(estimate_skew(image))
    ret, thresh = cv2.threshold(image.copy(), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    rotated = rotate(thresh, theta)
    return (rotated, theta)


def segment(image):
    if not isinstance(image, np.ndarray):
        raise TypeError

    return process_image(image)


def dbg(im):
    Image.fromarray(im).show()


def show_image_contours(bw, borders):
    # img = cv2.merge((bw, bw, bw))
    # img = np.array(np.frombuffer(bw))
    # bw = img
    scale = 0.4
    bw = cv2.resize(bw, (0, 0), fx=scale, fy=scale)
    img = bw
    borders = sorted(borders, key=lambda box: rect_area(box), reverse=True)
    for b in borders:
        if len(b) >= 5:
            if b[4] != -1:
                generate_color()
                cv2.rectangle(img, (b[0], b[1]), (b[2], b[3]), color, -1)
        else:
            generate_color()
            cv2.rectangle(img, (b[0], b[1]), (b[2], b[3]), color, -1)

        # else:
        #     cv2.rectangle(img, (b[0], b[1]), (b[2], b[3]), (255, 0, 0), 2)
    Image.fromarray(img).show()


def show_image_contours2(bw, name=None):
    img = cv2.merge((bw, bw, bw))
    _, contours, hierarchy = cv2.findContours(bw, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    borders = []
    for i, c in enumerate(contours):
        x, y, w, h = cv2.boundingRect(c)
        borders.append((i, x, y, x + w - 1, y + h - 1))

    borders = sorted(borders, key=lambda box: rect_area(box[1:]), reverse=True)

    for b in borders:
        generate_color()
        cv2.rectangle(img, (b[1], b[2]), (b[3], b[4]), color, -1)
    Image.fromarray(img).show()


def generate_color():
    global color
    color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


import os, time

if __name__ == '__main__':
    p = r'D:\UAIC\3.1\IA\pdf2article\samples\images'

    # path = os.path.join(p, "alecart A4.pdf")
    # im = np.array(Image.open(path))
    # rects = segment(im)
    # time.sleep(5)

    for d in os.listdir(p):
        path = os.path.join(p, d)
        im = np.array(Image.open(path))
        rects = segment(im)
        time.sleep(5)
