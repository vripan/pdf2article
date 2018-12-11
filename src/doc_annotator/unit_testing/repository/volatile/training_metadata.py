import unittest

from doc_annotator import TrainingMetadataRepo


class TestTrainingMetadata(unittest.TestCase):

    def setUp(self):
        self.trainingMetadataRepo = TrainingMetadataRepo()

    def tearDown(self):
        self.trainingMetadataRepo = None
