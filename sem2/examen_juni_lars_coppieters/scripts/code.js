global = {
    vragen: [],
    currentVraagIndex: null,

    highscores: []
}

const setup = () => {
    let startButton = document.getElementById("start");

    startButton.focus();
    startButton.addEventListener("click", startQuiz);

    document.getElementById("reset").addEventListener("click", clearHighscores);

    let ol = document.createElement("ol");
    ol.setAttribute("id", "highscoreField");

    document.getElementById("highscores").appendChild(ol);
    restoreHighscores();
}

const startQuiz = () => {
    document.getElementById("start").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");

    document.getElementsByClassName("card")[0].classList.remove("d-none");

    document.getElementById("started").textContent = getFormattedDate();

    initilizeVragen();
    makeVragenLijst();

    toonVraag(null, 0);
    let opslaan = document.getElementsByClassName("btn-success")[0];
    opslaan.addEventListener("click", opslagenVraag);

    document.getElementById("submit").addEventListener("click", indienen);
}

const restart = () => {
    document.getElementsByClassName("container")[2].classList.add("d-none");
    global.currentVraagIndex = null;
    startQuiz();
}

const makeVragenLijst = () => {
    document.getElementById("questions").innerHTML = "";
    for (let i = 0; i < global.vragen.length; i++){
        let li = document.createElement("li");
        li.textContent = "Vraag " + (i + 1);
        li.setAttribute("data-index", i);
        li.classList.add("list-group-item");

        li.addEventListener("click", toonVraag);
        document.getElementById("questions").appendChild(li);
    }
}

const toonVraag = (event, index) => {
    if (event === null || !event.target.classList.contains("bg-success")){
        if (event === null || !event.target.classList.contains("bg-danger")){
            if (index === undefined){
                index = parseInt(event.target.getAttribute("data-index"));
            }

            global.currentVraagIndex = index;
            let vragenLijst = document.getElementById("questions").children;

            for (let i = 0; i < vragenLijst.length; i++){
                vragenLijst[i].classList.remove("active");
            }

            vragenLijst[index].classList.add("active");

            let vraagNummer = index + 1;
            document.getElementsByClassName("card-header")[0].textContent = "Vraag #" + vraagNummer;

            let vraag = global.vragen[index];
            document.getElementsByClassName("card-title")[0].textContent = vraag.question;

            let answers = vraag.answers;
            document.getElementById("answers").innerHTML = "";
            let indexes = [];

            while (answers.length !== indexes.length) {
                let rnd = Math.ceil(Math.random() * answers.length) - 1;

                if (indexes.indexOf(rnd) === -1) {
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.addEventListener("click", selectAnswer);
                    li.textContent = answers[rnd];

                    indexes.push(rnd);

                    document.getElementById("answers").appendChild(li);
                }
            }

            let i = 0;
            let list = document.getElementById("answers").children;
            let found = false
            while (i < list.length && !found){
                if (list[i].textContent === vraag.selected){
                    selectAnswer(null, i);
                    found = true;
                }
                i++;
            }
        }
    }

}

const opslagenVraag = () => {
    let vraagNummer = global.currentVraagIndex + 1;

    let vraagItem = document.getElementById("questions").children[vraagNummer - 1];

    let vraag = global.vragen[global.currentVraagIndex];

    if (vraag.selected !== ""){
        if (vraag.selected === vraag.correct){
            vraagItem.classList.add("bg-success");
            global.correctAnswers++;
        }
        else {
            vraagItem.classList.add("bg-danger");
        }
    }
    else {
        vraagItem.classList.add("bg-danger");
    }

    if (vraagNummer < 10){
        toonVraag(null, vraagNummer);
    }
    else {
        document.getElementsByClassName("card")[0].classList.add("d-none");
    }
}

const selectAnswer = (event, index) => {
    let answers = document.getElementById("answers").children;

    for (let i = 0; i < answers.length; i++){
        answers[i].classList.remove("bg-info");
    }

    if (event !== null){
        event.target.classList.add("bg-info");
        event.stopPropagation();

        global.vragen[global.currentVraagIndex].selected = event.target.textContent;
    }
    else {
        answers[index].classList.add("bg-info");
    }
}

