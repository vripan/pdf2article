import os
import sys
import requests
from bs4 import BeautifulSoup
from bs4 import NavigableString

def getText(parent):
    return ''.join(parent.find_all(text=True, recursive=False)).strip()

def procesatePage(page):
	soup = BeautifulSoup(page.content, 'html.parser')
	listOfElementNames = soup.select('.listname a[href]')
	return [getText(nameElement).lower() for nameElement in listOfElementNames]
	

def getNames(language):
	page = requests.get("https://www.behindthename.com/names/usage/"+language)
	fullListOfNames=[]
	if((BeautifulSoup(page.content, 'html.parser').find('div', id='div_pagination')) is None):
		fullListOfNames = procesatePage(page)
		print('Finished page')
	else:
		pgNumber = 1
		while((BeautifulSoup(page.content, 'html.parser').find('div', class_='pgblurb')).get_text().split('page ',1)[1].split(' ')[0] != (BeautifulSoup(page.content, 'html.parser').find('div', class_='pgblurb')).get_text().split('page ',1)[1].split(' ')[2] ):
			fullListOfNames = fullListOfNames + procesatePage(page)
			print('Finished page: '+ str(pgNumber) +'\n')
			pgNumber = pgNumber + 1;
			page = requests.get("https://www.behindthename.com/names/usage/"+language +"/"+str(pgNumber))
		fullListOfNames = fullListOfNames + procesatePage(page)
	return fullListOfNames

def printNames(filePath, listOfNames):
	f = open(filePath, 'w')
	print(*listOfNames, sep='\n', file=f)
	f.close()

if __name__ == '__main__':
	if(len(sys.argv) is not 2):
		print('Please input a language name \n')
		print('You can download any language from here: https://www.behindthename.com/names/usage/english \n')
	else: 
		printNames(sys.argv[1] +".txt", getNames(sys.argv[1]))