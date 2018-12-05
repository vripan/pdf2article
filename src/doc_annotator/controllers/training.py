import os

from doc_annotator import app
from flask import send_from_directory


@app.route("/training/<file_name>", methods=['GET'])
def get_training_file(file_name):
    """
    Returns the file with name 'file_name' in binary format
    """
    return send_from_directory(os.path.abspath(app.config['TRAINING_FOLDER']), file_name)

@app.route("/training", methods=['GET'])
def get_training_files():
    """
    Returns a list with all training files.
    """
    return str([file for file in os.listdir(os.path.abspath(app.config['TRAINING_FOLDER']))])


@app.route("/training/metadata/<file_name>", methods=['GET'])
def get_existing_metadata(file_name):
    """
    Returns existing metadata for specified file in specified format
    """
    return {"articles": [('title', (1, 2,), (3, 4)), ('text', (1, 2,), (3, 4))]}


@app.route("/training/metadata/<file_name>", methods=['POST'])
def update_metadata(file_name):
    """
    Overwrites metadata for specified file.
    """
    return "True"
