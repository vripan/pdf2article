# la fel ca la parse_results
# la inchiderea serverlui datele din acest bd trebuie salvate pe disk, folosind orice metoda de serializare
# la pornirea serverlui dataele trebuie citiet de pe disc, deserializate si aduse in memorie


class TrainingMetadataRepo:
    def __init__(self):
        table = None
        serialize_location = None
        # aici se verifcia deserializarea si serializarea
        pass

    def get_metadata(self, hash):
        """
        Returns metadata for specified hash, or None if hash entry is invalid
        """
        pass

    def save_metadata(self, hash, metadata):
        """
        Saves metadata for specified hash.
        If there is already an entry with requested hash,
        old entry will be replaced by the new one
        """
        pass

    def __serialize__(self):
        pass

    def __deserialize__(self):
        pass
