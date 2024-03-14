let gemeentes;

const setup = () => {
    gemeentes = [];
    promptSpawner();
    selectUpdater()
}

const promptSpawner = () => {
    let gemeente = "";

    while (gemeente !== "stop"){
        gemeente = prompt("Gemeente:", "stop").trim();
        if (gemeente !== "stop"){
            gemeentes.push(gemeente);
        }
    }
}

const selectUpdater = () =>{
    let select = document.getElementById("gemeente");
    gemeentes.sort();

    for (let i = 0; i < gemeentes.length; i++){
        let value = gemeentes[i].toLowerCase();
        let text = gemeentes[i].charAt(0).toUpperCase() + gemeentes[i].substring(1).toLowerCase();

        select.innerHTML += "<option value=\"" + value + "\">" + text + "</option>";
    }

    if (gemeentes.length !== 0){
        select.hidden = false;
    }
}

window.addEventListener("load", setup);