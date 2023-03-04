class Ship {
    constructor(length, name = "default") {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.name = name;
        this.isHorizontal = false;
    }

    getState() {
        return {
            length: this.length,
            hits: this.hits,
            sunk: this.sunk,
            name: this.name,
            isHorizontal: this.isHorizontal,
        };
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

    rotate() {
        this.isHorizontal = !this.isHorizontal;
    }
}

export default Ship;
