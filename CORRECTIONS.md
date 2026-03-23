# Corrections apportées au site Galette Hugo

## Problèmes résolus ✅

### 1. Fichiers statiques en 404 - PROBLÈME DE CHEMINS
**Problème** : Les images (`bg.png`, `galette.png`) et polices (`.woff`, `.woff2`) retournaient des erreurs 404.

**Cause** : Les fichiers SCSS utilisaient des chemins relatifs comme `url(img/bg.png)` et `url(fonts/...)`. Le CSS étant généré dans `/site/sass/main.css`, ces chemins relatifs pointaient vers `/site/sass/img/bg.png` au lieu de `/site/assets/img/bg.png`.

**Solution** :
- Modifié `assets/sass/galette/_base.scss` : `url(img/bg.png)` → `url(/site/assets/img/bg.png)`
- Modifié `assets/sass/galette/_layout.scss` : `url(img/galette.png)` → `url(/site/assets/img/galette.png)`
- Modifié `assets/sass/galette.scss` : 
  - `url('fonts/ptsans-*.woff*')` → `url('/site/assets/fonts/ptsans-*.woff*')`
  - Corrigé pour les 4 variantes de polices (regular, bold, italic, bold-italic)

### 2. Images et logo manquants (fichiers absents)
**Problème** : Les fichiers `bg.png` et `galette.png` n'existaient pas dans le projet Hugo.

**Solution** :
- Copié `bg.png` et `galette.png` depuis Jekyll vers `static/assets/img/`
- Ces images sont référencées dans les fichiers SCSS :
  - `_base.scss` : background avec `bg.png`
  - `_layout.scss` : logo avec `galette.png`

### 3. Polices web manquantes (fichiers absents)
**Problème** : Les fichiers de polices PT Sans n'existaient pas dans le projet Hugo.

**Solution** :
- Copié tous les fichiers `.woff` et `.woff2` depuis Jekyll vers `static/assets/fonts/`
- Copié également `OFL.txt` (licence Open Font License)
- Fichiers copiés :
  - `ptsans-regular-webfont.woff` et `.woff2`
  - `ptsans-bold-webfont.woff` et `.woff2`
  - `ptsans-italic-webfont.woff` et `.woff2`
  - `ptsans-bolditalic-webfont.woff` et `.woff2`

### 4. Sélecteur de langues dupliqué
**Problème** : La liste des langues affichait 15 fois "English" à cause d'une double boucle incorrecte.

**Code problématique** (avant) :
```html
{{ range .Site.Languages }}
  {{ if eq $.Page.Language.Lang .Lang }}
    <span class="active">{{ .LanguageName }}</span>
  {{ else }}
    {{ range $.Page.Translations }}
      {{ if eq .Language.Lang .Lang }}
        <a href="{{ .RelPermalink }}">{{ .Language.LanguageName }}</a>
      {{ end }}
    {{ end }}
  {{ end }}
{{ end }}
```

**Solution** :
```html
{{/* Afficher la langue actuelle */}}
<span class="active">{{ .Page.Language.LanguageName }}</span>

{{/* Afficher toutes les traductions disponibles */}}
{{ range .Page.Translations }}
  <a href="{{ .RelPermalink }}">{{ .Language.LanguageName }}</a>
{{ end }}
```

**Explication** :
1. Affiche la langue actuelle en premier (avec class "active")
2. Parcourt uniquement les traductions disponibles de la page courante
3. Plus de double boucle = plus de doublons !

## Fichiers modifiés

- `layouts/partials/langselector.html` - Correction du sélecteur de langues
- `QUICKSTART.md` - Documentation des corrections
- `static/assets/img/` - Ajout de bg.png et galette.png
- `static/assets/fonts/` - Ajout des polices PT Sans

## Test

Pour vérifier les corrections, lancer :
```bash
hugo server -D --disableFastRender
```

Puis visiter http://localhost:1313/site/ et vérifier :
- ✅ Le logo Galette s'affiche en haut de page
- ✅ L'arrière-plan s'affiche correctement
- ✅ Les polices sont chargées sans erreur 404
- ✅ Le sélecteur de langues n'affiche chaque langue qu'une seule fois

### Tests de vérification (ligne de commande)

```bash
# Test du logo
curl -I http://localhost:1313/site/assets/img/galette.png
# Doit retourner: HTTP/1.1 200 OK

# Test du background
curl -I http://localhost:1313/site/assets/img/bg.png
# Doit retourner: HTTP/1.1 200 OK

# Test des polices
curl -I http://localhost:1313/site/assets/fonts/ptsans-regular-webfont.woff2
# Doit retourner: HTTP/1.1 200 OK
```

Tous les tests passent avec succès ✅

## Compilation

Le site compile maintenant sans erreur :
```bash
hugo --quiet
# Pas de sortie = succès !
```





