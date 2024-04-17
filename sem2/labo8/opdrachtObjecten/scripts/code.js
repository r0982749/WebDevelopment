const setup = () => {
    programma1();

    let button = document.getElementById("submitButton");

    button.addEventListener("click", programma2);

}

const programma1 = () => {
    let student = {
        voornaam: "Lars",
        achternaam: "Coppieters",
        geboorteDatum: new Date("2005-10-05")
    };

    console.log(JSON.stringify(student));
}

const programma2 = () => {
    let input = document.getElementById("jsonInput").value;
    if (input.trim() !== ""){
        let student = JSON.parse(input);

        console.log(student.voornaam + " " + student.achternaam);
    }
}

window.addEventListener("load", setup);