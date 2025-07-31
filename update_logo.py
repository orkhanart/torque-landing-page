#!/usr/bin/env python3
from PIL import Image, ImageOps
import os

def create_bw_solana_logo():
    """Create a black and white version of the Solana Ventures logo"""
    
    # For now, let's convert the existing logo to demonstrate the process
    current_logo_path = '/Users/sheldon/Developer/onnyx/active/torque-landing-page/public/logos/sv.png'
    new_logo_path = '/Users/sheldon/Developer/onnyx/active/torque-landing-page/public/logos/sv_new.png'
    
    try:
        # Load the current logo
        img = Image.open(current_logo_path)
        print(f"Loaded image: {img.size}, mode: {img.mode}")
        
        # Convert to grayscale while preserving transparency
        if img.mode == 'RGBA':
            # Separate RGB and alpha channels
            rgb = Image.new('RGB', img.size, (255, 255, 255))
            rgb.paste(img, mask=img.split()[-1])  # Use alpha as mask
            
            # Convert RGB to grayscale
            gray = ImageOps.grayscale(rgb)
            
            # Create black and white version
            # Adjust threshold as needed (127 is middle point)
            bw = gray.point(lambda x: 0 if x < 100 else 255, mode='1')
            
            # Convert back to RGBA with original alpha
            result = Image.new('RGBA', img.size)
            result.paste(bw.convert('RGB'))
            result.putalpha(img.split()[-1])  # Restore original alpha
            
        else:
            # Simple case for RGB images
            gray = ImageOps.grayscale(img)
            result = gray.point(lambda x: 0 if x < 100 else 255, mode='1')
            result = result.convert('RGB')
        
        # Save the result
        result.save(new_logo_path, 'PNG')
        print(f"Created black and white logo: {new_logo_path}")
        
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    create_bw_solana_logo()