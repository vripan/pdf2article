setx FLASK_APP doc_annotator
setx FLASK_ENV development
pip install flask
pip install -e ./src
pip install flask_cors
cd frontend
npm install
pause
