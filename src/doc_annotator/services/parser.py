from werkzeug.utils import secure_filename
from doc_annotator import app
from flask import Flask, request, send_from_directory
import os


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

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    response["status"] = True
    response["hash"] = filename
    return response


def get_file(hash):
    return send_from_directory(os.path.abspath(app.config['UPLOAD_FOLDER']), hash)
