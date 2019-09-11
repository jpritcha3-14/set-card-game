from PIL import Image

left = 3
top = 3
width = 97 - left * 2
height = 54 - top * 2

h_offset = 5.5 + (2 * left)
v_offset = 3.5 + (2 * top)

im = Image.open("./set_cards.png")
for c in range(81):
    row = c // 9
    col = c % 9
    cropped = im.crop(box=(left + (width + h_offset) * col,
                           top + (height + v_offset) * row,
                           (width * (col + 1) + (h_offset * col)),
                           (height * (row + 1) + (v_offset * row))))
    cropped.save(str(c) + ".png", "PNG")
