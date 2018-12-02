from doc_annotator import app


@app.route("/get_training_file/<file_name>", methods=['GET'])
def get_training_file(file_name):
    # returneaza fiseirul sau eroare
    return "adas"


@app.route("/get_existing_metadata/<file_name>", methods=['GET'])
def get_existing_metadata(file_name):
    # returneaza formatul discutat cu chenare
    return "adas"


@app.route("/update_metadata/<file_name>", methods=['POST'])
def update_metadata(file_name):
    # actualizeaza datele de atrenament
    return "adas"
