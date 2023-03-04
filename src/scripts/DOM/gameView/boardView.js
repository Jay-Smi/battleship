import elem from "../elem.js";

export default class Board {
    constructor(board, PubSub, shipQueue) {
        this.PubSub = PubSub;

        // keeps copy of latest model info for ease of access
        this.gameboard = board;
        this.shipQueue = shipQueue;
        this.ships = [];

        // build the board
        this.element = elem({ prop: "div", className: "board" });
        this.cells = this.createCells();

        // add a listener to prevent default on drag events
        this.element.addEventListener(
            "dragover",
            this.handleDragOver.bind(this)
        );
        this.element.addEventListener(
            "dragleave",
            this.handleDragLeave.bind(this)
        );

        // append the board
        this.container = document.querySelector(".p1GridContainer");
        this.container.appendChild(this.element);
    }

    // updateQueue(shipQueue) {
    //     this.shipQueue = shipQueue;
    // }

    //                   use for custom board sizes
    // createElement() {
    //     const element = elem({ prop: "div", className: "board" });
    //     // element.style.gridTemplateRows = `repeat(${this.size}, 50px)`;
    //     // element.style.gridTemplateColumns = `repeat(${this.size}, 50px)`;
    //     return element;
    // }

    //will use to display hit / miss / not attacked status, ship display not here
    // accepts fresh gameboard
    updateView(gameboard) {}

    isShipCell(cell) {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (this.board[row][col].ship !== null) {
            return true;
        }
    }

    createCells() {
        // creates the board DOM elements
        const cells = [];

        for (let row = 0; row < this.gameboard.size; row++) {
            for (let col = 0; col < this.gameboard.size; col++) {
                const cell = elem({ prop: "div", className: "cell" });

                // sets data values for coordinates
                cell.dataset.row = row;
                cell.dataset.col = col;

                // adds the dragenter and drop listener
                cell.addEventListener("dragenter", (e) => {
                    const bound = this.handleDragEnter.bind(this);
                    bound(e, row, col);
                });
                cell.addEventListener("drop", (e) => {
                    const bound = this.handleDrop.bind(this);
                    bound(e, row, col);
                });

                // appends the cell to the board container
                // adds a reference to the DOM cell to the cells array
                this.element.appendChild(cell);
                cells.push(cell);
            }
        }
        return cells;
    }

    /**  returns the DOM element for a given coordinate */
    getCell(row, col) {
        if (
            row < 0 ||
            row >= this.gameboard.size ||
            col < 0 ||
            col >= this.gameboard.size
        ) {
            return null;
        }
        return this.cells[row * this.gameboard.size + col];
    }

    /** returns the DOM elements for given coordinates and ship */
    getCells(size, row, col, isHorizontal) {
        const cells = [];

        for (let i = 0; i < size; i++) {
            const currentRow = isHorizontal ? row : row + i;
            const currentCol = isHorizontal ? col + i : col;
            const cell = this.getCell(currentRow, currentCol);
            cells.push(cell);
        }

        return cells;
    }

    /**  get coordinates based on element's dataset */
    getCellPosition(element) {
        const row = Number(element.dataset.row);
        const col = Number(element.dataset.col);
        return { x: col, y: row };
    }

    /**  calculates the left most or top most tile */
    getBaseTile(ship, row, col) {
        // gets the index that the ship was picked up by
        const index = ship.clickedIndex;
        let offsetRow = 0;
        let offsetCol = 0;

        // offsets the hovered tile according to the grabbed index
        if (ship.isHorizontal === true) {
            offsetCol = index;
        } else {
            offsetRow = index;
        }

        const baseRow = row - offsetRow;
        const baseCol = col - offsetCol;

        return { row: baseRow, col: baseCol };
    }

    /** additional validation by the model before placeship event fulfilled
        assumes row, col is the base tile */
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
        // checks gameboard model along with a css class
        for (let i = 0; i < ship.size; i++) {
            const cell = this.getCell(row, col);
            if (cell) {
                if (
                    cell.classList.contains("ship") ||
                    this.gameboard.board[row][col].ship
                ) {
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
        if (
            cells.every(
                ({ row, col }) => this.gameboard.board[row][col] === EMPTY
            )
        ) {
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

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        e.preventDefault();
    }

    handleDragEnter(e, row, col) {
        e.preventDefault();

        // get all tiles with prior hover effects
        const tiles = Array.from(
            document.querySelectorAll(".hover", ".valid", ".invalid")
        );
        // clear their hover effects
        tiles.forEach((tile) => {
            tile.classList.remove("hover", "invalid", "valid");
        });
        // get the current ship in the queue
        const ship = this.shipQueue.activeShip;
        const isHorizontal = ship.isHorizontal;
        const length = ship.size;
        // calculate the base tile for the dragged ship
        // based on the ship index that was clicked and tile current hovered
        // (left most for horizontal, top most for vertical)
        const baseCoords = this.getBaseTile(ship, row, col);
        const baseRow = baseCoords.row;
        const baseCol = baseCoords.col;
        // check if hovered tiles are all on the board and dont overlap a ship
        let isValid = this.isValidPlacement(ship, baseRow, baseCol);
        let rowOffset = baseRow;
        let colOffset = baseCol;
        // aquire the div for every cell
        // and style according to validity
        for (let i = 0; i < length; i++) {
            if (
                rowOffset >= this.gameboard.size ||
                colOffset >= this.gameboard.size
            ) {
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

    handleDrop(e, row, col) {
        e.preventDefault();

        const ship = this.shipQueue.activeShip;
        let baseCoords = this.getBaseTile(ship, row, col);
        let baseRow = baseCoords.row;
        let baseCol = baseCoords.col;

        let isValid = this.isValidPlacement(ship, baseRow, baseCol);
        if (isValid) {
            this.PubSub.publish("event", [
                {
                    type: "shipPlaced",
                    data: { ship: ship, row: baseRow, col: baseCol },
                },
            ]);
        }
    }
}
