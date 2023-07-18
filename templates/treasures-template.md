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

<div class="pf-ship-list">
    {% include list-entry repository=repository %}
</div>