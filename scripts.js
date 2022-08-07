const targets = document.querySelectorAll(".target");
const targetsArr = Array.from(targets);
const startButton = document.querySelector('button');
const playableArea = document.querySelector('.grid');
const accuracy = document.querySelector('.accuracy');
const score = document.querySelector('.score');
const resett = document.querySelector(`.resett`);
const exitLink = document.querySelector(`.exit-link`);
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
const surpriseSound = new Audio("./soundfx/surprisesoundtrimmed.mp3");

// audio play functions on click
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

// plays sound on hover over surprisebutton
const playSurpriseSound = () => {
    exitLink.addEventListener("mouseover", () => {
        surpriseSound.currentTime = 0;
        surpriseSound.play();
    });
    exitLink.addEventListener("mouseout", ()=> {
        surpriseSound.pause();
        surpriseSound.currentTime = 0;
    })
}
playSurpriseSound();

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

// timer starts at 30
let time = 30;

//hides all spheres
const hideAll = () => {
    screenWidthChange();
    screenHeightChange();
    portraitScreenWidthChange();
    // if screen is 1080px wide, adds hidden to and removes visible class from all targets
    if (screenWidth.matches || screenHeight.matches || portraitScreenWidth.matches) {
        targetsArr.forEach((target) => {
            target.classList.add("hidden");
            target.classList.remove("visible")
        })
    } else {
        // adds hidden to and removes visible class from only mobile targets
        mobileTargetsArr.forEach((mobileTarget) => {
            mobileTarget.classList.add("hidden");
            mobileTarget.classList.remove("visible");
        });
        desktopTargetsArr.forEach((desktopTarget) => {
            desktopTarget.classList.remove("hidden");
        })
    }
}
hideAll();

// selects 3 random spheres to be visible on start click using a math.random and while loop
const showRandomSpheres = () => {
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    });
    let ranNumArr = [];
    while (ranNumArr.length < 3) {
        let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        if(ranNumArr.indexOf(ranNum) === -1) {
            ranNumArr.push(ranNum);
        }
    }
    hiddenTargetsArr[ranNumArr[0]].classList.add("visible"), hiddenTargetsArr[ranNumArr[0]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[1]].classList.add("visible"), hiddenTargetsArr[ranNumArr[1]].classList.remove("hidden");
    hiddenTargetsArr[ranNumArr[2]].classList.add("visible"), hiddenTargetsArr[ranNumArr[2]].classList.remove("hidden");
}

// hide end message
const hideEndMessageButton = () => {
    endMessage.innerHTML = "";
    endMessage.classList.add("gone");
}
hideEndMessageButton();

// click to copy end message using swal for a nice looking alert
const copyEndMessage = () => {
    navigator.clipboard.writeText(endMessage.innerHTML);
    swal("Copied to clipboard!")
}

// show end message, different based on score received, on click, copies endmessage to clipboard.
// maybe i can get rid of <a> somehow.
const showEndMessageButton = () => {
    if (scoreValue > 15000) {
        endMessage.innerHTML = `Absolutely incredible. ${scoreValue} points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends that you've found a new career!
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    } else if (scoreValue > 10000 && scoreValue< 15000) {
        endMessage.innerHTML = `Nice! Your score was ${scoreValue}! Tell your friends just to brag! Click to share with your friends because they deserve to hear about your successes!
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    } else if (scoreValue < 10000 && scoreValue > 5000) {
        endMessage.innerHTML = `Be better. ${scoreValue} points? I expect more from you. Click to share with your friends, if you feel like this score is even share-worthy..
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    } else if (scoreValue < 5000) {
        endMessage.innerHTML =`With a score of ${scoreValue}, you must have the slowest hands in town. I'm disappointed! Click to share with your friends that you're not great at everything. 
        <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
    }
    endMessage.addEventListener("click", () => {
        copyEndMessage();
    })
    endMessage.classList.remove("gone");
}

// disable reset for 1.5 secs to prevent multiple consecutive reset and start button clicks leading to speeding timer bug
const disableReset = () => {
    resett.disabled = true;
    setTimeout('resett.disabled=false', 1200);
}

// starts game, resets score, accuracy, hides all spheres, shows 3 random spheres, hides endmessage, plays start sound, disables reset for 1.2s
const startGame = () => {
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
                console.log(time);
                showEndMessageButton()
                time = 31;
                timer.innerHTML = `${time - 1} secs`
                hideAll();
            }
        }, 1000);
        startButton.disabled = true; // disables start button to prevent multiple clicks and timer speecing up
    });
}
startGame();

// random target appear on click selecting only from hidden targets
const targetAppear = () => {
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    })
    let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        hiddenTargetsArr[ranNum].classList.add("visible");
        hiddenTargetsArr[ranNum].classList.remove("hidden");
}

// target disappear on click
const targetVanish = (target) => {
    target.classList.add("hidden");
    target.classList.remove("visible");
}

let targetClickCounter = 0
let clickCounter = 0

// updates score and accuracy, plays click sound, logs total clicks on playable area
const totalClicks = () => {
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

// disappears the target clicked, appears another random target, +1 to targetclickCounter
const targetClick = () => {
        targetsArr.forEach((target) => {
            target.addEventListener("click", () => {
                playTargetHitSound();
                targetAppear();
                targetVanish(target);
                targetClickCounter ++;
            })
        });
}
targetClick();

// updates accuracy with each click, caps at 100%
const accuracyUpdater = () => {
    if ((targetClickCounter/clickCounter * 100).toFixed(0) > 100) {
        accuracy.innerHTML = `accuracy: 100%`
    } else if ((targetClickCounter/clickCounter * 100).toFixed(0) <= 100) {
        accuracy.innerHTML = `accuracy: ${(targetClickCounter/clickCounter * 100).toFixed(0)}%`;
    }       
}

// updates score with each click
let scoreValue = 0;
const scoreUpdater = () => {
    scoreValue = targetClickCounter*120 - clickCounter*20;
    score.innerHTML = `score: ${scoreValue}`;
}

// clears score, accuracy, clickCounter, and targetClickCounter
const hardReset = () => {
        clickCounter = 0;
        targetClickCounter = 0;
        accuracy.innerHTML = `accuracy:`;
        score.innerHTML = `score:`
}

// button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres, plays reset sound, hides endmessage, disables startbutton for 1.2s
const resetClick = () => {
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

// figure out how to get the endmessage text to stop extending the page.
// bug with repeated pressing of start and reset
// setinterval timer speeds up
// work around is to wait 2 seconds before start button is reenabled after pressing reset?
// end message text shows up on reset press, when reset is clicked, time = 1

// add alternate game mode?