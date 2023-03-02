import elem from "./elem.js";
import "../../CSS/namepage.css";

export default class Namepage {
    constructor(pubsub) {
        this.PubSub = pubsub;
        this.container = document.querySelector(".newGameContainer");
        this.element = this.buildForm();
    }

    updateView() {
        this.removeNewGameBtn();
        this.container.appendChild(this.element);
    }

    // clear container for the form
    removeNewGameBtn() {
        const oldElement = document.querySelector(".newGame");
        if (oldElement) oldElement.remove();
    }

    buildForm() {
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
        button.addEventListener("click", () => {
            this.PubSub.publish("event", [
                { type: "formSubmit", data: inputField.value },
                { type: "pageChange", data: "mapPage" },
            ]);
        });
        const formContainer = elem({
            prop: "div",
            className: "formContainer",
            children: [greeting, nameField],
        });

        return formContainer;
    }
}
