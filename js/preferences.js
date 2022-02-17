
var rainbow = document.getElementById("rainbow");
let flower = document.getElementsByClassName("flower");

//code for chrome, safari and opera
rainbow.addEventListener('webkitAnimationEnd', playEndSound);

//standard syntax
rainbow.addEventListener('animationend', playEndSound);

//transitioned -end of an element transition
rainbow.addEventListener('transitionend', playEndSound);


function playEndSound() {
    var sound = new Audio('audio/gong.mp3');
    sound.play();
}

function start() {
    rainbow.style.animationPlayState = "running";
    for (let index = 0; index < flower.length; index++) {
        flower[index].style.animationPlayState= "running";
    }
}

function stop() {
    rainbow.style.animationPlayState = "paused";
    for (let index = 0; index < flower.length; index++) {
        flower[index].style.animationPlayState= "paused";
    }
}

function setAnimationSpeed(){
    var speed = document.getElementById("animation-speed").value;
    rainbow.style.webkitAnimationDuration = speed + 's';
    for (let index = 0; index < flower.length; index++) {
        flower[index].style.webkitAnimationDuration= speed + 's';
    }
}