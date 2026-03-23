import os
import re
def migrate_files(src_dir, dest_dir, type='post'):
    if not os.path.exists(src_dir):
        return
    for filename in os.listdir(src_dir):
        if filename.endswith('.md') or filename.endswith('.html'):
            with open(os.path.join(src_dir, filename), 'r') as f:
                content = f.read()
            # Hugo utilise le nom de fichier pour la date si format YYYY-MM-DD-title.md
            # Jekyll aussi, donc on garde la structure.
            # Conversion sommaire des tags Jekyll vers Hugo
            # {% tl contact %} -> {{< ref "pages/contact" >}} (à affiner)
            # {% t global.About %} -> {{ i18n "global.About" }}
            content = re.sub(r'{%\s+tl\s+(\w+)\s+%}', r'{{< ref "pages/\1" >}}', content)
            content = re.sub(r'{%\s+t\s+([\w\.]+)\s+%}', r'{{ i18n "\1" }}', content)
            # Gestion des images responsivesjekyll -> standard markdown ou shortcode hugo
            # {% responsive_image path: assets/images/screenshots/edit_member.png ... %}
            content = re.sub(r'{%\s+responsive_image\s+path:\s+([\w/\.-]+).*?%}', r'![](/site/\1)', content)
            new_filename = filename
            if filename.endswith('.html'):
                # On pourrait tenter une conversion pandoc ici si disponible
                pass
            with open(os.path.join(dest_dir, new_filename), 'w') as f:
                f.write(content)
langs = ["fr", "en"]
for lang in langs:
    migrate_files(f"/home/trasher/PhpstormProjects/galette_jekyll/_i18n/{lang}/_posts", f"/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/content/{lang}/posts")
    migrate_files(f"/home/trasher/PhpstormProjects/galette_jekyll/_i18n/{lang}/pages", f"/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/content/{lang}/pages")
