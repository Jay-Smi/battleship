import Player from "./Player";
import { placeShipRandomly } from "./Game";

export default class AI extends Player {
    constructor() {
        super();
        super.name = "AI";
        this.difficulty = null;
        this.autoFillBoard();
    }

    autoFillBoard() {
        while (this.shipQueue.length > 0) {
            const ship = this.shipQueue.shift();
            const { newGameboard, newShip } = placeShipRandomly(
                ship,
                this.gameboard
            );

            this.gameboard = newGameboard;
            this.gameboard.ships.push(newShip);
        }
    }
}
