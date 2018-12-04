import time
from doc_annotator import app
from doc_annotator.services.parser import parse_file


@app.route("/parse/<string:hash>", methods=['GET'])
def parse(hash: str):
    time.sleep(5)
    return parse_file(hash)
    # vezi statusul si daca nu e parsat pune-l in coada pentru parsat
    # poate da eroare daca coada e plina


@app.route("/parse/results/<string:hash>", methods=['GET'])
def get_results(hash: str):
    return "True"
    # returneaza un obiect cu statusl false sau true daca a fost sau nu parsat
    # si lista de chenare dupa format deja discutat


@app.route("/parse/upload", methods=['POST'])
def upload_pdf():
    """
    PDF upload endpoint. It returns a dict with the following format: {status:True, hash:"DW57SH83D"}. In
    case of success the status is True and the hash is a valid string and in case
    of failure the status is False and the hash is the empty string
    """
    return_value = {"status": False, "hash": ""}
    file_buffer = None
    return return_value
    # descarca fisierul
    # genereaza hash-ul pentru fisier
    # salveaza fisierul in folderul pdf_files cu hashul ca si nume fara extensie
    # ar fi o idee si de un UUID
    # verifica daca fiesierul este chiar un pdf valid
    # daca nu este atunci sterge-l si returneaza false
    # daca da returneaza true
    # se foloseste un serviciu


@app.route("/parse/download/<string:hash>", methods=['GET'])
def get_file(hash):
    # returneaza fisierul cu hasul specificat sau eroare daca nu exista
    return "laksjdkl"
