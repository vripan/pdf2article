from PIL import Image
import pytesseract

image = r'C:\Users\vripan\Desktop\453028a_Page_3.jpg'

data = pytesseract.image_to_data(Image.open(image), output_type=pytesseract.Output.DICT)

rectsLen = len(data['left'])

borders = []

for i in range(rectsLen):
    x = data['left'][i]
    y = data['right'][i]
    xE = x + data['width'][i]
    yE = y + data['height'][i]
    borders.append((x, y, xE, yE))


