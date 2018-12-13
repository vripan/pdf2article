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
        self.lock.acquire()
        try:
            if hash not in self.table.keys():
                self.table.update({hash: (status, None)})
            else:
                self.table.update({hash: (status, self.table[hash][1])})
        finally:
            self.lock.release()
