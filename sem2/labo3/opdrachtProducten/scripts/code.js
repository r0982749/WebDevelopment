const setup = () => {
    let button = document.getElementById("herbereken");

    button.addEventListener("click", herbereken)
}

const herbereken = () =>{
    let producten = document.getElementsByClassName("product");
    let totaal = 0;

    for (let i = 0; i < producten.length; i++){
        let tds = producten[i].childNodes;

        let prijsString = tds[3].textContent;
        prijsString = prijsString.substring(0, prijsString.indexOf(" "));
        let prijs = parseFloat(prijsString);

        let aantal = tds[5].childNodes[0].value;

        let btwString = tds[7].textContent;
        btwString = btwString.substring(0, btwString.indexOf("%"));
        let btw = 1 + (parseFloat(btwString) / 100);

        let subtotaal = (aantal * prijs) * btw;
        totaal += subtotaal;

        tds[9].textContent = subtotaal.toFixed(2) + " Eur";
    }

    document.getElementById("totaal").textContent = totaal.toFixed(2) + " Eur";
}

window.addEventListener("load", setup);