"use strict";

var targets = document.querySelectorAll(".target");
var targetsArr = Array.from(targets);
var startButton = document.querySelector('button');
var playableArea = document.querySelector('.grid');
var accuracy = document.querySelector('.accuracy');
var score = document.querySelector('.score');
var resett = document.querySelector(".resett");
var timer = document.querySelector('.timer');
var endMessage = document.querySelector(".end-message");
var mobileTargets = document.querySelectorAll(".mobile");
var mobileTargetsArr = Array.from(mobileTargets);
var desktopTargets = document.querySelectorAll(".desktop");
var desktopTargetsArr = Array.from(desktopTargets);
var clickSound = new Audio("./soundfx/loweredtrimmedallshots.mp3");
var resetClickSound = new Audio("./soundfx/loweredtrimmedresetclick.mp3");
var startClickSound = new Audio("./soundfx/loweredtrimmedstartsound.mp3");
var targetHitSound = new Audio("./soundfx/loweredtrimmedtargethit.mp3"); // audio play functions on click

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
}; // media query for js, senses if screen is wider than 1080px or taller than 550px


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
}; // hide end message


var hideEndMessageButton = function hideEndMessageButton() {
  endMessage.innerHTML = "";
  endMessage.classList.add("gone");
};

hideEndMessageButton(); // click to copy end message

var copyEndMessage = function copyEndMessage() {
  navigator.clipboard.writeText(endMessage.innerHTML);
  swal("Copied to clipboard!");
}; // show end message


var showEndMessageButton = function showEndMessageButton() {
  if (scoreValue > 15000) {
    endMessage.innerHTML = "Absolutely incredible. ".concat(scoreValue, " points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends!\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  } else if (scoreValue > 10000 && scoreValue < 15000) {
    endMessage.innerHTML = "Nice! Your score was ".concat(scoreValue, "! Tell your friends just to brag! Click to share with your friends!\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  } else if (scoreValue < 10000 && scoreValue > 5000) {
    endMessage.innerHTML = "Be better. ".concat(scoreValue, " points? I expect more from you. Click to share with your friends!\n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  } else if (scoreValue < 5000) {
    endMessage.innerHTML = "With a score of ".concat(scoreValue, ", you must have the slowest hands in town. I'm disappointed! Click to share with your friends. \n        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>");
  }

  endMessage.addEventListener("click", function () {
    copyEndMessage();
  });
  endMessage.classList.remove("gone");
}; // disable reset for 1.5 secs


var disableReset = function disableReset() {
  resett.disabled = true;
  setTimeout('resett.disabled=false', 1200);
}; // starts game, resets score, accuracy, hides all spheres, shows 3 random spheres


var startGame = function startGame() {
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
        console.log(time);
        showEndMessageButton();
        time = 31;
        timer.innerHTML = "".concat(time - 1, " secs");
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
    playClickSound();
    hideEndMessageButton();
  });
};

totalClicks(); // disappears the target clicked, appears another random target, +1 to targetclickCounter

var targetClick = function targetClick() {
  targetsArr.forEach(function (target) {
    target.addEventListener("click", function () {
      playTargetHitSound();
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


var scoreValue = 0;

var scoreUpdater = function scoreUpdater() {
  scoreValue = targetClickCounter * 120 - clickCounter * 20;
  score.innerHTML = "score: ".concat(scoreValue);
}; // clears score, accuracy, clickCounter, and targetClickCounter


var hardReset = function hardReset() {
  clickCounter = 0;
  targetClickCounter = 0;
  accuracy.innerHTML = "accuracy:";
  score.innerHTML = "score:";
}; // button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres


var resetClick = function resetClick() {
  resett.addEventListener("click", function () {
    time = 31;
    playResetClickSound();
    hideEndMessageButton();
    hardReset();
    hideAll();
    setTimeout('startButton.disabled = false', 1200);
  });
};

resetClick(); // figure out how to get the endmessage text to stop extending the page.
// bug with repeated pressing of start and reset
// setinterval timer speeds up
// work around is to wait 2 seconds before start button is reenabled after pressing reset?
// end message text shows up on reset press, when reset is clicked, time = 1