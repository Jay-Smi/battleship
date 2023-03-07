import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class GameMessage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    shouldUpdate(oldModel, newModel) {
        return oldModel.stateMessage !== newModel.stateMessage;
    }

    render({ stateMessage }) {
        return elem({
            prop: "p",
            className: "stagePara",
            textContent: stateMessage,
        });
    }
}
