from flask import Flask

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './pdf_files'
app.config['TRAINING_FOLDER'] = './training_data'

import doc_annotator.controllers.default
import doc_annotator.controllers.parse
import doc_annotator.controllers.training
