import unittest

from doc_annotator.utils.ocr.optical import get_number_of_words
from doc_annotator.utils.ocr.optical import get_text_size
from doc_annotator.utils.ocr.optical import get_string_without_punc
from doc_annotator.utils.ocr.optical import get_number_of_capitalized_words
from doc_annotator.utils.ocr.optical import get_number_of_upper_words

class TestOptical(unittest.TestCase):

    def test_get_number_of_words(self):
        results = get_number_of_words("word1 word2")
        self.assertEqual(results, 2)

    def test_get_text_size(self):
        results = get_text_size("test1. test2.")
        self.assertEqual(results, 2)

    def test_get_string_without_punc(self):
        results = get_string_without_punc("Ana, are... mere;.?")
        self.assertEqual(results, "Ana are mere")

    def test_get_number_of_capitalized_words(self):
        results = get_number_of_capitalized_words("Word1 Word2", 2)
        self.assertEqual(results, 100)

    def test_get_number_of_upper_words(self):
        results = get_number_of_upper_words("HELLO to UPPER WORLD!",4)
        self.assertEqual(results, 75)


