'use strict';

window.onload = function() {
    document.getElementById("later").onclick = function() {closeWindow()};
    document.getElementById("imgClickAndChange").onclick = function() {changeImage()};
}

function changeImage() {
    document.getElementById("character").src = "img/exercise_a.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("later").style.visibility = "hidden";
    document.getElementById("later2").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Lets do a <br> Sideways Stretch";
    sendActivityCompMsg();
}

function closeWindow() {
    window.close();
}

function sendActivityCompMsg() {
    chrome.runtime.sendMessage({msg : "activityCompleted"});
}