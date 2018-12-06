# la fel ca la parse_results
# la inchiderea serverlui datele din acest bd trebuie salvate pe disk, folosind orice metoda de serializare
# la pornirea serverlui dataele trebuie citiet de pe disc, deserializate si aduse in memorie
import json
import os
from doc_annotator import app

class TrainingMetadataRepo:
    def __init__(self):
        # aici se verifcia deserializarea si serializarea

        self.table = dict()
        self.serialize_location = app.config['TRAINING_FOLDER']

        # impiedica deserializarea de mai multe ori
        if os.environ.get("WERKZEUG_RUN_MAIN") == None:
            self.__deserialize__()

    def get_metadata(self, hash):
        """
        Returns metadata for specified hash, or None if hash entry is invalid
        """
        
        if hash in self.table:
            return self.table[hash]
        return None

    def save_metadata(self, hash, metadata):
        """
        Saves metadata for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """

        self.table.update({hash : metadata})
        self.__serialize_one__(hash)

    def __serialize_one__(self, key):
        fileName = key.replace(".pdf","")
        metadataFileObj = open(os.path.join(self.serialize_location, fileName), 'wb')
        metadataFileObj.write(json.dumps(self.table[key]).encode())
        print ("Serialized " + key)

    def __serialize__(self):
        
        for key in self.table:
            self.__serialize_one__(key)

    def __deserialize__(self):

        for (root,directories,files) in os.walk(self.serialize_location):
            for fileName in files:
                if not ".pdf" in fileName:
                    full_fileName = os.path.join(root,fileName)
                    key = fileName + ".pdf"

                    metadataFileObj = open(full_fileName, 'rb')
                    metadata = json.loads(metadataFileObj.read().decode())
                    self.table.update({key : metadata})
                    print("Deserialized: " + fileName)
