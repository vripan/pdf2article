from enum import Enum


class ParsePhase(Enum):
    Uploaded = 1
    Parsing = 2
    Done = 3
    Invalid = 4

    @staticmethod
    def to_string(phase):
        if phase == ParsePhase.Uploaded:
            return "Uploaded"
        if phase == ParsePhase.Parsing:
            return "Parsing"
        if phase == ParsePhase.Done:
            return "Done"
        if phase == ParsePhase.Invalid:
            return "Invalid"
