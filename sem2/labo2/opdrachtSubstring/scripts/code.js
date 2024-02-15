const setup = () => {
    let btnSubstring = document.getElementById("btnSubstring");
    btnSubstring.addEventListener("click", substring);
}

const substring = () =>{
    let txtInput = document.getElementById("txtInput");
    let txtOutput = document.getElementById("txtOutput");
    let getal1 = document.getElementById("getal1");
    let getal2 = document.getElementById("getal2");

    let tekst = txtInput.value;
    let einde = getal2.value > tekst.length ? tekst.length : getal2.value;
    let output = "";

    for (let i = getal1.value; i < einde; i++){
        output += tekst[i];
    }

    txtOutput.innerHTML = output;
}

window.addEventListener("load", setup);