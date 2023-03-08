import elem from "../elem.js";
import Ship from "./ShipElem.js";
import PubSubInterface from "../../PubSubInterface.js";

export default class ShipQueue extends PubSubInterface {
    constructor(viewModel, element, clickedEvent) {
        super(viewModel, element);
        this.clickedEvent = clickedEvent;
    }

    shouldUpdate(oldModel, newModel) {
        return newModel.gameState === "placeShips";
    }

    render(model) {
        return this.buildQueue(model);
    }

    buildQueue(model) {
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

        if (!model.namePageIsOpen) {
            next.classList.add("hideNext");
        }

        const queue = elem({
            prop: "div",
            className: "queueContainer",
            children: [stage, next],
        });

        model.player.shipQueue.forEach((ship, index) => {
            if (ship) {
                const shipElem = new Ship(ship, (clickedIndex) => {
                    this.clickedEvent(index, clickedIndex);
                });
                if (model.stateMessage.includes("Enemies")) {
                    shipElem.element.addEventListener("mouseenter", (e) => {
                        this.viewModel.updateModel((oldModel) => {
                            const newModel = { ...oldModel };
                            newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
                            return newModel;
                        });
                    });
                }

                if (index === 0) {
                    next.appendChild(shipElem.element);
                } else {
                    stage.prepend(shipElem.element);
                }
            }
        });

        return queue;
    }
}
