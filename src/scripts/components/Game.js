import Player from "./Player";
import AI from "./AI";

// model
export default class Game {
    constructor() {
        this.player = new Player();
        this.AI = new AI();
        this.currentTurn = "player";
        this.currentPage = "homePage";
        this.namePageIsOpen = false;
        this.stateMessage = "";
        this.gameState = null;
        this.dropQueue = [];
    }
}

// assumes row / col are the base tile of the ship
function isValidPlacement(ship, row, col, gameboard) {
    // checks if all hovered tiles are on the board

    if (ship.isHorizontal === true && col + ship.size > gameboard.size) {
        return false;
    }
    if (ship.isHorizontal === false && row + ship.size > gameboard.size) {
        return false;
    }
    // iterates over every tile
    // and checks if the gameboard contains a ship
    for (let i = 0; i < ship.size; i++) {
        if (gameboard.board[row]) {
            if (gameboard.board[row][col]) {
                if (gameboard.board[row][col].ship) {
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
        } else {
            return false;
        }
    }
    return true;
}

function placeShip(ship, row, col, gameboard) {
    let newGameboard = { ...gameboard };
    let newShip = { ...ship };

    for (let i = 0; i < ship.size; i++) {
        if (gameboard.board[row]) {
            if (gameboard.board[row][col]) {
                if (gameboard.board[row][col].ship === null) {
                    newGameboard.board[row][col].ship = true;
                    newShip.tiles.push(newGameboard.board[row][col]);

                    if (ship.isHorizontal === true) {
                        col++;
                    } else {
                        row++;
                    }
                } else {
                    console.warn("this shouldn't happen");
                    return false;
                }
            } else {
                console.warn("this shouldn't happen");
                return false;
            }
        } else {
            console.warn("this shouldn't happen");
            return false;
        }
    }
    return { newGameboard, newShip };
}

function placeShipRandomly(ship, gameboard) {
    ship.isHorizontal = Math.random() > 0.5;

    const randRow = Math.floor(Math.random() * 10);
    const randCol = Math.floor(Math.random() * 10);

    const isValid = isValidPlacement(ship, randRow, randCol, gameboard);

    if (isValid) {
        return placeShip(ship, randRow, randCol, gameboard);
    } else {
        return placeShipRandomly(ship, gameboard);
    }
}

export { isValidPlacement, placeShip, placeShipRandomly };
