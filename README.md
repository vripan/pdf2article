# DocAnnotator
## Description
Input: a file in .pdf format. Output: the articles from the given pdf, with metadata (text metadata, title, authors)

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
