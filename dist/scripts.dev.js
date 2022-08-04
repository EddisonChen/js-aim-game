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
var startGame = document.querySelector('button');
var randomTargets = Math.floor(Math.random() * targetsArr.length); //game start

var assignHiddenClass = function assignHiddenClass() {
  targetsArr[randomTargets].classList.add("hidden");
};

startGame.addEventListener("click", function () {
  assignHiddenClass();
}); // target appear on click

var hiddenTargets = targetsArr.filter(function (hiddenTarget) {
  return hiddenTarget.classList.contains("hidden");
});
var randomHiddenTarget = Math.floor(Math.random() * hiddenTargets.length);

var targetAppear = function targetAppear() {
  hiddenTargets[randomHiddenTarget].classList.remove("hidden");
}; // target disappear on click


var targetVanish = function targetVanish(target) {
  console.log("".concat(target, " was clicked!!"));
  target.classList.add("hidden");
}; // get 3 spheres to show up at once
// get appear to apply only to hidden spheres


targetsArr.forEach(function (target) {
  target.addEventListener("click", function () {
    targetVanish(target);
    targetAppear();
  });
});