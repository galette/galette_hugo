---
slug: "0-7-2-8-boosted-galette"
aliases:
- /post/2012/12/19/Galette-0%2E7%2E2%2E8-%3A-coup-de-boost
categories: en post
date: 2012-12-19 19:41:50 +0100
layout: post
tags: release
title: '0.7.2.8 : boosted Galette'
---
<p>Galette's development has not been frozen after 0.7.2 AFUL sponsored version; 7 corrective releases has been released since.</p>


<p>And here is the eighth one, that fixes a performance issue on members lists. As an illustration, below a <a href="http://pecl.php.net/package/xhprof" hreflang="en">XHProf</a> (a hierarchical profiler tool) resume comparison; so it seems figures say more than words :p</p>

{{< img_link path="/site/assets/images/galette_perfs.png" alt="Performance comparison" >}}

<p>Those performances issues were impacting:</p>
<ul>
<li>members management page,</li>
<li>public members list,</li>
<li>contributions creation and edition,</li>
<li>transactions creation and edition,</li>
<li>groups management.</li>
</ul>

<p>Thanks to Anatole from <a href="http://leclub404.com/" hreflang="fr">club 404</a> to report the issue, and to provide me all needed elements to have it fixed :-)</p>
