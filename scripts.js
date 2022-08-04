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

const targets = document.querySelectorAll(".target");
const targetsArr = Array.from(targets)
const startGame = document.querySelector('button')

const randomTargets = Math.floor(Math.random()*targetsArr.length);

//game start
const assignHiddenClass = () => {
    targetsArr[randomTargets].classList.add("hidden");
}

startGame.addEventListener("click", () => {
    assignHiddenClass();
})

// target appear on click
const hiddenTargets = targetsArr.filter((hiddenTarget) => {
    return hiddenTarget.classList.contains("hidden");
});

const randomHiddenTarget = Math.floor(Math.random()*hiddenTargets.length);

const targetAppear = () => {
    hiddenTargets[randomHiddenTarget].classList.remove("hidden");
}
// target disappear on click
const targetVanish = (target) => {
    console.log(`${target} was clicked!!`);
    target.classList.add("hidden");
}

// get 3 spheres to show up at once
// get appear to apply only to hidden spheres

targetsArr.forEach((target) => {
    target.addEventListener("click", () => {
        targetVanish(target);
        targetAppear();
    })
});

