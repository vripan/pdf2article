import os

from PyPDF2 import PdfFileReader
from doc_annotator import app
from flask import send_from_directory
from werkzeug.utils import secure_filename
import uuid

def parse_file(hash):
    return "dunno"


def upload_pdf(request):
    response = {"status": False, "message": "", "hash": ""}

    if 'file' not in request.files:
        response["message"] = "No file part"
        return response

    file = request.files['file']
    if file.filename == '':
        response["message"] = "No selected file"
        return response

    if not file:
        response["message"] = "Invalid file"
        return response

    filename = str(uuid.uuid1())
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    try:
        pdfFileObj = open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'rb')
        mypdf = PdfFileReader(pdfFileObj)
    except:
        pdfFileObj.close()
        response["message"] = request.files['file'].filename + " not a pdf file"
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return response

    response["status"] = True
    response["hash"] = filename
    return response


def get_file(hash):
    return send_from_directory(os.path.abspath(app.config['UPLOAD_FOLDER']), hash)
