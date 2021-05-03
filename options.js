document.getElementById("mySelect").onchange = function() 
    {
        var newInterval = document.getElementById("mySelect").value;
        alert(newInterval);
        chrome.runtime.sendMessage({msg:'intervalChanged', value: newInterval})
    }

var items = [];
var button;

function blockSites() 
    {
        //Create an array of blocked sites
        boxvalue = document.getElementById('box').value;
        items.push(boxvalue);  
        // document.getElementById('blockedSites').innerHTML = items;
        console.log(items);

        // Create a button of blocked sites for UI
        button = document.createElement("button");
        button.innerHTML =  document.getElementById('box').value;
        

        //Append to button group
        var body = document.getElementsByClassName("blockedSites")[0];
        body.appendChild(button);

        // Reset input
        document.getElementById('box').value = '';

        return false;
    }
