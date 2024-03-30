let global = {
    AANTAL_HORIZONTAAL: 1,
    AANTAL_VERTICAAL: 1,
    AANTAL_KAARTEN: 6,
    AANTAL_GELIJKE_KAARTEN: 3,

    PATH_PREFIX: "assets/images/",
    PATH_SUFFIX: ".png",

    images: [],

    turnedOver: [],
    score: 0,
    countTries: 0
}

const setup = () => {
    makeElements();
}

const makeElements = () => {
    makeImages();

    let matchingField = document.getElementById("matchingField");
    makeFieldConstraints(matchingField);

    let sizeImageArray = global.images.length
    for (let i = 0; i < sizeImageArray; i++){
        let figure = document.createElement("figure");
        addClasses(figure);


        let image = getRandomImage();

        figure.appendChild(image);
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

const getRandomImage = () => {
    let randomIndex = Math.floor(Math.random() * global.images.length);
    return global.images.splice(randomIndex, 1)[0];
}

const makeImages = () => {
    for (let i = 0; i < global.AANTAL_KAARTEN; i++){
        for (let j = 0; j < global.AANTAL_GELIJKE_KAARTEN; j++){
            let image = document.createElement("img");
            addClasses(image);
            image.setAttribute("src", global.PATH_PREFIX + i + global.PATH_SUFFIX);
            global.images.push(image);
        }
    }
}

const addClasses = (element) => {
    if (element.localName === "img"){
        element.classList.add("matchImage");
        element.classList.add("hide");
    }
    else {
        element.classList.add("matchFigure");
    }
}

const tryTurnOver = (event) => {
    if (global.turnedOver.length < global.AANTAL_GELIJKE_KAARTEN){
        if (event.target.localName !==  "img"){
            show(event.currentTarget.children[0]);
        }
        if (global.turnedOver.length > global.AANTAL_GELIJKE_KAARTEN - 1){
            checkCard();
        }
    }
    else {
        checkCard();
    }
}

const playSound = () => {
    let randomNumber = Math.floor(Math.random() * 3);
    let sound = new Audio("assets/sounds/paperSound" + randomNumber + ".mp3");
    sound.play();
}

const show = (image) => {
    playSound();
    image.classList.remove("hide");
    global.turnedOver.push(image);
}

const hide = (image) => {
    image.classList.add("hide");

    let index = global.turnedOver.indexOf(image);
    if (index >= 0){
        global.turnedOver.splice(index, 1);
    }
}

const checkCard = () => {
    global.countTries++;

    let imageSrcs = [];

    for (let i = 0; i < global.turnedOver.length; i++){
        let imageSrc = global.turnedOver[i].getAttribute("src");
        imageSrc = imageSrc.substring(imageSrc.indexOf(".") - 1, imageSrc.indexOf(".") + 1);

        imageSrcs.push(imageSrc);
    }

    if (imageSrcs.length > 0){
        let equal = true;
        let tempImageSrc = imageSrcs[0];
        for (let i = 1; i < imageSrcs.length && equal; i++){
            if (tempImageSrc !== imageSrcs[i]){
                equal = false;
            }
        }

        let waitTime = 500;
        if (equal){
            waitTime = 200;
            global.score++;

            setTimeout(() => {
                for (let i = 0; i < global.turnedOver.length; i++){
                    hide(global.turnedOver[i].parentElement);
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
    window.alert("Congradulations!! you completed the game in " + global.countTries + " tries.");
}

window.addEventListener("load", setup);