from PIL import Image

def remove_brown_background(image_path, output_path):
    image = Image.open(image_path)
    
    image = image.convert("RGBA")
    
    data = image.getdata()
    
    new_data = []
    
    brown_min = (0, 0, 0)
    brown_max = (150, 130, 150)
    
    for item in data:
        if brown_min[0] <= item[0] <= brown_max[0] and brown_min[1] <= item[1] <= brown_max[1] and brown_min[2] <= item[2] <= brown_max[2]:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    
    image.putdata(new_data)
    
    image.save(output_path, "PNG")

image_path = 'border.png' 
output_path = 'transparent_border.png'

remove_brown_background(image_path, output_path)

print(f"Processed image saved as {output_path}")



