---
layout: post
type: pf-type-treasure
permalink: /treasure/{{name}}
title: "{{name}}"
description: "{{description}}"
tags: {%for v in topics %} {{v}}{% endfor %}
url: /{{name}}
published: {{added | date: "%Y-%m-%d"}}
updated: {{updated_at}}
ogimage: {{images[0].url}}
html_url: {{html_url}}

owner_avatar_url: {{owner_avatar_url}}
owner_login: {{owner_login}}
pirate_id: {{pirate_id}}

sharing:
    mastodon: "Treasure discovered: {{name}}, {{description}}"
---

<div class="text-center">
    {% if html_url %}
    <a class="pf-outline-btn" href="{{ html_url }}" target="_blank" rel="noopener noreferrer">
        source code
    </a>
    {% endif %}
    {% if homepage %}
    <a class="pf-outline-btn" href="{{ homepage }}" target="_blank" rel="noopener noreferrer">
        homepage
    </a>
    {% endif %}
</div>

{% if images %}
<div class="pf-pirate-ogimage">
    {% for image in images %}
    <img src="{{ image.url }}" alt="{{ image.alt }}" />
    {% endfor %}
</div>
{% endif %}



<div class="pf-night-sky-spacer">
    <div id="pf-night-sky" data-stars="{{stargazers_count}}" data-owner="{{owner_login}}" data-repo="{{name}}">
        <div id="pf-open-dialog" class="pf-meta-star pf-star-todo"></div>
        <dialog id="pf-star-dialog">
            Star this Repository to putt a smile on the Developers face.
            <div class="pf-row">
                <div class="pf-grow"></div>
                <div><a class="pf-unterlines" href="{{ repository.html_url }}" target="_blank">VISIT REPOSITORY</a></div>
            </div>
        </dialog>
    </div>
</div>

<hr class="gf-seperator">
