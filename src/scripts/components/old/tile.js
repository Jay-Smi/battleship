import elem from "../../DOM/elem.js";

class Tile {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.ship = null;
        this.shot = null;
        this.element = null;
        this.tileStatus = null;
    }

    getState() {
        return {
            row: this.row,
            col: this.col,
            ship: this.ship,
            shot: this.shot,
            tileStatus: this.tileStatus,
        };
    }
}

export default Tile;
