import elem from "../elem.js";
import "../../../CSS/namepage.css";
import PubSubInterface from "../../PubSubInterface.js";

export default class HomePageInput extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render({ namePageIsOpen }) {
        const newGameBtn = elem({
            prop: "div",
            textContent: "New Game",
            className: "newGame",
        });

        newGameBtn.addEventListener("click", () => {
            this.viewModel.updateModel((oldModel) => {
                return { namePageIsOpen: true };
            });
        });

        return namePageIsOpen ? this.buildForm() : newGameBtn;
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
                newModel.newGameState = JSON.parse(JSON.stringify(newModel));
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
