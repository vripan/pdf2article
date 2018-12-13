from wand.image import Image
import PyPDF2
import io
import numpy
import pdf2image
from PIL import Image as PILimg
from doc_annotator import app
import os
import doc_annotator.utils.page_segmentation.segment as segment


def get_image(file_path, page):
    return pdf2image.convert_from_path(file_path, first_page=page, last_page=page)[0]


def parse_metadata(metadata):
    p = {}

    for t in metadata:
        x = (t['x'], t['y'], t['xEnd'], t['yEnd'])
        page = t['page']
        if page in p:
            p[page].append(x)
        else:
            p[page] = [x]

    return p


def preview(filename, metadata):
    file_path = os.path.join(app.config['TRAINING_FOLDER'], filename)

    metadata = parse_metadata(metadata)

    for page in metadata:
        img = get_image(file_path, page)
        print(page)
        print(type(img))
        img = numpy.array(img)

        segment.show_image_contours(img, metadata[page])
