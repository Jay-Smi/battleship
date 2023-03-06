import elem from "../elem.js";
import Ship from "./ShipElem.js";
import PubSubInterface from "../../PubSubInterface.js";

export default class ShipQueue extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render({ player }) {
        return this.buildQueue(player);
    }

    buildQueue(player) {
        const stage = elem({
            prop: "div",
            className: "shipQueue",
            draggable: false,
        });
        const next = elem({
            prop: "div",
            className: "nextShipContainer",
            draggable: false,
        });

        const queue = elem({
            prop: "div",
            className: "queueContainer",
            children: [stage, next],
        });

        player.shipQueue.forEach((ship, index) => {
            const shipElem = new Ship(ship);
            if (index === 0) {
                next.appendChild(shipElem.element);
            } else {
                stage.prepend(shipElem.element);
            }
        });

        return queue;
    }
}
