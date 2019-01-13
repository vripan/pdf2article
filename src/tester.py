import unittest
from doc_annotator.unit_testing.controllers.default import DefaultControllers
from doc_annotator.unit_testing.utils.jobs_queue import TestJobsQueue
# from doc_annotator.unit_testing.repository.volatile.parse_results import TestParseResults
from doc_annotator.unit_testing.repository.volatile.training_metadata import TestTrainingMetadata
from doc_annotator.unit_testing.utils.ocr.optical import TestOptical
from names_finder.unit_testing.name_utilis import TestNameUtils

tests = [
    TestJobsQueue,
    DefaultControllers,
    TestTrainingMetadata,
    # TestParseResults,
    TestNameUtils,
    TestOptical
]

if __name__ == '__main__':
    test_loader = unittest.TestLoader()

    for test in tests:
        test_loader.loadTestsFromTestCase(test)

    unittest.main()
