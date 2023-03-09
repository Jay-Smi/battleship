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
        this.allShipsPlaced = false;
        this.dropQueue = [];
        this.videoPlaying = true;
        this.lastClicked = null;
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
    // checks if the gameboard tile exists
    // and if the tile contains a ship
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
    // creates a copy of each to modify and return
    let newGameboard = JSON.parse(JSON.stringify(gameboard));
    let newShip = JSON.parse(JSON.stringify(ship));

    // verifies the ship tile exists
    // and doesn't contain a ship
    for (let i = 0; i < ship.size; i++) {
        if (gameboard.board[row]) {
            if (gameboard.board[row][col]) {
                if (gameboard.board[row][col].ship === null) {
                    // sets tile.ship to true
                    newGameboard.board[row][col].ship = true;
                    // saves tile reference to ship
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

// recursively tries to place a ship randomly until placement is valid
// returns the new board and new ship
function placeShipRandomly(ship, gameboard) {
    //
    ship.isHorizontal = Math.random() > 0.5;

    const randRow = Math.floor(Math.random() * gameboard.size);
    const randCol = Math.floor(Math.random() * gameboard.size);

    const isValid = isValidPlacement(ship, randRow, randCol, gameboard);

    if (isValid) {
        return placeShip(ship, randRow, randCol, gameboard);
    } else {
        return placeShipRandomly(ship, gameboard);
    }
}

function checkAllShipsPlaced(player) {
    return player.shipQueue.length < 1;
}

function resetBoard(gameboard) {
    for (let row = 0; row < gameboard.size; row++) {
        for (let col = 0; col < gameboard.size; col++) {
            gameboard.board[row][col].ship = null;
            gameboard.board[row][col].tileStatus = null;
        }
    }
}

function resetShips(player) {
    while (player.gameboard.ships.length > 0) {
        player.gameboard.ships[0].tiles = [];
        player.shipQueue.push(player.gameboard.ships.shift());
    }
}

// update the gameboard's tileStaus
// if ship, ++hits
// check sunk
// if sunk, check all sunk
// if all sunk update gameState
function attack(row, col, gameboard) {
    const tile = gameboard.board[row][col];

    if (tile.tileStatus !== null) {
        console.warn("Tile already attacked.");
        return false;
    }

    if (tile.ship !== null) {
        tile.tileStatus = "hit";
        const ship = getShip(row, col, gameboard);
        ship.hits++;
        if (checkShipSunk(ship)) {
            ship.sunk = true;
        }
    } else {
        tile.tileStatus = "miss";
    }
    return gameboard;
}

function checkShipSunk(ship) {
    return ship.hits === ship.size;
}

function checkAllShipsSunk(shipList) {
    for (const ship of shipList) {
        if (!checkShipSunk(ship)) return false;
    }
    return true;
}

function getShip(cRow, cCol, gameboard) {
    for (const ship of gameboard.ships) {
        for (const { row, col } of ship.tiles) {
            if (cRow === row && cCol === col) {
                return ship;
            }
        }
    }
    return null;
}

function randomIndex() {
    return Math.floor(Math.random() * 9);
}

function AIMoveEasy(playerGameboard) {
    const randRow = randomIndex();
    const randCol = randomIndex();
    const randTile = playerGameboard.board[randRow][randCol];
    if (randTile.tileStatus !== null) {
        return AIMoveEasy(playerGameboard);
    } else {
        return attack(randRow, randCol, playerGameboard);
    }
}

function AIMoveMedium(playerGameboard) {
    const unattackedTiles = [];
    const attackedTiles = [];
    const unattackedBacktrackTiles = [];

    // Collect all hit tiles and their adjacent unattacked tiles
    const hitTiles = [];
    const adjacentUnattackedTiles = new Set();
    for (let row = 0; row < playerGameboard.size; row++) {
        for (let col = 0; col < playerGameboard.size; col++) {
            const tile = playerGameboard.board[row][col];
            if (tile.tileStatus === "hit") {
                hitTiles.push(tile);
                const adjacentTiles = getAdjacentTiles(playerGameboard, tile);
                adjacentTiles.forEach((adjTile) => {
                    if (
                        playerGameboard.board[adjTile.row][adjTile.col]
                            .tileStatus === null
                    ) {
                        adjacentUnattackedTiles.add(adjTile);
                    }
                });
            } else if (tile.tileStatus === null) {
                unattackedTiles.push(tile);
            } else if (tile.tileStatus === "miss") {
                attackedTiles.push(tile);
            }
        }
    }

    // Add adjacent unattacked tiles to backtrack list
    adjacentUnattackedTiles.forEach((tile) => {
        unattackedBacktrackTiles.push(tile);
    });

    let targetTile;

    if (unattackedBacktrackTiles.length > 0) {
        console.log("debug", 6);
        targetTile = unattackedBacktrackTiles.pop();
    } else {
        // Targeting a new random tile
        console.log("debug", 1);
        const randomIndex = Math.floor(Math.random() * unattackedTiles.length);
        targetTile = unattackedTiles[randomIndex];
    }

    return attack(targetTile.row, targetTile.col, playerGameboard);
}

function getAdjacentTiles(playerGameboard, tile) {
    const adjacentTiles = [];
    if (tile.row > 0) {
        adjacentTiles.push(playerGameboard.board[tile.row - 1][tile.col]); // Up
    }
    if (tile.row < playerGameboard.size - 1) {
        adjacentTiles.push(playerGameboard.board[tile.row + 1][tile.col]); // Down
    }
    if (tile.col > 0) {
        adjacentTiles.push(playerGameboard.board[tile.row][tile.col - 1]); // Left
    }
    if (tile.col < playerGameboard.size - 1) {
        adjacentTiles.push(playerGameboard.board[tile.row][tile.col + 1]); // Right
    }
    return adjacentTiles;
}

function getTilesBetween(playerGameboard, tile1, tile2) {
    const tilesBetween = [];
    if (tile1.row === tile2.row) {
        // Horizontal
        const startCol = Math.min(tile1.col, tile2.col);
        const endCol = Math.max(tile1.col, tile2.col);
        for (let col = startCol; col <= endCol; col++) {
            tilesBetween.push(playerGameboard.board[tile1.row][col]);
        }
    } else if (tile1.col === tile2.col) {
        // Vertical
        const startRow = Math.min(tile1.row, tile2.row);
        const endRow = Math.max(tile1.row, tile2.row);
        for (let row = startRow; row <= endRow; row++) {
            tilesBetween.push(playerGameboard.board[row][tile1.col]);
        }
    }
    return tilesBetween;
}

// TODO: make hard AI actually work D:
function AIMoveHard(playerGameboard) {
    const unattackedTiles = [];
    const attackedTiles = [];
    const unattackedBacktrackTiles = [];

    // Collect all hit tiles and their adjacent unattacked tiles
    const hitTiles = [];
    const adjacentUnattackedTiles = new Set();
    for (let row = 0; row < playerGameboard.size; row++) {
        for (let col = 0; col < playerGameboard.size; col++) {
            const tile = playerGameboard.board[row][col];
            if (tile.tileStatus === "hit") {
                hitTiles.push(tile);
                const adjacentTiles = getAdjacentTiles(playerGameboard, tile);
                adjacentTiles.forEach((adjTile) => {
                    if (
                        playerGameboard.board[adjTile.row][adjTile.col]
                            .tileStatus === null
                    ) {
                        adjacentUnattackedTiles.add(adjTile);
                    }
                });
            } else if (tile.tileStatus === null) {
                unattackedTiles.push(tile);
            } else if (tile.tileStatus === "miss") {
                attackedTiles.push(tile);
            }
        }
    }

    // Add adjacent unattacked tiles to backtrack list
    adjacentUnattackedTiles.forEach((tile) => {
        unattackedBacktrackTiles.push(tile);
    });

    let targetTile;
    let hitShip = null;

    if (unattackedBacktrackTiles.length > 0) {
        console.log("debug", 6);
        targetTile = unattackedBacktrackTiles.pop();
        const adjacentTiles = getAdjacentTiles(playerGameboard, targetTile);
        adjacentTiles.forEach((adjTile) => {
            if (
                playerGameboard.board[adjTile.row][adjTile.col].tileStatus ===
                    "hit" &&
                hitShip === null
            ) {
                hitShip = playerGameboard.board[adjTile.row][adjTile.col].ship;
            }
        });
    } else {
        // Targeting a new random tile
        console.log("debug", 1);
        const randomIndex = Math.floor(Math.random() * unattackedTiles.length);
        targetTile = unattackedTiles[randomIndex];
    }

    const attackResult = attack(
        targetTile.row,
        targetTile.col,
        playerGameboard
    );

    if (attackResult === "hit" && hitShip) {
        const shipSunk = hitShip.sunk;
        if (shipSunk) {
            hitShip = null;
            adjacentUnattackedTiles.clear();
        } else {
            const adjacentTiles = getAdjacentTiles(playerGameboard, targetTile);
            adjacentTiles.forEach((adjTile) => {
                if (
                    playerGameboard.board[adjTile.row][adjTile.col]
                        .tileStatus === null
                ) {
                    adjacentUnattackedTiles.add(adjTile);
                }
            });
        }
    }
    console.log(attackResult);
    return attackResult;
}

export {
    isValidPlacement,
    placeShip,
    placeShipRandomly,
    checkAllShipsPlaced,
    resetBoard,
    resetShips,
    attack,
    checkShipSunk,
    checkAllShipsSunk,
    AIMoveEasy,
    AIMoveMedium,
    AIMoveHard,
};
// function AIMoveMedium(playerGameboard) {
//     const unattackedTiles = [];
//     const attackedTiles = [];
//     const unattackedBacktrackTiles = [];
//     let hitShip = null;
//     let hitDirection = null;

//     // Collect all hit tiles and their adjacent unattacked tiles
//     const hitTiles = [];
//     const adjacentUnattackedTiles = new Set();
//     for (let row = 0; row < playerGameboard.size; row++) {
//         for (let col = 0; col < playerGameboard.size; col++) {
//             const tile = playerGameboard.board[row][col];
//             if (tile.tileStatus === "hit") {
//                 hitTiles.push(tile);
//                 const adjacentTiles = getAdjacentTiles(playerGameboard, tile);
//                 adjacentTiles.forEach((adjTile) => {
//                     if (
//                         playerGameboard.board[adjTile.row][adjTile.col]
//                             .tileStatus === null
//                     ) {
//                         adjacentUnattackedTiles.add(adjTile);
//                     }
//                 });
//                 if (!hitShip) {
//                     // if this is the first hit, check if it's part of a ship
//                     const ship = playerGameboard.getShipAt(tile.row, tile.col);
//                     if (ship) {
//                         hitShip = ship;
//                         // check the direction of the ship
//                         if (ship.positions[0].row === ship.positions[1].row) {
//                             hitDirection = "horizontal";
//                         } else {
//                             hitDirection = "vertical";
//                         }
//                     }
//                 }
//             } else if (tile.tileStatus === null) {
//                 unattackedTiles.push(tile);
//             } else if (tile.tileStatus === "miss") {
//                 attackedTiles.push(tile);
//             }
//         }
//     }

//     // Add adjacent unattacked tiles to backtrack list
//     adjacentUnattackedTiles.forEach((tile) => {
//         unattackedBacktrackTiles.push(tile);
//     });

//     let targetTile;

//     if (hitShip) {
//         console.log("debug", 7);
//         // if there's a hit ship, continue attacking in the same direction
//         if (hitDirection === "horizontal") {
//             const row = hitShip.positions[0].row;
//             const startIndex = Math.min(...hitShip.positions.map((pos) => pos.col));
//             const endIndex = Math.max(...hitShip.positions.map((pos) => pos.col));
//             let col;
//             if (hitShip.isSunk()) {
//                 // if the ship is sunk, attack randomly
//                 targetTile = unattackedTiles[Math.floor(Math.random() * unattackedTiles.length)];
//             } else {
//                 // attack the next tile in the same direction
//                 if (attackedTiles.length > 0) {
//                     // prioritize attacking tiles that are in the same row and haven't been attacked yet
//                     const unattackedInRow = unattackedTiles.filter((tile) => tile.row === row);
//                     const attackedInRow = attackedTiles.filter((tile) => tile.row === row);
//                     const availableTiles = unattackedInRow.concat(attackedInRow);
//                     for (let i = startIndex; i <= endIndex; i++) {
//                         if (!availableTiles.some((tile) => tile.col === i)) {
//                             col = i;
//                             break;
//                         }
//                     }
//                 }
//                 if (!col) {
//                     // if there are no adjacent unattacked tiles in the same row, backtrack
//                     col = hitTiles[hitTiles.length - 1].col;
//                 }
//                 if (col < endIndex) {
//                     targetTile = playerGameboard.board[row][col + 1];
//                 } else {
//                     targetTile =
