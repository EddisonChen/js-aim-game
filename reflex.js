const targets = document.querySelectorAll(".target");
const targetsArr = Array.from(targets);
const startButton = document.querySelector('button');
const playableArea = document.querySelector('.grid');
const accuracy = document.querySelector('.accuracy');
const score = document.querySelector('.score');
const resett = document.querySelector(`.resett`);
const aimButton = document.querySelector(`.aim`);
const timer = document.querySelector('.timer');
const endMessage = document.querySelector(".end-message");
const mobileTargets = document.querySelectorAll(".mobile");
const mobileTargetsArr = Array.from(mobileTargets);
const desktopTargets = document.querySelectorAll(".desktop");
const desktopTargetsArr = Array.from(desktopTargets);
const clickSound = new Audio("./soundfx/loweredtrimmedallshots.mp3");
const resetClickSound = new Audio ("./soundfx/loweredtrimmedresetclick.mp3");
const startClickSound = new Audio("./soundfx/loweredtrimmedstartsound.mp3");
const targetHitSound = new Audio("./soundfx/loweredtrimmedtargethit.mp3");
const aimButtonSound = new Audio("./soundfx/surprisesoundtrimmed.mp3");

// audio play on click functions
const playClickSound =() => {
    clickSound.currentTime = 0; // resets audio to allow for consecutive clicks
    clickSound.play();
}
const playResetClickSound = () => {
    resetClickSound.play();
}

const playStartClickSound = () => {
    startClickSound.play();
}

const playTargetHitSound = () => {
    targetHitSound.currentTime = 0; // resets audio to allow for consecutive clicks
    targetHitSound.play();
}

const playAimButtonSound = () => { // plays sound on hover over reflexbutton
    aimButton.addEventListener("mouseover", () => {
        aimButtonSound.currentTime = 0;
        aimButtonSound.play();
    });
    aimButton.addEventListener("mouseout", ()=> { // stops and resets audio when mouse leaves
        aimButtonSound.pause();
        aimButtonSound.currentTime = 0;
    })
}
playAimButtonSound();

// media query for js, senses if css is being matched
const screenWidth = window.matchMedia('(orientation: landscape) and (min-width: 1080px)');
const screenHeight = window.matchMedia('(orientation: landscape) and (min-height: 550px)');
const portraitScreenWidth = window.matchMedia('(orientation: portrait) and (min-width: 540px)');

const screenHeightChange = () => {
    screenHeight.addEventListener("change", () => {
    });
}
const screenWidthChange = () => {
    screenWidth.addEventListener("change", () => {
    });
}
const portraitScreenWidthChange = () => {
    portraitScreenWidth.addEventListener("change", () => {
    });
} 

const hideAll = () => { //hides all spheres
    screenWidthChange();
    screenHeightChange();
    portraitScreenWidthChange();
    if (screenWidth.matches || screenHeight.matches || portraitScreenWidth.matches) { // if css matches one/more of these three options, adds hidden to and removes visible class from all targets
        targetsArr.forEach((target) => {
            target.classList.add("hidden");
            target.classList.remove("visible");
            target.classList.remove("red");
            target.classList.remove("blue")
        })
    } else {
        mobileTargetsArr.forEach((mobileTarget) => { // adds hidden to and removes visible class from only mobile targets
            mobileTarget.classList.add("hidden");
            mobileTarget.classList.remove("visible");
            mobileTarget.classList.remove("red");
            mobileTarget.classList.remove("blue");
        });
        desktopTargetsArr.forEach((desktopTarget) => {
            desktopTarget.classList.remove("hidden");
            desktopTarget.classList.remove("red");
            desktopTarget.classList.remove("blue");
        })
    }
}
hideAll();

const showRandomSpheres = () => { // selects 2 random spheres to be visible on start click using a math.random and while loop
    targetsArr.forEach((target) => {
        if (target.classList.contains("red") && target.classList.contains("visible")) {
            target.classList.remove("red");
            target.classList.remove("visible");
            target.classList.add("hidden");
        } else if (target.classList.contains("blue") && target.classList.contains("visible")) {
            target.classList.remove("blue");
            target.classList.remove("visible");
            target.classList.add("hidden");
        }
    })
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    });
    let ranNumArr = [];
    while (ranNumArr.length < 2) {
        let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        if(ranNumArr.indexOf(ranNum) === -1) {
            ranNumArr.push(ranNum);
        }
    }
    hiddenTargetsArr[ranNumArr[0]].classList.add("visible");
    hiddenTargetsArr[ranNumArr[0]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[0]].classList.add("blue");
    hiddenTargetsArr[ranNumArr[1]].classList.add("visible");
    hiddenTargetsArr[ranNumArr[1]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[1]].classList.add("red");
}

const hideEndMessageButton = () => { // hide end message
    endMessage.innerHTML = "";
    endMessage.classList.add("gone");
    endMessage.classList.remove("not-gone");
}
hideEndMessageButton();

const copyEndMessage = () => { // click to copy end message using swal for a nice looking alert
    endMessage.addEventListener("click", () => {
        navigator.clipboard.writeText(endMessage.innerHTML);
    swal("Copied to clipboard!");
    })
}

