import queue
import threading


class Worker(threading.Thread):
    def __init__(self, jobs):
        threading.Thread.__init__(self)
        self.action = None
        self.jobs = jobs

    def run(self):
        """
        Function calls page segmentation algorithm and NN
        """
        pass


class JobsQueue:
    def __init__(self):
        self.q = queue.Queue()
        self.worker = None
        self.lock = threading.Lock()

    def new_worker(self):
        self.worker = Worker(self)

    def push(self, element):
        result = self.q.put(element)

        # check if false

        self.lock.acquire()
        if self.worker is None:
            self.new_worker()
        self.lock.release()

        return result

    def pop(self):
        result = None

        if not self.q.empty():
            result = self.q.get()

        self.lock.acquire()
        if self.q.empty():
            self.worker = None
        self.lock.release()

        return result
