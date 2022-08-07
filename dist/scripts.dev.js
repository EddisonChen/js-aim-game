"use strict";

var targets = document.querySelectorAll(".target");
var targetsArr = Array.from(targets);
var startButton = document.querySelector('button');
var playableArea = document.querySelector('.grid');
var accuracy = document.querySelector('.accuracy');
var score = document.querySelector('.score');
var resett = document.querySelector(".resett");
var exitLink = document.querySelector(".exit-link");
var timer = document.querySelector('.timer');
var endMessage = document.querySelector(".end-message");
var mobileTargets = document.querySelectorAll(".mobile");
var mobileTargetsArr = Array.from(mobileTargets);
var desktopTargets = document.querySelectorAll(".desktop");
var desktopTargetsArr = Array.from(desktopTargets);
var clickSound = new Audio("./soundfx/loweredtrimmedallshots.mp3");
var resetClickSound = new Audio("./soundfx/loweredtrimmedresetclick.mp3");
var startClickSound = new Audio("./soundfx/loweredtrimmedstartsound.mp3");
var targetHitSound = new Audio("./soundfx/loweredtrimmedtargethit.mp3");
var surpriseSound = new Audio("./soundfx/surprisesoundtrimmed.mp3"); // audio play functions on click

var playClickSound = function playClickSound() {
  clickSound.currentTime = 0; // resets audio to allow for consecutive clicks

  clickSound.play();
};

var playResetClickSound = function playResetClickSound() {
  resetClickSound.play();
};

var playStartClickSound = function playStartClickSound() {
  startClickSound.play();
};

var playTargetHitSound = function playTargetHitSound() {
  targetHitSound.currentTime = 0; // resets audio to allow for consecutive clicks

  targetHitSound.play();
};

var playSurpriseSound = function playSurpriseSound() {
  // plays sound on hover over surprisebutton
  exitLink.addEventListener("mouseover", function () {
    surpriseSound.currentTime = 0;
    surpriseSound.play();
  });
  exitLink.addEventListener("mouseout", function () {
    // stops and resets audio when mouse leaves
    surpriseSound.pause();
    surpriseSound.currentTime = 0;
  });
};

playSurpriseSound(); // media query for js, senses if css is being matched

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
};

var time = 30; // timer starts at 30

var hideAll = function hideAll() {
  //hides all spheres
  screenWidthChange();
  screenHeightChange();
  portraitScreenWidthChange();

  if (screenWidth.matches || screenHeight.matches || portraitScreenWidth.matches) {
    // if css matches one/more of these three options, adds hidden to and removes visible class from all targets
    targetsArr.forEach(function (target) {
      target.classList.add("hidden");
      target.classList.remove("visible");
    });
  } else {
    mobileTargetsArr.forEach(function (mobileTarget) {
      // adds hidden to and removes visible class from only mobile targets
      mobileTarget.classList.add("hidden");
      mobileTarget.classList.remove("visible");
    });
    desktopTargetsArr.forEach(function (desktopTarget) {
      desktopTarget.classList.remove("hidden");
    });
  }
};

hideAll();

var showRandomSpheres = function showRandomSpheres() {
  // selects 3 random spheres to be visible on start click using a math.random and while loop
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
};

var hideEndMessageButton = function hideEndMessageButton() {
  // hide end message
  endMessage.innerHTML = "";
  endMessage.classList.add("gone");
  endMessage.classList.remove("not-gone");
};

hideEndMessageButton();

var copyEndMessage = function copyEndMessage() {
  // click to copy end message using swal for a nice looking alert
  endMessage.addEventListener("click", function () {
    navigator.clipboard.writeText(endMessage.innerHTML);
    swal("Copied to clipboard!");
  });
};

