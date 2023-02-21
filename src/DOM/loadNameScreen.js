import loadMapScreen from "./loadMapScreen.js";
import elem from "./elem.js";
import "../CSS/namescreen.css";

function loadNameScreen() {
    const newGameContainer = document.querySelector(".newGameContainer");
    renderNewGame();
    const greeting = elem({ prop: "p", textContent: "Hello Admiral..." });
    const inputField = elem({
        prop: "input",
        type: "text",
        placeholder: "Name",
    });
    const button = elem({
        prop: "button",
        type: "button",
        textContent: "Start",
    });
    const nameField = elem({
        prop: "form",
        className: "nameForm",
        children: [inputField, button],
    });
    button.addEventListener("click", () => {
        loadMapScreen({ playerName: inputField.value });
    });
    newGameContainer.appendChild(greeting);
    newGameContainer.appendChild(nameField);
}

function renderNewGame() {
    const newGameContainer = document.querySelector(".newGameContainer");
    while (newGameContainer.firstChild) {
        newGameContainer.firstChild.remove();
    }
}

export default loadNameScreen;
