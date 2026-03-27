---
title: "About"
---
{{< toc >}}

Galette is a web application to manage adherents for associations. Galette is written in PHP and relies on [MariaDB](https://mariadb.org) or [PostgreSQL](https://postgresql.org). This is **free software** (as in free speech), under the terms of the [GPL licence](https://www.gnu.org/licenses/quick-guide-gplv3.fr.html).

Since 2007 (see below [the history of Galette](#galettes-history)), Johan has been the developer, maintainer and handyman. External contributions have always been integrated regularly.

The name Galette is a French acronym for “Gestionnaire d’Adhérents en Ligne Extrêmement Tarabiscoté mais Tellement Efficace”, freely translated to “Extremely Sophisticated but so Efficient On-Line Membership Manager”. The French word “galette” also means (popular) “Money”. Unfortunately, the translation removes all the fun!

## The project

Since the beginning, it has been defined that the main project axis is to manage members and membership. The question of integrating as example accounting features has been asked, but declined, because too far in our minds from this axis (without taking into account the cost it can have on development and maintenance).

Apart from this kind of "limit", features that reach Galette core try to be as generic as possible to suit most of the needs. Some more specific features do not have place in core, but can be added from plugins: therefore, it is possible from Galette to {{< doclink path="plugins/auto.html" >}}manage an automobile club{{< /doclink >}} or use a {{< doclink path="plugins/objectslend.html" >}}loan objects system{{< /doclink >}}.

[Bug tracking system]({{% param "galette_tracker_url" %}}) as well as [voting system]({{% param "galette_vote_url" %}}) let you influence future features, but you can of course [add them yourself]({{< ref "contribute" >}}) :-)

Some of the requested features (link to third party services as example) would have their place into Galette, but are complex tasks for which it has not been yet possible to find time.

New features are still regularly added, reducing the todo list (which always gets bigger ;)).

The project does not have any release cycle: "It's released when it's cooked". Anyway, bugfixes releases are quite regular, when a major issue has been found, or when several ones has been addressed, or if we were asked for (it has never happen yet).

Finally, note that only one major release is supported. Then, since Galette 0.9 has been released, 0.8 is no longer supported. The only exception to this rule would be a fix for a security issue, if new major is quite recent. This happened only once for now.

## They use Galette

[Galette's users list](https://telemetry.galette.eu/reference) is available from our telemetry application :)
[Register yourself if you use Galette](https://telemetry.galette.eu/reference?showmodal)

Note that you can also {{< doclink path="usermanual/generalites.html#telemetry" >}}register from Galette{{< /doclink >}} (since 0.9); you will be able to edit your data using this.

## Galette's history

[ALDIL](https://www.aldil.org), LUG from Lyon (France), was looking for a membership management application (around 2000~2001). After tests of PhpLugMembers and some other tools, nothing was doing the trick.
ALDIL's former president (Loïs, aka GruiicK) decided to invite tenders on ALDIL lists.

The first project, whose name was GAELLE, dies quickly. Code was a bit complex, and developpers were not very involved/presents.

In 2003, Frédéric (aka Deelight) started from scratch a nice application, unpretentious, and, as he said himself: « do what it gotta do ».

The first "stable" version has probably been version 0.37b. Since, project continues quietly to change, by adding new functionalities and by receiving new developers / translators / reviewers / testers (many thanks to them).

In early 2007, Johan (aka trashy) joined the project. In April, Loïs gave him the "keys of the truck" and Johan took charge of the project Galette.

Project is hosted on `Gna!` since 2004. Early 2005, a project Galette is also opened at [TuxFamily](https://tuxfamily.org).
Gna is in charge of the hosting of SVN repository, mailing lists and trackers; while TuxFamily is in charge of website and downloads hosting.

In 2012, project source code is switched to Git; and repositories are moved to Tuxfamily. Gna! tracker is abandoned as well.

At the beginning of 2017, mailing lists are also switched to Tuxfamily, since Gna has announced the end of their services.

Since 2024, [Tuxfamily is slowly dying](https://forum.tuxfamily.org/post/3396/); therefore, Galette project has moved all services to other providers. Thank you TuxFamily for all these years of hosting!

### Original Email

This is the **original email** (in French) which announces Galette's creation. Since then, the Code mailing-list from [ALDIL](https://www.aldil.org) has disappeared, archives too.
Also, the first wiki website has disappeared too.

{{< include file="content/includes/foundation_mail.html" >}}

### From where Galette's name comes?

[ALDIL](https://www.aldil.org/) members have long sought a name for this software. Here's a quick summary (in frenglish):

You must know that finally, Deelight (Lead developer: One who's right) choose Galette, GruiicK (President: One who said banco) said banco.

{{< include file="content/includes/notthename.html" >}}

## Fortunes

(sorry, not translated, in French)

(fortunes from mail/irc/etc, anti-chronologeek order)

{{< include file="content/includes/fortunes.html" >}}

## Used tools

* [communication mediums]({{< ref "contact" >}})
* [source code](https://github.com/galette/galette/): [Git](https://git-scm.com/),
* [website](https://galette.eu): built by [Hugo](https://gohugo.io),
* [issues system]({{% param "galette_tracker_url" %}}): [Redmine](https://redmine.org),
* [demo](https://demo.galette.eu): [Galette](https://galette.eu),
* [discussion and broadcast lists]({{< ref "contact#mailing-lists" >}}): [Mailman](https://list.org/)
* [voting system]({{% param "galette_vote_url" %}}): [Fider](https://fider.io)
* {{< doclink >}}documentation{{< /doclink >}}: built by [Sphinx](https://www.sphinx-doc.org), hosted by [ReadTheDocs](https://rtfd.org),
* [translations]({{% param "galette_trad_url" %}}) and [documentation translation]({{% param "galette_trad_url" %}}): [Weblate](https://weblate.org).
* Johan, hosted by himself :p
