export default class Ship {
    constructor(size, name) {
        this.name = name;
        this.size = size;
        this.hits = 0;
        this.sunk = false;
        this.isHorizontal = false;
    }
}
