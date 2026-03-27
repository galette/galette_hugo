---
title: "À propos"
slug: "a-propos"
---
{{< toc >}}

Galette est une application web de gestion d'adhérents pour les associations. Galette est écrit en PHP et utilise une base de données [MariaDB](https://mariadb.org) ou [PostgreSQL](https://postgresql.org). C'est un **logiciel libre**, sous [licence GPL](https://www.gnu.org/licenses/quick-guide-gplv3.fr.html).

Depuis 2007 (voir ci-dessous [l'histoire de Galette](#histoire-de-galette)), Johan est le développeur, mainteneur et homme à tout faire. Des contributions externes ont toujours été régulièrement intégrées.

Le nom Galette est un acronyme pour « Gestionnaire d’Adhérents en Ligne Extrêmement Tarabiscoté mais Tellement Efficace ». Le mot « galette » peut également vouloir dire (populaire) « argent ».

## Le projet

Depuis le début, il a été défini que l'axe principal du projet serait la gestion des adhérents et adhésions. La question par exemple d'inclure des notions de comptabilité a été évoquée, mais refusée, car trop éloignée à notre sens de cet axe (sans compter la charge supplémentaire que ça impliquerait en termes de développements et de maintenance).

Outre ce type de « limites », les fonctionnalités intégrées au cœur du logiciel se veulent le plus générique possible, ce afin de convenir au plus grand nombre. Certaines fonctionnalités plus spécifiques n'y ont pas leur place, mais peuvent en revanche être ajoutées par le biais du système des plugins : l'on peut ainsi depuis Galette {{< doclink path="plugins/auto.html" >}}gérer un club automobile{{< /doclink >}} ou  utiliser un {{< doclink path="plugins/objectslend.html" >}}système de prêts d'objets{{< /doclink >}}.

Le système de [gestion des tickets]({{ .Site.Params.galette.tracker_url }}) ainsi que le [système de vote]({{ site.galette.vote_url }}) vous permettent d'influencer les futures fonctionnalités, mais vous pouvez bien entendu les [ajouter vous-mêmes]({{ "/pages/contribute/" | relLangURL }}) :-)

Un certain nombre de fonctionnalités demandées (lien avec des services tiers par exemple) auraient tout à fait leur place dans Galette, mais ce sont des tâches complexes pour lesquelles il n'a pour le moment pas été possible de dégager du temps.

De nouvelles fonctionnalités sont tout de même ajoutées régulièrement, faisant diminuer un peu la liste des choses à faire (qui ne cesse de grandir par ailleurs ;)).

Le projet n'a pas de cycle de sortie défini : « ça sort quand c'est prêt ». Toutefois, la sortie de versions correctives est faite assez régulièrement, soit lorsqu'un problème important est détecté, soit lorsque plusieurs problèmes ont déjà été réglés, ou encore si c'était demandé (ça n'est encore jamais arrivé).

Enfin, notez qu'une seule version majeure n'est supportée à la fois. Ainsi, depuis la sorte de Galette 0.9 ; la version 0.8 n'est plus supportée. La seule exception à cette règle, ce serait pour corriger une faille de sécurité, si toutefois la nouvelle majeure est assez récente. La question ne s'est posée qu'une seule foir pour le moment.

## Ils utilisent Galette

La <a href="https://telemetry.galette.eu/reference" hreflang="en">liste des utilisateurs de Galette</a> peut être consultée sur notre application de télémétrie :)
<a href="http://telemetry.galette.eu/reference?showmodal" hreflang="en">Enregistrez-vous si vous utilisez Galette</a> !

Notez que vous pouvez également {{< doclink path="usermanual/generalites.html#telemetry" >}}vous enregistrer depuis Galette{{< /doclink >}} (à partir de la version 0.9) ; ce qui vous permettra par la suite de modifier vos données.

## Histoire de Galette

L'[ALDIL](https://www.aldil.org/), GULL de Lyon, se cherchait un système de gestion des adhérents (vers 2000 ~ 2001). Après avoir testé PhpLugMembers et quelques autres outils, rien ne convenait.
Le président de l'ALDIL de l'époque (Loïs, aka GruiicK) a alors décidé de lancer un appel d'offre sur les listes de l'ALDIL.

Le premier projet, nommé GAELLE, est rapidement mort. Code un peu compliqué et developpeurs pas trés motivés/présents.

En 2003, Frédéric (aka Deelight) repart de zéro et commence à coder une appli jolie, sans prétention, et, comme il le disait lui-même à l'époque : « fait ce qu'on lui demande ».

La première version "stable" a du être la version 0.37b. Jusqu'en 2005, le projet évolue tranquillement, par l'ajout de nouvelles fonctionnalités, et par l'arrivé de nouveaux développeurs / traducteurs / relecteurs / béta-testeurs (merci à eux).

Début 2007, Johan (aka trashy) rejoint le projet. En mai, Loïs lui cède les "clefs du camion" et Johan prend la responsabilité du projet Galette.

Le projet est hébergé sur `Gna!` depuis 2004. Début 2005, un projet Galette a également été créé chez [TuxFamily](https://tuxfamily.org).
Gna est en charge de l'hébergement du dépôt SVN, des listes de diffusion et des tracker ; tandis que TuxFamily se charge de l'hébergement du site web et des téléchargements.

Courant 2012, le code source du projet passe à Git ; l'hébergement des dépôts de fait chez Tuxfamily également. Le tracker Gna! est également abandonné.

Début 2017, les listes de diffusion passent également chez Tuxfamily, Gna ayant annoncé la fin de leurs bons et loyaux services.

Depuis 2024, [Tuxfamily s'éteint doucement](https://forum.tuxfamily.org/post/3396/) le projet Galette a donc déplacé tous les services vers d'autres fournisseurs. Merci TuxFamily pour toutes ces années d'hébergement !

### Mail Originel

Ceci est le **mail originel** annonçant la création de Galette. Depuis, la liste Code de l'[ALDIL](https://www.aldil.org) a disparu, ses archives aussi.
De même, le premier site wiki du projet a disparu aussi...

{% include contents/foundation_mail.html %}

### D'où vient le nom Galette

Les membres de l'[ALDIL](https://www.aldil.org/) ont longuement cherché un nom pour ce logiciel. Voici un rapide résumé.

Sachez qu'au final, Deelight (Développeur : Celui qui a raison) a choisi Galette, GruiicK (Président : Celui qui dit banco) a dit banco.

{% include contents/notthename.html %}

## Fortunes

(section des fortunes mail/irc/etc, par ordre anti-chronologeek)

{% include contents/fortunes.html %}

## Outils utilisés

* [moyens de communication]({{ "/pages/contact/" | relLangURL }}),
* [code source](https://github.com/galette/galette/) : [Git](https://git-scm.com/),
* site web : généré par [Jekyll](https://jekyllrb.com)[^1],
* [gestionnaire de tickets]({{ .Site.Params.galette.tracker_url }}) : [Redmine](https://redmine.org),
* [démo](https://demo.galette.eu) : [Galette](https://galette.eu),
* [listes de diffusion]({{ "/pages/contact/" | relLangURL }}#listes-de-discussion) : [Mailman](https://list.org),
* [système de vote]({{ site.galette.vote_url }}) : [Fider](https://fider.io),
* {{< doclink >}}documentation{{< /doclink >}} : générée par [Sphinx](https://www.sphinx-doc.org), hébergée chez [ReadTheDocs](https://rtfd.org),
* [traductions]({{ site.galette.trad_url }}) et [traduction documentation]({{ site.galette.trad_url }}) : [Weblate](https://weblate.org).
* Johan, hébergé chez lui :p
