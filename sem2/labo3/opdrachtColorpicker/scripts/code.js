const setup = () => {
    let sliders = document.getElementsByClassName("slider");

    updateColorField()

    for (let i = 0; i < sliders.length; i++){
        sliders[i].addEventListener("change", updateColorField);
        sliders[i].addEventListener("input", updateColorField);
    }
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

window.addEventListener("load", setup);