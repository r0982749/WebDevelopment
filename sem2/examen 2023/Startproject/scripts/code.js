let global = {
    wordList: ["olijf", "stoel"],
    currentWord: "",
    highscores: [],
    timeout: null,

    tries: 0,
    name: ""
}

const setup = () => {
    let clearButton = document.getElementById("clear");
    let newGameButton = document.getElementById("nieuw");

    restoreGame();
    refreshHighscores(false);

    clearButton.addEventListener("click", clearHighscores);
    newGameButton.addEventListener("click", newGame);

    newGameButton.focus();
}

const clearHighscores = () => {
    localStorage.setItem("highscores", "");
    global.history = [];
    resetHighscoreField();
}

const newGame = () => {
    let name = window.prompt("Vul je naam in!");
    if (name !== null && name.trim() !== ""){
        restoreGame();

        global.name = name;
        document.getElementById("nieuw").hidden = true;
        document.getElementById("gok").disabled = false;
        document.getElementById("gokken").innerHTML = "";

        let goButton = document.getElementById("go");
        goButton.disabled = false;
        goButton.addEventListener("click", checkWord);

        generateWord();
    }
}

const checkWord = () => {
    let woord = document.getElementById("gok").value.trim().toLowerCase();

    if (woord.length === global.currentWord.length){
        global.tries++;
        document.getElementById("gok").value = "";
        let topDiv = document.createElement("div");
        let correctCounter = 0;

        for (let i = 0; i < woord.length; i++){
            let currentDiv = document.createElement("div");
            let letter = woord[i];

            currentDiv.textContent = letter.toUpperCase();

            if (letter === global.currentWord[i]){
                currentDiv.classList.add("juist");
                correctCounter++;
            }
            else if (global.currentWord.indexOf(letter) !== -1){
                currentDiv.classList.add("bevat");
            }
            else {
                currentDiv.classList.add("fout");
            }

            currentDiv.addEventListener("click", displayInfo);
            topDiv.appendChild(currentDiv);
        }

        document.getElementById("gokken").appendChild(topDiv);

        if (correctCounter === global.currentWord.length){
            finished();
        }
    }
}

const generateWord = () => {
    let indexWord = Math.ceil(Math.random() * global.wordList.length) - 1;

    global.currentWord = global.wordList[indexWord];
}

const restoreGame = () => {
    global.name = name;
    global.tries = 0;
    document.getElementById("gok").disabled = true;
    document.getElementById("go").disabled = true;
    document.getElementById("nieuw").hidden = false;
}

const finished = () => {
    addNewHighscore();
    restoreGame();
}

const addNewHighscore = () => {
    score = {
        tries: global.tries,
        name: global.name,
        date: Date.now()
    }

    global.highscores.push(score);
    refreshHighscores(true);
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



window.addEventListener("load", setup)