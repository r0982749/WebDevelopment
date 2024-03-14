const setup = () => {
    let validateButton = document.getElementById("validateButton");
    validateButton.addEventListener("click", makeValidation);
}

const makeValidation = () => {
    validateVoornaam();
    validateFamilienaam();
    validateGeboortedatum();
    validateEmail();
    validateAantalKinderen();
}

const validateVoornaam = () => {
    let input = document.getElementById("voornaam");
    clearInput(input);
    let errorSpan = document.getElementById("errorVoornaam");
    clearErrorSpan(errorSpan);

    if (input.value.length > 30){
        validationError(input, errorSpan, "max. 30 karakters");
        input.addEventListener("change", validateVoornaam);
    }
}

const validateFamilienaam = () => {
    let input = document.getElementById("familienaam");
    clearInput(input);
    let errorSpan = document.getElementById("errorFamilienaam");
    clearErrorSpan(errorSpan);

    if (input.value.trim() === ""){
        validationError(input, errorSpan, "verplicht veld");
        input.addEventListener("change", validateFamilienaam);
    }
    if (input.value.length > 50){
        validationError(input, errorSpan, "max. 50 karakters");
        input.addEventListener("change", validateFamilienaam);
    }
}

const validateGeboortedatum = () => {
    let input = document.getElementById("geboortedatum");
    clearInput(input);
    let errorSpan = document.getElementById("errorGeboortedatum");
    clearErrorSpan(errorSpan);

    if (input.value === ""){
        validationError(input, errorSpan, "verplicht veld");
        input.addEventListener("change", validateGeboortedatum);
    }
    if (input.value.search(/[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/)){
        validationError(input, errorSpan, "formaat is niet jjjj-mm-dd");
        input.addEventListener("change", validateGeboortedatum);
    }
}

const validateEmail = () => {
    let input = document.getElementById("email");
    clearInput(input);
    let errorSpan = document.getElementById("errorEmail");
    clearErrorSpan(errorSpan);

    if (input.value === ""){
        validationError(input, errorSpan, "verplicht veld");
        input.addEventListener("change", validateEmail);
    }
    if ((input.value.match(/@/g) || []).length !== 1){
        validationError(input, errorSpan, "geen geldig email adres");
        input.addEventListener("change", validateEmail);
    }
    if (input.value.search(/.*.@.+/)){
        validationError(input, errorSpan, "geen geldig email adres");
        input.addEventListener("change", validateEmail);
    }
}

const validateAantalKinderen = () => {
    let input = document.getElementById("aantalKinderen");
    clearInput(input);
    let errorSpan = document.getElementById("errorAantalKinderen");
    clearErrorSpan(errorSpan);

    if (isGetal(input.value)){
        if (input.value < 0){
            validationError(input, errorSpan, "is geen positief getal");
            input.addEventListener("change", validateAantalKinderen);
        }
        if (input.value > 99){
            validationError(input, errorSpan, "is te vruchtbaar");
            input.addEventListener("change", validateAantalKinderen);
        }
    }
    else {
        validationError(input, errorSpan, "is geen positief getal");
        input.addEventListener("change", validateAantalKinderen);
    }
}

const isGetal = (tekst) => {
    return !isNaN(tekst);
}

const validationError = (input, errorSpan, errorText) => {
    input.classList.add("errorInput");
    errorSpan.textContent = errorText;
    errorSpan.hidden = false;
}

const clearInput = (input) => {
    input.classList.remove("errorInput");
}

const clearErrorSpan = (errorSpan) => {
    errorSpan.textContent = "";
    errorSpan.hidden = true;
}



window.addEventListener("load", setup);