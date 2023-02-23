import "../CSS/stagingscreen.css";
import elem from "./elem.js";

function loadStagingScreen(options) {
    const body = document.querySelector("body");
    const container = elem({
        prop: "div",
        className: "gameContainer",
        children: [
            elem({ prop: "div", className: "p1GridContainer" }),
            elem({ prop: "div", className: "p1OptionsContainer" }),
        ],
    });

    const map = document.querySelector(".map");
    map.classList.add("hide");
    setTimeout(() => {
        map.remove();
    }, 750);
}

export default loadStagingScreen;
