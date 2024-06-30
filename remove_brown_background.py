from PIL import Image

def remove_brown_background(image_path, output_path):
    # Load the image
    image = Image.open(image_path)
    
    # Convert the image to RGBA (if it's not already in that mode)
    image = image.convert("RGBA")
    
    # Get the data of the image
    data = image.getdata()
    
    # Create a new list to store the processed image data
    new_data = []
    
    # Define the RGB value for the brown area we want to remove
    brown_min = (0, 0, 0)
    brown_max = (150, 130, 150)
    
    # Process each pixel
    for item in data:
        # Change all brown (also shades of brown) to transparent
        # Compare the RGB values (ignoring alpha channel)
        if brown_min[0] <= item[0] <= brown_max[0] and brown_min[1] <= item[1] <= brown_max[1] and brown_min[2] <= item[2] <= brown_max[2]:
            # Change the pixel to be transparent
            new_data.append((255, 255, 255, 0))
        else:
            # Keep the pixel as is
            new_data.append(item)
    
    # Update image data
    image.putdata(new_data)
    
    # Save the processed image
    image.save(output_path, "PNG")

# Specify the paths
image_path = 'border.png'  # Update this with the path to your image
output_path = 'transparent_border.png'

# Remove the brown background
remove_brown_background(image_path, output_path)

print(f"Processed image saved as {output_path}")



