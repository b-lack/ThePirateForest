---
layout: post
title: "{{name}} | The Pirate Forest"
description: {{description}}
tags: {%for v in topics %} {{v}}{% endfor %}
url: /{{name}}
published: {{added | date: "%Y-%m-%d"}}
updated: {{updated_at}}
ogimage: {{images[0].url}}

sharing:
    mastodon: "New Treasure discovered: {{name}}, {{description}}"
---

<div class="pf-night-sky-spacer">
    <div id="pf-night-sky" data-stars="{{stargazers_count}}" data-owner="{{owner_login}}" data-repo="{{name}}"></div>
    <div class="">
        <dialog>
            Inhalt des Dialogs
        </dialog>
    </div>
</div>

<div class="pf-ship-list">
    {% include list-entry repository=repository %}
</div>