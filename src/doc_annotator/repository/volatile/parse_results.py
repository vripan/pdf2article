# implementarea se va face cu ajutorul unui dictionar, unde cheia este data de hash
# operatiile trebuie sa fie thread-safe
# se returneaza o copie a rezultatlui din dictionar, nu o referinta la acesta (vezi deep_clone, clone, copy)


# structura
# | hash  | status   |     results     |
# +-------+----------+-----------------+
# | "asd" | uploaded |  resultse here" |
# | "asd" | parsing  |  resultse here" |
# | "asd" | done     |  resultse here" |
# indexarea se face dupa hash

from doc_annotator.utils.parse_phase import ParsePhase

class ParseResultsRepo:
    def __init__(self):
        self.dictionar = dict()
        self.dictionar["1"] = (ParsePhase.Uploaded, None)
        self.dictionar["2"] = (ParsePhase.Parsing, None)
        self.dictionar["3"] = (ParsePhase.Done, {"file":"fisier.pdf", "articles":[]})

    def get_results(self, hash):
        """
        Returns results for specified hash, or None if hash entry is invalid
        """
        # retunreaza un tuplu (status, results)

        if hash in self.dictionar.keys():
            return self.dictionar[hash]
        return (ParsePhase.Invalid, None)

    def save_results(self, hash, results):
        """
        Saves results for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """
        pass

    def save_status(self, hash, status):
        # status must have a value define in parse_phase.py
        pass
