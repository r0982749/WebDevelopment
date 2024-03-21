const setup = () => {
    let head = document.querySelector("head");
    let styleTorrie = document.createElement("style");
    styleTorrie.setAttribute("type", "text/css");
    head.appendChild(styleTorrie);
    styleTorrie.sheet.insertRule(".listitem { background-color: red; }");

    let items = document.querySelectorAll("li");
    for (let i = 0; i < items.length; i++){
        items[i].classList.add("listitem");
    }

    let div = document.querySelector("div");

    let image = document.createElement("img");
    image.setAttribute("src", "images/htmldaggoe.gif");
    div.appendChild(image);
}

window.addEventListener("load", setup);