import elem from "../../DOM/elem.js";

class Tile {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.ship = null;
        this.shot = null;
        this.element = null;
    }
}

export default Tile;
