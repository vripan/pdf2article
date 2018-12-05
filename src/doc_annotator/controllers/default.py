from doc_annotator import app
import time
import threading
from flask import Flask, send_from_directory

@app.errorhandler(404)
def page_not_found(error):
    """Function returns a message and the status code"""
    return 'This page does not exist', 404


@app.route("/", methods=['GET'])
def hello():
    return send_from_directory('../../docs', 'index.html')


list = []
first = False


@app.route("/add/<int:d>")
def m(d):
    print(threading.get_ident())
    print("IN")
    global first
    olf = first
    first = not first
    if olf:
        time.sleep(10)
    list.append(d)
    return "ok"


@app.route("/pop/")
def md():
    list.pop()
    return "ok"


@app.route("/list/")
def ms():
    return str(list)
