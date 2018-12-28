# DocAnnotator

## Description

Input: a file in .pdf format. Output: the articles from the given pdf, with metadata (text metadata, title, authors).

## Training data

Because the size of the training data is over 2 GB, it will not be uploaded to repository, so you have to manually download and copy the training data to *training_data* folder. In order to avoid uploading by mistake the training data, the folder *training_data* is present in *.gitignore* file.
You can download all the training data from [here](https://goo.gl/hjN6kt).

## Prepare environment

### Windows

1. Download and install Node.js from [here](https://nodejs.org/en/download/).

2. Download and install python `3.x` from [here](https://www.python.org/downloads/). Tested version `3.6.4` (please use the same python version).

3. Download and install Tesseract OCR from [here](https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v4.0.0.20181030.exe).

4. To install all dependencies for both client and server you can use: `npm run install-all` or `npm run install-all-force` (**WARNING**: The `npm run install-all-force` command will also edit the PATH System variables). We recommend the first option which means you'll need to edit the Environment variables by yourself adding a path for Tesseract-OCR to System variables -> Path:

```cmd
C:\Program Files (x86)\Tesseract-OCR
```

## Run app

Go to root directory and use one of the following commands to run the app:
Command | Effect
--- | ---
`npm run start` | Will start both client and server
`npm run start-newt` | Will start both client and server in new terminals
`npm run client` | Will start only the client
`npm run client-newt` | Will start only the client in a new terminal
`npm run server` | Will start only the server
`npm run server-newt` | Will start only the server in a new terminal

You should get an output similar to this:

```bash
 * Serving Flask app "doc_annotator"
 * Environment: development
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
