# TODO Galette Hugo
## Conversion de contenu
- [x] Convertir les fichiers `.html` restants dans `content/` vers le format Markdown (`.md`) pour une meilleure maintenance.
## Internationalisation
- [ ] Synchroniser les fichiers `i18n/*.yaml` avec Weblate.
- [/] Compléter les contenus pour les langues moins couvertes (périmètre réduit à FR et EN pour le moment).
## SEO
- [x] Vérifier et ajouter les alias (`aliases`) dans le front-matter pour toutes les pages ayant changé d'URL par rapport à Jekyll.
## Design
- [ ] Vérifier le rendu des images responsives sur différents appareils mobiles.

# TODO - Migration Jekyll vers Hugo pour Galette

- [x] Migration des contenus :
    - [x] Déplacer les pages et articles vers `content/{lang}/`.
    - [ ] **Conversion des fichiers HTML :** Transformer les anciens articles/pages au format HTML vers Markdown (`.md`) lorsque c'est possible pour une meilleure maintenance, ou s'assurer que Hugo les traite correctement comme du HTML brut. -> Contenus copiés, tags adaptés, conversion HTML reste à faire finement.
- [x] Gestion des redirections :
    - [x] Utiliser le paramètre `aliases` dans le front matter de Hugo pour remplacer les fonctionnalités du plugin `jekyll-redirect-from`.
- [ ] Refonte des templates (Layouts/Includes).
- [ ] Migration des assets et gestion des images (remplacement de `jekyll-responsive-image`).
