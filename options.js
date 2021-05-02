'use strict';

var items = [];

chrome.storage.local.get('blockedSites', function(sites) {
    if(sites.blockedSites) {
        items = sites.blockedSites;
    }
    if(items && items.length > 0) {
        document.getElementById('blockedSites').innerHTML = items;
    }
});

chrome.storage.local.get('TIME_INTERVAL', function(timeVal) {
    if(timeVal.TIME_INTERVAL) {
        document.getElementById("mySelect").value = timeVal.TIME_INTERVAL;
    }
});

document.getElementById("mySelect").onchange = function() {
    var newInterval = document.getElementById("mySelect").value;
    chrome.runtime.sendMessage({msg:'intervalChanged', value: newInterval})
}

document.getElementById("blockSitesForm").onsubmit = function(event) {
    event.preventDefault();
    let boxvalue = document.getElementById('box').value;
    items.push(boxvalue);
    document.getElementById('blockedSites').innerHTML = items;
    chrome.runtime.sendMessage({msg:'blockedSitesUpdated', value: boxvalue});
    document.getElementById('box').value = '';
}

document.getElementById("resetBlockedList").onclick = function() {
    items = [];
    document.getElementById('blockedSites').innerHTML = items;
    chrome.runtime.sendMessage({msg:'resetBlockedList'});
}