#!/bin/bash
# Script pour convertir les articles Markdown de Jekyll vers Hugo
# - Remplace les variables Liquid par des variables Hugo
# - Supprime la syntaxe Kramdown {: style="..."} non supportée par Hugo

CONTENT_DIR="/home/trasher/Workdir/php-eclipse_workspace/galette_hugo/content"

echo "🔄 Conversion des articles Markdown Jekyll → Hugo..."

# Fonction pour convertir un fichier
convert_file() {
    local file="$1"
    echo "  - Traitement de $file"

    # Backup
    cp "$file" "$file.bak"

    # Remplacements
    sed -i 's|{{ site\.galette\.doc_url }}|{{ .Site.Params.galette.doc_url }}|g' "$file"
    sed -i 's|{{ site\.galette\.tracker_url }}|{{ .Site.Params.galette.tracker_url }}|g' "$file"
    sed -i 's|{{ site\.galette\.stable_url }}|{{ .Site.Params.galette.stable_url }}|g' "$file"
    sed -i 's|{{ site\.galette\.nightly_url }}|{{ .Site.Params.galette.nightly_url }}|g' "$file"
    sed -i 's|{{ site\.lang }}|{{ .Page.Language.Lang }}|g' "$file"

    # Supprimer les lignes contenant uniquement {: style="..."}
    sed -i '/^{: style=.*}$/d' "$file"

    # Pour les badges centrés, on va ajouter un div HTML autour
    # Détecter les lignes de badges suivies de {: style="text-align: center;"}
    # et les entourer d'un div

    # On ne peut pas facilement le faire avec sed, on va juste supprimer les {: ... }
    # et documenter qu'il faut centrer manuellement si nécessaire
}

# Parcourir tous les fichiers .md dans content
find "$CONTENT_DIR" -name "*.md" -type f | while read -r file; do
    # Vérifier si le fichier contient des patterns Jekyll
    if grep -q "{{ site\." "$file" || grep -q "{: style=" "$file"; then
        convert_file "$file"
    fi
done

echo "✅ Conversion terminée !"
echo ""
echo "📝 Note : Les attributs Kramdown {: style=\"...\"} ont été supprimés."
echo "   Pour centrer du contenu, utilisez plutôt du HTML :"
echo "   <div style=\"text-align: center;\">contenu</div>"
echo ""
echo "💾 Les fichiers originaux sont sauvegardés avec l'extension .bak"

