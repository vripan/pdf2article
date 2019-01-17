import unittest
from doc_annotator.utils import JobsQueue
from doc_annotator.utils import Parser


class TestJobsQueue(unittest.TestCase):

    def test_given_empty_queue_when_push_then_queue_has_one_element(self):
        element = 'test'
        JobsQueue.push(element)
        expected = 1
        actual = len(JobsQueue.q)
        self.assertEqual(expected, actual)

    def test_given_queue_with_one_element_when_pop_then_queue_is_empty(self):
        element = 'test'
        JobsQueue.push(element)

        JobsQueue.pop()
        expected = 0
        actual = len(JobsQueue.q)
        self.assertEqual(expected, actual)

    def test_given_not_empty_queue_when_pop_then_queue_returns_element(self):
        JobsQueue.push('element1')
        JobsQueue.push('element2')

        expected = 'element1'
        actual = JobsQueue.pop()
        self.assertEqual(expected, actual)

    def test_given_queue_when_release_worker_then_worker_is_released(self):
        JobsQueue.release_worker()
        self.assertTrue(JobsQueue.worker is None)


class TestParser(unittest.TestCase):
    def test_given_invalid_file_name_task_throws_exception(self):
        self.assertRaises(Exception, Parser.task(file_name="test"))

    def test_given_parser_with_jobs_after_run_jobs_is_empty(self):
        jobs = JobsQueue("worker_type")
        parser = Parser(jobs)
        parser.run()

        self.assertTrue(len(parser.jobs) is 0)
