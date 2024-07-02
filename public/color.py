from PIL import Image

def get_color_info(image_path):
    image = Image.open(image_path)
    
    image = image.convert("RGB")
    
    data = image.getdata()
    
    print("First 10 pixel values:")
    for i in range(10):
        print(data[i])
    
    x, y = 10, 10  
    pixel = image.getpixel((x, y))
    print(f"Pixel value at ({x}, {y}): {pixel}")

image_path = 'border.png'

get_color_info(image_path)