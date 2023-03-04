import elem from "../elem.js";

import carrierSrc from "../../../assets/images/Carrier.svg";
import battleshipSrc from "../../../assets/images/Battleship.svg";
import destroyerSrc from "../../../assets/images/Destroyer.svg";
import submarineSrc from "../../../assets/images/Submarine.svg";
import patrolBoatSrc from "../../../assets/images/Patrol-Boat.svg";

export default class Ship {
    constructor(id, size, isHorizontal) {
        this.id = id;
        this.size = size;
        this.isHorizontal = isHorizontal;

        // contains child divs for clicked index reference
        this.tiles = [];
        this.clickedIndex = null;
        //contains the ship image for display
        this.Overlay = null;

        this.element = this.create();

        this.element.addEventListener(
            "dragstart",
            this.handleDragStart.bind(this)
        );
    }

    create() {
        //ships container
        const ship = document.createElement("div");
        ship.id = this.id;
        ship.classList.add("ship");
        ship.draggable = true;
        let shipSrc = null;
        let shipClass;
        this.isHorizontal
            ? (shipClass = "horizontal")
            : (shipClass = "vertical");
        ship.classList.add(shipClass);

        // matches name of ship to the image source file
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

        // creates the inner divs for each ship
        // based on the size
        for (let i = 0; i < this.size; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.boat = this.id;
            tile.dataset.tile = i;
            tile.draggable = false;

            //add head class to front for styling
            if (i === 0) tile.classList.add("head");
            //add tail class to tail for styling
            if (i == this.size - 1) tile.classList.add("tail");

            // adds click listener to set clicked index
            tile.addEventListener("mousedown", (e) => {
                this.clickedIndex = i;
            });

            // add tiles to the ship
            this.tiles.push(tile);
            ship.appendChild(tile);
        }

        // spice up the ship display
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
        // grow the dragged ship upon click in order
        // to match gameboard size

        this.tiles.forEach((tile) => {
            tile.style.width = "40px";
            tile.style.height = "40px";
            setTimeout(() => {
                tile.style.width = "30px";
                tile.style.height = "30px";
            }, 0);
        });
    }

    rotate() {
        // swap ship's flex-direction via class swap
        // do the same for the overlay
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
