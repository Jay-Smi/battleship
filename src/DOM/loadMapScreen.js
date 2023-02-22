import elem from "./elem.js";
import "../CSS/mapscreen.css";
// import * as kampos from "kampos";
import { Kampos, Ticker, effects, transitions } from "kampos";
import greenPinSrc from "../assets/images/green-pin.png";
import renPinSrc from "../assets/images/red-pin.png";

//add map under everything
//transition everything away
function loadMapScreen(options) {
    console.log(Kampos.effects);
    const body = document.querySelector("body");
    const redPin1 = new Image();
    redPin1.src = renPinSrc;
    redPin1.classList.add("redPin1");
    const redPin2 = new Image();
    redPin2.src = renPinSrc;
    redPin2.classList.add("redPin2");
    const redPin3 = new Image();
    redPin3.src = renPinSrc;
    redPin3.classList.add("redPin3");
    const greenPin = new Image();
    greenPin.src = greenPinSrc;
    greenPin.classList.add("greenPin");
    const map = elem({ prop: "div", className: "map" });
    map.appendChild(redPin1);
    map.appendChild(redPin2);
    map.appendChild(redPin3);
    map.appendChild(greenPin);
    body.prepend(map);
    const container = document.querySelector("#container");
    container.classList.add("hide");

    setTimeout(renderContainer, 2000);
}

function renderContainer() {
    const container = document.querySelector("#container");

    container.remove();
}

// function loadImage(src) {
//     return new Promise((resolve) => {
//         const img = new Image();
//         img.crossOrigin = "anonymous";

//         img.onload = function () {
//             resolve(this);
//         };

//         img.src = src;
//     });
// }
// // get the image URLs
// const imageFromSrc = document.querySelector("#source-from").src;
// const imageToSrc = document.querySelector("#source-to").dataset.src;
// // load images
// const promisedImages = [loadImage(imageFromSrc), loadImage(imageToSrc)];

// const turbulence = kampos.effects.turbulence({
//     noise: kampos.noise.perlinNoise,
// });

// const WIDTH = 854;
// const HEIGHT = 480;
// const CELL_FACTOR = 4;
// const AMPLITUDE = CELL_FACTOR / WIDTH;

// turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
// turbulence.octaves = 8;
// turbulence.isFractal = true;

// const mapTarget = document.createElement("canvas");
// mapTarget.width = WIDTH;
// mapTarget.height = HEIGHT;

// const dissolveMap = new kampos.Kampos({
//     target: mapTarget,
//     effects: [turbulence],
//     noSource: true,
// });

// dissolveMap.draw();

// const dissolve = kampos.transitions.dissolve();

// dissolve.map = mapTarget;
// dissolve.high = 0.3; // for liquid-like effect

// const target = document.querySelector("#target");
// const hippo = new kampos.Kampos({ target, effects: [dissolve] });

// Promise.all(promisedImages)
//     .then(([fromImage, toImage]) => {
//         hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });

//         dissolve.to = toImage;
//         dissolve.textures[1].update = true;
//     })
//     .then(function () {
//         hippo.play((time) => {
//             turbulence.time = time * 2;
//             dissolveMap.draw();
//             dissolve.progress = Math.abs(Math.sin(time * 2e-4)); // multiply time by a factor to slow it down a bit
//         });
//     });

export default loadMapScreen;
