// $(document).ready(function(){
//     $('#inputName').keyup(function(){
//         $('#greet').text('Hello' + $('#inputName').val());
//     })
// });

window.onload = function() {
    document.getElementById("demo").onclick = function() {myFunction()};
}

function myFunction() {
    document.getElementById("demo").style.visibility = "hidden";
    document.getElementById("gif").style.visibility = "visible";
}