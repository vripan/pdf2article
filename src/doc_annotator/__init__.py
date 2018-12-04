from flask import Flask

app = Flask(__name__)

import doc_annotator.controllers.default
import doc_annotator.controllers.parse
import doc_annotator.controllers.training