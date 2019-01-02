import PyPDF2
import io
import numpy
import pdf2image
from PIL import Image as PILimg
from doc_annotator import app
import os
import cv2
import numpy as np


def get_image(file_path, page):
    return pdf2image.convert_from_path(file_path, first_page=page, last_page=page)[0]


def parse_metadata(metadata):
    p = {}
    payload = metadata['payload']
    props = metadata['pagesProperties']

    for t in payload:
        x, y, xE, yE, page, pk, tag = t.values()
        chenar = (x, y, xE + x, yE + y)

        if page in p:
            p[page]['borders'].append(chenar)
        else:
            p[page] = {'borders': [chenar]}

    for info in props:
        if info['pageIndex'] in p:
            p[info['pageIndex']]['width'] = info['pageDimensions']['width']
            p[info['pageIndex']]['height'] = info['pageDimensions']['height']

    return p


def show_image_contours(img, borders, scale):
    for b in borders:
        cv2.rectangle(img, (int(b[0] * scale), int(b[1] * scale)), (int(b[2] * scale), int(b[3] * scale)), (255, 10, 10), 1)
    PILimg.fromarray(img).show()


def preview(filename, metadata):
    if not app.config['DBG']: return

    file_path = os.path.join(app.config['TRAINING_FOLDER'], filename)

    metadata = parse_metadata(metadata)
    for page in metadata:
        img = get_image(file_path, page)
        scale = img.height / metadata[page]['height']
        img = numpy.array(img)

        show_image_contours(img, metadata[page]['borders'], scale)


def parse_metadata2(metadata):
    for page in metadata:
        r = []
        for rectangle in metadata[page]:
            r.append(tuple(rectangle[0]))
        metadata[page] = r

    return metadata


def preview2(filename, metadata):
    if not app.config['DBG']: return

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    metadata = parse_metadata2(metadata)
    for page in metadata:
        img = get_image(file_path, page)
        scale = 1
        img = numpy.array(img)

        show_image_contours(img, metadata[page], scale)


if __name__ == '__main__':
    import pytesseract

    image = r'C:\Users\vripan\Desktop\453028a_Page_3.jpg'

    img = PILimg.open(image)

    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
    print(pytesseract.image_to_data(img))

    rectsLen = len(data['left'])

    borders = []

    m = max(data['level'])

    for i in range(rectsLen):
        if data['level'][i] == 2:
            x = data['left'][i]
            y = data['top'][i]
            xE = x + data['width'][i]
            yE = y + data['height'][i]
            borders.append((x, y, xE, yE))

    show_image_contours(np.array(PILimg.open(image)), borders, 1)
