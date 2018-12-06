from flask import Flask

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './pdf_files'
app.config['TRAINING_FOLDER'] = './training_data'

from doc_annotator.repository.volatile.parse_results import ParseResultsRepo
from doc_annotator.repository.volatile.training_metadata import TrainingMetadataRepo

parse_results_repository = ParseResultsRepo()
training_metadata_repository = TrainingMetadataRepo()

import doc_annotator.controllers.default
import doc_annotator.controllers.parse
import doc_annotator.controllers.training
import doc_annotator.repository.volatile.parse_results
import doc_annotator.repository.volatile.training_metadata