let global = {
    history: []
}

const setup = () => {
    restoreHistory("");
    let clearButton = document.getElementById("clearHistory");

    let button = document.getElementById("goButton");

    button.addEventListener("click", readCommand);
    clearButton.addEventListener("click", removeHistory);
}

const readCommand = () => {
    let input = document.getElementById("cmd")
    let inputText = input.value.trim();
    if (inputText !== "" && inputText.indexOf("/") !== -1 && inputText.indexOf(" ") !== -1){
        let cmdWord = inputText.substring(inputText.indexOf("/") + 1, inputText.indexOf("/") + 2).toLowerCase();
        let parameter = inputText.substring(inputText.indexOf(" ", inputText.indexOf(cmdWord)) + 1).trim();

        let title = "";
        let url = "";
        let replaceValue = "";

        if (cmdWord === "g"){
            url = "http://www.google.com/search?q=";
            title = "Google"
            replaceValue = "+";
        }
        else if (cmdWord === "y"){
            url = "https://www.youtube.com/results?search_query=";
            title = "Youtube";
            replaceValue = "+"
        }
        else if (cmdWord === "t"){
            url = "https://twitter.com/hashtag/";
            title = "Twitter";
        }
        else if (cmdWord === "i"){
            url = "http://www.instagram.com/explore/tags/";
            title = "Instagram";
        }

        if (url !== ""){
            parameter = parameter.replaceAll(" ", replaceValue);
            url += parameter;

            addSearch(title, parameter, url);
            input.value = "";
        }
        else {
            window.alert("Unknown command prefix");
        }
    }
    else {
        window.alert("Invalid command");
    }
}

const addSearch = (title, parameter, url) => {
    let search = {
        title: title,
        text: parameter,
        url: url
    }

    global.history.push(search);

    let json = JSON.stringify(global.history);

    window.open(url);

    restoreHistory(json);
}

const restoreHistory = (json) => {
    if (json === ""){
        let localTorrie = localStorage.getItem("history");
        if (localTorrie === ""){
            global.history = null;
        }
        else {
            global.history = JSON.parse(localTorrie);
        }
    }
    else {
        global.history = JSON.parse(json);
        localStorage.setItem("history", json);
    }
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    if (global.history !== null){
        for (let i = 0; i < global.history.length; i++){
            let search = global.history[i];
            let searchDiv = document.createElement("div");

            searchDiv.innerHTML = "<h1>" + search.title +"</h1><p>" + search.text +"</p>";

            let button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("data-url", search.url);
            button.textContent = "Go!";

            button.addEventListener("click", historyButton);

            searchDiv.appendChild(button);
            searchDiv.classList.add("card");
            searchDiv.classList.add(search.title);

            historyDiv.appendChild(searchDiv);
        }
    }
    else {
        global.history = [];
    }
}

const historyButton = (event) => {
    let searchDiv = event.target;
    let url = searchDiv.getAttribute("data-url");

    window.open(url);

    event.stopPropagation()
}

const removeHistory = () => {
    localStorage.setItem("history", "");
    restoreHistory("");
    location.reload();
}

window.addEventListener("load", setup);