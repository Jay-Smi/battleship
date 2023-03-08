import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";
import Ship from "./ShipElem";
import {
    checkAllShipsPlaced,
    isValidPlacement,
    placeShip,
} from "../../gameComponents/Game";

export default class playerBoardElem extends PubSubInterface {
    constructor(viewModel, element, dragEnter) {
        super(viewModel, element);
        this.dragEnter = dragEnter;
        this.boardSize = null;
    }

    render(model) {
        return this.buildBoard(model);
    }

    buildBoard(model) {
        const shadowGrid = elem({ prop: "div", className: "shadowGrid" });
        const board = elem({
            prop: "div",
            className: "board",
            children: [shadowGrid],
        });
        this.boardSize = model.player.gameboard.size;
        const cells = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = elem({ prop: "div", className: "cell" });
                const tileRef = model.player.gameboard.board[row][col];
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
                    bound(e, row, col, model);
                });
                cell.addEventListener("dragover", (e) => {
                    const bound = this.handleDragOver.bind(this);
                    bound(e, row, col);
                });
                if (tileRef.ship) {
                    // display ship effect
                    cell.classList.add;
                }

                switch (tileRef.tileStatus) {
                    case "H":
                        // display hit marker
                        break;
                    case "M":
                        // display miss marker
                        break;
                    case null:
                        // do nothing
                        break;
                }

                // appends the cell to the board container
                // adds a reference to the DOM cell to the cells array
                board.appendChild(cell);

                cells.push(cell);
            }
        }
        this.cells = cells;

        model.player.gameboard.ships.forEach((ship, index) => {
            const shipElem = new Ship(ship, (clickedIndex) => {
                // this.clickedEvent(index, clickedIndex);
            });
            const baseTile = ship.tiles[0];
            const endTile = ship.tiles[ship.size - 1];
            shipElem.element.style.gridArea = `${baseTile.row + 1} / ${
                baseTile.col + 1
            } / ${endTile.row + 2} / ${endTile.col + 2}`;
            shipElem.element.classList.add("boardShip");
            shipElem.tiles.forEach((tile) => {
                tile.classList.add("onBoard");
            });

            if (index === model.player.gameboard.ships.length - 1) {
                shipElem.shipPulse.classList.add("shipOverlayPulse");
                // setTimeout(() => {
                //     shipElem.shipPulse.classList.remove("shipOverlayPulse");
                // }, 2000);
            }
            shadowGrid.appendChild(shipElem.element);
        });

        const boardBorder = elem({ prop: "div", className: "boardBorder" });
        boardBorder.appendChild(board);
        return boardBorder;
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        e.preventDefault();
    }

    handleDragEnter(e, row, col, model) {
        e.preventDefault();
        const [clickedIndex, ship] = this.dragEnter();
        this.draggedShip = ship;
        this.clickedIndex = clickedIndex;
        // get all tiles with prior hover effects
        const tiles = Array.from(
            document.querySelectorAll(".hover", ".valid", ".invalid")
        );
        // clear their hover effects
        tiles.forEach((tile) => {
            tile.classList.remove("hover", "invalid", "valid");
        });

        const isHorizontal = ship.isHorizontal;
        const length = ship.size;
        // calculate the base tile for the dragged ship
        // based on the ship index that was clicked and tile current hovered
        // (left most for horizontal, top most for vertical)
        const baseCoords = this.getBaseTile(ship, row, col, clickedIndex);
        const baseRow = baseCoords.row;
        const baseCol = baseCoords.col;

        // check if hovered tiles are all on the board and dont overlap a ship
        let isValid = isValidPlacement(
            ship,
            baseRow,
            baseCol,
            model.player.gameboard
        );
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

    handleDrop(e, row, col, model) {
        e.preventDefault();

        let baseCoords = this.getBaseTile(
            this.draggedShip,
            row,
            col,
            this.clickedIndex
        );
        let baseRow = baseCoords.row;
        let baseCol = baseCoords.col;

        let isValid = isValidPlacement(
            this.draggedShip,
            baseRow,
            baseCol,
            model.player.gameboard
        );

        if (isValid) {
            this.viewModel.updateModel((oldModel) => {
                const newModel = JSON.parse(JSON.stringify(oldModel));
                newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
                const { newGameboard, newShip } = placeShip(
                    this.draggedShip,
                    baseRow,
                    baseCol,
                    oldModel.player.gameboard
                );

                newModel.player.gameboard = newGameboard;
                newModel.player.shipQueue.shift();
                if (newModel.player.shipQueue.length > 0) {
                    newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
                }
                newModel.player.gameboard.ships.push(newShip);

                const allPlaced = checkAllShipsPlaced(newModel.player);

                if (allPlaced) {
                    newModel.allShipsPlaced = true;
                    newModel.stateMessage = `Good luck Admiral ${newModel.player.name}`;
                }

                return newModel;
            });
        } else {
            // TODO: handle invalid placement drop\
            this.viewModel.updateModel((oldModel) => {
                const newModel = { ...oldModel };
                newModel.stateMessage = `${newModel.player.shipQueue[0].name} went out of bounds, try again.`;
                return newModel;
            });
        }
    }

    /**  calculates the left most or top most tile */
    getBaseTile(ship, row, col, clickedIndex) {
        // gets the index that the ship was picked up by
        const index = clickedIndex;
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
