from flask import Flask
from doc_annotator.repository.volatile.parse_results import ParseResultsRepo

app = Flask(__name__)
parse_results_repository = ParseResultsRepo()

app.config['UPLOAD_FOLDER'] = './pdf_files'
app.config['TRAINING_FOLDER'] = './training_data'

import doc_annotator.controllers.default
import doc_annotator.controllers.parse
import doc_annotator.controllers.training
import doc_annotator.repository.volatile.parse_results