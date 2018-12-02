from flask import Flask

app = Flask(__name__)

import doc_annotator.default
import doc_annotator.parse
import doc_annotator.training