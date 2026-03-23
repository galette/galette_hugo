import yaml
import sys
import os
def convert(lang):
    jekyll_i18n_path = f"/home/trasher/PhpstormProjects/galette_jekyll/_i18n/{lang}.yml"
    if not os.path.exists(jekyll_i18n_path):
        return
    with open(jekyll_i18n_path, 'r') as f:
        data = yaml.safe_load(f)
    hugo_i18n = {}
    def flatten(d, parent_key=''):
        items = []
        for k, v in d.items():
            new_key = f"{parent_key}.{k}" if parent_key else k
            if isinstance(v, dict):
                items.extend(flatten(v, new_key).items())
            else:
                items.append((new_key, v))
        return dict(items)
    flat_data = flatten(data)
    with open(f"/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/i18n/{lang}.yaml", 'w') as f:
        output = []
        for k, v in flat_data.items():
            output.append(f'{k}:\n  other: "{v}"')
        f.write('\n'.join(output))
langs = ["fr", "en", "ar", "br", "ca", "de", "es", "it", "nb_NO", "oc", "ota", "pt", "ru", "si", "tr", "uk"]
for l in langs:
    convert(l)
