---
slug: "{{ .File.ContentBaseName }}"
layout: post
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: ""
date: "{{ .Date }}"
tags: ['release']
draft: true
---
