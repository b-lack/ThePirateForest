---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: "basic"
title: The Pirate Forest
filter: true
type: pf-type-index
---
<div class="pf-">
    <div class="pf-row pf-feed-line">
        <div><img style="max-width:50px;" src="/assets/birdy.svg" alt="Birdy"></div>
        <div class="pf-row-bottom"><a rel="me" href="https://mastodon.social/@ThePirateForest" target="_blank"><small>more</small></a></div>
        <div class="pf-grow"></div>
    </div>
    {% include mastodon-feed.html %}
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

{% include list.html %}
