let global = {
    saves: []
}

const setup = () => {
    let sliders = document.getElementsByClassName("slider");
    let button = document.querySelector("#button").firstElementChild;
    reloadSaves();


    for (let i = 0; i < sliders.length; i++){
        sliders[i].addEventListener("change", updateColorField);
        sliders[i].addEventListener("input", updateColorField);
    }

    button.addEventListener("click", saveColor);
}

const reloadSaves = () => {
    let longSaveString = localStorage.getItem("saves");
    longSaveString = longSaveString.split(";");

    for (let i = 0; i < longSaveString.length; i++){
        let rgbString = longSaveString[i];

        let values = getRGBValues(rgbString);

        createSave(values[0], values[1], values[2]);
    }

    let rgbFieldString = localStorage.getItem("colorFieldRGB");
    let values = getRGBValues(rgbFieldString);

    document.getElementById("redSlider").value = values[0];
    document.getElementById("greenSlider").value = values[1];
    document.getElementById("blueSlider").value = values[2];

    updateColorField();
}

const getRGBValues = (rgbString) => {
    let red = rgbString.substring(rgbString.indexOf("(") + 1, rgbString.indexOf(","));
    rgbString = rgbString.substring(rgbString.indexOf(",") + 1);
    let green = rgbString.substring(0, rgbString.indexOf(","));
    rgbString = rgbString.substring(rgbString.indexOf(",") + 1);
    let blue = rgbString.substring(0, rgbString.indexOf(")"));

    let output = red + " " + green + " " + blue;
    return output.split(" ");
}

const updateColorField = () => {
    let redValue = document.getElementById("redSlider").value;
    let greenValue = document.getElementById("greenSlider").value;
    let blueValue = document.getElementById("blueSlider").value;

    localStorage.setItem("colorFieldRGB", createKeyValue(redValue, greenValue, blueValue));

    document.getElementById("redPara").textContent = "Red: " + redValue;
    document.getElementById("greenPara").textContent = "Green: " + greenValue;
    document.getElementById("bluePara").textContent = "Blue: " + blueValue;

    let field = document.getElementById("colorField");
    field.style.backgroundColor = "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
}

const createSave = (red, green, blue) => {
    let saveDiv = document.createElement("div");
    saveDiv.setAttribute("data-red-value", red);
    saveDiv.setAttribute("data-green-value", green);
    saveDiv.setAttribute("data-blue-value", blue);

    saveDiv.setAttribute("data-index", "" + global.saves.length);
    global.saves.push(saveDiv);

    saveDiv.classList.add("save-div");
    saveDiv.style.backgroundColor = "rgb" + createKeyValue(red, green, blue);


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

const saveColor = () => {
    let color = document.getElementById("colorField").style.backgroundColor;
    let red = color.substring(color.indexOf("(") + 1, color.indexOf(","));
    color = color.substring(color.indexOf(", ") + 2);
    let green = color.substring(0, color.indexOf(","));
    color = color.substring(color.indexOf(", ") + 2);
    let blue = color.substring(0, color.indexOf(")"));

    let keyValue = "";
    if (localStorage.getItem("saves") !== null){
        keyValue = localStorage.getItem("saves") + ";";
    }

    keyValue += createKeyValue(red, green, blue);

    localStorage.setItem("saves", keyValue);

    createSave(red, green, blue);
}

const restoreColor = (event) => {
    let saveDiv = event.target;
    document.getElementById("redSlider").value = saveDiv.getAttribute("data-red-value");
    document.getElementById("greenSlider").value = saveDiv.getAttribute("data-green-value");
    document.getElementById("blueSlider").value = saveDiv.getAttribute("data-blue-value");

    event.stopPropagation();
    updateColorField();
}

const removeColorSave = (event) => {
    let saveDiv = event.target.parentElement.parentElement;

    let index = parseInt(saveDiv.getAttribute("data-index"));
    global.saves.splice(index, 1);

    removeSaveInStorage(index);

    saveDiv.remove();
    event.stopPropagation();
}

const removeSaveInStorage = (index) => {
    let storage = localStorage.getItem("saves").split(";");
    storage.splice(index, 1);

    storage = storage.join(";");

    localStorage.setItem("saves", storage);
}

const createKeyValue = (redValue, greenValue, blueValue) => {
    return "(" + redValue + "," + greenValue + "," + blueValue + ")";
}

window.addEventListener("load", setup);