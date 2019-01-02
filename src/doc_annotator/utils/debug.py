from doc_annotator import app


def printd(string):
    if not isinstance(string, str):
        raise ValueError

    if app.config['DBG']:
        print(string)
