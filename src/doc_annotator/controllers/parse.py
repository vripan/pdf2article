from flask import flash, request, redirect, url_for
import doc_annotator.services.parser
from doc_annotator import app
import json


@app.route("/parse/<string:hash>", methods=['GET'])
def parse(hash):
    parse_result = doc_annotator.services.parser.parse_file(hash)
    return json.dumps(parse_result)


@app.route("/parse/results/<string:hash>", methods=['GET'])
def get_results(hash):
    """
    Intoarce rezultatul din baza de date daca exista
    daca nu exista se seteaza statusl ParsePhase.Invalid
    """
    return json.dumps(doc_annotator.services.parser.get_results(hash))


@app.route("/parse/upload", methods=['POST'])
def upload_pdf():
    """
    PDF upload endpoint
    """
    return json.dumps(doc_annotator.services.parser.upload_pdf(request))


@app.route("/parse/download/<string:hash>", methods=['GET'])
def get_file(hash):
    """
    PDF download endpoint
    """
    return doc_annotator.services.parser.get_file(hash)
