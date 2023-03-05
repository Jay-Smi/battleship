import elem from "./elem.js";
import "../../CSS/namepage.css";
import PubSubInterface from "../PubSubInterface.js";

export default class NamePage extends PubSubInterface {
    constructor(viewModel) {
        super(viewModel);
        this.container = document.querySelector(".newGameContainer");
        this.element = this.buildForm();

        super.onInit();
    }

    shouldUpdate(oldModel, newModel) {
        return (
            (newModel.currentPage === "namePage" &&
                oldModel.currentPage !== "namePage") ||
            (oldModel.currentPage === "namePage" &&
                newModel.currentPage !== "namePage")
        );
    }

    render({ currentPage }) {
        if (currentPage === "namePage") {
            this.container.appendChild(this.element);
        }
        if (currentPage === "mapPage") {
            const oldPage = document.querySelector(".homepageContainer");
            oldPage.classList.add("hide");
            setTimeout(() => oldPage.remove(), 750);
        }
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
            this.viewModel.updateModel((oldModel) => {
                const newModel = { ...oldModel };
                newModel.currentPage = "mapPage";
                newModel.player.name = inputField.value;
                return newModel;
            });
        });
        const formContainer = elem({
            prop: "div",
            className: "formContainer",
            children: [greeting, nameField],
        });

        return formContainer;
    }
}
