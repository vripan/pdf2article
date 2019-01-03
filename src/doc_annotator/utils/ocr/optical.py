from PyPDF2 import PdfFileWriter, PdfFileReader
import os
from doc_annotator import app
import pytesseract
import random
from doc_annotator.utils.page_segmentation.PRImA_segmentation import get_page_as_image
from itertools import groupby
import string
import re

def get_number_of_words(text):
    wordList = re.sub("[^\w]", " ",  text).split()
    return len(wordList)


def get_text_size(text):
    return len(text)

# Get blank text
def get_string_without_punc(text):
    return re.sub( '\s+', ' ', text.translate(str.maketrans('','',string.punctuation))).strip() 
	
	
# as percent in [0,1] relative to words
def get_number_of_capitalized_words(text, number_of_words):
    counter=0;
    words = (word.strip(string.punctuation) for word in text.split() if word.istitle())
    for word in words:
        counter=counter+1
    return percentage(counter, number_of_words);


# as percent in [0,1] relative to words
def get_number_of_upper_words(text, number_of_words):
    wordList = re.sub("[^\w]", " ",  text).split()
    counter=0
    test = [word for word in wordList if word.isupper()]
    for word in test:
        counter=counter+1
    return percentage(counter, number_of_words);


# position as percent relative to how many rectangles are above current rectangle eg.: 75% of rectangles are above current rectangle
def get_position(data, all_data):
    return 0.1


def percentage(part, whole):
    return 100 * float(part)/float(whole)


# number of characters not in ([a-z][A-Z][ ]) as percent relative to text size
def count_not_garbage(text):
    numberOfCorectChars = len(re.findall('[a-z-A-Z ]', text))
    numberOfChars = get_text_size(text)
    numberOfIncorect = numberOfChars - numberOfCorectChars #The chars that can't be azAZ are too many to create a re, is optimal this way.
    return percentage(numberOfIncorect, numberOfChars)


def ocr_file(borders, file_name):
    characteristics = borders
    invalid_idxs = []
    for border_page in borders:
        for idx, data in enumerate(borders[border_page]):
            chs = []
            if data[1] >= 0.7:  # text confidence at least 70%
                words = get_number_of_words(data[2])
				#remove garbage use (get_string_without_punc) not same funk for len
                text_size = get_text_size(data[2])  # remove garbage (multiple spaces, multiple punctuation marks) and compute text length
                capitals = get_number_of_capitalized_words(data[2], words)  # as percent in [0,1] relative to words
                complete_uppercase = get_number_of_upper_words(data[2], words) # as percent in [0,1] relative to words
                position = get_position(data, borders[border_page])  # position as percent relative to how many rectangles are above current rectangle eg.: 75% of rectangles are above current rectangle
                garbage = count_not_garbage(data[2])  # number of characters not in ([a-z][A-Z][ ]) as percent relative to text size

                val = list(data)
                val.append(tuple([words, text_size, capitals, complete_uppercase, position, garbage]))
                characteristics[border_page][idx] = tuple(val)
            else:
                invalid_idxs.append(idx)
        for i, iidx in enumerate(invalid_idxs):
            borders[border_page].pop(iidx - i)

    return characteristics