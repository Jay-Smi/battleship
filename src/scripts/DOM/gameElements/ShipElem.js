import elem from "../elem";
import carrierSrc from "../../../assets/images/Carrier.svg";
import battleshipSrc from "../../../assets/images/Battleship.svg";
import destroyerSrc from "../../../assets/images/Destroyer.svg";
import submarineSrc from "../../../assets/images/Submarine.svg";
import patrolBoatSrc from "../../../assets/images/Patrol-Boat.svg";

export default class Ship {
    constructor(ship) {
        this.shipModel = ship;

        this.tiles = [];

        this.clickedIndex = null;

        this.element = this.create();
    }

    create() {
        //ships container
        const ship = document.createElement("div");
        ship.id = this.shipModel.name;
        ship.classList.add("ship");
        ship.draggable = true;
        let shipSrc = null;

        // console.log(this.shipModel.isHorizontal);
        let shipClass = this.shipModel.isHorizontal ? "horizontal" : "vertical";
        ship.classList.add(shipClass);

        // matches name of ship to the image source file
        switch (this.shipModel.name) {
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
        for (let i = 0; i < this.shipModel.size; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.boat = this.shipModel.name;
            tile.dataset.tile = i;
            tile.draggable = false;

            //add head class to front for styling
            if (i === 0) tile.classList.add("head");
            //add tail class to tail for styling
            if (i == this.shipModel.size - 1) tile.classList.add("tail");

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
            id: `${this.shipModel.name}Overlay`,
        });
        this.overlay = shipOverlay;
        shipOverlay.src = shipSrc;
        let overlayClass = this.shipModel.isHorizontal
            ? "horizontal"
            : "vertical";
        shipOverlay.classList.add(overlayClass);
        shipOverlay.draggable = false;
        ship.appendChild(shipOverlay);

        ship.addEventListener("dragstart", this.handleDragStart.bind(this));

        return ship;
    }

    handleDragStart(e) {
        e.dataTransfer.setData(
            "ship",
            JSON.stringify({
                ...this.shipModel,
                clickedIndex: this.clickedIndex,
            })
        );

        this.tiles.forEach((tile) => {
            tile.style.width = "40px";
            tile.style.height = "40px";
            setTimeout(() => {
                tile.style.width = "30px";
                tile.style.height = "30px";
            }, 0);
        });
    }
}
