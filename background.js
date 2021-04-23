(function(){

var DEFAULT_UPDATE_INTERVAL = 1000;

var TIME_LIMIT_IN_SEC_YELLOW = 1800;
var TIME_LIMIT_IN_SEC_RED = 2700;
var CODE = "GREEN";
var RESET_TIME = 0;
var NOTIFICATION_CLEAR_TIME_IN_MS = 10000;

onInit();

function onInit() {
    setInterval(updateTimer, DEFAULT_UPDATE_INTERVAL);
}

// function runBG() {

//     chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
//         if(currentWindow.focused) {
//             let activeTab = currentWindow.tabs.find(t => t.active === true);
//             chrome.storage.local.set({'activeTab' : activeTab.url});
//             if(activeTab !== undefined && isValidUrl(activeTab)) {
//                 console.log("active tab is : " + activeTab.url );

//                 chrome.idle.queryState(parseInt('120'), function(state) {
//                     if(state === 'idle' || state === 'locked') {
//                         resetTimer();
//                     } else {
//                         updateTimer();
//                     }
//                 })
//             }
//         }

//     });
// }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.msg == "activityCompleted") {
        resetTimer();
    }
})

function resetTimer() {
    console.log(" timer is reset");
    chrome.browserAction.setIcon({path: "img/Active.png"});
    changeBadgeColor("green");
    CODE = "GREEN";
    chrome.storage.local.set({'timer' : parseInt(RESET_TIME)});
    chrome.browserAction.setBadgeText({text : ''});
}

function updateTimer() {
    console.log('timer is updated');
    chrome.storage.local.get('timer', function(timerVal) {
        if(isLimitExceeded(timerVal.timer)) {
            if(timerVal.timer < TIME_LIMIT_IN_SEC_YELLOW && CODE !== "GREEN") {
                chrome.browserAction.setIcon({path: "img/Active.png"});
                changeBadgeColor("green");
                CODE = "GREEN";
            } else if(timerVal.timer >= TIME_LIMIT_IN_SEC_YELLOW && timerVal.timer < TIME_LIMIT_IN_SEC_RED && CODE !== "YELLOW") {
                chrome.browserAction.setIcon({path: "img/Inactive_1.png"});
                changeBadgeColor("yellow");
                CODE = "YELLOW";
            } else if(timerVal.timer >= TIME_LIMIT_IN_SEC_RED && CODE !== "RED") {
                chrome.browserAction.setIcon({path: "img/Inactive_2.png"});
                changeBadgeColor("red");
                CODE = "RED";
                notifyMe();
            } 
            // window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
            // chrome.tabs.create({url: "popup.html"});
        }
        var newtime = 1;
        if(timerVal.timer) {
            newtime += parseInt(timerVal.timer);
        }
        chrome.storage.local.set({'timer' : newtime});
        chrome.browserAction.setBadgeText({text : changeTimeFormat(newtime)});
    })
}

// function isValidUrl(tab) {
//     if(!tab 
//         || !tab.url 
//         || (tab.url.indexOf('http:') == -1 && tab.url.indexOf('https:') == -1) 
//         || tab.url.indexOf('chrome://') !== -1
//         || tab.url.indexOf('chrome://extensions') !== -1) 
//         return false;
//     return true;
// }

function isLimitExceeded(timeVal) {
    if(timeVal !== undefined && timeVal >= parseInt(TIME_LIMIT_IN_SEC_YELLOW)) return true;
    return false;
}

function changeTimeFormat(time) {
    var hr = parseInt(time/3600);
    var min = parseInt((time - hr*3600)/60);
    var sec = parseInt(time - hr*3600 - min*60); 

    var display_time = '';
    if(hr !== 0){
        display_time = hr.toString() + 'h';
    } else if(min !== 0){
        display_time =  min.toString() + 'm';
    } else{
        display_time = sec.toString() + 's';
    }
    return display_time;
}

function changeBadgeColor(colorName) {
    chrome.browserAction.setBadgeBackgroundColor({color : colorName});
}

function notifyMe() {
    chrome.notifications.create("", {
        title : "Testing...",
        message : " How about taking a break from work for a nice stretch?",
        iconUrl : 'img/Active.png',
        type : 'basic',
        requireInteraction : true
    }, function(notificationId) {
        setTimeout(function() {
            chrome.notifications.clear(notificationId, function(){});
        }, NOTIFICATION_CLEAR_TIME_IN_MS);
    });
}

chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
    window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=yes");
    chrome.notifications.clear(notificationId, function(){});
});

})();

