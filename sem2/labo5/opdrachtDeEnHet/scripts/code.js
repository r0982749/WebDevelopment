const setup = () => {
    printZinMetHetAlsDe("Gisteren zat de jongen op de stoep en at de helft van de appel")
}

const printZinMetHetAlsDe = (zin) => {
    let ArrayVanWoorden = zin.split(" ");

    for (let i = 0; i < ArrayVanWoorden.length; i++){
        let woord = ArrayVanWoorden[i];
        if (woord === "de"){
            ArrayVanWoorden[i] = "het";
        }
        else if (woord === "De"){
            ArrayVanWoorden[i] = "Het";
        }
    }

    zin = ArrayVanWoorden.join(" ");

    console.log(zin);
}

window.addEventListener("load", setup);