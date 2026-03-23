#!/usr/bin/env python3
"""
Script pour :
1. Convertir les fichiers .html en .md (renommage simple, Hugo traite le HTML dans .md)
2. Remplacer les badges shields.io manuels par le shortcode {{< download >}}
"""

import os
import re
import glob

CONTENT_DIR = "/home/trasher/PhpstormProjects/galette_hugo/content"

# Pattern pour détecter les badges shields.io de téléchargement Galette
BADGE_MARKDOWN_PATTERN = re.compile(
    r'\[!\[.*?\]\(https://img\.shields\.io/badge/([0-9.]+)-.*?-([a-fA-F0-9]+)\.svg\?.*?\)\]\(https://galette\.eu/download/galette-[0-9.]+\.tar\.bz2\)',
    re.IGNORECASE
)

BADGE_MARKDOWN_PATTERN2 = re.compile(
    r'\[!\[.*?\]\(https://img\.shields\.io/badge/([0-9.]+)-.*?-([a-fA-F0-9]+)\.svg\?.*?\)\]\(.*?galette-[0-9.]+\.tar\.bz2\)',
    re.IGNORECASE
)

# Pattern HTML pour les badges
BADGE_HTML_PATTERN = re.compile(
    r'<a\s+href="https://galette\.eu/download/galette-([0-9.]+)\.tar\.bz2"[^>]*>\s*<img\s+src="https://img\.shields\.io/badge/[^"]+"\s*[^>]*>\s*</a>',
    re.IGNORECASE | re.DOTALL
)

def convert_html_to_md():
    """Renomme les fichiers .html en .md"""
    converted = []
    for lang_dir in glob.glob(os.path.join(CONTENT_DIR, "*")):
        posts_dir = os.path.join(lang_dir, "posts")
        if os.path.isdir(posts_dir):
            for html_file in glob.glob(os.path.join(posts_dir, "*.html")):
                md_file = html_file.replace(".html", ".md")
                if not os.path.exists(md_file):
                    os.rename(html_file, md_file)
                    converted.append(html_file)
                    print(f"Converti: {html_file} -> {md_file}")
    return converted

def replace_badges_in_file(filepath):
    """Remplace les badges shields.io par le shortcode download"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Remplacer les badges Markdown
    def replace_md_badge(match):
        version = match.group(1)
        changes.append(f"Badge Markdown: version {version}")
        return '{{< download version="' + version + '" >}}'

    content = BADGE_MARKDOWN_PATTERN.sub(replace_md_badge, content)
    content = BADGE_MARKDOWN_PATTERN2.sub(replace_md_badge, content)

    # Remplacer les badges HTML
    def replace_html_badge(match):
        version = match.group(1)
        changes.append(f"Badge HTML: version {version}")
        return '{{< download version="' + version + '" >}}'

    content = BADGE_HTML_PATTERN.sub(replace_html_badge, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Modifié: {filepath}")
        for change in changes:
            print(f"  - {change}")
        return True
    return False

def process_all_posts():
    """Traite tous les posts .md"""
    modified = []
    for lang_dir in glob.glob(os.path.join(CONTENT_DIR, "*")):
        posts_dir = os.path.join(lang_dir, "posts")
        if os.path.isdir(posts_dir):
            for md_file in glob.glob(os.path.join(posts_dir, "*.md")):
                if replace_badges_in_file(md_file):
                    modified.append(md_file)
    return modified

if __name__ == "__main__":
    print("=" * 60)
    print("Étape 1: Conversion des fichiers .html en .md")
    print("=" * 60)
    converted = convert_html_to_md()
    print(f"\n{len(converted)} fichiers convertis.\n")

    print("=" * 60)
    print("Étape 2: Remplacement des badges par le shortcode")
    print("=" * 60)
    modified = process_all_posts()
    print(f"\n{len(modified)} fichiers modifiés.\n")

    print("Terminé!")

