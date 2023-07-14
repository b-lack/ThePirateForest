var pageType;
var data = [];
var treasureStr, treasure, treasureCounter;

function saveTreasure(){
    localStorage.setItem('treasure', JSON.stringify(treasure));
}
function collect(id){
    treasure[id] = {
        time: (new Date()).getTime(),
        flag: [],
        processId: 'toDo'
    };
    updateIsland();
    saveTreasure();
}
function throwAway(id){
    delete treasure[id];
    updateIsland();
    saveTreasure();
}

function updateIsland(){
    for (element of document.getElementsByClassName('pf-pirate')) {
        
        var pId = element.dataset.pirateId;
        
        if(treasure[pId]) element.classList.add('pf-treasure-selected')
        else element.classList.remove('pf-treasure-selected')
    }

    var stackElem = document.getElementById('pf-treasure-stack');
    if(!stackElem) return;

    stackElem.innerHTML = '';
    treasureCounter = 0;
    for(var i in treasure){
        var img = document.createElement('img')
        img.src = './assets/coin-stacked.svg';
        img.style.bottom = (treasureCounter*5) + 'px';
        img.style.left = (Math.random() * 8 - 4) + 'px';
        img.style.zIndex = treasureCounter;
        stackElem.appendChild(img);
        treasureCounter ++;
    }
    document.getElementById('pf-treasure-counter').innerText = treasureCounter
}
function getTreasure(){
    treasureStr = localStorage.getItem('treasure');
    treasure = treasureStr ? JSON.parse(treasureStr) : {};

    updateIsland();
}

getTreasure();

function getSeperator(){
    var seperator = document.createElement('hr');
    seperator.classList.add('gf-seperator');
    return seperator;
}

function buildPirate(dataset){
    var wrapper = document.createElement('div');
    wrapper.classList.add('pf-row','pf-pirate');
    if(treasure[dataset.pirate_id] && pageType == 'default') wrapper.classList.add('pf-treasure-selected');

    wrapper.setAttribute('data-pirate-id', dataset.pirate_id)

    wrapper.append(buildAvatar(dataset));

    wrapper.append(buildBody(dataset));


    return wrapper;
}
var tags = {
    'remote-sensing': ['remote-sensing', 'las', 'lidar', 'point-cloud', 'laz', 'laser', 'laser-scanning'],
    'forest-inventory': ['forest-inventory', 'trees', 'tree'],
    'climate-change': ['climate-change', 'biomass', 'carbon', 'emissions', 'climatechange', 'biodiversity'],
    'urban-forestry': ['urban-planning', 'urban-forestry', 'urban']
}
var blackList = ['forestry', 'forstwirtschaft', 'django-rest-framework', 'r-package', 'forest']
function filterTopics(dataset){
    var resultList = [];
    for(var i = 0; i < dataset.topics.length; i++){
        if(dataset.language && dataset.language.toLowerCase() == dataset.topics[i].toLowerCase()) continue;
        if(blackList.includes(dataset.topics[i]))  continue;
        resultList.push(dataset.topics[i]);
    }
    return resultList;
}

function buildBody(dataset){
    var wrapper = document.createElement('div');
    wrapper.classList.add('pf-ship');

    wrapper.appendChild(buildRepoLink(dataset))

    var desc = document.createElement('p');
    desc.innerText = dataset.description;
    wrapper.append(desc);

    var topics = document.createElement('ul');
    topics.classList.add('pf-topics');
    for(var topic of filterTopics(dataset)){
        var topicElem = document.createElement('li');
        topicElem.innerText = topic;
        topics.append(topicElem);
    }
    wrapper.append(topics);

    var metaWrapper = document.createElement('div');
    metaWrapper.classList.add('pf-row', 'pf-meta');
    wrapper.append(metaWrapper);

    var metaStarWrapper = document.createElement('div');
    metaStarWrapper.classList.add('pf-meta-star');
    metaStarWrapper.innerText = dataset.stargazers_count;
    metaWrapper.appendChild(metaStarWrapper);

    if(dataset.language){
        var metaLangWrapper = document.createElement('div');
        metaLangWrapper.classList.add('pf-meta-lang');
        metaLangWrapper.innerText = dataset.language;
        metaWrapper.appendChild(metaLangWrapper);
    }
    if(dataset.license_name){
        var metaLicenseWrapper = document.createElement('div');
        metaLicenseWrapper.classList.add('pf-meta-license');
        metaLicenseWrapper.innerText = dataset.license_name;
        metaWrapper.appendChild(metaLicenseWrapper);
    }

    return wrapper;
}

