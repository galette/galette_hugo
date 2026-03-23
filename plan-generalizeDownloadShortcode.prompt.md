# Plan : Généraliser le shortcode download

**TL;DR** : Convertir les posts HTML en Markdown et remplacer les badges shields.io manuels par le shortcode `{{< download >}}` dans tous les posts.

## Context

- Les shortcodes Hugo fonctionnent uniquement dans les fichiers `.md`, pas dans les fichiers `.html`
- Actuellement ~20+ posts en `.md` et ~20+ posts en `.html` dans `content/*/posts/`
- Le shortcode `download.html` existe déjà dans `layouts/shortcodes/`
- Les badges actuels utilisent le format : `[![texte](https://img.shields.io/badge/VERSION-TEXT-COLOR.svg?...)](URL)`

## Steps

### Étape 0 : Modifier le shortcode pour l'internationalisation

Mettre à jour le shortcode `layouts/shortcodes/download.html` pour utiliser les chaînes i18n :

```html
{{- $version := .Get "version" | default (.Get 0) -}}
{{- $nightly := .Get "nightly" | default false -}}
{{- $color := .Get "color" | default "ffb619" -}}
{{- $logo := .Get "logo" | default "php" -}}
{{- $logoColor := .Get "logoColor" | default "white" -}}
{{- $style := .Get "style" | default "for-the-badge" -}}

{{- if $nightly -}}
  {{- $version = "dev" -}}
  {{- $url := .Site.Params.galette_nightly_url -}}
  {{- $text := i18n "download.nightly" | default "Download_Nightly" -}}
  {{- $alt := i18n "download.alt_nightly" | default "Download Galette nightly" -}}
<figure class="download-badge"><a href="{{ $url }}"><img src="https://img.shields.io/badge/{{ $version }}-{{ $text }}-{{ $color }}.svg?logo={{ $logo }}&logoColor={{ $logoColor }}&style={{ $style }}" alt="{{ $alt }}"></a></figure>
{{- else -}}
  {{- $url := .Get "url" | default (printf "https://galette.eu/download/galette-%s.tar.bz2" $version) -}}
  {{- $text := i18n "download.text" | default "Download_Galette" -}}
  {{- $alt := printf "%s %s" (i18n "download.alt" | default "Download Galette") $version -}}
<figure class="download-badge"><a href="{{ $url }}"><img src="https://img.shields.io/badge/{{ $version }}-{{ $text }}-{{ $color }}.svg?logo={{ $logo }}&logoColor={{ $logoColor }}&style={{ $style }}" alt="{{ $alt }}"></a></figure>
{{- end -}}
```

### Étape 0b : Ajouter les traductions i18n

**Dans `i18n/fr.yaml`** ajouter :
```yaml
download.text:
  other: "Télécharger_Galette"
download.nightly:
  other: "Galette_nightly"
download.alt:
  other: "Télécharger Galette"
download.alt_nightly:
  other: "Télécharger la version de développement de Galette (très récente, potentiellement instable)"
```

**Dans `i18n/en.yaml`** ajouter :
```yaml
download.text:
  other: "Download_Galette"
download.nightly:
  other: "Galette_nightly"
download.alt:
  other: "Download Galette"
download.alt_nightly:
  other: "Download Galette development version (very recent, potentially unstable)"
```

### 1. Créer le script `convert_posts.py`

Créer dans `/home/trasher/PhpstormProjects/galette_hugo/` un script Python avec :

```python
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
```

### 2. Exécuter le script

```bash
cd /home/trasher/PhpstormProjects/galette_hugo
python3 convert_posts.py
```

Résultats attendus :
- ~40 fichiers `.html` renommés en `.md` dans `content/*/posts/`
- ~20+ fichiers modifiés avec remplacement des badges

### 3. Vérifier la génération Hugo

```bash
hugo --gc --minify
```

S'assurer qu'il n'y a pas d'erreurs de build.

### 4. Tester manuellement

Vérifier quelques posts pour confirmer le rendu correct des badges :
- `content/fr/posts/2025-12-08-galette-1-2-1.md`
- `content/en/posts/` (équivalent anglais si existant)


## Further Considerations

### Posts sans badge de téléchargement

Certains posts historiques (annonces, traductions, poissons d'avril) n'ont pas de lien de téléchargement - ils seront ignorés automatiquement par le script.

### Version anglaise

Le script traitera aussi `content/en/posts/` si les fichiers existent.

### Syntaxe Kramdown Jekyll

Les posts Jekyll utilisent `{: style="text-align: center;"}` pour centrer le badge. Cette syntaxe Kramdown n'existe pas dans Hugo. Le shortcode utilise déjà une `<figure class="download-badge">` avec le CSS correspondant pour centrer le contenu.

### Nettoyage post-migration

Après validation, supprimer le script `convert_posts.py` ou le déplacer dans un dossier `scripts/` pour archivage.



