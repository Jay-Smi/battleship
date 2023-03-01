import elem from "../DOM/elem.js";

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ship = null;
        this.shot = null;
        this.element = null;
    }
}

export default Tile;
