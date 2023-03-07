import Tile from "./Tile.js";

export default class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = [];
        // this.orientation = true; //true vertical, false horizontal
        this.ships = [];

        for (let row = 0; row < this.size; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.size; col++) {
                this.board[row][col] = new Tile(row, col);
            }
        }
    }
}
