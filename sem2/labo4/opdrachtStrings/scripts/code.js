let pElements = document.getElementsByTagName("p");
const setup = () => {
    elementUpdater();
}

const elementUpdater = () => {
    let leeftijd = 34;
    let intrest = 0.12;
    let isGevaarlijk=true;
    let vandaag = new Date();
    const print = (message) => {
        console.log(message);
    }

    pElements[0].textContent += typeof leeftijd;
    pElements[1].textContent += typeof intrest;
    pElements[2].textContent += typeof isGevaarlijk;
    pElements[3].textContent += typeof vandaag;
    pElements[4].textContent += typeof print;

}


window.addEventListener("load", setup);