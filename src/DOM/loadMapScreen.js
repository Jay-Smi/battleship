import elem from "./elem.js";
import "../CSS/mapscreen.css";
// import greenPin from "../assets/images/green-pin.png";
//add map under everything
//transition everything away
function loadMapScreen(options) {
    const body = document.querySelector("body");
    const redPin1 = new Image();
    redPin1.src = "../assets/images/red-pin.png";
    redPin1.classList.add("redPin1");
    const redPin2 = new Image();
    redPin2.src = "../assets/images/red-pin.png";
    redPin2.classList.add("redPin2");
    const redPin3 = new Image();
    redPin3.src = "../assets/images/red-pin.png";
    redPin3.classList.add("redPin3");
    const greenPin = new Image();
    greenPin.src = "../assets/images/green-pin.png";
    greenPin.classList.add("greenPin");
    const map = elem({ prop: "div", className: "map" });
    map.appendChild(redPin1, redPin2, redPin3, greenPin);
    body.prepend(map);
    const container = document.querySelector("#container");
    container.classList.add("hide");

    setTimeout(renderContainer, 2000);
}

function renderContainer() {
    const container = document.querySelector("#container");

    container.remove();
}

export default loadMapScreen;
