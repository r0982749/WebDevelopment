let global = {
    IMAGE_COUNT: 5,
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",

    MOVE_DELAY: 3000,

    score: 0,
    timeoutId: 0
};

const setup = () => {
    let startButton = document.getElementById("start");
    startButton.addEventListener("click", startGame);
};

const startGame = (event) => {
    event.target.hidden = true;
    let image = document.getElementById("target");

    image.addEventListener("click", checkClick);

    imageTorries();
}

const checkClick = (event) => {
    let image = event.target;
    clearTimeout(global.timeoutId);

    if (image.getAttribute("src").includes("0")){
        window.alert("GAME OVER");
    }
    else {
        global.score++;
        document.getElementById("hitCounter").textContent = "Aantal hits: " + global.score;
        imageTorries();
    }
}

const imageTorries = () => {
    let image = document.getElementById("target");

    randomImg(image);
    moveImg(image);
    document.getElementById("hitCounter").textContent = "Aantal hits: " + global.score;
    global.timeoutId = setTimeout(imageTorries, 1000);
}

const randomImg = (image) => {
    let imageNumber = Math.floor(Math.random() * global.IMAGE_COUNT);

    image.setAttribute("src", global.IMAGE_PATH_PREFIX + imageNumber + global.IMAGE_PATH_SUFFIX);
}

const moveImg = (image) => {
    let xPos = Math.floor(Math.random() * (600 - global.IMAGE_SIZE));
    let yPos = Math.floor(Math.random() * (800 - global.IMAGE_SIZE));

    image.style.left = xPos + "px";
    image.style.top = yPos + "px";
}

window.addEventListener("load", setup);


