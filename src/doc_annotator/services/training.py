import os
from flask import send_from_directory
from doc_annotator import app


def get_training_file(file_name):
    return send_from_directory(os.path.abspath(app.config['TRAINING_FOLDER']), file_name)


def get_training_files():
    return [file for file in os.listdir(os.path.abspath(app.config['TRAINING_FOLDER']))]
