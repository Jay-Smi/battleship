import elem from "./elem.js";
import "../../CSS/namepage.css";

export default class Namepage {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
    }
    handlePageChange(data) {
        if (data === "loadNamepage") this.loadInputField();
        if (data === "mappage") this.removeHomepage();
    }

    loadInputField() {
        const container = document.querySelector(".newGameContainer");
        const element = this.buildForm();
        container.appendChild(element);
    }

    removeHomepage() {
        const oldPage = document.querySelector(".homepageContainer");
        oldPage.classList.add("hide");
        setTimeout(() => oldPage.remove(), 750);
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
            this.PubSub.publish("formSubmit", inputField.value);
            this.PubSub.publish("pageChange", "mappage");
        });
        const formContainer = elem({
            prop: "div",
            className: "formContainer",
            children: [greeting, nameField],
        });

        return formContainer;
    }
}
