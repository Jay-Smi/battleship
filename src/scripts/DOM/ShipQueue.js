import elem from "./elem.js";
import Ship from "./Ship";

export default class ShipQueue {
    constructor(board, shipData) {
        this.board = board;
        this.ships = this.buildShips(shipData);
        this.activeShip = null;

        this.rotateButton = document.querySelector(".rotateButton");
        this.rotateButton.addEventListener(
            "click",
            this.rotateActiveShip.bind(this)
        );

        this.ships.forEach((ship) => {
            ship.element.addEventListener("click", () => {});
        });

        this.setActiveShip(this.ships[0]);
        this.renderQueue();
    }

    getActiveShip() {
        return this.activeShip;
    }

    setActiveShip(ship) {
        this.activeShip = ship;
        this.ships.forEach((s) =>
            s.tiles.forEach((t) => t.classList.remove("selected"))
        );
        ship.tiles.forEach((tile) => tile.classList.add("selected"));
    }

    rotateActiveShip() {
        this.activeShip.rotate();
        // this.board.clearHighlightedCells(); maybe add
        this.highlightActiveShip();
    }

    highlightActiveShip() {
        // this.activeShip.tiles.forEach((tile) => {
        //     const row = parseInt(tile.dataset.row);
        //     const col = parseInt(tile.dataset.col);
        //     const isValid = this.board.isValidPlacement(
        //         this.activeShip,
        //         row,
        //         col
        //     );
        //     this.board.highlightCell(row, col, isValid ? "green" : "red");
        // });
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
            const shipObj = new Ship(ship.name, ship.length);
            console.log(ship.name);
            shipList.push(shipObj);
        });
        return shipList;
    }

    renderQueue() {
        const stage = document.querySelector(".shipQueue");
        const next = document.querySelector(".nextShipContainer");

        for (let i = 0; i < this.ships.length; i++) {
            if (i === 0) {
                next.appendChild(this.ships[i].element);
            } else {
                stage.prepend(this.ships[i].element);
            }
        }
    }
}
