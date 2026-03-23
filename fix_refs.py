import os
import re
for lang in ["fr", "en"]:
    base_path = f"/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/content/{lang}"
    for subdir in ["pages", "posts"]:
        path = os.path.join(base_path, subdir)
        if not os.path.exists(path): continue
        for filename in os.listdir(path):
            file_path = os.path.join(path, filename)
            with open(file_path, 'r') as f:
                content = f.read()
            # On essaye de pointer vers l'URL finale plutôt que la ref si Hugo multilingue pose problème
            # Ou on force le chemin complet au sein du contentDir spécifique à la langue
            # Dans hugo.toml, contentDir = 'content/fr', donc pages/contact.md devrait être relatif à ça.
            new_content = re.sub(r'\{\{< ref "(\w+)\.md" >\}\}', r'{{< ref "pages/\1.md" >}}', content)
            if new_content != content:
                with open(file_path, 'w') as f:
                    f.write(new_content)
