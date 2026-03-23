# Guide de mise en route rapide - Hugo pour Galette
Ce guide vous explique comment lancer et prévisualiser le site Galette avec Hugo sur votre poste.
## 1. Lancer le serveur de développement
Pour voir les modifications en temps réel, lancez la commande suivante dans le répertoire du projet :
```zsh
cd /home/trasher/Workdir/php-eclipse_workspace/galette_hugo
hugo server -D
```
- Le site sera accessible à l'adresse : `http://localhost:1313/site/`
- L'option `-D` permet d'inclure les contenus marqués comme "draft" (brouillon).
- Le serveur recharge automatiquement la page dès que vous modifiez un fichier.
## 2. Générer le site statique (Build)
Pour générer les fichiers finaux avant un déploiement manuel (si nécessaire), utilisez :
```zsh
hugo --minify
```
Les fichiers générés se trouveront dans le dossier `public/`.
## 3. Commandes utiles
- `hugo help` : Affiche l'aide de Hugo.
- `hugo list drafts` : Liste tous les brouillons.
- `hugo new posts/mon-article.md` : Crée un nouvel article avec le template par défaut.
- `hugo list all` : Liste toutes les pages du site.
## 4. Structure des dossiers Hugo
- `content/` : Vos articles et pages (organisés par langue).
- `layouts/` : Les modèles de structure (HTML).
- `assets/` : Vos ressources brutes (SASS, JS non compilé).
- `static/` : Vos fichiers statiques copiés tels quels (images, robots.txt).
- `i18n/` : Les fichiers de traduction pour l'interface.
- `hugo.toml` : Le fichier de configuration principal.
## 5. Pages statiques
Les pages statiques (about, contact, contribute) sont dans `content/{lang}/` :
- `content/fr/about.md`
- `content/fr/contact.md`
- `content/fr/contribute.md`
- `content/en/about.md`
- etc.
## 6. Articles de blog
Les articles sont dans `content/{lang}/posts/` :
- Format : `YYYY-MM-DD-titre.html` ou `.md`
- Front matter requis (title, date)

## 7. Migration terminée ✅

Toutes les fonctionnalités de Jekyll ont été migrées vers Hugo :

- ✅ Configuration multilingue (16 langues)
- ✅ Styles SASS compilés
- ✅ Pages statiques
- ✅ Articles de blog
- ✅ JavaScript (jQuery, Fancybox)
- ✅ Sélecteur de langue (corrigé pour éviter les doublons)
- ✅ Pagination
- ✅ Logo et images (bg.png, galette.png)
- ✅ Polices web (PT Sans - woff/woff2)

## 8. Corrections apportées

### Ressources statiques
- Copie des images manquantes : `bg.png`, `galette.png` dans `static/assets/img/`
- Copie des polices : fichiers `.woff` et `.woff2` dans `static/assets/fonts/`

### Sélecteur de langues
- Correction du code pour éviter l'affichage multiple des langues
- Le sélecteur affiche maintenant la langue actuelle + toutes les traductions disponibles
