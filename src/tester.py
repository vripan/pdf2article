import unittest
from doc_annotator.unit_testing.controllers.default import DefaultControllers
from doc_annotator.unit_testing.utils.jobs_queue import TestJobsQueue

tests = [
    TestJobsQueue,
    DefaultControllers
]

if __name__ == '__main__':
    test_loader = unittest.TestLoader()

    for test in tests:
        test_loader.loadTestsFromTestCase(test)

    unittest.main()
