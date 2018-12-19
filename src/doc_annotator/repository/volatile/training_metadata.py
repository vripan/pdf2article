import json
import threading
import os
from doc_annotator import app
from doc_annotator.utils.training_previewer import preview
from doc_annotator.utils.debug import printd


class TrainingMetadataRepo:
    def __init__(self):
        self.lock = threading.Lock()
        self.dictionary = dict()
        self.serialize_location = app.config['TRAINING_FOLDER']

        self.__deserialize__()

    def get_metadata(self, file_name):
        """
        Returns metadata for specified file name, or None if hash entry is invalid
        """
        self.lock.acquire()
        try:
            if file_name in self.dictionary:
                return self.dictionary[file_name].copy()
            return None
        except Exception as exception:
            raise exception
        finally:
            self.lock.release()

    def save_metadata(self, file_name, metadata):
        """
        Saves metadata for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """
        self.lock.acquire()
        try:
            self.__check_filename__(file_name)
            self.dictionary.update({file_name: metadata})
            self.__serialize_one__(file_name)
            preview(file_name, metadata)
        except Exception as exception:
            raise exception
        finally:
            self.lock.release()

    def __check_filename__(self, file_name):
        if not os.path.exists(os.path.join(app.config['TRAINING_FOLDER'], file_name)):
            raise Exception("Invalid metadata filename")

    def __serialize_one__(self, file_name):
        """
        Creates a file in serialize_location with the name 'key', without an extension 
        and writes to it the metadata of the key from the dictionary.
        """
        metadata_file_name = file_name.replace(".pdf", "")
        metadataFileObj = open(os.path.join(self.serialize_location, metadata_file_name), 'wb')
        metadataFileObj.write(json.dumps(self.dictionary[file_name]).encode())
        printd("Serialized " + file_name)

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
                full_file_name = os.path.join(self.serialize_location, metadata_file_name)
                file_name = metadata_file_name + ".pdf"
                metadataFileObj = open(full_file_name, 'rb')
                metadata = json.loads(metadataFileObj.read().decode())
                self.dictionary.update({file_name: metadata})
                printd("Deserialized: " + metadata_file_name)
