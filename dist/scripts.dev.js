"use strict";

// main functions
// have 3 circles on screen at any given time
// on circle click, it disappears and a random one spawns
// record each click 
//accuracy = circle clicks/total clicks
// score = 100 points per accurate click, minus 20 points per miss
// time limit = 60secs
// high score list?
// mobile version?
// step one: make clickable circles!
var targets = document.querySelectorAll(".target");
var targetsArr = Array.from(targets);
var startGame = document.querySelector('button'); //game start

var hideAll = function hideAll() {
  targetsArr.forEach(function (target) {
    target.classList.add("hidden");
  });
};

hideAll(); // selects 3 random spheres to be visible on start click

var showRandomSpheres = function showRandomSpheres() {
  var ranNumArr = [];

  while (ranNumArr.length < 3) {
    var ranNum = Math.floor(Math.random() * 8);

    if (ranNumArr.indexOf(ranNum) === -1) {
      ranNumArr.push(ranNum);
    }
  }

  targetsArr[ranNumArr[0]].classList.add("visible"), targetsArr[ranNumArr[0]].classList.remove("hidden");
  targetsArr[ranNumArr[1]].classList.add("visible"), targetsArr[ranNumArr[1]].classList.remove("hidden");
  targetsArr[ranNumArr[2]].classList.add("visible"), targetsArr[ranNumArr[2]].classList.remove("hidden");
};

startGame.addEventListener("click", function () {
  hideAll();
  showRandomSpheres();
}); // target appear on click
// const targetAppear = () => {
//     const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
//         return hiddenTarget.classList.contains("hidden");
//     })
//     let ranNumArr = [];
//     while (ranNumArr.length < 1) {
//         let ranNum = Math.floor(Math.random()*5);
//         if(ranNumArr.indexOf(ranNum) === -1) {
//             ranNumArr.push(ranNum);
//         }
//     }
//     hiddenTargetsArr[ranNumArr[0]].classList.add("visible");
//     hiddenTargetsArr[ranNumArr[0]].classList.remove("hidden");
// }

var targetAppear = function targetAppear() {
  var hiddenTargetsArr = targetsArr.filter(function (hiddenTarget) {
    return hiddenTarget.classList.contains("hidden");
  }); // let ranNum = Math.floor(Math.random()*5);

  hiddenTargetsArr[Math.floor(Math.random() * 5)].classList.add("visible");
  hiddenTargetsArr[Math.floor(Math.random() * 5)].classList.remove("hidden");
}; // target disappear on click


var targetVanish = function targetVanish(target) {
  console.log("".concat(target, " was clicked!!"));
  target.classList.add("hidden");
  target.classList.remove("visible");
}; // get 3 spheres to show up at once
// get appear to apply only to hidden spheres


targetsArr.forEach(function (target) {
  target.addEventListener("click", function () {
    targetVanish(target);
    targetAppear();
  });
}); // get assignVisibleClass to run 3 times upon clicking game start