const setup = () => {
    let formButton = document.getElementById("submit-button");
    formButton.addEventListener("click", printResultaat);
}

const printResultaat = () => {
    let output = "";

    let isRoker = document.getElementById("roker").value;
    output += "is ";
    if (isRoker){
        output += "een";
    }
    else {
        output += "geen";
    }
    output += " roker\n";


    let moedertaal = document.getElementsByName("moedertaal");

    output += "moedertaal is ";
    for (let i = 0; i < moedertaal.length; i++){
        if (moedertaal[i].checked){
            output += moedertaal[i].value;
        }
    }
    output += "\n";

    let buurlanden = document.getElementById("buurland").options;

    output += "favoriete buurland is ";
    for (let i = 0; i < buurlanden.length; i++){
        if (buurlanden[i].selected){
            output += buurlanden[i].value;
        }
    }
    output += "\n";

    let items = document.getElementById("bestelling").options;

    output += "bestelling bestaat uit ";
    for (let i = 0; i < items.length; i++){
        if (items[i].selected){
            output += items[i].value + " ";
        }
    }
    console.log(output.trim());
}

window.addEventListener("load", setup);