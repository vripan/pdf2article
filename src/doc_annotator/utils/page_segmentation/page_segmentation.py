import pdf2image
import os
from doc_annotator import app
import numpy

def get_page_as_image(file_hash, page_num):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_hash)
    return numpy.array(pdf2image.convert_from_path(file_path, first_page=page_num, last_page=page_num)[0])


def segment_page(file_hash, pagenum):
    pass
    # obtin pagina ca imagine
    # segmentez pagina


def segment_pdf(file_hash):
    pass
    # trec prin fiecare pagina si apelez segment_page, care imi retureaza chenarele
    # de pe pagina respectiva
    # le pune pe toate intr-un array si le returneaza, se tine minte si pagina la fiecare chenar
