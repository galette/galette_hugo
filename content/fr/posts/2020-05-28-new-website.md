---
layout: post
title: "Nouveau site web pour Galette !"
date: 2020-05-28 19:14:04 +0200
categories: fr post
---

Nous sommes fiers de vous annoncer le tout nouveau site web de Galette !

Cela faisait un certain temps que l'ancien site n'avait pas reçu de mise à jour, et il posait quelques problèmes sur la localisation (par exemple, le menu n'était plus traduit en anglais).

J'ai donc décidé de mettre à profit une semaine de congés pour travailler là-dessus. L'ancien site web utilisait [Dotclear](https://dotclear.org), nous avons changé pour [Jekyll](https://jekyllrb.com) désormais. Le code source est [disponible publiquement](https://github.com/galette/website). Les pages et publications sont publiées selon les termes de la [licence Creative Commons CC-BY-SA
4.0](https://creativecommons.org/licenses/by-sa/4.0) et le « code source » selon les termes de la [licence GPL version 3](https://www.gnu.org/licenses/quick-guide-gplv3.en.html).

Toutes les publications ont été migrées (avec quelques corrections), et les pages ont été entièrement réécrites. J'ai dû régler quelques soucis d’internationalisation, mais il semble que j'en sois venu à bout... Veuillez également noter que le nouveau site a été construit en ayant « mobile d'abord » en tête ; la navigation sur les appareils mobiles devrait être bien plus adaptée.

Au final, j'espère qu'il sera possible d'utiliser une plateforme de traduction pour que le site soit traduit dans d'autres langues ; il semble que Weblate ne supporte pas encore le markdown/html ; il faut que j'investigue.

Si vous trouvez des erreurs, [merci de bien vouloir ouvrir un ticket](https://bugs.galette.eu/projects/website). Bien entendu, vous pouvez aussi fournir un patch git ou ouvrir une pull request sur GitHub :)

Je tiens à remercier « GruiicK » sur [IRC]({{ "/pages/contact/" | relLangURL }}#irc)/[Matrix]({{ "/pages/contact/" | relLangURL }}#matrix) pour son aide précieuse (comme à l'accoutumée !) à la revue de ce site, et merci aussi à « Hiob » !

Bonne Galette !