const initilizeVragen = () => {
    global.vragen = [];
    let vragen = [
        {
            question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
            answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
            correct: "Cloud Strife",
            selected: ""
        },
        {
            question: "Welke wereld wordt verkend in Final Fantasy XV?",
            answers: ["Gaia", "Eos", "Spira", "Cocoon"],
            correct: "Eos",
            selected: ""
        },
        {
            question: "Wie is de antagonist in Final Fantasy VIII?",
            answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
            correct: "Ultimecia",
            selected: ""
        },
        {
            question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
            answers: ["Ja", "Nee"],
            correct: "Ja",
            selected: ""
        },
        {
            question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
            answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
            correct: "Midgar",
            selected: ""
        },
        {
            question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
            answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
            correct: "Ifrit",
            selected: ""
        },
        {
            question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
            answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
            correct: "Ragnarok",
            selected: ""
        },
        {
            question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
            answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
            correct: "Luchtschipkapitein",
            selected: ""
        },
        {
            question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
            answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
            correct: "Ze gebruiken de aanval 1000 Needles",
            selected: ""
        },
        {
            question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
            answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
            correct: "Malboro",
            selected: ""
        }
    ]


    while (vragen.length > 0){
        let rnd = Math.ceil(Math.random() * vragen.length) - 1;

        global.vragen.push(vragen[rnd]);
        vragen.splice(rnd, 1);
    }
}

const getFormattedDate = () => {
    let maanden = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    let datum = new Date();

    let output = datum.getDate() + " ";
    output += maanden[datum.getMonth()].toLowerCase() + " om ";

    let minuten;
    if (datum.getMinutes() < 10) {
        minuten = "0" + datum.getMinutes();
    }
    else {
        minuten = datum.getMinutes();
    }
    output += datum.getHours() + ":" + minuten;

    return output;
}

const indienen = () => {
    document.getElementById("quiz").classList.add("d-none");

    document.getElementsByClassName("container")[2].classList.remove("d-none");
    document.getElementById("restart").addEventListener("click", restart);

    let vraagItems = document.getElementById("questions").children;
    let vragenJuist = 0;
    for (let i = 0; i < vraagItems.length; i++){
        if (vraagItems[i].classList.contains("bg-success")){
            vragenJuist++;
        }
    }
    document.getElementById("score").textContent = "Je hebt " + vragenJuist + " op " + global.vragen.length;

    addHighscore(vragenJuist);
}

const addHighscore = (score) => {
    global.highscores.push(score);
    sortHighscores();

    restoreHighscores();
}

const restoreHighscores = () => {
    if (localStorage.getItem("highscores-quiz") === null || localStorage.getItem("highscores-quiz") === ""){
        localStorage.setItem("highscores-quiz", JSON.stringify(global.highscores));
    }
    else{
        global.highscores = JSON.parse(localStorage.getItem("highscores-quiz"));
    }
    document.getElementById("highscoreField").innerHTML = "";

    for (let i = 0; i < global.highscores.length; i++){
        let li = document.createElement("li");
        let score = global.highscores[i];
        li.textContent = score + " punt(en)";

        document.getElementById("highscoreField").appendChild(li);
    }
}

const clearHighscores = () => {
    global.highscores = [];
    localStorage.setItem("highscores-quiz", "");

    document.getElementById("highscoreField").innerHTML = "";
}

const sortHighscores = () => {
    let list = global.highscores;

    let item = null;
    let foundIndex = -1;

    let sortedList = [];
    while (list.length !== 0){
        for (let i = 0; i < list.length; i++){
            if (i === 0 || item < list[i]){
                item = list[i];
                foundIndex = i;
            }
        }
        list.splice(foundIndex, 1);
        sortedList.push(item);
    }

    global.highscores = sortedList;
    localStorage.setItem("highscores-quiz", JSON.stringify(global.highscores));
}

window.addEventListener("load", setup);