import os
from flask import send_from_directory, request
from doc_annotator import app, training_metadata_repository
import json


def get_training_file(file_name):
    return send_from_directory(os.path.abspath(app.config['TRAINING_FOLDER']), file_name)


def get_training_files():
    return [file for file in os.listdir(os.path.abspath(app.config['TRAINING_FOLDER']))]

def update_metadata(file_name, request):
    """
    The body of the request can be both form-data and application/json
    """
    
    if (len(request.form) > 0):
        training_metadata_repository.save_metadata(file_name, request.form)
        return {"status":"true", "message":"Metadata updated"}
    elif (len(request.data) > 0):
        try:
            training_metadata_repository.save_metadata(file_name, json.loads(request.data))
            return {"status":"true", "message":"Metadata updated"}
        except:
            return {"status":"false", "message": "Invalid metadata"}
    else:
        return {"status":"false", "message":"No metadata sent"}
