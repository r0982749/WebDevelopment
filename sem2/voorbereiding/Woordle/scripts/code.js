global = {
    name: "",
    words: ["olijf", "tafel", "steel"],
    currentWord: "",
    tries: 0,

    highscores: [],
    timeout: null
};

const setup = () => {
    let newGameButton = document.getElementById("nieuw");

    newGameButton.addEventListener("click", nieuwSpel);
    newGameButton.focus();
    restoreGame();
    refreshHighscores(false);

    document.getElementById("clear").addEventListener("click", clearHighscores);
}

const nieuwSpel = (event) => {
    let name = window.prompt("Enter your name");

    if (name !== null && name.trim() !== ""){
        event.target.hidden = true;
        document.getElementById("gok").disabled = false;

        global.name = name;

        let goButton = document.getElementById("go");
        goButton.disabled = false;
        goButton.addEventListener("click", checkWoord);

        kiesWoord();
    }
}

const checkWoord = () => {
    let woord = document.getElementById("gok").value.trim().toLowerCase().split("");

    if (woord.length === global.currentWord.length){
        global.tries++;
        document.getElementById("gok").value = "";

        let raadWoord = global.currentWord.split("");
        let topDiv = document.createElement("div");

        let correctLetters = 0;

        let nextList = [];


        for (let i = 0; i < raadWoord.length; i++){
            let letterDiv = document.createElement("div");
            letterDiv.addEventListener("click", displayInfo);
            letterDiv.textContent = woord[i].toUpperCase();

            if (woord[i] === raadWoord[i]){
                letterDiv.classList.add("juist");
                woord.splice(i, 1);
                raadWoord.splice(i, 1);
                i = i - 1;

                correctLetters++;
            }
            else {
                nextList.push(letterDiv);
            }

            topDiv.appendChild(letterDiv);
        }

        for (let i = 0; i < nextList.length; i++){
            let letter = nextList[i].textContent.toLowerCase();
            if (raadWoord.indexOf(letter) !== -1){
                nextList[i].classList.add("bevat");
                raadWoord.splice(raadWoord.indexOf(letter), 1);
            }
            else {
                nextList[i].classList.add("fout");
            }
        }

        document.getElementById("gokken").appendChild(topDiv);
        if (correctLetters === global.currentWord.length){
            stopSpel();
        }
    }
}

const stopSpel = () => {
    addHighscore();
    restoreGame();
}

const restoreGame = () => {
    global.name = name;
    global.tries = 0;
    document.getElementById("gok").disabled = true;
    document.getElementById("go").disabled = true;
    document.getElementById("nieuw").hidden = false;
}

const addHighscore = () => {
    score = {
        tries: global.tries,
        name: global.name,
        date: Date.now()
    };

    global.highscores.push(score);
    refreshHighscores(true);
}

const clearHighscores = () => {
    localStorage.setItem("highscores", "");
    global.highscores = [];
    resetHighscoreField();
}

const kiesWoord = () => {
    let indexWoord = Math.ceil(Math.random() * global.words.length) - 1;

    global.currentWord = global.words[indexWoord];
}

const resetHighscoreField = () => {
    let highscoreDiv = document.getElementById("highscores");
    highscoreDiv.innerHTML = "<h2>Highscores<button id=\"clear\">x</button></h2>";
    document.getElementById("clear").addEventListener("click", clearHighscores);
}

const refreshHighscores = (endOfGame) => {
    if (!endOfGame){
        if (localStorage.getItem("highscores") !== "" && localStorage.getItem("highscores") !== null){
            global.highscores = JSON.parse(localStorage.getItem("highscores"))
        }
        else {
            global.highscores = [];
            localStorage.setItem("highscores", "");
        }
    }
    else {
        let highscoreString = JSON.stringify(global.highscores);
        localStorage.setItem("highscores", highscoreString);
    }

    if (global.highscores.length !== 0){
        let listElements = document.createElement("ol");
        listElements.setAttribute("type", 1);

        sortList();
        for (let i = 0; i < global.highscores.length; i++){
            let highscoreItem = document.createElement("li");

            let score = global.highscores[i];
            let datum = new Date(score.date);
            highscoreItem.innerHTML = `${score.name}: ${score.tries} gok(ken)<br>[${getFormattedString(datum)}]`;

            listElements.appendChild(highscoreItem);
        }
        resetHighscoreField();
        document.getElementById("highscores").appendChild(listElements);
    }
}

const sortList = () => {
    let list = global.highscores;

    let item = null;
    let foundIndex = -1;

    let sortedList = [];
    while (list.length !== 0){
        for (let i = 0; i < list.length; i++){
            if (i === 0 || item.tries > list[i].tries){
                item = list[i];
                foundIndex = i;
            }
        }
        list.splice(foundIndex, 1);
        sortedList.push(item);
    }

    global.highscores = sortedList;
    localStorage.setItem("highscores", JSON.stringify(global.highscores));
}

const getFormattedString = (date) => {
    let output = "";
    output += date.getDate();
    output += " " + getMaand(date.getMonth());
    output += " " + date.getFullYear();
    output += " " + date.getHours();
    output += ":" + date.getMinutes();

    return output;
}

const getMaand = (index) => {
    let maanden = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

    return maanden[index];
}

const displayInfo = (event) => {
    clearTimeout(global.timeout);
    let div = event.target;

    let letter = div.textContent;

    let p = document.getElementsByClassName("help")[0];
    p.textContent = "";
    p.classList.remove("hidden");
    if (div.classList.contains("juist")){
        p.textContent = "De letter " + letter + " zit in het woord en staat op de juiste positie!";
    }
    else if (div.classList.contains("bevat")){
        p.textContent = "de letter " + letter + " zit in het woord!";
    }
    else if (div.classList.contains("fout")){
        p.textContent = "de letter " + letter + " zit niet in het woord!";
    }

    event.stopPropagation();
    global.timeout = setTimeout( () => p.classList.add("hidden"), 2500)
}



window.addEventListener("load", setup);