function buildRepoLink(dataset){
    var wrapper = document.createElement('p');

    var ownerSpan = document.createElement('span');
    ownerSpan.classList.add('pf-owner-name');
    ownerSpan.innerText = dataset.owner_login;
    wrapper.appendChild(ownerSpan);

    var ownerSpacerSpan = document.createElement('span');
    ownerSpacerSpan.classList.add('pf-owner-spacer');
    ownerSpacerSpan.innerText = '/';
    wrapper.appendChild(ownerSpacerSpan);

    var repoLink = document.createElement('a');
    repoLink.href = dataset.html_url;
    repoLink.target = 'blank';
    wrapper.appendChild(repoLink);

    var repoLinkSpan = document.createElement('span');
    repoLinkSpan.classList.add('h3', 'pf-openext');
    repoLinkSpan.innerText = dataset.name;
    repoLink.appendChild(repoLinkSpan);

    return wrapper;
}
var selections = [
    {
        id: 'toDo',
        title: 'ToDo',
        icon: 'pf-coin-bronze'
    },
    {
        id: 'inProcess',
        title: 'Checking out',
        icon: 'pf-coin-silver'
    },
    {
        id: 'done',
        title: 'Approved',
        icon: 'pf-coin-gold'
    }
]

function setCoin(data, dataset){
    var pirateId = dataset.pirate_id;

    treasure[pirateId].processId = data.id
    

    updateIsland();
    saveTreasure();
    createList('pf-ship-list')
}
var tagFilters = [];
function updateTagFilterMen(){

    var parent = document.getElementById('pf-tag-men');
    parent.innerHTML = ''

    for(var key in tags){
        var selectionLink = document.createElement('a');
        if(tagFilters.includes(key)) selectionLink.classList.add('pf-active');
        selectionLink.innerText = key;
        (function () {
            var id = key;
            selectionLink.addEventListener('click', function(){
                addTagFilter(id);
            })
        }());
            
        parent.appendChild(selectionLink);
    }
}
function addTagFilter(key){
    
    var pos = tagFilters.indexOf(key)
    if(pos === -1){
        tagFilters = [];
        tagFilters.push(key);
    }else tagFilters.splice(pos, 1)

    createList('pf-ship-list')
    updateTagFilterMen();
}
function filterByTags(data){
    var whiteList = [];
    for(var i of tagFilters){
        whiteList = whiteList.concat(tags[i])
    }
    
    var filtered = data.filter(function(elem){
        return elem.topics.some(r=> whiteList.includes(r))

    });
    return filtered;
}

