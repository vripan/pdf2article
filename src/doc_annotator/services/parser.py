import os

from PyPDF2 import PdfFileReader
from doc_annotator import app, parse_results_repository, jobs_queue
from flask import send_from_directory
from werkzeug.utils import secure_filename
from doc_annotator.utils.parse_phase import ParsePhase
import uuid


def parse_file(hash):
    (status, result) = parse_results_repository.get_results(hash)

    if status == ParsePhase.Done:
        return {"status": True, "message": "the file was already processed"}
    elif status == ParsePhase.Parsing:
        return {"status": True, "message": "the file is in processing"}
    else:
        try:
            jobs_queue.push(hash)
        except Exception as e:
            return {"status": False, "message": "the file could not be processed"}

        return {"status": True, "message": "the file will be processed"}


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
        PdfFileReader(pdfFileObj)
        parse_results_repository.save_status(filename, ParsePhase.Uploaded)
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


def get_results(hash):
    (status, result) = parse_results_repository.get_results(hash)
    return {"status": ParsePhase.to_string(status), "result": result}
