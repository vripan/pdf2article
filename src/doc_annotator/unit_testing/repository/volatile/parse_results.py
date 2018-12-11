import unittest

from doc_annotator import ParseResultsRepo
from doc_annotator.utils.parse_phase import ParsePhase


class TestParseResults(unittest.TestCase):

    def setUp(self):
        self.parseResultRepo = ParseResultsRepo()

    # def test_get_results(self):
    #     print(self.parseResultRepo.table)

    def test_save_results(self):
        self.parseResultRepo.save_results('testHash', 'testValue')
        self.assertEqual(self.parseResultRepo.table['testHash'], (ParsePhase.Uploaded, 'testValue'))

        self.parseResultRepo.save_results('testHash', 'testValue2')
        self.assertEqual(self.parseResultRepo.table['testHash'], (ParsePhase.Uploaded, 'testValue2'))

    def test_save_status(self):
        self.parseResultRepo.save_status('testHash', ParsePhase.Uploaded)
        self.assertEqual(self.parseResultRepo.table['testHash'], (ParsePhase.Uploaded, None))

        self.parseResultRepo.save_status('testHash', ParsePhase.Done)
        self.assertEqual(self.parseResultRepo.table['testHash'],
                         (ParsePhase.Done, self.parseResultRepo.table['testHash'][1]))

    def tearDown(self):
        self.parseResultRepo = None