var selectedProcess = null
function updateProcessMen(){
    var parent = document.getElementById('pf-process-men');
    parent.innerHTML = ''
    for(var select of selections){
        var selectionLink = document.createElement('a');
        selectionLink.classList.add(select.icon);
        if(select.id === selectedProcess) selectionLink.classList.add('pf-active');
        selectionLink.innerText = select.title;
        (function () {
            var id = select.id;
            selectionLink.addEventListener('click', function(){
                filterProcess(id);
            })
        }());
           
        parent.appendChild(selectionLink);
    }
}
function filterProcess(type){
    if(selectedProcess === type) selectedProcess = null;
    else selectedProcess = type;
    createList('pf-ship-list')
    updateProcessMen();
}
function filterByProcess(data){
    var filtered = data.filter(function(elem){
        return treasure[elem.pirate_id] && treasure[elem.pirate_id].processId === selectedProcess;
    });
    return filtered;
}
function getCoinClass(pirateId){
    if(!treasure[pirateId]) return null;

    if(treasure[pirateId].processId === 'done')
        return 'pf-flat-coin-gold';
    else if (treasure[pirateId].processId === 'inProcess')
        return 'pf-flat-coin-silver';
    else
        return 'pf-flat-coin-bronze';
}
function buildCoin(dataset){
    var coinWrapper = document.createElement('div');
    

    //var coinSelectWrapper = document.createElement('div');

    if(treasure[dataset.pirate_id] && pageType == 'myTreasure'){
        coinWrapper.classList.add('pf-process-coin', getCoinClass(dataset.pirate_id));
        var coinSelect = document.createElement('div');
        coinSelect.classList.add('pf-process-coin-select', );
        for(var i=0; i< selections.length; i++){
            if(treasure[dataset.pirate_id] && treasure[dataset.pirate_id].processId === selections[i].id) continue;

            var coinOption= document.createElement('a');
            (function () {
                var data = selections[i]
                var parentData = dataset;
                coinOption.addEventListener('click', function(){setCoin(data, parentData)}, false)
            }());
            coinOption.classList.add(selections[i].icon);
            coinOption.innerText = selections[i].title;
            coinSelect.appendChild(coinOption);
        }
        
        var coinOption= document.createElement('a');
        coinOption.classList.add('pf-remove-list');
            (function () {
                var data = selections[i]
                var parentData = dataset;
                coinOption.addEventListener('click', function(){
                    throwAway(parentData.pirate_id)
                    createList('pf-ship-list');
                }, false)
            }());
            coinOption.innerText = 'remove';
            coinSelect.appendChild(coinOption);

        coinWrapper.appendChild(coinSelect);
    }else if(treasure[dataset.pirate_id] && pageType == 'default'){
        coinWrapper.classList.add('pf-process-coin', getCoinClass(dataset.pirate_id));
        /*coinWrapper.addEventListener('click', function(){
            collect(dataset.pirate_id);
            createList('pf-ship-list');
        }, false)*/
    }else if(!treasure[dataset.pirate_id] && pageType == 'default'){
        coinWrapper.classList.add('pf-cross', 'pf-clickable');
        coinWrapper.addEventListener('click', function(){
            collect(dataset.pirate_id)
        }, false)
    }
    
    return coinWrapper;
}

function buildAvatar(dataset){
    var wrapper = document.createElement('div');
    
    /*var ownerLink = document.createElement('a');
    ownerLink.href = dataset.owner_html_url;
    ownerLink.target = 'blank';
    wrapper.appendChild(ownerLink);*/

    var ownerWrapper = document.createElement('div');
    ownerWrapper.classList.add('pf-pirate-avatar');

    ownerWrapper.appendChild(buildCoin(dataset));

    wrapper.appendChild(ownerWrapper);

    var ownerImg = document.createElement('img');
    ownerImg.src = dataset.owner_avatar_url;
    ownerImg.alt = dataset.owner_login;
    ownerImg.title = dataset.owner_login;
    ownerWrapper.appendChild(ownerImg);

    var actionsWrapper = document.createElement('div');
    actionsWrapper.classList.add('pf-pirate-actions')

    var removeLink = document.createElement('a');
    removeLink.classList.add('pf-treasure-remove');
    removeLink.innerText = 'remove';
    removeLink.addEventListener('click', function(){
        throwAway(dataset.pirate_id);
        createList('pf-ship-list');
    });
    
    
    /*var addLink = document.createElement('a');
    addLink.classList.add('pf-treasure-add');

    var coinImg = document.createElement('img');
    coinImg.src = './assets/coin.svg';
    coinImg.alt = 'Add';
    addLink.appendChild(coinImg);

    addLink.alt = dataset.owner_login;
    addLink.addEventListener('click', function(){
        collect(dataset.pirate_id);
        createList('pf-ship-list');
    });

    if(treasure[dataset.pirate_id]){
        console.log('remove');
        actionsWrapper.appendChild(removeLink);
    }else{
        actionsWrapper.appendChild(addLink);
    }*/

    wrapper.appendChild(actionsWrapper);

    return wrapper;
}

