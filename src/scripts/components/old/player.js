import Gameboard from "./gameboard";
import Ship from "./ship";

class Player {
    constructor() {
        this.name = null;
        this.turn = false;
        this.gameboard = new Gameboard(10);

        this.shipQueue = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Destroyer"),
            new Ship(3, "Submarine"),
            new Ship(2, "Patrol-Boat"),
        ];
    }

    rotateShip(data) {
        this.shipQueue.forEach((ship) => {
            if (ship.name === data.id) {
                ship.rotate();
            }
        });
    }

    placeShip(row, col) {
        this.gameboard.placeShip(this.shipQueue[0], row, col);
        this.gameboard.ships.push(this.shipQueue.shift());
    }

    getShipsState() {
        const newShipState = [];
        this.shipQueue.forEach((ship) => newShipState.push(ship.getState()));
        return newShipState;
    }

    getState() {
        return {
            name: this.name,
            turn: false,
            gameboard: this.gameboard.getState(),
            shipQueue: this.getShipsState(),
        };
    }

    setName(name) {
        this.name = name;
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