var showEndMessageButton = function showEndMessageButton() {
  // show end message, different based on score received, on click, copies endmessage to clipboard.
  if (scoreValue > 15000) {
    endMessage.innerHTML = "Absolutely incredible. ".concat(scoreValue, " points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends that you've found a new career!\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>"); // maybe i can get rid of <a> somehow.
  } else if (scoreValue > 10000 && scoreValue < 15000) {
    endMessage.innerHTML = "Nice! Your score was ".concat(scoreValue, "! Tell your friends just to brag! Click to share with your friends because they deserve to hear about your successes!\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  } else if (scoreValue < 10000 && scoreValue > 5000) {
    endMessage.innerHTML = "Don't be sorry, be better. ".concat(scoreValue, " points? I expect more from you. Click to share with your friends, if you feel like this score is even share-worthy..\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  } else if (scoreValue < 5000) {
    endMessage.innerHTML = "With a score of ".concat(scoreValue, ", you must have the slowest hands in town. I'm disappointed! Click to share with your friends that you are, in fact, not great at everything. \n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  }

  copyEndMessage();
  endMessage.classList.remove("gone");
  endMessage.classList.add("not-gone");
};

var disableReset = function disableReset() {
  // disable reset for 1.5 secs to prevent multiple consecutive reset and start button clicks leading to speeding timer bug
  resett.disabled = true;
  setTimeout('resett.disabled=false', 1200);
};

var startGame = function startGame() {
  // starts timer, resets score, accuracy, hides all spheres, shows 3 random spheres, hides endmessage, plays start sound, disables reset for 1.2s
  startButton.addEventListener("click", function () {
    disableReset();
    hideEndMessageButton();
    playStartClickSound();
    hardReset();
    hideAll();
    showRandomSpheres();
    time = 30;
    var timeStart = setInterval(function () {
      // starts timer
      if (time >= 1 && time <= 30) {
        timer.innerHTML = "".concat(time, " secs");
        time--;
      } else if (time = 1) {
        // resets timer 
        clearInterval(timeStart);
        hideAll();
        showEndMessageButton();
        time = 31;
        timer.innerHTML = "".concat(time - 1, " secs");
      }
    }, 1000);
    startButton.disabled = true; // disables start button to prevent multiple clicks and timer speecing up
  });
};

startGame();

var targetAppear = function targetAppear() {
  // random target appear on click selecting only from hidden targets
  var hiddenTargetsArr = targetsArr.filter(function (hiddenTarget) {
    return hiddenTarget.classList.contains("hidden");
  });
  var ranNum = Math.floor(Math.random() * hiddenTargetsArr.length);
  hiddenTargetsArr[ranNum].classList.add("visible");
  hiddenTargetsArr[ranNum].classList.remove("hidden");
};

var targetVanish = function targetVanish(target) {
  // target disappear on click
  target.classList.add("hidden");
  target.classList.remove("visible");
};

var targetClickCounter = 0;
var clickCounter = 0;

var totalClicks = function totalClicks() {
  // updates score and accuracy, plays click sound, logs total clicks on playable area
  playableArea.addEventListener("click", function () {
    if (time < 30) {
      clickCounter++;
    }

    accuracyUpdater();
    scoreUpdater();
    playClickSound();
  });
};

totalClicks();

var targetClick = function targetClick() {
  // disappears the target clicked, appears another random target, +1 to targetclickCounter
  targetsArr.forEach(function (target) {
    target.addEventListener("click", function () {
      playTargetHitSound();
      targetAppear();
      targetVanish(target);
      targetClickCounter++;
    });
  });
};

targetClick();

var accuracyUpdater = function accuracyUpdater() {
  // updates accuracy with each click, caps at 100%
  if ((targetClickCounter / clickCounter * 100).toFixed(0) > 100) {
    accuracy.innerHTML = "accuracy: 100%";
  } else if ((targetClickCounter / clickCounter * 100).toFixed(0) <= 100) {
    accuracy.innerHTML = "accuracy: ".concat((targetClickCounter / clickCounter * 100).toFixed(0), "%");
  }
};

var scoreValue = 0;

var scoreUpdater = function scoreUpdater() {
  // updates score with each click
  scoreValue = targetClickCounter * 120 - clickCounter * 20;
  score.innerHTML = "score: ".concat(scoreValue);
};

var hardReset = function hardReset() {
  // clears score, accuracy, clickCounter, and targetClickCounter
  clickCounter = 0;
  targetClickCounter = 0;
  accuracy.innerHTML = "accuracy:";
  score.innerHTML = "score:";
};

var resetClick = function resetClick() {
  // button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres, plays reset sound, hides endmessage, disables startbutton for 1.2s
  resett.addEventListener("click", function () {
    time = 31;
    playResetClickSound();
    hideEndMessageButton();
    hardReset();
    hideAll();
    setTimeout('startButton.disabled = false', 1200); // disables startbutton for 1.2s to prevent consecutive start reset clicks leading to timer speeding up bug
  });
};

resetClick(); // figure out how to get the endmessage text to stop extending the page.
// bug with repeated pressing of start and reset
// setinterval timer speeds up
// work around is to wait 2 seconds before start button is reenabled after pressing reset?
// end message text shows up on reset press, when reset is clicked, time = 1
// add alternate game mode?