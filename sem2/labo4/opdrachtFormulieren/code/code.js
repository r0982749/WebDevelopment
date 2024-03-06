let postcode = document.getElementById("zip-code");
const setup = () => {
    postcode.addEventListener("change", checkPostcode)
}

const checkPostcode = () => {
    let currentValue = parseInt(postcode.value);
    if (currentValue < 1000){
        postcode.value = 1000;
    }
    if (currentValue > 9992){
        postcode.value = 9992;
    }

}

window.addEventListener("load", setup);