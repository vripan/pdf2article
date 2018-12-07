import unittest
import doc_annotator


class DefaultControllers(unittest.TestCase):

    def setUp(self):
        doc_annotator.app.testing = True
        self.app = doc_annotator.app.test_client()

    def test_main_endpoint(self):
        response = self.app.get('/')
        self.assertEqual(b"Hello world!", response.data)
