---
layout: basic
title: The Pirate Forest
type: pf-type-treasure
filter: false
---

<header class="text-center">
    <h1 class="pf-title">Treasure Chest</h1>
    <p class="pf-under-title">
        Collected Treasures.
    </p>
    <div id="pf-process-men" class="pf-inline-men">
        <a class="pf-coin-bronze" href="#" onclick="filterProcess('toDo'); return false;">ToDo</a>
        <a class="pf-coin-silver" href="#" onclick="filterProcess('inProcess'); return false;">Checking out</a>
        <a class="pf-coin-gold" href="#" onclick="filterProcess('done'); return false;">Approved</a>
    </div>
</header>

{% include my-list.html %}
