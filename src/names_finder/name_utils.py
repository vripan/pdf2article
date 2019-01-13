import re
import os

class NamesUtils(object):
    elems = set(line.strip() for line in open(os.path.abspath('./src/names_finder/finalDict.txt')))

    @staticmethod
    def isName(name): #Checks if a string is a name
        name=name.lower()
        if(name in NamesUtils.elems):
            return True;
        return False;
        
    @staticmethod
    def containsName(text): #Checks if a string contains a name.
        wordList = re.sub("[^\w]", " ",  text).split()
        for word in wordList:
            if(word in NamesUtils.elems):
                return True;
        return False;

    @staticmethod
    def getNames(text): #Gets a list of names in a string if no names returns empty list.
        names=[]
        wordList = re.sub("[^\w]", " ",  text).split()
        for word in wordList:
            if(word in NamesUtils.elems):
                names.append(word)
        return names