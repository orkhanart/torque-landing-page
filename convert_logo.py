#!/usr/bin/env python3
from PIL import Image
import sys

def convert_to_bw(input_path, output_path):
    """Convert an image to black and white and save it"""
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to grayscale first
        grayscale = img.convert('L')
        
        # Convert to black and white (1-bit)
        # You can adjust the threshold (128) to make it more or less aggressive
        bw = grayscale.point(lambda x: 0 if x < 128 else 255, '1')
        
        # Convert back to RGBA to preserve transparency if needed
        if img.mode == 'RGBA':
            # Create a new RGBA image
            result = Image.new('RGBA', img.size, (255, 255, 255, 0))
            # Paste the BW image, using the original alpha channel
            alpha = img.split()[-1]  # Get alpha channel
            bw_rgba = Image.new('RGBA', img.size)
            bw_rgba.paste(bw, (0, 0))
            bw_rgba.putalpha(alpha)
            result = bw_rgba
        else:
            result = bw.convert('RGB')
        
        # Save the result
        result.save(output_path, 'PNG')
        print(f"Successfully converted {input_path} to black and white: {output_path}")
        return True
        
    except Exception as e:
        print(f"Error converting image: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_logo.py <input_path> <output_path>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    success = convert_to_bw(input_path, output_path)
    sys.exit(0 if success else 1)