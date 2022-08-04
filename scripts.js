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

const targets = document.querySelectorAll(".target");
const targetsArr = Array.from(targets);
const startButton = document.querySelector('button');
const playableArea = document.querySelector('.grid');
const accuracy = document.querySelector('.accuracy');
const score = document.querySelector('.score');
const resett = document.querySelector(`.resett`);
const timer = document.querySelector('.timer');

// timer starts at 30
let time = 30;

//hides all spheres
const hideAll = () => {
    targetsArr.forEach((target) => {
        target.classList.add("hidden");
        target.classList.remove("visible")
    })
}

hideAll();

// selects 3 random spheres to be visible on start click
const showRandomSpheres = () => {
    let ranNumArr = [];
    while (ranNumArr.length < 3) {
        let ranNum = Math.floor(Math.random()*8);
        if(ranNumArr.indexOf(ranNum) === -1) {
            ranNumArr.push(ranNum);
        }
    }
    targetsArr[ranNumArr[0]].classList.add("visible"), targetsArr[ranNumArr[0]].classList.remove("hidden");
    targetsArr[ranNumArr[1]].classList.add("visible"), targetsArr[ranNumArr[1]].classList.remove("hidden");
    targetsArr[ranNumArr[2]].classList.add("visible"), targetsArr[ranNumArr[2]].classList.remove("hidden");
}

// starts game, resets score, accuracy, hides all spheres, shows 3 random spheres
const startGame = () => {
    startButton.addEventListener("click", () => {
        time = 30;
        hardReset();
        hideAll();
        showRandomSpheres();
        const timeStart = setInterval(() => { // starts timer
            if (time >= 1 && time <= 30) {
                timer.innerHTML = `${time} secs`;
                time --;
            } else if (time = 1) { // resets timer 
                clearInterval(timeStart);
                time = 30;
                timer.innerHTML = `${time} secs`
                hideAll();
            }
        }, 1000);
        startButton.disabled = true;
    });
}
startGame();

// random target appear on click
const targetAppear = () => {
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    })
    let ranNum = Math.floor(Math.random()*5);
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

// updates score and accuracy, logs total clicks on playable area
const totalClicks = () => {
    playableArea.addEventListener("click", () => {
        if (time < 30) {
            clickCounter ++;
        }
        accuracyUpdater();
        scoreUpdater();
    });
}
totalClicks();

// disappears the target clicked, appears another random target, +1 to targetclickCounter
const targetClick = () => {
        targetsArr.forEach((target) => {
            target.addEventListener("click", () => {
                targetAppear();
                targetVanish(target);
                targetClickCounter ++;
            })
        });
}
targetClick();

// updates accuracy with each click
const accuracyUpdater = () => {
    if ((targetClickCounter/clickCounter * 100).toFixed(0) > 100) {
        accuracy.innerHTML = `accuracy: 100%`
    } else if ((targetClickCounter/clickCounter * 100).toFixed(0) <= 100) {
        accuracy.innerHTML = `accuracy: ${(targetClickCounter/clickCounter * 100).toFixed(0)}%`;
    }       
}

// updates score with each click
const scoreUpdater = () => {
    score.innerHTML = `score: ${targetClickCounter*120 - clickCounter*20}`;
}

// clears score, accuracy, clickCounter, and targetClickCounter
const hardReset = () => {
        clickCounter = 0;
        targetClickCounter = 0;
        accuracy.innerHTML = `accuracy:`;
        score.innerHTML = `score:`
}

// button press for reset, clears score, accuracy, clickCounter, and targetClickCounter, hides all spheres
const resetClick = () => {
    resett.addEventListener("click", () => {
        hardReset();
        hideAll();
        startButton.disabled = false;
        time = 31;
    });
}
resetClick();

// look up how to make js more efficient
// add sound effects or music?

// fix multiple start presses