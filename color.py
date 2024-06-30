from PIL import Image

def get_color_info(image_path):
    # Load the image
    image = Image.open(image_path)
    
    # Convert the image to RGB
    image = image.convert("RGB")
    
    # Get the data of the image
    data = image.getdata()
    
    # Print out the first few pixel values
    print("First 10 pixel values:")
    for i in range(10):
        print(data[i])
    
    # Print out a specific pixel value (adjust x, y for your specific point)
    x, y = 10, 10  # Example coordinates
    pixel = image.getpixel((x, y))
    print(f"Pixel value at ({x}, {y}): {pixel}")

# Specify the path
image_path = 'border.png'

# Get color information
get_color_info(image_path)