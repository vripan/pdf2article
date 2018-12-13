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

import threading
from doc_annotator.utils.parse_phase import ParsePhase

class ParseResultsRepo:
    def __init__(self):
        self.lock = threading.Lock()
        self.table = dict()

    def get_results(self, hash):
        """
        Returns results for specified hash, or None if hash entry is invalid
        """
        # retunreaza un tuplu (status, results)

        self.lock.acquire()
        try:
            if hash in self.table.keys():
                return self.table[hash].copy()
            return (ParsePhase.Invalid, None)
        finally:
            self.lock.release()

    def save_results(self, hash, results):
        """
        Saves results for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """
        self.lock.acquire()
        try:
            if hash not in self.table.keys():
                self.table.update({hash: (ParsePhase.Uploaded, results)})
            else:
                self.table.update({hash: (self.table[hash][0], results)})
        finally:
            self.lock.release()


    def save_status(self, hash, status):
        # status must have a value define in parse_phase.py
        self.lock.acquire()
        try:
            if hash not in self.table.keys():
                self.table.update({hash: (status, None)})
            else:
                self.table.update({hash: (status, self.table[hash][1])})
        finally:
            self.lock.release()

