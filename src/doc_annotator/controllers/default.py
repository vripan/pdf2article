from doc_annotator import app
from flask import send_from_directory


@app.errorhandler(404)
def page_not_found(error):
    """Function returns a message and the status code"""
    return 'This page does not exist', 404


@app.route("/")
def main_route():
    print("ana")
    return "Hello world!"


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
