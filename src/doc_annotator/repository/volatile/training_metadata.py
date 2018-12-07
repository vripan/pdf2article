# la fel ca la parse_results
# la inchiderea serverlui datele din acest bd trebuie salvate pe disk, folosind orice metoda de serializare
# la pornirea serverlui dataele trebuie citiet de pe disc, deserializate si aduse in memorie
# contine un dictionar de forma {file_name, metadata}

import json
import os
from doc_annotator import app

class TrainingMetadataRepo:

    def __init__(self):
        # aici se verifcia deserializarea si serializarea

        self.dictionary = dict()
        self.serialize_location = app.config['TRAINING_FOLDER']

        if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
            self.__deserialize__()

    def get_metadata(self, file_name):
        """
        Returns metadata for specified file name, or None if hash entry is invalid
        """
        
        if hash in self.dictionary:
            return self.dictionary[file_name]
        return None

    def save_metadata(self, file_name, metadata):
        """
        Saves metadata for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """

        self.dictionary.update({file_name : metadata})
        self.__serialize_one__(file_name)

    def __serialize_one__(self, file_name):
        """
        Creates a file in serialize_location with the name 'key', without an extension 
        and writes to it the metadata of the key from the dictionary.
        """

        metadata_file_name = file_name.replace(".pdf","")
        metadataFileObj = open(os.path.join(self.serialize_location, metadata_file_name), 'wb')
        metadataFileObj.write(json.dumps(self.dictionary[file_name]).encode())
        print ("Serialized " + file_name)

    def __serialize__(self):
        
        for key in self.dictionary:
            self.__serialize_one__(key)

    def __deserialize__(self):
        """
        Reads the files without an extension from serialize_location and loads them into the database
        For example for file 'fisier' it adds to the dictionary the entry 
        {'fisier.pdf', content_of_fisier}.
        """

        for metadata_file_name in os.listdir(os.path.abspath(self.serialize_location)):
            if len(os.path.splitext(metadata_file_name)[1]) == 0:
                full_file_name = os.path.join(self.serialize_location,metadata_file_name)
                file_name = metadata_file_name + ".pdf"

                metadataFileObj = open(full_file_name, 'rb')
                metadata = json.loads(metadataFileObj.read().decode())
                self.dictionary.update({file_name : metadata})
                print("Deserialized: " + metadata_file_name)
