from doc_annotator import app
from flask import send_from_directory


@app.errorhandler(404)
def page_not_found(error):
    """Function returns a message and the status code"""
    return 'This page does not exist', 404


@app.errorhandler(Exception)
def exception_handler(error):
    """
    If this handler is called, there is an internal server error
    """
    return "Exception: " + str(error), 500


@app.route("/")
def main_route():
    return "Hello world!"


@app.route("/history/latest", methods=['GET'])
def show_history():
    return "Here will be shown the history"


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
