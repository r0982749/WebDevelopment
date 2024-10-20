global = {
    saves: [],
    redValue: 0,
    greenValue: 0,
    blueValue: 0
}

const setup = () => {
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", save);

    let redSlider = document.getElementById("red");
    let greenSlider = document.getElementById("green");
    let blueSlider = document.getElementById("blue");


    redSlider.addEventListener("input", update);
    greenSlider.addEventListener("input", update);
    blueSlider.addEventListener("input", update);

    restore();
    restoreSaves();
}

const restore = () => {
    let redValue;
    let greenValue;
    let blueValue;
    let rgbString;

    if ((localStorage.getItem("rgbString") !== null && localStorage.getItem("colorFieldRGB") !== "")){
        rgbString = localStorage.getItem("rgbString");
        colorConverter(rgbString);

        redValue = global.redValue;
        greenValue = global.greenValue;
        blueValue = global.blueValue;

        document.getElementById("red").value = redValue;
        document.getElementById("green").value = greenValue;
        document.getElementById("blue").value = blueValue;
    }
    else {
        redValue = document.getElementById("red").value;
        greenValue = document.getElementById("green").value;
        blueValue = document.getElementById("blue").value;

        global.redValue = redValue;
        global.greenValue = greenValue;
        global.blueValue = blueValue;

        rgbString = "(" + redValue + "," + greenValue + "," + blueValue + ")";

        localStorage.setItem("rgbString", rgbString);
    }

    changeValues(redValue, greenValue, blueValue, rgbString);
}

const changeValues = (redValue, greenValue, blueValue, rgbString) => {
    document.getElementById("redLabel").textContent = "Red: " + redValue;
    document.getElementById("greenLabel").textContent = "Green: " + greenValue;
    document.getElementById("blueLabel").textContent = "Blue: " + blueValue;

    document.getElementById("colorField").style.backgroundColor = "rgb" + rgbString;
}

const update = () => {
    let redValue = document.getElementById("red").value;
    let greenValue = document.getElementById("green").value;
    let blueValue = document.getElementById("blue").value;

    global.redValue = redValue;
    global.greenValue = greenValue;
    global.blueValue = blueValue;

    let rgbString = "(" + redValue + "," + greenValue + "," + blueValue + ")";

    localStorage.setItem("rgbString", rgbString);

    changeValues(redValue, greenValue, blueValue, rgbString);
}

const colorConverter = (rgbString) => {
    rgbString = rgbString.substring(1);
    let redValue = parseInt(rgbString.substring(0, rgbString.indexOf(",")));
    rgbString = rgbString.substring(rgbString.indexOf(",") + 1);
    let greenValue = parseInt(rgbString.substring(0, rgbString.indexOf(",")));
    rgbString = rgbString.substring(rgbString.indexOf(",") + 1);
    let blueValue = parseInt(rgbString.substring(0, rgbString.indexOf(")")));

    global.redValue = redValue;
    global.greenValue = greenValue;
    global.blueValue = blueValue;
}

const restoreColor = (event) => {
    let saveDiv = event.target;

    localStorage.setItem("rgbString", saveDiv.style.backgroundColor.substring(3).replaceAll(" ", ""));
    restore();


    event.stopPropagation();
}

const save = (rgbString, index) => {
    let saveDiv = document.createElement("div");
    if (index === undefined){
        rgbString = "(" + global.redValue + "," + global.greenValue + "," + global.blueValue + ")";
        index = global.saves.length;
        global.saves.push(rgbString);

        localStorage.setItem("colorSaves", JSON.stringify(global.saves));
    }
    saveDiv.style.backgroundColor = "rgb" + rgbString;
    saveDiv.classList.add("save");
    saveDiv.setAttribute("data-index", index);

    saveDiv.addEventListener("click", restoreColor);

    let removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.addEventListener("click", remove);
    removeButton.textContent = "X";
    removeButton.classList.add("remove");

    saveDiv.appendChild(removeButton);

    document.getElementById("history").appendChild(saveDiv);
}

const restoreSaves = () => {
    global.saves = JSON.parse(localStorage.getItem("colorSaves"));
    document.getElementById("history").innerHTML = "";

    for (let i = 0; i < global.saves.length; i++){
        save(global.saves[i], i);
    }
}

const remove = (event) => {
    let saveDiv = event.target.parentElement;
    global.saves.splice(parseInt(saveDiv.getAttribute("data-index")), 1);
    localStorage.setItem("colorSaves", JSON.stringify(global.saves));
    saveDiv.remove();

    restoreSaves();

    event.stopPropagation();
}

window.addEventListener("load", setup);