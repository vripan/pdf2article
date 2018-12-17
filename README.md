# DocAnnotator

## Description

Input: a file in .pdf format. Output: the articles from the given pdf, with metadata (text metadata, title, authors).

## Training data

Because the size of the training data is over 2 GB, it will not be uploaded to repo, so you have to manually copy the training data to *training_data* folder. In order to avoid uploading by mistake the training data, the folder *training_data* is present in *.gitignore* file.

## Prepare environment

### Windows

1. Download and install python `3.x` from [here](https://www.python.org/downloads/). Tested verision `3.6.4`
2.1. Install flask
```
pip install flask
```
2.2. Install PyPDF2
```
pip install PyPDF2
```
2.3. Install pdf2image [here](https://github.com/Belval/pdf2image). Read section `How to install`
3. Add the following environment variables

| Name | Value |
| ------ | ------ |
| FLASK_APP | doc_annotator |
| FLASK_ENV | development |

4. Execute the following command in *src* folder as administrator
```
pip install -e .
```
5. Go to *src* folder and run the command
```
flask run
```
6. You should get an output similiar to this
```
FLASK_APP = doc_annotator
FLASK_ENV = development
FLASK_DEBUG = 0
In folder D:/UAIC/3.1/IA/pdf2article
C:\Users\username\AppData\Local\Programs\Python\Python36\python.exe -m flask run
 * Serving Flask app "doc_annotator"
 * Environment: development
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

7. Using Tesseract OCR with Python
  1. if you don't have tesseract already installed please follow this link to get the executable file
  ```
https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v4.0.0.20181030.exe
```
  2. edit the PATH(System variables) adding this new path for tesseract
   ```
C:\Program Files (x86)\Tesseract-OCR
```
to test that you actually installed tesseract, open a command prompt and type ``` "tesseract <path_to_image_with_text>" stdout ```
  3. Install pillow (administrator)
```
pip install pillow
```
  4. Install pytesseract (administrator)
  ```
pip install pytesseract
```
  5. See the 'tesseract-python' directory from repository
to test that you can use tesseract with python open a command prompt inside 'tesseract-python' directory and type:

```
python ocr.py --image images/example_02.png --preprocess blur
```
see that ocr.py is a python script that allows you to extract text from an image using tesseract
