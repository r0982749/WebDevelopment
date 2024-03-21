const setup = () => {
    let select = document.getElementById("fotoSelect");
    let input = document.getElementById("letterInput");

    select.addEventListener("change", updateFoto);
    input.addEventListener("input", updateText);
}

const updateFoto = () => {
    let imgDiv = document.getElementById("img");

    let currentOption = getSelectedOption();


    if (currentOption !== null){
        updateNote();
        imgDiv.classList.remove("hidden");

        if (currentOption.value === "metEi"){
            imgDiv.classList.remove("with-egg");
        }
        else {
            imgDiv.classList.add("with-egg");
        }
    }
}

const updateNote = () => {
    let pNote = document.getElementById("note");

    let option = getSelectedOption();
    if (option !== null && option.value !== ""){
        pNote.textContent = "Hierboven, een kip";
        pNote.textContent += " " + option.textContent.toLowerCase();
    }
}

const getSelectedOption = () => {
    let options = document.getElementById("fotoSelect").options;

    let currentOption = null;
    for (let i = 1; i < options.length; i++){
        if (options[i].selected){
            currentOption = options[i];
        }
    }

    return currentOption;
}

const updateText = () => {
    updateNote();
    let pNote = document.getElementById("note");
    let tekst = pNote.textContent;
    tekst = tekst.toLowerCase();
    let letter = document.getElementById("letterInput").value;
    let zoekLetter = letter.toLowerCase();

    if (tekst !== "" && zoekLetter !== ""){
        let aantalKeer = 0;
        let index = 0;


        while (index !== -1 && tekst.length !== 0){
            index = tekst.indexOf(zoekLetter);
            if (index !== -1 ){
                aantalKeer++;
                tekst = tekst.substring(index + 1);
            }
        }
        pNote.innerHTML += "<br>";
        pNote.textContent += "Letter \"" + letter + "\" komt " + aantalKeer + " keer voor in bovenstaande zin.";
    }
}

window.addEventListener("load", setup);