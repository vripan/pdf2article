from enum import Enum


class Categories(Enum):
    Title = 0
    Content = 1
    Author = 2

    @staticmethod
    def to_string(self, category):
        if category == Categories.Title:
            return 'Title'
        elif category == Categories.Content:
            return 'Content'
        elif category == Categories.Author:
            return 'Author'
