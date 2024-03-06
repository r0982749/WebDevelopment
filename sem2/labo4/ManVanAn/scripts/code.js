const setup = () => {
    checkZin()
}

const checkZin = () => {
    let zin = document.getElementById("zin").textContent;

    document.getElementById("aantal").textContent += aantalKeerZoekWoordInZin("an", zin);
}

const aantalKeerZoekWoordInZin = (zoekWoord, zin) =>{
    zin = zin.toLowerCase();
    let rnd = Math.random();
    if (rnd < 0.5){
        rnd = 0;
    }
    else {
        rnd = 1;
    }

    if (rnd === 0){
        return indexOfZoeken(zoekWoord, zin);
    }
    else {
        return lastIndexOfZoeken(zoekWoord, zin);
    }
}

const indexOfZoeken = (zoekWoord, zin) => {
    let aantalKeer = 0;
    let index = 0;

    while (index !== -1){
        index = zin.indexOf(zoekWoord);
        if (index !== -1 ){
            aantalKeer++;
            zin = zin.substring(index + zoekWoord.length);
        }
    }

    return aantalKeer;
}

const lastIndexOfZoeken = (zoekWoord, zin) => {
    let aantalKeer = 0;
    let index = 0;

    while (index !== -1){
        index = zin.lastIndexOf(zoekWoord);
        if (index !== -1 ){
            aantalKeer++;
            zin = zin.substring(0, index);
        }
    }

    return aantalKeer;
}

window.addEventListener("load", setup);