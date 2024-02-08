
const setup = () => { 
	let btnOptellen=document.getElementById("btnOptellen");
	let btnAftrekken=document.getElementById("btnAftrekken");
	let btnVermenigvuldigen=document.getElementById("btnVermenigvuldigen");
	let btnDelen=document.getElementById("btnDelen");
	
	btnOptellen.addEventListener("click", optellen);
	btnAftrekken.addEventListener("click", aftrekken);
	btnVermenigvuldigen.addEventListener("click", vermenigvuldigen);
	btnDelen.addEventListener("click", delen);
} 

const optellen = () => {
	let txtOutput=document.getElementById("txtOutput");
	let txtLinks=document.getElementById("txtLinks");
	let txtRechts=document.getElementById("txtRechts");
	
	let g1=parseInt(txtLinks.value, 10);
	let g2=parseInt(txtRechts.value, 10);
	let resultaat = g1+g2;

	let resultaatTekst=g1+" + "+g2+" = "+resultaat;
	txtOutput.innerHTML=resultaatTekst;
}

const aftrekken = () => {
	// analoog
	let output = document.getElementById("txtOutput");
	let txtGetal1 = document.getElementById("txtLinks");
	let txtGetal2 = document.getElementById("txtRechts");

	let getal1 = parseInt(txtGetal1.value, 10);
	let getal2 = parseInt(txtGetal2.value, 10);
	let result = getal1 - getal2;

	output.innerHTML = getal1 + " - " + getal2 + " = " + result;
}

const vermenigvuldigen = () => {
	// analoog
	let output = document.getElementById("txtOutput");
	let txtGetal1 = document.getElementById("txtLinks");
	let txtGetal2 = document.getElementById("txtRechts");

	let getal1 = parseInt(txtGetal1.value, 10);
	let getal2 = parseInt(txtGetal2.value, 10);
	let result = getal1 * getal2;

	output.innerHTML = getal1 + " * " + getal2 + " = " + result;
}

const delen = () => {
	// analoog
	let output = document.getElementById("txtOutput");
	let txtGetal1 = document.getElementById("txtLinks");
	let txtGetal2 = document.getElementById("txtRechts");

	let getal1 = parseInt(txtGetal1.value, 10);
	let getal2 = parseInt(txtGetal2.value, 10);
	let result = getal1 / getal2;

	output.innerHTML = getal1 + " / " + getal2 + " = " + result;
}
 
window.addEventListener('load',setup); 

















