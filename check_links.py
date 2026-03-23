import os
import re
public_dir = 'public'
base_url = 'https://galette.eu/site/'
for root, dirs, files in os.walk(public_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Chercher des liens absolus vers le site de production ou jekyll etc
                # (à adapter selon les besoins)
                if 'localhost' in content or '127.0.0.1' in content:
                    print(f"Warning: Local URL found in {path}")
