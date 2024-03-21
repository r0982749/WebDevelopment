const setup = () => {
    let pElements = document.querySelectorAll("p");
    for (let i = 0; i < pElements.length; i++){
        pElements[i].textContent = "Good job!";
    }
}

window.addEventListener("load", setup);