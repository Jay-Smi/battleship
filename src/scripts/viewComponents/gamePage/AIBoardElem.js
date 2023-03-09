import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";
import Ship from "./ShipElem";
import {
    attack,
    checkAllShipsSunk,
    AIMoveEasy,
    AIMoveMedium,
    AIMoveHard,
} from "../../gameComponents/Game";

export default class AIBoardElem extends PubSubInterface {
    constructor(viewModel, element, dragEnter) {
        super(viewModel, element);
        this.dragEnter = dragEnter;
        this.boardSize = null;
        this.lastClicked = null;
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
        this.boardSize = model.AI.gameboard.size;
        const cells = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = elem({ prop: "div", className: "cell" });
                const tileRef = model.AI.gameboard.board[row][col];
                // sets data values for coordinates
                cell.dataset.row = row;
                cell.dataset.col = col;

                // delay the listener to prevent spam
                setTimeout(() => {
                    cell.addEventListener("click", (e) => {
                        const bound = this.handleClick.bind(this);
                        bound(e, row, col, model, cell);
                    });
                }, 0);

                if (this.lastClicked) {
                    if (
                        this.lastClicked.row === row &&
                        this.lastClicked.col === col
                    ) {
                        cell.classList.add("pulse");
                    }
                }

                switch (tileRef.tileStatus) {
                    case "hit":
                        cell.classList.add("hit");
                        // display hit marker
                        break;
                    case "miss":
                        cell.classList.add("miss");
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

        model.AI.gameboard.ships.forEach((ship, index) => {
            if (ship.sunk) {
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

                shadowGrid.appendChild(shipElem.element);
            }
        });

        const boardBorder = elem({ prop: "div", className: "boardBorder" });
        boardBorder.appendChild(board);
        return boardBorder;
    }

    handleClick(e, row, col, cell) {
        this.lastClicked = { row: row, col: col };
        this.viewModel.updateModel((oldModel) => {
            const newModel = JSON.parse(JSON.stringify(oldModel));

            const AIgameboard = newModel.AI.gameboard;

            const attResponse = attack(row, col, AIgameboard);

            newModel.lastClicked = { row: row, col: col };

            if (!attResponse) {
                newModel.stateMessage = "Already attacked there sir";
                return newModel;
            }

            const clickedTile = AIgameboard.board[row][col];
            if (checkAllShipsSunk(AIgameboard.ships)) {
                newModel.gameState = "playerWins";
            }

            setTimeout(() => {
                this.viewModel.updateModel((oldModel1) => {
                    const newModel = JSON.parse(JSON.stringify(oldModel1));

                    const playerGameboard = newModel.player.gameboard;

                    switch (newModel.AI.difficulty) {
                        case "easy":
                            AIMoveEasy(playerGameboard);
                            break;
                        case "medium":
                            AIMoveMedium(playerGameboard);

                            break;
                        case "hard":
                            AIMoveMedium(playerGameboard);
                            break;
                    }

                    const clickedTile = playerGameboard.board[row][col];
                    if (checkAllShipsSunk(playerGameboard.ships)) {
                        newModel.gameState = "AIWins";
                    }
                    return newModel;
                });
            }, 0);

            return newModel;
        });
    }

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
