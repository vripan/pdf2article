import unittest

from doc_annotator.utils.ocr.optical import get_number_of_words
from doc_annotator.utils.ocr.optical import get_text_size
from doc_annotator.utils.ocr.optical import get_string_without_punc
from doc_annotator.utils.ocr.optical import get_number_of_capitalized_words
from doc_annotator.utils.ocr.optical import get_number_of_upper_words
from doc_annotator.utils.ocr.optical import get_position
from doc_annotator.utils.ocr.optical import count_not_garbage


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

    def test_get_position(self):
        result = get_position (["245","2"],["234","123"])
        self.assertEqual(result,50.0)

    def test_count_not_garbage(self):
        result = count_not_garbage("Hello world!")
        self.assertEqual(result, -1000)
        




