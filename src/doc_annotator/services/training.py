import os
from flask import send_from_directory, request
from doc_annotator import app
import json


def get_training_file(file_name):
    return send_from_directory(os.path.abspath(app.config['TRAINING_FOLDER']), file_name)


def get_training_files():
    return [file for file in os.listdir(os.path.abspath(app.config['TRAINING_FOLDER']))]

def update_metadata(file_name, request):
    """
    Checks if the given file exists (ex: fisier.pdf), and if it does it creates another file (ex: fisier) 
    in which it stores its metadata
    The body of the request can be both form-data and application/json
    """
    
    if (not os.path.exists(os.path.join(app.config['TRAINING_FOLDER'], file_name))):
        return {"status":"false", "message":"File " + file_name + " does not exist"}

    newFileName = file_name.replace(".pdf","")
    metadataFileObj = open(os.path.join(app.config['TRAINING_FOLDER'], newFileName), 'wb')

    if (len(request.form) > 0):
        metadataFileObj.write(json.dumps(request.form).encode())
        return {"status":"true", "message":"Metadata updated"}
    elif (len(request.data) > 0):
        metadataFileObj.write(request.data)
        return {"status":"true", "message":"Metadata updated"}
    else:
        return {"status":"false", "message":"No metadata sent"}

