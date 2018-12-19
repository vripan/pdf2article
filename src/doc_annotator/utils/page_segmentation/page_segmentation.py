from doc_annotator.utils.page_segmentation.segment import segment
from doc_annotator.utils.debug import printd
from PyPDF2 import PdfFileReader
from doc_annotator import app
import pdf2image
import numpy
import os


def get_page_as_image(file_path, page_num):
    return numpy.array(pdf2image.convert_from_path(file_path, first_page=page_num, last_page=page_num)[0])


def segment_page(file_path, page_num):
    image = get_page_as_image(file_path, page_num)

    segmentation_result = segment(image)

    return segmentation_result


def segment_pdf(file_name):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)

    pdfFd = open(file_path, 'rb')
    page_count = PdfFileReader(pdfFd).getNumPages()
    pdfFd.close()

    segment_page_mapping = dict()

    for i in range(0, page_count):
        segment_page_mapping.update({i: segment_page(file_path, i)})  # { 1 : [(x1,y1,x2,y2),(x1,y1,x2,y2) ...]}

    return segment_page_mapping
