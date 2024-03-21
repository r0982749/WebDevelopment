const setup = () => {
    let div = document.getElementById("myDIV");
    let newPara = document.createElement("p");
    div.appendChild(newPara);
}
window.addEventListener("load", setup);