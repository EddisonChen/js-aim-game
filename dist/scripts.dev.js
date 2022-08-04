"use strict";

// main functions
// have 3 circles on screen at any given time
// on circle click, it disappears and a random one spawns
// record each click 
// accuracy = circle clicks/total clicks
// score = 100 points per accurate click, minus 20 points per miss
// time limit = 60secs
// high score list?
// mobile version?
// step one: make clickable circles!
var targets = document.querySelectorAll(".target");
var targetsArr = Array.from(targets);
var startButton = document.querySelector('button');
var playableArea = document.querySelector('.grid');
var accuracy = document.querySelector('.accuracy');
var score = document.querySelector('.score');
var resett = document.querySelector(".resett");
var highScore = document.querySelector('.high-score'); //game start

var hideAll = function hideAll() {
  targetsArr.forEach(function (target) {
    target.classList.add("hidden");
    target.classList.remove("visible");
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
}; // starts game, resets score, accuracy, hides all spheres, shows 3 random spheres


var startGame = function startGame() {
  startButton.addEventListener("click", function () {
    resetFunctions();
    hideAll();
    showRandomSpheres();
  });
};

startGame(); // random target appear on click

var targetAppear = function targetAppear() {
  var hiddenTargetsArr = targetsArr.filter(function (hiddenTarget) {
    return hiddenTarget.classList.contains("hidden");
  });
  var ranNum = Math.floor(Math.random() * 5);
  hiddenTargetsArr[ranNum].classList.add("visible");
  hiddenTargetsArr[ranNum].classList.remove("hidden");
}; // target disappear on click


var targetVanish = function targetVanish(target) {
  target.classList.add("hidden");
  target.classList.remove("visible");
};

var targetClickCounter = 0;
var clickCounter = 0; // updates score and accuracy, logs total clicks on playable area

var totalClicks = function totalClicks() {
  playableArea.addEventListener("click", function () {
    clickCounter++;
    accuracyUpdater();
    scoreUpdater();
  });
};

totalClicks(); // disappears the target clicked, appears another random target, +1 to targetclickCounter

var targetClick = function targetClick() {
  targetsArr.forEach(function (target) {
    target.addEventListener("click", function () {
      targetAppear();
      targetVanish(target);
      targetClickCounter++;
    });
  });
};

targetClick(); // updates accuracy with each click

var accuracyUpdater = function accuracyUpdater() {
  accuracy.innerHTML = "Accuracy: ".concat((targetClickCounter / clickCounter * 100).toFixed(2), "%");
}; // updates score with each click


var scoreUpdater = function scoreUpdater() {
  score.innerHTML = "Score: ".concat(targetClickCounter * 120 - clickCounter * 20);
}; // clears score, accuracy, clickCounter, and targetClickCounter


var resetFunctions = function resetFunctions() {
  clickCounter = 0;
  targetClickCounter = 0;
  accuracy.innerHTML = "Accuracy:";
  score.innerHTML = "Score:";
}; // button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres


var resetClick = function resetClick() {
  resett.addEventListener("click", function () {
    resetFunctions();
    hideAll();
  });
};

resetClick(); // put clicks in an array
// look up how to make js more efficient
// add click counter
// add sound effects or music?