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
const reflexSound = new Audio("./soundfx/surprisesoundtrimmed.mp3");

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
const playReflexSound = () => { // plays sound on hover over reflexbutton
    exitLink.addEventListener("mouseover", () => {
        reflexSound.currentTime = 0;
        reflexSound.play();
    });
    exitLink.addEventListener("mouseout", ()=> { // stops and resets audio when mouse leaves
        reflexSound.pause();
        reflexSound.currentTime = 0;
    })
}
playReflexSound();

// media query for js, senses if css is being matched
const landscapeScreenHeight = window.matchMedia('(orientation: landscape) and (min-height: 500px)');
const portraitScreenWidth = window.matchMedia('(orientation: portrait) and (min-width:500px)');

const landscapeScreenHeightChange = () => {
    landscapeScreenHeight.addEventListener("change", () => {
    });
}
const portraitScreenWidthChange = () => {
    portraitScreenWidth.addEventListener("change", () => {
    });
} 

const hideAll = () => { //hides all spheres
    landscapeScreenHeightChange();
    portraitScreenWidthChange();
    if (landscapeScreenHeight.matches || portraitScreenWidth.matches) { // if css matches one/more of these three options, adds hidden to and removes visible class from all targets
        targetsArr.forEach((target) => {
            target.classList.add("hidden");
            target.classList.remove("visible")
        })
    } else {
        mobileTargetsArr.forEach((mobileTarget) => { // adds hidden to and removes visible class from only mobile targets
            mobileTarget.classList.add("hidden");
            mobileTarget.classList.remove("visible");
        });
        desktopTargetsArr.forEach((desktopTarget) => {
            desktopTarget.classList.remove("hidden");
        })
    }
}
hideAll();

const showRandomSpheres = () => { // selects 3 random spheres to be visible on start click using a math.random and while loop
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

const hideEndMessageButton = () => { // hide end message
    endMessage.innerHTML = "";
    endMessage.classList.add("gone");
    endMessage.classList.remove("not-gone");
}

const copyEndMessage = () => { // click to copy end message using swal for a nice looking alert
    endMessage.addEventListener("click", () => {
        navigator.clipboard.writeText(endMessage.innerHTML);
    swal("Copied to clipboard!");
    })
}

window.mobileCheck = function() { // adjusts score rating for mobile
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

const showEndMessageButton = () => { // show end message, different based on score received, on click, copies endmessage to clipboard.
    if (check == true) {
        if (scoreValue > 15000) {
            endMessage.innerHTML = `Absolutely incredible. ${scoreValue} points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends that you've found a new career!
            <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
        }
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
    else if (check == false) {
        if (scoreValue > 6000) {
            endMessage.innerHTML = `Absolutely incredible. ${scoreValue} points. If this game ever takes off, you'll be my first pro. I'll pay you I swear. Click to share with your friends that you've found a new career!
            <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
        } else if (scoreValue > 4000 && scoreValue < 6000) {
            endMessage.innerHTML = `Nice! Your score was ${scoreValue}! Tell your friends just to brag! Click to share with your friends because they deserve to hear about your successes!
            <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
        } else if (scoreValue < 4000 && scoreValue > 2000) {
            endMessage.innerHTML = `Don't be sorry, be better. ${scoreValue} points? I expect more from you. Click to share with your friends, if you feel like this score is even share-worthy..
            <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
        } else if (scoreValue < 2000) {
            endMessage.innerHTML =`With a score of ${scoreValue}, you must have the slowest hands in town. I'm disappointed! Click to share with your friends that you are, in fact, not great at everything. 
            <a href='https://mrmanlyish.github.io/js-aim-game/'></a>`;
        }
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

const targetAppear = () => { // random target appear on click selecting only from hidden targets
    const hiddenTargetsArr = targetsArr.filter((hiddenTarget) => {
        return hiddenTarget.classList.contains("hidden");
    })
    let ranNum = Math.floor(Math.random()*hiddenTargetsArr.length);
        hiddenTargetsArr[ranNum].classList.add("visible");
        hiddenTargetsArr[ranNum].classList.remove("hidden");
}

const targetVanish = (target) => { // target disappear on click
    target.classList.add("hidden");
    target.classList.remove("visible");
}

let targetClickCounter = 0
let clickCounter = 0

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
                targetAppear();
                targetVanish(target);
                targetClickCounter ++;
            })
        });
}
targetClick();

const accuracyUpdater = () => { // updates accuracy with each click, caps at 100%
    if ((targetClickCounter/clickCounter * 100).toFixed(0) > 100) {
        accuracy.innerHTML = `accuracy: 100%`
    } else if ((targetClickCounter/clickCounter * 100).toFixed(0) <= 100) {
        accuracy.innerHTML = `accuracy: ${(targetClickCounter/clickCounter * 100).toFixed(0)}%`;
    }       
}

let scoreValue = 0;
const scoreUpdater = () => { // updates score with each click
    scoreValue = targetClickCounter*120 - clickCounter*20;
    score.innerHTML = `score: ${scoreValue}`;
}

const hardReset = () => { // clears score, accuracy, clickCounter, and targetClickCounter
        clickCounter = 0;
        targetClickCounter = 0;
        accuracy.innerHTML = `accuracy:`;
        score.innerHTML = `score:`;
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

// figure out how to get the endmessage text to stop extending the page.
// bug with repeated pressing of start and reset
// setinterval timer speeds up
// work around is to wait 2 seconds before start button is reenabled after pressing reset?
// end message text shows up on reset press, when reset is clicked, time = 1

// add alternate game mode?