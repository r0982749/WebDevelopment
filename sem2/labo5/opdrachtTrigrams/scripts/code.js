const setup = () => {
    printTrigrams("onoorbaar")
}

const printTrigrams = (woord) => {
    let aantalLetters = woord.length;
    for (let i = 0; i < aantalLetters - 2; i++){
        console.log(woord.substring(0, 3));
        woord = woord.substring(1);
    }
}

window.addEventListener("load", setup);