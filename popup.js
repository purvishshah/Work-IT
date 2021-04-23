'use strict';

window.onload = function() {
    document.getElementById("imgClickAndChange").onclick = function() {execute()};
}

var funcs = [
    exercise1,
    exercise2,
    exercise3,
    exercise4,
    exercise5,
    exercise6
];

function execute() {
    var i = Math.floor(Math.random() * funcs.length)
    funcs.splice(i-1, 1)[0]()
}

function exercise1() {
    document.getElementById("character").src = "img/exercise_a.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Neck Rotations";
    document.getElementById("timer").innerHTML = countdown(1)
    sendActivityCompMsg();
}

function exercise2() {
    document.getElementById("character").src = "img/exercise_b.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Sideways Stretch";
    document.getElementById("timer").innerHTML = countdown(1)
    sendActivityCompMsg();
}

function exercise3() {
    document.getElementById("character").src = "img/exercise_c.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Hand Raises";
    document.getElementById("timer").innerHTML = countdown(1)
    sendActivityCompMsg();
}
function exercise4() {
    document.getElementById("character").src = "img/exercise_d.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Leg Raises";
    document.getElementById("timer").innerHTML = countdown(1)
    sendActivityCompMsg();
}
function exercise5() {
    document.getElementById("character").src = "img/exercise_e.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Body Bends";
    document.getElementById("timer").innerHTML = countdown(1)
    sendActivityCompMsg();
}
function exercise6() {
    document.getElementById("character").src = "img/exercise_f.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    document.getElementById("imgClickAndChange").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "Let's do <br> Sideway Bends";
    document.getElementById("timer").innerHTML = countdown(1) + "seconds";
    sendActivityCompMsg();
}



function sendActivityCompMsg() {
    chrome.runtime.sendMessage({msg : "activityCompleted"})
    document.getElementById("character").src = "img/complete.gif";
    document.getElementById("character").style.width = "250px";
    document.getElementById("character").style.float = "none";
    timer.remove();
    document.getElementById("header").innerHTML = "Great job! You're active again";
    document.getElementById("imgClickAndChange").style.visibility = "visible";
    document.getElementById("imgClickAndChange").innerHTML = "Resume work";
    imgClickAndChange.onclick = function() {window.close(), resetTimer()};
    

}

function countdown(minutes) {
    var seconds = 20;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if(seconds == 0) { sendActivityCompMsg();}
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {

            if(mins > 1){
            setTimeout(function () { countdown(mins - 1); }, 1000);
            }
        }
    }
    tick();
}