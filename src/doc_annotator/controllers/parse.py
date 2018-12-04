import time
from doc_annotator import app
from doc_annotator.services.parser import parse_file, upload_pdf as upload_pdf_service
from flask import flash, request, redirect, url_for
import json
from werkzeug.utils import secure_filename
import os


@app.route("/parse/<string:hash>", methods=['GET'])
def parse(hash: str):
    time.sleep(5)
    return parse_file(hash)
    # vezi statusul si daca nu e parsat pune-l in coada pentru parsat
    # poate da eroare daca coada e plina


@app.route("/parse/results/<string:hash>", methods=['GET'])
def get_results(hash: str):
    return "True"
    # returneaza un obiect cu statusl false sau true daca a fost sau nu parsat
    # si lista de chenare dupa format deja discutat


@app.route("/parse/upload", methods=['POST'])
def upload_pdf():
    """
    PDF upload endpoint
    """
    return json.dumps(upload_pdf_service(request))


@app.route("/parse/download/<string:hash>", methods=['GET'])
def get_file(hash):
    # returneaza fisierul cu hasul specificat sau eroare daca nu exista
    return "laksjdkl"
