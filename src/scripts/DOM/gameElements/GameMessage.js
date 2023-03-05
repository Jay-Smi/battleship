import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class GameMessage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render(model) {
        return elem({
            prop: "p",
            className: "stagePara",
            textContent: "Enemies approach. Deploy the fleet.",
        })
    }
}
