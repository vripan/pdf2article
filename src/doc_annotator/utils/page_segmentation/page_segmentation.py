import pdf2image
import os
from doc_annotator import app
import numpy

def get_page_as_image(file_hash, page_num):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_hash)
    return numpy.array(pdf2image.convert_from_path(file_path, first_page=page_num, last_page=page_num)[0])



