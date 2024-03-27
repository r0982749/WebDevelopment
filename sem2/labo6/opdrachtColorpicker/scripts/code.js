const setup = () => {
    let sliders = document.getElementsByClassName("slider");
    let button = document.querySelector("#button").firstElementChild;
    updateColorField()

    for (let i = 0; i < sliders.length; i++){
        sliders[i].addEventListener("change", updateColorField);
        sliders[i].addEventListener("input", updateColorField);
    }

    button.addEventListener("click", saveColor);
}

const updateColorField = () => {
    let redValue = document.getElementById("redSlider").value;
    let greenValue = document.getElementById("greenSlider").value;
    let blueValue = document.getElementById("blueSlider").value;

    document.getElementById("redPara").textContent = "Red: " + redValue;
    document.getElementById("greenPara").textContent = "Green: " + greenValue;
    document.getElementById("bluePara").textContent = "Blue: " + blueValue;

    let field = document.getElementById("colorField");
    field.style.backgroundColor = "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
}

const saveColor = () => {
    let color = document.getElementById("colorField").style.backgroundColor;
    let red = color.substring(color.indexOf("(") + 1, color.indexOf(","));
    let tempColor = color.substring(color.indexOf(", ") + 2);
    let green = tempColor.substring(0, tempColor.indexOf(","));
    tempColor = tempColor.substring(tempColor.indexOf(", ") + 2);
    let blue = tempColor.substring(0, tempColor.indexOf(")"));



    let saveDiv = document.createElement("div");
    saveDiv.setAttribute("data-red-value", red);
    saveDiv.setAttribute("data-green-value", green);
    saveDiv.setAttribute("data-blue-value", blue);
    saveDiv.classList.add("save-div");
    saveDiv.style.backgroundColor = color;


    let buttonDiv = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "X";

    removeButton.addEventListener("click", removeColorSave);

    buttonDiv.appendChild(removeButton);
    saveDiv.appendChild(buttonDiv);

    saveDiv.addEventListener("click", restoreColor)
    document.getElementById("save-field").appendChild(saveDiv);
}

const restoreColor = (event) => {
    let saveDiv = event.target;
    document.getElementById("redSlider").value = saveDiv.getAttribute("data-red-value");
    document.getElementById("greenSlider").value = saveDiv.getAttribute("data-green-value");
    document.getElementById("blueSlider").value = saveDiv.getAttribute("data-blue-value");

    updateColorField();
}

const removeColorSave = (event) => {
    let saveDiv = event.target.parentElement.parentElement;
    saveDiv.remove();
}

window.addEventListener("load", setup);