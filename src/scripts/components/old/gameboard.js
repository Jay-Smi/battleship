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
            board: this.board,
        };
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

    //must edit to accept orientation from event rather that class be stated
    placeShip(x, y, ship) {
        if (this.isValidPlacement(x, y, ship.length)) {
            if (ship.isHorizontal) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[x][y - i].ship = ship;
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    this.board[x + i][y].ship = ship;
                }
            }
        } else {
            //do something if invalid placement
            console.log("Invalid Ship Placement");
            return;
        }
    }

    isValidPlacement(x, y, length) {
        let coordArr = [[x, y]];

        if (this.orientation) {
            if (
                //checks vertical placement is on the board
                x >= 0 &&
                x < this.board.length &&
                y >= 0 &&
                y < this.board.length &&
                y - length + 1 >= 0 &&
                y - length + 1 < this.board.length
            ) {
                for (let i = 1; i < length; i++) {
                    coordArr.push([x, y - i]);
                }
                coordArr.forEach((z) => {
                    if (this.board[z[0]][z[1]] !== null) return false;
                });
                return true;
            } else {
                return false;
            }
        } else {
            if (
                //checks horizontal placement is on the board
                x >= 0 &&
                x < this.board.length &&
                y >= 0 &&
                y < this.board.length &&
                x + length - 1 >= 0 &&
                x + length - 1 < this.board.length
            ) {
                for (let i = 1; i < length; i++) {
                    coordArr.push([x + i, y]);
                }
                coordArr.forEach((z) => {
                    if (this.board[z[0]][z[1]] !== null) return false;
                });
                return true;
            } else {
                return false;
            }
        }
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
