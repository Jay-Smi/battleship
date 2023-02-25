import elem from "./elem.js";
import "../CSS/namePage.css";

function namePage() {
    const newGameContainer = document.querySelector(".newGameContainer");
    const greeting = elem({ prop: "p", textContent: "Hello Admiral..." });
    const inputField = elem({
        prop: "input",
        type: "text",
        placeholder: "Name",
    });
    const button = elem({
        prop: "button",
        type: "button",
        textContent: "Continue",
    });
    const nameField = elem({
        prop: "form",
        className: "nameForm",
        children: [inputField, button],
    });
    // button.addEventListener("click", () => {
    //     loadMapScreen({ playerName: inputField.value });
    // });
    const formContainer = elem({
        prop: "div",
        className: "formContainer",
        children: [greeting, nameField],
    });

    return {
        element: formContainer,
        listeners: [
            {
                targetElem: button,
                event: "click",
                type: "stateChange",
                newState: "mapPage",
                formElem: inputField,
            },
        ],
    };
}

export default namePage;
