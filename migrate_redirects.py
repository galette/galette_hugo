import os
import re
import yaml

def migrate_redirects(content_dir):
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith(('.md', '.html')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # regex to find front matter
                match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
                if match:
                    front_matter_raw = match.group(1)
                    body = content[match.end():]

                    try:
                        # Use yaml.SafeLoader to parse front matter
                        # Note: Hugo Front matter doesn't always strictly follow YAML but usually it's close enough for these files
                        front_matter = yaml.load(front_matter_raw, Loader=yaml.SafeLoader)

                        if front_matter and 'redirect_from' in front_matter:
                            redirects = front_matter['redirect_from']
                            if isinstance(redirects, str):
                                redirects = [redirects]

                            # Add to aliases if it exists, otherwise create it
                            aliases = front_matter.get('aliases', [])
                            if not isinstance(aliases, list):
                                aliases = [aliases]

                            for r in redirects:
                                if r not in aliases:
                                    aliases.append(r)

                            front_matter['aliases'] = aliases
                            del front_matter['redirect_from']

                            # Dump back to YAML
                            new_front_matter = yaml.dump(front_matter, allow_unicode=True, default_flow_style=False).strip()
                            new_content = f"---\n{new_front_matter}\n---\n{body}"

                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            print(f"Updated aliases in: {file_path}")

                    except Exception as e:
                        print(f"Error parsing {file_path}: {e}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    content_path = os.path.join(base_dir, 'content')
    migrate_redirects(content_path)

