from doc_annotator import app
from flask import send_from_directory


@app.errorhandler(404)
def page_not_found(error):
    """Function returns a message and the status code"""
    return 'This page does not exist', 404


@app.route("/")
def main_route():
    return "Hello world!"
