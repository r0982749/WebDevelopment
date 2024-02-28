const setup = () => {
    let elementen = document.getElementsByClassName("belangrijk");

    for (let i = 0; i < elementen.length; i++){
        elementen[i].classList.add("opvallend");
    }
}
window.addEventListener("load", setup);