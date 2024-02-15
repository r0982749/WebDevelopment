const setup = () => {
    let wijzigButton = document.getElementById("wijzigButton");

    wijzigButton.addEventListener("click", welkomTxt);
}

const welkomTxt = () => {
    let pElement = document.getElementById("txtOutput");
    pElement.innerHTML = "Welkom!";
}

window.addEventListener("load", setup);