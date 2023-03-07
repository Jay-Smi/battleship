import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

export default class Player {
    constructor() {
        this.name = null;
        this.gameboard = new Gameboard(10);
        this.shipQueue = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Destroyer"),
            new Ship(3, "Submarine"),
            new Ship(2, "Patrol-Boat"),
        ];
    }
}
