import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class BoardElem extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render(model) {
        if (model.gameState === "placeShips") {
            return this.buildBoard(model);
        }
    }

    buildBoard(model) {
        const board = elem({ prop: "div", className: "board" });
        this.boardSize = model.player.gameboard.size;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = elem({ prop: "div", className: "cell" });

                // sets data values for coordinates
                cell.dataset.row = row;
                cell.dataset.col = col;

                // adds the dragenter and drop listener
                cell.addEventListener("dragenter", (e) => {
                    const bound = this.handleDragEnter.bind(this);
                    bound(e, row, col, model);
                });
                cell.addEventListener("drop", (e) => {
                    const bound = this.handleDrop.bind(this);
                    bound(e, row, col);
                });

                // appends the cell to the board container
                // adds a reference to the DOM cell to the cells array
                board.appendChild(cell);
                this.cells = [];
                this.cells.push(cell);
            }
        }
        return board;
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        e.preventDefault();
    }

    handleDragEnter(e, row, col, model) {
        e.preventDefault();

        // get all tiles with prior hover effects
        const tiles = Array.from(
            document.querySelectorAll(".hover", ".valid", ".invalid")
        );
        // clear their hover effects
        tiles.forEach((tile) => {
            tile.classList.remove("hover", "invalid", "valid");
        });
        console.log(e.dataTransfer.getData("ship"));
        // get the current ship in the queue
        const data = e.dataTransfer.getData("ship");

        const ship = JSON.parse(data);
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

    /**  returns the DOM element for a given coordinate */
    getCell(row, col) {
        if (
            row < 0 ||
            row >= this.boardSize ||
            col < 0 ||
            col >= this.boardSize
        ) {
            return null;
        }
        return this.cells[row * this.boardSize + col];
    }
}
