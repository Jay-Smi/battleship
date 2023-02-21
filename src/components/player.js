import Gameboard from "./gameboard";
import Ship from "./ship";

class Player {
    constructor(name) {
        this.name = name;
        this.turn = false;
        this.gameboard = new Gameboard(this.name);
        this.carrier = new Ship(5, "Carrier");
        this.battleship = new Ship(4, "Battleship");
        this.destroyer = new Ship(3, "Destroyer");
        this.submarine = new Ship(3, "Submarine");
        this.patrolBoat = new Ship(2, "Patrol Boat");
        this.allShips = [
            this.carrier,
            this.battleship,
            this.destroyer,
            this.submarine,
            this.patrolBoat,
        ];
    }

    makeAttack(x, y, opponentBoard) {
        if (opponentBoard.checkAllShipsSunk() || this.turn === false) {
            console.log("whoops");
            return;
        }
        if (!opponentBoard.checkTileGuessed(x, y)) {
            opponentBoard.receiveAttack(x, y);
        }
        return;
    }
}

export default Player;
