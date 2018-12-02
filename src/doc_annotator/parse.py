import time
from doc_annotator import app


@app.route("/parse/<string:hash>", methods=['GET'])
def parse_page(hash: str):
    time.sleep(5)
    # vezi statusul si daca nu e parsat pune-l in coada pentru parsat
    # returneaza mereu True
    return "Nu stiu inca"


@app.route("/check_status/<string:hash>", methods=['GET'])
def check_status(hash: str):
    return "True"
    # returneaza true daca a fost parsat sau false daca nu


@app.route("/get_results/<string:hash>", methods=['GET'])
def get_results(hash: str):
    return "result"
    # returneaza un obiect cu statusl false sau true daca a fost sau nu parsat
    # si lista de chenare dupa format deja discutat


@app.route("/upload", methods=['POST'])
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


@app.route("/get_file/<string:hash>", methods=['GET'])
def get_file(hash):
    #returneaza fisierul cu hasul specificat sau eroare daca nu exista
    return "laksjdkl"