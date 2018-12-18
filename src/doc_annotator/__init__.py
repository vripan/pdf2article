from flask import Flask
import os, sys
from flask_cors import CORS

app = Flask(__name__)
CORS(app,  resources={r"*": {"origins": "*"}})

app.config['UPLOAD_FOLDER'] = './pdf_files'
app.config['TRAINING_FOLDER'] = './training_data'

from doc_annotator.repository.volatile.parse_results import ParseResultsRepo
from doc_annotator.repository.volatile.training_metadata import TrainingMetadataRepo

print(sys.version_info)

parse_results_repository = ParseResultsRepo()
training_metadata_repository = TrainingMetadataRepo()

from doc_annotator.utils.jobs_queue import JobsQueue, Parser

jobs_queue = JobsQueue(Parser)

import doc_annotator.controllers.default
import doc_annotator.controllers.parse
import doc_annotator.controllers.training
import doc_annotator.repository.volatile.parse_results
import doc_annotator.repository.volatile.training_metadata
