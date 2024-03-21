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

    let saveDiv = document.createElement("div");
    saveDiv.classList.add("save-div");
    saveDiv.style.backgroundColor = color;


    let buttonDiv = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "X";

    removeButton.addEventListener("click", removeColorSave);

    buttonDiv.appendChild(removeButton);
    saveDiv.appendChild(buttonDiv);

    document.getElementById("save-field").appendChild(saveDiv);
}

const removeColorSave = (event) => {
    let saveDiv = event.target.parentElement.parentElement;
    saveDiv.remove();
}

window.addEventListener("load", setup);