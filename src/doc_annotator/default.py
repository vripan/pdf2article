from doc_annotator import app


@app.errorhandler(404)
def page_not_found(error):
    """Function returns a message and the status code"""
    return 'This page does not exist', 404


@app.route("/", methods=['GET'])
def hello():
    return "Hello World!"
