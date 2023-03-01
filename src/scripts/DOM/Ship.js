import elem from "./elem.js";

import carrierSrc from "../../assets/images/Carrier.svg";
import battleshipSrc from "../../assets/images/Battleship.svg";
import destroyerSrc from "../../assets/images/Destroyer.svg";
import submarineSrc from "../../assets/images/Submarine.svg";
import patrolBoatSrc from "../../assets/images/Patrol-Boat.svg";

export default class Ship {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.isHorizontal = false;
        this.tiles = [];
        this.element = this.create();
        this.clickedIndex = null;
        this.Overlay = null;
        this.element.addEventListener(
            "dragstart",
            this.handleDragStart.bind(this)
        );
    }

    create() {
        const ship = document.createElement("div");
        ship.id = this.id;
        ship.classList.add("ship");
        ship.draggable = true;
        let shipSrc = null;
        switch (this.id) {
            case "Carrier":
                shipSrc = carrierSrc;
                break;
            case "Battleship":
                shipSrc = battleshipSrc;
                break;
            case "Destroyer":
                shipSrc = destroyerSrc;
                break;
            case "Submarine":
                shipSrc = submarineSrc;
                break;
            case "Patrol-Boat":
                shipSrc = patrolBoatSrc;
        }

        for (let i = 0; i < this.size; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.boat = this.id;
            tile.dataset.tile = i;
            tile.draggable = false;

            if (i === 0) tile.classList.add("head");

            if (i == this.size - 1) tile.classList.add("tail");

            tile.addEventListener("mousedown", (e) => {
                this.clickedIndex = i;
            });

            this.tiles.push(tile);
            ship.appendChild(tile);
        }

        const shipOverlay = elem({
            prop: "img",
            className: `shipOverlay`,
            id: `${this.id}Overlay`,
        });
        this.overlay = shipOverlay;
        shipOverlay.src = shipSrc;
        let overlayClass = null;
        this.isHorizontal
            ? (overlayClass = "horizontal")
            : (overlayClass = "vertical");
        shipOverlay.classList.add(overlayClass);
        shipOverlay.draggable = false;
        ship.appendChild(shipOverlay);
        return ship;
    }

    handleDragStart(e) {
        e.dataTransfer.setData("text/plain", this.id);
        this.element.classList.add("dragging");

        this.tiles.forEach((tile) => {
            tile.style.width = "50px";
            tile.style.height = "50px";
            setTimeout(() => {
                tile.style.width = "30px";
                tile.style.height = "30px";
            }, 0);
        });
    }

    rotate() {
        this.isHorizontal = !this.isHorizontal;
        this.element.classList.toggle("horizontal", this.isHorizontal);
        this.element.classList.toggle("vertical", !this.isHorizontal);
        this.overlay.classList.toggle("horizontal", this.isHorizontal);
        this.overlay.classList.toggle("vertical", !this.isHorizontal);
    }

    placeOnBoard(board, row, col) {
        const placed = board.placeShip(this, row, col);
        if (placed) {
            this.tiles.forEach((tile) => {
                board
                    .getCellElement(tile.dataset.row, tile.dataset.col)
                    .appendChild(tile);
            });
        }
        return placed;
    }
}
