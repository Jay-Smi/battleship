class Ship {
    constructor(length, name = "default") {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.name = name;
    }

    hit() {
        this.hits += 1;
        this.isSunk();
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }
}

export default Ship;
