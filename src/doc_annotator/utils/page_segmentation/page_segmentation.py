import pdf2image
from PyPDF2 import PdfFileReader
import os
from doc_annotator import app
from doc_annotator.utils.page_segmentation.segment import segment
import numpy
import os

def get_page_as_image(file_path, page_num):
    return numpy.array(pdf2image.convert_from_path(file_path, first_page=page_num, last_page=page_num)[0])

def segment_page(file_path, page_num):
    # Obtin pagina ca imagine
    image = get_page_as_image(file_path, page_num)

    # Segmentez pagina
    segmentation_result = segment(image)

    return segmentation_result

def segment_pdf(file_hash):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_hash)

    # Iau numarul de pagini
    page_count = PdfFileReader(open(file_path,'rb')).getNumPages()

    # Coordonatele chenarelor pentru fiecare pagina vor fi salvate intr-un dictionar
    segment_page_mapping = dict()

    # Segmentez fiecare pagina si salvez lista cu chenare in dictionar
    # sub forma { nr_pagina: lista tuple de coordonate}
    # exemplu { 1 : [(x1,y1,x2,y2),(x1,y1,x2,y2) ...]}
    for i in range(1, page_count+1):
        segment_page_mapping.update({i: segment_page(file_path, i)})

    print("Page count: " + str(page_count))
    for i in segment_page_mapping:
        print("Page " + str(i) + " box count: " + str(len(segment_page_mapping[i])))

    return segment_page_mapping
