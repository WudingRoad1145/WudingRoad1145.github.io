"""Extract original embedded artwork from Yan's portfolio, without PDF page layouts
Run with pypdf and Pillow available, from my-app
"""
import json
from pathlib import Path
from PIL import ImageOps
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
reader = PdfReader(root / 'public/Feng_Yan_Portfolio.pdf')
output = root / 'public/art'
output.mkdir(exist_ok=True)
# Match the orientation of the photographs as displayed in the source PDF
rotate = {(3, 1), (3, 2), (4, 1), (6, 2)}
metadata = {}
for page_number, page in enumerate(reader.pages, start=1):
    for image_number, embedded in enumerate(page.images, start=1):
        image = ImageOps.exif_transpose(embedded.image)
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        if (page_number, image_number) in rotate:
            image = image.rotate(90, expand=True)
        image.thumbnail((1600, 1600))
        name = f'p{page_number:02d}-{image_number:02d}.webp'
        image.save(output / name, 'WEBP', quality=88, method=6)
        metadata[name] = {'width': image.width, 'height': image.height}
(root / 'src/data/art-images.json').write_text(json.dumps(metadata, indent=2) + '\n')
