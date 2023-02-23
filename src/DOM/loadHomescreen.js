import elem from "./elem.js";
import loadNameScreen from "./loadNameScreen.js";
import background from "../assets/images/homescreen.jpg";
import "../CSS/homescreen.css";

function loadHomescreen() {
    renderContainer();
    const container = document.querySelector("#container");
    container.style.backgroundImage = background;
    container.appendChild(
        elem({
            prop: "header",
            textContent: "BATTLESHIP",
            className: "homeHeader",
        })
    );
    const newGame = elem({
        prop: "main",
        className: "newGameContainer",
        children: [
            elem({
                prop: "div",
                textContent: "New Game",
                className: "newGame",
            }),
        ],
    });
    newGame.firstChild.addEventListener("click", () => {
        loadNameScreen();
    });

    container.appendChild(newGame);
    container.appendChild(
        elem({
            prop: "ul",
            className: "smokeContainer",
            children: [
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
                elem({ prop: "li", className: "smoke" }),
            ],
        })
    );
    container.appendChild(
        elem({
            prop: "footer",
            className: "footer",
            children: [
                elem({ prop: "span", textContent: "Created by Gluttz, " }),
                elem({
                    prop: "a",
                    textContent: "Image by upklyak on Freepik",
                    href: "https://www.freepik.com/free-vector/sunken-cruise-ship-sea-harbor-morning_21584915.htm#query=battleship%20background&position=32&from_view=search&track=ais",
                }),
            ],
        })
    );
}

function renderContainer() {
    const container = document.querySelector("#container");
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

export default loadHomescreen;