const showEndMessageButton = () => { // show end message, different based on score received, on click, copies endmessage to clipboard.
    if (scoreValue > 15000) {
        endMessage.innerHTML = `Absolutely incredible. ${scoreValue} points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends that you've found a new career!
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`
        ; // maybe i can get rid of <a> somehow.
    } else if (scoreValue > 10000 && scoreValue< 15000) {
        endMessage.innerHTML = `Nice! Your score was ${scoreValue}! Tell your friends just to brag! Click to share with your friends because they deserve to hear about your successes!
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    } else if (scoreValue < 10000 && scoreValue > 5000) {
        endMessage.innerHTML = `Don't be sorry, be better. ${scoreValue} points? I expect more from you. Click to share with your friends, if you feel like this score is even share-worthy..
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    } else if (scoreValue < 5000) {
        endMessage.innerHTML =`With a score of ${scoreValue}, you must have the slowest hands in town. I'm disappointed! Click to share with your friends that you are, in fact, not great at everything. 
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    }
    copyEndMessage();
    endMessage.classList.remove("gone");
    endMessage.classList.add("not-gone");
}

const disableReset = () => { // disable reset for 1.5 secs to prevent multiple consecutive reset and start button clicks leading to speeding timer bug
    resett.disabled = true;
    setTimeout('resett.disabled=false', 1200);
}

let time = 30; // timer starts at 30

const startGame = () => { // starts timer, resets score, accuracy, hides all spheres, shows 3 random spheres, hides endmessage, plays start sound, disables reset for 1.2s
    startButton.addEventListener("click", () => {
        disableReset();
        hideEndMessageButton();
        playStartClickSound()
        hardReset();
        hideAll();
        showRandomSpheres();
        time = 30;
        const timeStart = setInterval(() => { // starts timer
            if (time >= 1 && time <= 30) {
                timer.innerHTML = `${time} secs`;
                time --;
            } else if (time = 1) { // resets timer 
                clearInterval(timeStart);
                hideAll();
                showEndMessageButton()
                time = 31;
                timer.innerHTML = `${time - 1} secs`
            }
        }, 1000);
        startButton.disabled = true; // disables start button to prevent multiple clicks and timer speecing up
    });
}
startGame();

// const targetAppear = () => { // random target appear on click selecting only from hidden targets
//     const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
//         return hiddenTarget.classList.contains("hidden");
//     })
//     let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
//         hiddenTargetsArr[ranNum].classList.add("visible");
//         hiddenTargetsArr[ranNum].classList.remove("hidden");
// }

const targetVanish = () => { // target disappear on click
    targetsArr.forEach((target) => {
        if (target.classList.contains("visible")) {
            target.classList.add("hidden");
            target.classList.remove("visible");
            target.classList.remove("red");
            target.classList.remove("blue");
        }
    });
}

let blueClickCounter = 0;
let redClickCounter = 0;
let clickCounter = 0;

const totalClicks = () => { // updates score and accuracy, plays click sound, logs total clicks on playable area
    playableArea.addEventListener("click", () => {
        if (time < 30) {
            clickCounter ++;
        }
        accuracyUpdater();
        scoreUpdater();
        playClickSound();
    });
}
totalClicks();

const targetClick = () => { // disappears the target clicked, appears another random target, +1 to targetclickCounter
    targetsArr.forEach((target) => {
        target.addEventListener("click", () => {
            playTargetHitSound();
            if (target.classList.contains("red")) {
                redClickCounter ++;
            } else if (target.classList.contains("blue")) {
                blueClickCounter ++;
            }
            targetVanish();
            showRandomSpheres();
        })
    });
}
targetClick();

const accuracyUpdater = () => { // updates accuracy with each click, caps at 100%
    if ((blueClickCounter/clickCounter * 100).toFixed(0) > 100) {
        accuracy.innerHTML = `accuracy: 100%`
    } else if ((blueClickCounter/clickCounter * 100).toFixed(0) <= 100) {
        accuracy.innerHTML = `accuracy: ${(blueClickCounter/clickCounter * 100).toFixed(0)}%`;
    }       
}

let scoreValue = 0;
const scoreUpdater = () => { // updates score with each click
    scoreValue = blueClickCounter*120 - (clickCounter*20 + redClickCounter*50);
    score.innerHTML = `score: ${scoreValue}`;
}

const hardReset = () => { // clears score, accuracy, clickCounter, and targetClickCounter
    clickCounter = 0;
    blueClickCounter = 0;
    redClickCounter = 0;
    accuracy.innerHTML = `accuracy:`;
    score.innerHTML = `score:`
}

const resetClick = () => { // button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres, plays reset sound, hides endmessage, disables startbutton for 1.2s
    resett.addEventListener("click", () => {
        time = 31;
        playResetClickSound();
        hideEndMessageButton();
        hardReset();
        hideAll();
        setTimeout('startButton.disabled = false', 1200); // disables startbutton for 1.2s to prevent consecutive start reset clicks leading to timer speeding up bug
    });
}
resetClick();

// score not reseting with each new game
// add a time limit for each new sphere showing