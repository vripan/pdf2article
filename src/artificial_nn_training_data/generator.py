from subprocess import Popen, PIPE
import os, pdf2image, re, json
from PyPDF2 import PdfFileReader
from xml.etree.ElementTree import ElementTree
from names_finder.name_utils import NamesUtils
import threading
import numpy as np
import cv2
from PIL import Image

PRImA = './bins/TesseractToPAGE 1.4/bin/PRImA_Tesseract-1-4-144.exe'
training_data = './training_data2/'
PDF = '.pdf'
temp_img = 'temp_image.jpg'
temp_result = 'temp_result.xml'
result_folder = './src/artificial_nn_training_data/results/'
preview_results = './src/artificial_nn_training_data/preview_results'
text_threshold = 6
q = []
thread_counter = 4
locl = threading.Lock()


def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in range(0, len(l), n):
        s = i
        d = i + n if i + n < len(l) else len(l)
        yield (s + 1, d)


def make_box_from_points(points):
    x = []
    y = []
    for p in points:
        x.append(p[0])
        y.append(p[1])
    xmax = max(x)
    ymax = max(y)
    xmin = min(x)
    ymin = min(y)
    return xmin, ymin, xmax, ymax


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


def get_page_as_image(file_path, page_num_s, page_num_e):
    return pdf2image.convert_from_path(file_path, first_page=page_num_s, last_page=page_num_e)


def run_segmentation(input_file, output_file, method='layout'):
    cmd = ' '.join([os.path.abspath(PRImA),
                    "-inp-img", '"' + input_file + '"',
                    "-out-xml", '"' + output_file + '"',
                    "-rec-mode", method
                    ])

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


def classify_text(text):
    for char in '-.,\n':
        ext = text.replace(char, ' ')
    text = text.lower()
    words = text.split()

    if len(words) > text_threshold:
        return "content"
    else:
        for word in words:
            if word in NamesUtils.elems:
                return "author"
        return "title"


def classify_results(results):
    for idx, result in enumerate(results):
        box, confidence, text = result
        text_class = classify_text(result[2])
        result = (box, confidence, text, text_class)
        results[idx] = result

    return results


def process_pdf(file_path):
    id = str(threading.get_ident())
    page_count = PdfFileReader(file_path).getNumPages()
    filename, extension = os.path.splitext(file_path)

    if os.path.exists(os.path.join(training_data, os.path.basename(filename))):
        print("Already parsed %s" % filename)
        return

    pages = {}
    current_page = 1

    for page_interval in chunks(range(page_count), 10):
        imgs = get_page_as_image(file_path, page_interval[0], page_interval[1])
        for img in imgs:
            print("[%s][%s]Page %d of %d" % (id, filename, current_page, page_count))
            img.save(id + temp_img)
            run_segmentation(id + temp_img, id + temp_result, method="ocr_regions")
            results = parse_result(id + temp_result)
            results = classify_results(results)
            pages[current_page] = results
            current_page += 1

    with open(os.path.join(training_data, os.path.basename(filename)), 'w') as f:
        json.dump(pages, f)


class FAST(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        while True:
            locl.acquire()
            if len(q) == 0:
                locl.release()
                return

            file = q.pop()
            locl.release()
            print("[%s]Processing %s" % (str(threading.get_ident()), file))
            process_pdf(file)
            print("[%s]Done %s" % (str(threading.get_ident()), file))


def main_generator():
    for file in os.listdir(training_data):
        file_path = os.path.join(training_data, file)
        filename, extension = os.path.splitext(file_path)
        if extension == PDF:
            q.append(file_path)
    print("Files added to queue")

    thds = []

    for th in range(thread_counter):
        x = FAST()
        x.start()
        thds.append(x)

    for th in thds:
        th.join()

    print("Parsing done")


colors = {
    "title": (255, 0, 0),
    "author": (0, 255, 0),
    'content': (0, 0, 255)
}


def show_image_contours(img, borders, path):
    i = np.array(img)
    for b in borders:
        cv2.rectangle(i, (int(b[0][0]), int(b[0][1])), (int(b[0][2]), int(b[0][3])), colors[b[3]], 2)
    Image.fromarray(i).save(path)


def preview_generator():
    for file in os.listdir(result_folder):
        metadata = None
        with open(os.path.join(result_folder, file), 'r') as f:
            metadata = json.load(f)

        for page in metadata:
            img = get_page_as_image(os.path.join(training_data, file) + ".pdf", int(page), int(page))[0]
            show_image_contours(img, metadata[page], os.path.join(preview_results, file) + str(page) + ".jpg")


if __name__ == "__main__":
    # main_generator()
    preview_generator()
