import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class GameMessage extends PubSubInterface {
    constructor(viewModel, container) {
        super(viewModel);

        this.container = container;

        this.element = elem({
            prop: "p",
            className: "stagePara",
            textContent: ``,
        });

        super.onInit();
    }

    onInit() {}

    shouldUpdate(oldModel, newModel) {
        return (
            // message changed
            newModel.stateMessage !== oldModel.stateMessage &&
            newModel.currentPage === "gamePage"
        );
    }

    render(model) {
        // this.element.remove();
        if (!model.stateMessage) {
            this.element.textContent = "Enemies approach. Deploy the fleet.";
            this.container.appendChild(this.element);
        }
    }
}
