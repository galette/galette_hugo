---
slug: "0-7-2-8-boosted-galette"
aliases:
- /post/2012/12/19/Galette-0%2E7%2E2%2E8-%3A-coup-de-boost
- /post/2012/12/19/galette-0-7-2-8-coup-de-boost
date: 2012-12-19 19:41:50 +0100
layout: post
title: 'Galette 0.7.2.8 : coup de boost'
tags: ['release']
---
<p>Le développement de Galette n'a pas vraiment stagné depuis la sortie de la version 0.7.2 gracieusement sponsorisée par l'AFUL&nbsp;; puisque 7 versions correctives ont vu le jour depuis.</p>


<p>Et voici donc la huitième mouture, qui corrige cette fois un problème de performances sur les listes d'adhérents. Voici pour illustration un comparatif des relevés établis par <a href="http://pecl.php.net/package/xhprof" hreflang="en">XHProf</a> (un outil de profilage hiérarchique) sur une liste de 500 adhérents&nbsp;; puisque paraît-il un petit schéma vaut mieux qu'un long discours :p</p>

{{< img_link path="/site/assets/images/galette_perfs.png" alt="Comparaison des performances" >}}

<p>Ces soucis de performances impactaient&nbsp;:</p>
<ul>
<li>la page de gestion des adhérents,</li>
<li>la page publique des adhérents,</li>
<li>l'ajout de contributions,</li>
<li>l'ajout de transactions,</li>
<li>la gestion des groupes.</li>
</ul>

<p>Merci à Anatole du <a href="http://leclub404.com/" hreflang="fr">club 404</a> d'avoir soulevé le problème, et de m'avoir fourni tous les éléments nécessaires à sa résolution :-)</p>
