const setup = () => {
    let button = document.getElementById("goButton");

    button.addEventListener("click", makeTable);
}

const makeTable = () => {
    let input = document.getElementById("inputGetal");
    let getal = input.value;

    if (checkIfGetal(getal)){
        let time = new Date().toTimeString().substring(0, 8);
        let mainDiv = document.getElementById("output");

        let tableDiv = document.createElement("div");
        mainDiv.appendChild(tableDiv);

        tableDiv.classList.add("tableDiv");

        let tableHead = document.createElement("div");
        tableHead.textContent = "Tafel van " + getal + " aangemaakt op: " + time;
        tableDiv.appendChild(tableHead);

        for (let i = 0; i < 10; i++){
            let product = getal * (i+1);

            let tableRow = document.createElement("div");
            tableRow.textContent = "" + getal + " x " + (i+1) + " = " + product;

            tableDiv.appendChild(tableRow);
        }

        input.value = "";
    }
    else {
        alert("Input is not a number!!");
    }
}

const checkIfGetal = (tekst) => {
    return !isNaN(tekst);
}

window.addEventListener("load", setup);