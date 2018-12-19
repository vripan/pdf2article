import PyPDF2
import io
import numpy
import pdf2image
from PIL import Image as PILimg
from doc_annotator import app
import os
import cv2


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
    if not app.config['DEBUG']: return

    file_path = os.path.join(app.config['TRAINING_FOLDER'], filename)

    metadata = parse_metadata(metadata)
    for page in metadata:
        img = get_image(file_path, page)
        scale = img.height / metadata[page]['height']
        img = numpy.array(img)

        show_image_contours(img, metadata[page]['borders'], scale)
