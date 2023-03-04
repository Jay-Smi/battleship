import elem from "../elem.js";
import Ship from "./shipView";

export default class ShipQueue {
    constructor(pubsub, shipData) {
        this.PubSub = pubsub;
        this.stage = document.querySelector(".shipQueue");
        this.next = document.querySelector(".nextShipContainer");

        // accepts player's shipQueue array of ships
        this.ships = this.buildShips(shipData);
        this.activeShip = null;

        this.rotateButton = document.querySelector(".rotateButton");
        this.rotateButton.addEventListener("click", () => {
            this.PubSub.publish("event", [
                { type: "rotateShip", data: this.activeShip },
            ]);
        });

        this.ships.forEach((ship) => {
            ship.element.addEventListener("click", () => {});
        });

        this.setActiveShip(this.ships[0]);
        this.renderQueue();
    }

    updateQueue(newQueue) {
        this.ships = this.buildShips(newQueue);
        this.setActiveShip();
        this.renderQueue();
    }

    getActiveShip() {
        return this.activeShip;
    }

    setActiveShip() {
        this.activeShip = this.ships[0];
        this.ships.forEach((s) =>
            s.tiles.forEach((t) => t.classList.remove("selected"))
        );
        this.activeShip.tiles.forEach((tile) => tile.classList.add("selected"));
    }

    rotateActiveShip() {
        this.activeShip.rotate();
    }

    getNextShip() {
        const index = this.ships.indexOf(this.activeShip);
        if (index < this.ships.length - 1) {
            return this.ships[index + 1];
        } else {
            return null;
        }
    }

    buildShips(shipData) {
        const shipList = [];
        shipData.forEach((ship) => {
            const shipObj = new Ship(ship.name, ship.length, ship.isHorizontal);
            shipList.push(shipObj);
        });
        return shipList;
    }

    renderQueue() {
        if (this.next.children) this.clearContainer(this.next);
        if (this.stage.children) this.clearContainer(this.stage);
        for (let i = 0; i < this.ships.length; i++) {
            if (i === 0) {
                this.next.appendChild(this.ships[i].element);
            } else {
                this.stage.prepend(this.ships[i].element);
            }
        }
    }

    clearContainer(container) {
        while (container.firstChild) container.firstChild.remove();
    }
}
