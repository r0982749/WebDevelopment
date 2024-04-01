let global = {
    AANTAL_HORIZONTAAL: 1,
    AANTAL_VERTICAAL: 1,
    AANTAL_KAARTEN: 6,
    AANTAL_GELIJKE_KAARTEN: 2,

    PATH_PREFIX: "assets/sounds/",
    PATH_SUFFIX: ".mp3",

    sounds: [],

    turnedOver: [],
    score: 0,
    countTries: 0
}

const setup = () => {
    makeElements();
}

const makeElements = () => {
    makeSounds();

    let matchingField = document.getElementById("matchingField");
    makeFieldConstraints(matchingField);

    let sizeSoundArray = global.sounds.length
    for (let i = 0; i < sizeSoundArray; i++){
        let figure = getRandomSound();
        document.getElementById("matchingField").appendChild(figure);
        figure.addEventListener("click", tryTurnOver);
    }
}

const makeFieldConstraints = (field) => {
    let countCards = global.AANTAL_KAARTEN * global.AANTAL_GELIJKE_KAARTEN;
    if (countCards === global.AANTAL_HORIZONTAAL * global.AANTAL_VERTICAAL){
        field.style.gridTemplateColumns = "repeat(" + global.AANTAL_HORIZONTAAL + ", auto)";
        field.style.gridTemplateRows = "repeat(" + global.AANTAL_VERTICAAL + ", auto)";
    }
    else {
        let horCount = 0;
        for (let i = 1; i < countCards; i++){
            let calc = countCards / i;
            if (calc % 2 === 0 && calc > 2){
                horCount = calc;
            }
        }

        field.style.gridTemplateColumns = "repeat(" + horCount + ", auto)";
    }
}

const getRandomSound = () => {
    let randomIndex = Math.floor(Math.random() * global.sounds.length);
    return global.sounds.splice(randomIndex, 1)[0];
}

const makeSounds = () => {
    for (let i = 0; i < global.AANTAL_KAARTEN; i++){
        for (let j = 0; j < global.AANTAL_GELIJKE_KAARTEN; j++){
            let figure = document.createElement("figure");
            figure.classList.add("matchFigure");
            figure.setAttribute("data-sound-file", "" + i);
            global.sounds.push(figure);
        }
    }
}

const tryTurnOver = (event) => {
    if (global.turnedOver.length < global.AANTAL_GELIJKE_KAARTEN){
        if (global.turnedOver.indexOf(event.target) === -1){
            show(event.target);
        }

        if (global.turnedOver.length > global.AANTAL_GELIJKE_KAARTEN - 1){
            checkCard();
        }
    }
    else {
        checkCard();
    }
}

const playSound = (figure) => {
    let sound = new Audio(global.PATH_PREFIX + figure.getAttribute("data-sound-file") + global.PATH_SUFFIX);
    sound.play();
}

const show = (figure) => {
    playSound(figure);
    global.turnedOver.push(figure);
}

const hide = (figure) => {
    let index = global.turnedOver.indexOf(figure);
    if (index >= 0){
        global.turnedOver.splice(index, 1);
    }
}

const checkCard = () => {
    global.countTries++;

    let soundFiles = [];

    for (let i = 0; i < global.turnedOver.length; i++){
        let soundSource = global.turnedOver[i].getAttribute("data-sound-file");

        soundFiles.push(soundSource);
    }

    if (soundFiles.length > 0){
        let equal = true;
        let soundSource = soundFiles[0];
        for (let i = 1; i < soundFiles.length && equal; i++){
            if (soundSource !== soundFiles[i]){
                equal = false;
            }
        }

        let waitTime = 500;
        if (equal){
            waitTime = 200;
            global.score++;

            setTimeout(() => {
                for (let i = 0; i < global.turnedOver.length; i++){
                    global.turnedOver[i].classList.add("hide");
                }
            }, waitTime);

            if (global.score === 6){
                setTimeout(gameOver, 500);
            }
        }

        setTimeout(() => {
            while (global.turnedOver.length > 0){
                hide(global.turnedOver[0]);
            }
        }, waitTime);
    }

}

const gameOver = () => {
    window.alert("Congratulations!! you completed the game in " + global.countTries + " tries.");
}

window.addEventListener("load", setup);