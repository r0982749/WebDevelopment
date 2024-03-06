const setup = () => {
    let button = document.getElementById("submitButton");

    button.addEventListener("click", zinPrinter)
}

const zinPrinter = () => {
    let zin = document.getElementById("zin").value;

    console.log(maakMetSpaties(zin));
}

const maakMetSpaties = (inputText) => {
    inputText = inputText.replaceAll(" ", "");

    let output = "";
    for (let i = 0; i < inputText.length; i++){
        output += inputText.charAt(i) + " ";
    }

    return output.trim();
}

window.addEventListener("load", setup);