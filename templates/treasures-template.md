---
layout: post
title: {{name}}
description: {{description}}
tags: {%for v in topics %} {{v}}{% endfor %}
url: /{{name}}
published: {{added | date: "%Y-%m-%d"}}
updated: {{updated_at}}

sharing:
    mastodon: "New Treasure found: {{name}}"
---

## Journey to {{name}}

### Problem

We want to... 

### Requirements

### Solution

### Result