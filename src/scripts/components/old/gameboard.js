import Tile from "./tile.js";

class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = this.buildBoard();
        // this.orientation = true; //true vertical, false horizontal
        this.ships = [];
    }

    getState() {
        return {
            size: this.size,
            board: this.getTileState(),
            ships: this.ships,
        };
    }

    getTileState() {
        const tempBoard = [];

        for (let row = 0; row < this.size; row++) {
            tempBoard[row] = [];
            for (let col = 0; col < this.size; col++) {
                tempBoard[row][col] = this.board[row][col].getState();
            }
        }
        return tempBoard;
    }

    buildBoard() {
        const tempBoard = [];

        for (let row = 0; row < this.size; row++) {
            tempBoard[row] = [];
            for (let col = 0; col < this.size; col++) {
                tempBoard[row][col] = new Tile(row, col);
            }
        }
        return tempBoard;
    }

    placeShip(ship, row, col) {
        if (this.isValidPlacement(ship, row, col)) {
            if (ship.isHorizontal) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[row][col + i].ship = ship;
                    this.board[row][col + i].tileStatus = "S";
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    this.board[row + i][col].ship = ship;
                    this.board[row + i][col].tileStatus = "S";
                }
            }
        } else {
            //do something if invalid placement
            console.warn(
                "Invalid Ship Placement: Handle this already, Gameboard.js"
            );
            return;
        }
    }

    isValidPlacement(ship, row, col) {
        // checks if all hovered tiles are on the board
        if (ship.isHorizontal === true && col + ship.size > this.cols) {
            return false;
        }
        if (ship.isHorizontal === false && row + ship.size > this.rows) {
            return false;
        }
        // iterates over every tile
        // and checks if the gameboard contains a ship
        for (let i = 0; i < ship.size; i++) {
            if (this.board[row][col].ship) {
                return false;
            }
            if (ship.isHorizontal === true) {
                col++;
            } else {
                row++;
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        if (this.board[x][y].ship) {
            //hits ship
            this.board[x][y].shot = "hit";
            this.board[x][y].ship.hit();
            if (this.board[x][y].ship.sunk) {
                // alertSunkShip(this.player, this.board[x][y].name)
            }
        } else {
            this.board[x][y].shot = "miss";
        }
    }

    reportHits() {
        const hitLog = [];
        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                if (this.board[x][y].shot === "hit") {
                    hitLog.push([x, y]);
                }
            }
        }
    }

    reportMisses() {
        const missLog = [];
        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                if (this.board[x][y].shot === "miss") {
                    missLog.push([x, y]);
                }
            }
        }
    }

    checkAllShipsSunk() {
        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                if (this.board[x][y].ship && !this.board[x][y].shot) {
                    return false;
                }
            }
        }
        return true;
    }

    checkTileGuessed(x, y) {
        if (this.board[x][y].shot) return true;
        return false;
    }

    checkEmpty(x, y) {
        if (this.board[x][y].ship !== null) {
            return false;
        } else {
            return true;
        }
    }
}

export default Gameboard;
