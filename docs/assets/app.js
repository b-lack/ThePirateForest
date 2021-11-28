var treasureStr, treasure, treasureCounter;

function saveTreasure(){
    localStorage.setItem('treasure', JSON.stringify(treasure));
}
function collect(id){
    treasure[id] = {
        time: (new Date()).getTime(),
        flag: ['saved']
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
        img.src = '/assets/coin-stacked.svg';
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
    wrapper.setAttribute('data-pirate.id', dataset.pirate_id)

    wrapper.append(buildAvatar(dataset));

    wrapper.append(buildBody(dataset));


    return wrapper;
}
var blackList = ['forestry', 'forstwirtschaft']
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

    var metaLicenseWrapper = document.createElement('div');
    metaLicenseWrapper.classList.add('pf-meta-license');
    metaLicenseWrapper.innerText = dataset.license_name;
    metaWrapper.appendChild(metaLicenseWrapper);

    return wrapper;
}

function buildRepoLink(dataset){
    var wrapper = document.createElement('p');

    var ownerSpan = document.createElement('span');
    ownerSpan.classList.add('pf-owner-name');
    ownerSpan.innerText = dataset.owner_login;
    wrapper.appendChild(ownerSpan);

    var ownerSpacerSpan = document.createElement('span');
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

function buildAvatar(dataset){
    var wrapper = document.createElement('div');
    
    var ownerLink = document.createElement('a');
    ownerLink.href = dataset.owner_html_url;
    ownerLink.target = 'blank';
    wrapper.appendChild(ownerLink);

    var ownerWrapper = document.createElement('div');
    ownerWrapper.classList.add('pf-pirate-avatar');
    ownerLink.appendChild(ownerWrapper);

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
        createList();
    });
    actionsWrapper.appendChild(removeLink);

    wrapper.appendChild(actionsWrapper);

    return wrapper;
}

