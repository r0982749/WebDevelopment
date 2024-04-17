const setup = () => {
    let datum = new Date();
    console.log(datum.getFullYear());
    let verjaardag = new Date("2005-10-05");
    let dagen = (datum.getTime() - verjaardag.getTime()) / 1000 / 60 / 60  / 24;
    dagen = Math.round(dagen);
    console.log(dagen);
}

window.addEventListener("load", setup);