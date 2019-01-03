import os
import sys
import requests
from bs4 import BeautifulSoup
from bs4 import NavigableString

filenames = ['english.txt', 'romanian.txt']
with open('finalDict.txt', 'w') as outfile:
    for fname in filenames:
        with open(fname) as infile:
            for line in infile:
                outfile.write(line)