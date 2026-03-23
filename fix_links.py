import os
import re
# Dictionnaire des pages pour relLangURL
pages_map = {
    "contact": "pages/contact",
    "contribute": "pages/contribute",
    "about": "pages/about",
    "history": "pages/history"
}
def fix_links(content):
    # Remplacer {{< ref "pages/xxx.md" >}} par {{< ref "/pages/xxx.md" >}} ou relLangURL
    # Essayons de supprimer complètement les shortcodes ref qui posent problème et utiliser des liens simples ou relLangURL
    for key, target in pages_map.items():
        # On remplace les shortcodes par des liens Markdown utilisant relLangURL si possible, 
        # ou on tente une dernière fois le format ref absolu /pages/xxx.md
        content = re.sub(r'\{\{< ref "pages/'+key+r'\.md" >\}\}', r'{{ "/'+target+r'/" | relLangURL }}', content)
    return content
for lang in ["fr", "en"]:
    base_path = f"/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/content/{lang}"
    for subdir in ["pages", "posts"]:
        path = os.path.join(base_path, subdir)
        if not os.path.exists(path): continue
        for filename in os.listdir(path):
            file_path = os.path.join(path, filename)
            with open(file_path, 'r') as f:
                content = f.read()
            new_content = fix_links(content)
            if new_content != content:
                with open(file_path, 'w') as f:
                    f.write(new_content)
