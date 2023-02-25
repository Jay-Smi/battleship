import elem from "./elem.js";
import "../CSS/mapscreen.css";
import redPinSrc from "../assets/images/red-pin.png";

function loadMapScreen(viewModel) {
    const body = document.querySelector("body");
    const map = buildMap(options);
    body.appendChild(map);
    const container = document.querySelector("#container");
    container.classList.add("hide");
}

function mapPage(viewModel) {
    const redPins = [
        elem({
            prop: "img",
            src: redPinSrc,
            className: "redPin1",
            id: "easy",
        }),
        elem({
            prop: "img",
            src: redPinSrc,
            className: "redPin2",
            id: "medium",
        }),
        elem({
            prop: "img",
            src: redPinSrc,
            className: "redPin3",
            id: "hard",
        }),
    ];

    const map = elem({
        prop: "div",
        className: "map",
        children: redPins,
    });
    const pinListeners = [];
    redPins.forEach((pin) => {
        pinListeners.push({
            targetElem: pin,
            event: "click",
            type: "stateChange",
            newState: "gamePage",
        });
        pinListeners.push({
            targetElem: pin,
            event: "mouseenter",
            type: "noteUpdate",
        });
    });

    return {
        element: map,
        listeners: pinListeners,
    };
}

export default mapPage;
