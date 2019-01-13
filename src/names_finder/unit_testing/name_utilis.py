import unittest
import random
from names_finder.name_utils import NamesUtils


class TestNameUtils(unittest.TestCase):

    def setUp(self):
        self.NamesUtils = NamesUtils()
        self.stringInSet = next(iter(self.NamesUtils.elems));
        self.stringInSet2 = next(iter(random.sample(self.NamesUtils.elems, 1)));

    def test_is_name(self):
        results = self.NamesUtils.isName(self.stringInSet)
        self.assertEqual(results, True)

        filteredList = list(filter(lambda a: a != self.stringInSet, self.NamesUtils.elems))
        self.NamesUtils.elems = filteredList;

        self.assertEqual(self.stringInSet in filteredList, False)

    def test_contains_name(self):
        results = self.NamesUtils.containsName(self.stringInSet + ' test')
        self.assertEqual(results, True)

        results = self.NamesUtils.containsName(self.stringInSet + 'test')
        self.assertEqual(results, False)

    def test_get_names(self):
        results = self.NamesUtils.getNames(self.stringInSet + ' test ' + self.stringInSet2);
        found = self.stringInSet in results and self.stringInSet2 in results;
        self.assertEqual(found, True)

        results = self.NamesUtils.getNames('');
        self.assertEqual(results, [])

    def tearDown(self):
        self.NamesUtils = None
