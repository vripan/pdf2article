from doc_annotator.utils.page_segmentation.segment import make_box_from_points
from xml.etree.ElementTree import ElementTree
from doc_annotator.utils.debug import printd
from subprocess import Popen, PIPE
from PyPDF2 import PdfFileReader
from doc_annotator import app
import pdf2image
import tempfile
import os
import re


def find(el, name):
    for c in el:
        tag = c.tag
        tag = re.sub('\{.*\}', '', tag)
        if tag.lower() == name.lower():
            return c


def findall(el, name):
    r = []
    for c in el:
        tag = c.tag
        tag = re.sub('\{.*\}', '', tag)
        if tag.lower() == name.lower():
            r.append(c)
    return r


def get_page_as_image(file_path, page_num):
    return pdf2image.convert_from_path(file_path, first_page=page_num, last_page=page_num)[0]


def run_segmentation(input_file, output_file, method='layout'):
    cmd = ' '.join([os.path.abspath(app.config['PRImA_EXE']),
                    "-inp-img", '"' + input_file + '"',
                    "-out-xml", '"' + output_file + '"',
                    "-rec-mode", method
                    ])

    print(cmd)
    try:
        child = Popen(cmd, stdout=PIPE, stderr=PIPE)
    except FileNotFoundError:
        raise Exception("PRImA_Tesseract-1-4-144.exe not found. Download it from https://www.primaresearch.org/tools/TesseractOCRToPAGE")

    stdoutdata, stderrdata = child.communicate()


def parse_result(result_file):
    eletree = ElementTree()

    eletree.parse(result_file)
    root = eletree.getroot()

    results = []

    try:
        textRegions = findall(find(root, "Page"), "TextRegion")

        for t in textRegions:
            coords = find(t, "Coords")
            pairs = coords.attrib["points"].split(' ')
            pairs = list(map(lambda pair: tuple(pair.split(',')), pairs))
            pairs = list(map(lambda pair: (int(pair[0]), int(pair[1])), pairs))
            textEquivTag = find(t, "TextEquiv")
            confidence = textEquivTag.attrib["conf"].split()[0]
            confidence = float(confidence)
            unicodeTag = find(textEquivTag, "Unicode")
            text = unicodeTag.text

            box = make_box_from_points(pairs)

            results.append((box, confidence, text))

    except Exception as exp:
        raise Exception('Failed to parse results from PRImA.\n' + str(exp))

    return results


def segment_page(file_path, page_num):
    image = get_page_as_image(file_path, page_num)

    disk_image_path = os.path.join(tempfile.gettempdir(), "doc_annotator_imag")
    with open(disk_image_path, 'wb') as disk_image:
        image.save(disk_image, format="jpeg")

    disk_result_path = os.path.join(tempfile.gettempdir(), "doc_annotator_resu")
    open(disk_result_path, 'wb').close()

    run_segmentation(disk_image_path, disk_result_path, 'ocr-regions')

    return parse_result(disk_result_path)


def segment_pdf(file_name):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)

    pdfFd = open(file_path, 'rb')
    page_count = PdfFileReader(pdfFd).getNumPages()
    pdfFd.close()

    segment_page_mapping = dict()

    for i in range(0, page_count):
        segment_page_mapping.update({i: segment_page(file_path, i)})  # { 1 : [(x1,y1,x2,y2),(x1,y1,x2,y2) ...]}
        printd("Page %d --> %d boxes" % (i, len(segment_page_mapping[i])))

    return segment_page_mapping
