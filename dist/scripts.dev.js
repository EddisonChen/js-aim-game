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
var timer = document.querySelector('.timer');
var mobileTargets = document.querySelectorAll(".mobile");
var mobileTargetsArr = Array.from(mobileTargets);
var desktopTargets = document.querySelectorAll(".desktop");
var desktopTargetsArr = Array.from(desktopTargets); // media query for js, senses if screen is wider than 1080px or taller than 550 px

var screenWidth = window.matchMedia('(orientation: landscape) and (min-width: 1080px)');
var screenHeight = window.matchMedia('(orientation: landscape) and (min-height: 550px)');
var portraitScreenWidth = window.matchMedia('(orientation: portrait) and (min-width: 540px)');

var screenHeightChange = function screenHeightChange() {
  screenHeight.addEventListener("change", function () {});
};

var screenWidthChange = function screenWidthChange() {
  screenWidth.addEventListener("change", function () {});
};

var portraitScreenWidthChange = function portraitScreenWidthChange() {
  portraitScreenWidth.addEventListener("change", function () {});
}; // timer starts at 30


var time = 30; //hides all spheres

var hideAll = function hideAll() {
  screenWidthChange();
  screenHeightChange();
  portraitScreenWidthChange(); // if screen is 1080px wide, adds hidden to and removes visible class from all targets

  if (screenWidth.matches || screenHeight.matches || portraitScreenWidth.matches) {
    targetsArr.forEach(function (target) {
      target.classList.add("hidden");
      target.classList.remove("visible");
    });
  } else {
    // adds hidden to and removes visible class from only mobile targets
    mobileTargetsArr.forEach(function (mobileTarget) {
      mobileTarget.classList.add("hidden");
      mobileTarget.classList.remove("visible");
    }); // might be unnecessary

    desktopTargetsArr.forEach(function (desktopTarget) {
      desktopTarget.classList.remove("hidden");
    });
  }
};

hideAll(); // selects 3 random spheres to be visible on start click

var showRandomSpheres = function showRandomSpheres() {
  var hiddenTargetsArr = targetsArr.filter(function (hiddenTarget) {
    return hiddenTarget.classList.contains("hidden");
  });
  var ranNumArr = [];

  while (ranNumArr.length < 3) {
    var ranNum = Math.floor(Math.random() * hiddenTargetsArr.length);

    if (ranNumArr.indexOf(ranNum) === -1) {
      ranNumArr.push(ranNum);
    }
  }

  hiddenTargetsArr[ranNumArr[0]].classList.add("visible"), hiddenTargetsArr[ranNumArr[0]].classList.remove("hidden");
  hiddenTargetsArr[ranNumArr[1]].classList.add("visible"), hiddenTargetsArr[ranNumArr[1]].classList.remove("hidden");
  hiddenTargetsArr[ranNumArr[2]].classList.add("visible"), hiddenTargetsArr[ranNumArr[2]].classList.remove("hidden");
}; // starts game, resets score, accuracy, hides all spheres, shows 3 random spheres


var startGame = function startGame() {
  startButton.addEventListener("click", function () {
    time = 30;
    hardReset();
    hideAll();
    showRandomSpheres();
    var timeStart = setInterval(function () {
      // starts timer
      if (time >= 1 && time <= 30) {
        timer.innerHTML = "".concat(time, " secs");
        time--;
      } else if (time = 1) {
        // resets timer 
        clearInterval(timeStart);
        time = 30;
        timer.innerHTML = "".concat(time, " secs");
        hideAll();
      }
    }, 1000);
    startButton.disabled = true;
  });
};

startGame(); // random target appear on click

var targetAppear = function targetAppear() {
  var hiddenTargetsArr = targetsArr.filter(function (hiddenTarget) {
    return hiddenTarget.classList.contains("hidden");
  });
  var ranNum = Math.floor(Math.random() * hiddenTargetsArr.length);
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
    if (time < 30) {
      clickCounter++;
    }

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
  if ((targetClickCounter / clickCounter * 100).toFixed(0) > 100) {
    accuracy.innerHTML = "accuracy: 100%";
  } else if ((targetClickCounter / clickCounter * 100).toFixed(0) <= 100) {
    accuracy.innerHTML = "accuracy: ".concat((targetClickCounter / clickCounter * 100).toFixed(0), "%");
  }
}; // updates score with each click


var scoreUpdater = function scoreUpdater() {
  score.innerHTML = "score: ".concat(targetClickCounter * 120 - clickCounter * 20);
}; // clears score, accuracy, clickCounter, and targetClickCounter


var hardReset = function hardReset() {
  clickCounter = 0;
  targetClickCounter = 0;
  accuracy.innerHTML = "accuracy:";
  score.innerHTML = "score:";
}; // button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres


var resetClick = function resetClick() {
  resett.addEventListener("click", function () {
    hardReset();
    hideAll();
    startButton.disabled = false;
    time = 31;
  });
};

resetClick(); // look up how to make js more efficient
// add sound effects or music?
// more targets on desktop
// change hideAll() to only apply hidden to mobile targets when under a certain screen width
// once width requirements reached, apply hidden to all targets
// coordinate the width requirement in css