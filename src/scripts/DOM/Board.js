import elem from "./elem.js";

export default class Board {
    constructor(size) {
        this.size = size;
        this.element = this.createElement();
        this.cells = this.createCells();
        this.ships = [];
        this.board = [];
        this.shipQueue = null;
        this.element.addEventListener(
            "dragover",
            this.handleDragOver.bind(this)
        );
        this.element.addEventListener(
            "dragleave",
            this.handleDragLeave.bind(this)
        );
    }

    updateQueue(shipQueue) {
        this.shipQueue = shipQueue;
    }

    createElement() {
        const element = elem({ prop: "div", className: "board" });
        // element.style.gridTemplateRows = `repeat(${this.size}, 50px)`;
        // element.style.gridTemplateColumns = `repeat(${this.size}, 50px)`;
        return element;
    }

    createCells() {
        const cells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = elem({ prop: "div", className: "cell" });
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("dragenter", (e) => {
                    const bound = this.handleDragEnter.bind(this);
                    bound(e, row, col);
                });

                this.element.appendChild(cell);
                cells.push(cell);
            }
        }
        return cells;
    }

    getCell(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return null;
        }
        return this.cells[row * this.size + col];
    }

    getCellPosition(element) {
        const row = Number(element.dataset.row);
        const col = Number(element.dataset.col);
        return { x: col, y: row };
    }

    checkValidPlacement(tiles) {
        for (const tile of tiles) {
            if (!tile) {
                return false;
            }
            if (tile.classList.contains("selected")) {
                return false;
            }
        }
        return true;
    }

    getBaseTile(ship, row, col) {
        const index = ship.clickedIndex;
        let offsetRow = 0;
        let offsetCol = 0;

        if (ship.isHorizontal === true) {
            offsetCol = index;
        } else {
            offsetRow = index;
        }

        const baseRow = row - offsetRow;
        const baseCol = col - offsetCol;

        return { row: baseRow, col: baseCol };
    }

    isValidPlacement(ship, row, col) {
        if (ship.isHorizontal === true && col + ship.size > this.cols) {
            return false;
        }
        if (ship.isHorizontal === false && row + ship.size > this.rows) {
            return false;
        }

        for (let i = 0; i < ship.size; i++) {
            const cell = this.getCell(row, col);
            if (cell) {
                if (cell.classList.contains("ship")) {
                    return false;
                }
                if (ship.isHorizontal === true) {
                    col++;
                } else {
                    row++;
                }
            } else {
                return false;
            }
        }
        return true;
    }

    placeShip(ship, row, col) {
        const cells = this.getCells(ship.size, row, col, ship.isHorizontal);
        if (cells.every(({ row, col }) => this.grid[row][col] === EMPTY)) {
            // all cells are empty, so place the ship
            cells.forEach(({ row, col }) => {
                this.grid[row][col] = ship.id;
                const cell = this.getCell(row, col);
                cell.setAttribute("data-ship", ship.id);
            });
            return true;
        } else {
            // some cells are already occupied, so don't place the ship
            return false;
        }
    }

    render() {
        this.cells.forEach((cell) => {
            cell.classList.remove("selected");
            if (this.ships.isShipCell(cell)) {
                cell.classList.add("selected");
            }
        });
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        e.preventDefault();
    }

    handleDragEnter(e, row, col) {
        e.preventDefault();
        const tiles = Array.from(
            document.querySelectorAll(".hover", ".valid", ".invalid")
        );
        tiles.forEach((tile) => {
            tile.classList.remove("hover", "invalid", "valid");
        });
        const ship = this.shipQueue.activeShip;
        const isHorizontal = ship.isHorizontal;
        const length = ship.size;
        let baseCoords = this.getBaseTile(ship, row, col);
        let baseRow = baseCoords.row;
        let baseCol = baseCoords.col;

        let isValid = this.isValidPlacement(ship, baseRow, baseCol);

        let rowOffset = baseRow;
        let colOffset = baseCol;
        for (let i = 0; i < length; i++) {
            if (rowOffset >= this.boardSize || colOffset >= this.boardSize) {
                isValid = false;
                break;
            }
            if (this.cells[Number(`${rowOffset}` + `${colOffset}`)] === null) {
                isValid = false;
                break;
            }
            if (isHorizontal) {
                colOffset++;
            } else {
                rowOffset++;
            }
        }
        if (isValid) {
            rowOffset = baseRow;
            colOffset = baseCol;
            for (let i = 0; i < length; i++) {
                const cell = this.getCell(rowOffset, colOffset);

                if (cell) {
                    cell.classList.add("valid");
                    cell.classList.add("hover");
                }
                rowOffset = isHorizontal ? rowOffset : rowOffset + 1;
                colOffset = isHorizontal ? colOffset + 1 : colOffset;
            }
        } else {
            rowOffset = baseRow;
            colOffset = baseCol;
            for (let i = 0; i < length; i++) {
                const cell = this.getCell(rowOffset, colOffset);
                if (cell) {
                    cell.classList.add("invalid");
                    cell.classList.add("hover");
                }
                rowOffset = isHorizontal ? rowOffset : rowOffset + 1;
                colOffset = isHorizontal ? colOffset + 1 : colOffset;
            }
        }
    }
}
