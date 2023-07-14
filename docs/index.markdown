---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: "basic"
title: The Pirate Forest
filter: true
type: pf-type-index
---

<header class="text-center">
    <div class="pf-ad">
        <div id="pf-night-sky" data-stars="{{stargazers_count}}" data-owner="b-lack" data-repo="ThePirateForest"></div>
        <h1 class="pf-title">The Pirate Forests</h1>
        <p class="pf-under-title">
            Discover Treasures of Forest-related<br/> Open Source Software.
        </p>
    </div>

    <div class="h4">Filter by Topic</div>
    <div id="pf-tag-men" class="pf-inline-men"></div>

    <div id="gf-sorting" class="pf-column">
        <div class="h4">
            Sort by
        </div>
        <div class="pf-grow pf-inline-men">
            <a class="m-2 pf-meta-timeglass" title="Filter By Time added" onclick="setSorting('time'); return false;" >Time Added</a>
            <a class="m-2 pf-meta-star" title="Filter By Stars" onclick="setSorting('stars'); return false;" >Stars</a>
        </div>
        
    </div>
</header>

{% include list.html %}
