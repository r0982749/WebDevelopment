let people = [];
const setup = () => {
    let btnNieuw = document.getElementById("btnNieuw");
    let btnBewaar = document.getElementById("btnBewaar");

    btnNieuw.addEventListener("click", clearForm);
    btnBewaar.addEventListener("click", makePerson);
};

const clearForm = (event) => {
    makeForm("","","","","", "");
}

const makeForm = (id, voornaam, familienaam, geboorteDatum, email, aantalKinderen) => {
    let idDiv = document.getElementById("idDiv");
    let txtVoornaam = document.getElementById("txtVoornaam");
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    let txtEmail = document.getElementById("txtEmail");
    let txtAantalKinderen = document.getElementById("txtAantalKinderen");

    idDiv.textContent = id;
    txtVoornaam.value = voornaam;
    txtFamilienaam.value = familienaam;
    txtGeboorteDatum.value = geboorteDatum;
    txtEmail.value = email;
    txtAantalKinderen.value = aantalKinderen;
}

const makePerson = () => {
    valideer();
    if (noError()){
        let txtVoornaam = document.getElementById("txtVoornaam").value;
        let txtFamilienaam = document.getElementById("txtFamilienaam").value;
        let txtGeboorteDatum = document.getElementById("txtGeboorteDatum").value;
        let txtEmail = document.getElementById("txtEmail").value;
        let txtAantalKinderen = document.getElementById("txtAantalKinderen").value;

        let idDiv = document.getElementById("idDiv");

        if (idDiv.textContent === ""){
            let persoon = {
                voornaam: txtVoornaam,
                familienaam: txtFamilienaam,
                geboorteDatum: new Date(txtGeboorteDatum),
                email: txtEmail,
                aantalKinderen: parseInt(txtAantalKinderen)
            };

            people.push(persoon);
        }
        else {
            let person = people[idDiv.textContent];

            person.voornaam = txtVoornaam;
            person.familienaam = txtFamilienaam;
            person.geboorteDatum = new Date(txtGeboorteDatum);
            person.email = txtEmail;
            person.aantalKinderen = parseInt(txtAantalKinderen);
        }

        createSelect();
        clearForm();
    }
}

const createSelect = () => {
    let select = document.getElementById("lstPersonen");
    select.innerHTML = "";
    for (let i = 0; i < people.length; i++){
        let person = people[i];

        let option = document.createElement("option");
        option.setAttribute("id", i + "");
        option.setAttribute("value", JSON.stringify(person));
        option.textContent = person.voornaam + " " + person.familienaam;

        select.appendChild(option);

        option.addEventListener("click", fillInForm);
    }
}

const noError = () => {
    let errVoornaam = document.getElementById("errVoornaam").textContent;
    let errFamilienaam = document.getElementById("errFamilienaam").textContent;
    let errGeboorteDatum = document.getElementById("errGeboorteDatum").textContent;
    let errEmail = document.getElementById("errEmail").textContent;
    let errAantalKinderen = document.getElementById("errAantalKinderen").textContent;

    if (errVoornaam !== ""){
        return false;
    }
    else if (errFamilienaam !== ""){
        return false;
    }
    else if (errGeboorteDatum !== ""){
        return false;
    }
    else if (errEmail !== ""){
        return false;
    }
    else if (errAantalKinderen !== ""){
        return false;
    }

    return true;
}

const fillInForm = (event) => {
    let option = event.target;
    let person = JSON.parse(option.value);
    let geboorteDatum = "";
    if (person.geboorteDatum !== null) {
        geboorteDatum = person.geboorteDatum.substring(0, person.geboorteDatum.indexOf("T"));
    }

    makeForm(option.id, person.voornaam, person.familienaam, geboorteDatum, person.email, person.aantalKinderen);
}

window.addEventListener("load", setup);