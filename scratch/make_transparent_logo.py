import os
from PIL import Image

input_path = r"C:\Users\danie\.gemini\antigravity-ide\brain\4af6fca2-41b6-4bff-89bf-9e8904ba3e0c\ceneval_app_logo_1790024169324.jpg"
output_path = r"c:\Users\danie\OneDrive\Documents\Ceneval\assets\logo.png"

img = Image.open(input_path).convert("RGBA")
width, height = img.size

datas = img.getdata()
new_data = []

# Process pixels to make dark background transparent
for item in datas:
  r, g, b, a = item
  brightness = (r + g + b) / 3.0
  
  # Dark background pixels
  if brightness < 40 and abs(r - g) < 15 and abs(g - b) < 15:
    new_data.append((0, 0, 0, 0))
  else:
    # Scale alpha slightly for soft outer glow
    alpha = int(min(255, (brightness / 255.0) * 1.5 * 255))
    if brightness > 30:
      new_data.append((r, g, b, 255))
    else:
      new_data.append((0, 0, 0, 0))

img.putdata(new_data)

# Bounding box crop around non-transparent pixels
bbox = img.getbbox()
if bbox:
  img = img.crop(bbox)

# Create square canvas with padding
w, h = img.size
max_dim = max(w, h) + 40
square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
offset_x = (max_dim - w) // 2
offset_y = (max_dim - h) // 2
square_img.paste(img, (offset_x, offset_y))

# Save square transparent PNG
square_img.save(output_path, "PNG")
print("Transparent logo saved successfully to:", output_path)