function createList(id, showSavedOnly){
    var saved;
    showSavedOnly = pageType == 'myTreasure' ? true : false;
    

    if(showSavedOnly){
        saved = data.filter(function (elem){
            return treasure[elem.pirate_id] 
        })
        saved = sortPirates(saved);
        if(selectedProcess) saved = filterByProcess(saved);        
    }else{
        saved = data;
        if(tagFilters.length) saved = filterByTags(saved);

        saved = sortPirates(saved);
    }

    var chest = document.getElementById(id);
    chest.innerHTML = '';

    var filter = document.getElementById('pf-filter')

    if(!saved.length){
        chest.parentNode.classList.add('pf-no-data')
        filter.classList.add('pf-no-data')
        return ;
    }else{
        chest.parentNode.classList.remove('pf-no-data')
        filter.classList.remove('pf-no-data')
    }

    for(var i=0; i<saved.length; i++){
        chest.append(buildPirate(saved[i]));
        if(i<saved.length-1)
        chest.append(getSeperator());
    }
}

var sorted = {
    type: 'time',
    dir: false
};
function setSorting(type){
    if(sorted.type === type) {
        sorted.dir = !sorted.dir;
    }else{
        sorted.type = type;
        sorted.dir = true;
    }
    createList('pf-ship-list');
}

function sortPirates(toSort){
    if(sorted.type === 'time'){
        return toSort.sort(function(prev, curr){
            return sorted.dir ? prev.added - curr.added : curr.added - prev.added;
        });
    }else if(sorted.type === 'stars'){
        return toSort.sort(function(prev, curr){
            return sorted.dir ? prev.stargazers_count - curr.stargazers_count : curr.stargazers_count - prev.stargazers_count;
        });
    }
    return toSort;
}


function createStars(sky, stars){
    //stars = sky.dataset.stars;
    for(var i = 0; i < stars.length; i++){
        var star = document.createElement('div');
        
        star.classList.add('pf-meta-star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.position = 'absolute';
        star.style.scale = Math.random() * 1+0.5;
        star.style.animationDuration = Math.random() * 10 + 's';
        star.style.animationDelay = Math.random() * 10 + 's';
        star.style.animationIterationCount = 'infinite';
        star.style.animationName = 'pf-star-flicker';

        var avatarDialog = document.createElement('div');

        //star.setAttribute('data-star-avatar', stars[i].avatar_url);
        avatarDialog.classList.add('pf-pirate-avatar');
        avatarDialog.classList.add('data-star-avatar');
        avatarDialog.style.backgroundImage = `url(${stars[i].avatar_url})`;
        star.appendChild(avatarDialog);

        sky.appendChild(star);
    }
}
function getStargazers(sky, owner, repo){
    fetch(`https://api.github.com/repos/${owner}/${repo}/stargazers`)
        .then(response => response.json())
        .then(extData => {
            createStars(sky, extData);
        });
    
}


function starsSky(){
    const sky = document.querySelector("#pf-night-sky");
    if(!sky) return;

    owner = sky.dataset.owner;
    repo = sky.dataset.repo;

    if(owner && repo)
        getStargazers(sky, owner, repo);

}

function setShareLink(){

    console.log(document.title, document.description, window.location.href);
    
    

    if (!navigator.canShare) {
        document.getElementById('pf-share').classList.add('pf-hidden');
        return;
    }

    const shareData = {
        title: document.title,
        text: "Just discovered a treasure of #OpenSource #Software on @ThePirateForest",
        url: window.location.href,
    };
    
    if (navigator.canShare(shareData)) {
        const btn = document.querySelector("#pf-share");
        
        // Share must be triggered by "user activation"
        btn.addEventListener("click", async () => {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log(err);
            }
        });
    }
}

function initData(){
    starsSky();
    setShareLink();

    fetch('/assets/repositories.json')
        .then(response => response.json())
        .then(extData => {
            data = extData;
            sortPirates(data);
            if(pageType == 'myTreasure') createList('pf-ship-list');
            else if(pageType == 'default') updateTagFilterMen();
        });
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    localStorage.setItem('last_visit', (new Date()).getTime()+ (60*60*1000));
    setTimeout(initData, 1);
} else {
    document.addEventListener("DOMContentLoaded", initData);
}