from wand.image import Image
import PyPDF2
import io
import numpy
from PIL import Image as PILimg
from doc_annotator import app
import os
import doc_annotator.utils.page_segmentation.segment as segment


def show(file_name, metadata):
    try:
        file = os.path.join(app.config['TRAINING_FOLDER'], file_name)
        pages = get_img_as_array(file)

        rects = process_metadata(metadata)
        segment.show_image_contours(image_as_array, metadata)
    except Exception as e:
        print(e)
        print("Failed to preview save metadata")


def process_metadata(metadata):
    print(metadata)
    return [(10, 10, 20, 20)]


def pdf_page_to_png(src_pdf, pagenum=0, resolution=72):
    """
    Returns specified PDF page as wand.image.Image png.
    :param PyPDF2.PdfFileReader src_pdf: PDF from which to take pages.
    :param int pagenum: Page number to take.
    :param int resolution: Resolution for resulting png in DPI.
    """
    dst_pdf = PyPDF2.PdfFileWriter()
    dst_pdf.addPage(src_pdf.getPage(pagenum))

    pdf_bytes = io.BytesIO()
    dst_pdf.write(pdf_bytes)
    pdf_bytes.seek(0)

    img = Image(file=pdf_bytes, resolution=resolution)
    img.convert("png")

    return img


def get_img_as_array(file):
    f = open(file, 'rb')
    pddf = PyPDF2.PdfFileReader(f)

    pages = []

    for pidx in range(pddf.getNumPages()):
        img = pdf_page_to_png(pddf, pidx)
        img_buffer = numpy.asarray(bytearray(img.make_blob(format='png')), dtype='uint8')
        bytesio = io.BytesIO(img_buffer)
        pil_img = numpy.array(PILimg.open(bytesio))
        pages.append(pil_img)

    # returneaza un array cu paginile ca si imagini
    return pages
