import queue
import threading
import time
from doc_annotator.utils.parse_phase import ParsePhase
from doc_annotator import parse_results_repository
from doc_annotator.utils.page_segmentation.page_segmentation import segment_pdf
from doc_annotator.utils.ocr.optical import ocr_file
from doc_annotator import training_network

class Worker(threading.Thread):
    def __init__(self, jobs):
        threading.Thread.__init__(self)
        self.action = None
        self.jobs = jobs

    def run(self):
        """
        Working...
        """
        pass


class Parser(Worker):
    def __init__(self, jobs):
        Worker.__init__(self, jobs)

    def task(self, file_name):
        parse_results_repository.save_status(file_name, ParsePhase.Parsing)
        borders = segment_pdf(file_name)
        characteristics = ocr_file(borders, file_name)
        results = training_network.predict(characteristics)
        parse_results_repository.save_status(file_name, ParsePhase.Done)
        parse_results_repository.save_results(file_name, results)


        # iau fisierul
        # segmentare -> obtii un aray de chenare
        # ocr pe fisiere -> scot caracteristici
        # dau la reatea caracteristicile
        # centralizez rezultaetle si le trimit pe front

    def run(self):
        file_name = self.jobs.pop()
        print("starting worker")
        while file_name is not None:
            print("[" + str(threading.get_ident()) + "] working on " + str(file_name))
            self.task(file_name)
            file_name = self.jobs.pop()


class JobsQueue:
    def __init__(self, worker_type):
        self.q = queue.Queue()
        self.worker_type = worker_type
        self.worker = self.worker_type(self)
        self.lock = threading.Lock()

        self.worker.start()

    def push(self, element):
        print("push " + str(element))
        self.q.put(element)

    def pop(self):
        print("pop")
        return self.q.get()

    def release_worker(self):
        print("worker killed")
        self.lock.acquire()
        self.worker = None
        self.lock.release()
