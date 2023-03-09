/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/PubSubInterface.js":
/*!****************************************!*\
  !*** ./src/scripts/PubSubInterface.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PubSubInterface)
/* harmony export */ });
class PubSubInterface {
  constructor(viewModel, element) {
    // all view components will extend this
    this.viewModel = viewModel;

    // save view component's container for later
    this.element = element;

    // register the view component to the viewModel's pubsub
    this.onInit();
  }
  onInit() {
    this.viewModel.register(this);
  }
  shouldUpdate(oldModel, newModel) {
    // default components return true
    // this method can be overridden individually
    return true;
  }
  getElement() {
    return this.element;
  }
}

/***/ }),

/***/ "./src/scripts/ViewModel.js":
/*!**********************************!*\
  !*** ./src/scripts/ViewModel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewModel)
/* harmony export */ });
class ViewModel {
  constructor(model) {
    this.pubsubs = [];
    this.model = model;
  }

  // each view component will individually listen for updates
  register(pubsub) {
    // add the component to the list of listeners
    this.pubsubs.push(pubsub);

    // get the listener's containing element
    const element = pubsub.getElement();

    // replace containing element's children with fresh component
    element.replaceChildren(pubsub.render(this.model));
  }

  // accepts a callback function from the updating view component
  updateModel(modelUpdateFunc) {
    // create a deep copy of the current model
    const oldModel = JSON.parse(JSON.stringify(this.model));

    // pass the model copy into updating component's callback
    // view will then decide what should be modified based on the user's input
    const newModel = modelUpdateFunc(oldModel);

    // update the model with the new values returned from the callback
    for (let key in newModel) {
      this.model[key] = newModel[key];
    }

    // go through the list of listening view components
    for (let pubsub of this.pubsubs) {
      // ask them if they want to update based on the old model and new
      if (pubsub.shouldUpdate(oldModel, newModel)) {
        // get the container of the view componenet
        const element = pubsub.getElement();

        // replace the component with the new version
        // renders return the new component
        element.replaceChildren(pubsub.render(this.model));
      }
    }
  }
}

/***/ }),

/***/ "./src/scripts/gameComponents/AI.js":
/*!******************************************!*\
  !*** ./src/scripts/gameComponents/AI.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AI)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/scripts/gameComponents/Player.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/scripts/gameComponents/Game.js");


class AI extends _Player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    super.name = "AI";
    this.difficulty = null;
    this.autoFillBoard();
  }
  autoFillBoard() {
    while (this.shipQueue.length > 0) {
      const ship = this.shipQueue.shift();
      const {
        newGameboard,
        newShip
      } = (0,_Game__WEBPACK_IMPORTED_MODULE_1__.placeShipRandomly)(ship, this.gameboard);
      this.gameboard = newGameboard;
      this.gameboard.ships.push(newShip);
    }
  }
}

/***/ }),

/***/ "./src/scripts/gameComponents/Game.js":
/*!********************************************!*\
  !*** ./src/scripts/gameComponents/Game.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AIMoveEasy": () => (/* binding */ AIMoveEasy),
/* harmony export */   "AIMoveHard": () => (/* binding */ AIMoveHard),
/* harmony export */   "AIMoveMedium": () => (/* binding */ AIMoveMedium),
/* harmony export */   "attack": () => (/* binding */ attack),
/* harmony export */   "checkAllShipsPlaced": () => (/* binding */ checkAllShipsPlaced),
/* harmony export */   "checkAllShipsSunk": () => (/* binding */ checkAllShipsSunk),
/* harmony export */   "checkShipSunk": () => (/* binding */ checkShipSunk),
/* harmony export */   "default": () => (/* binding */ Game),
/* harmony export */   "isValidPlacement": () => (/* binding */ isValidPlacement),
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "placeShipRandomly": () => (/* binding */ placeShipRandomly),
/* harmony export */   "resetBoard": () => (/* binding */ resetBoard),
/* harmony export */   "resetShips": () => (/* binding */ resetShips)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/scripts/gameComponents/Player.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AI */ "./src/scripts/gameComponents/AI.js");



// model
class Game {
  constructor() {
    this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.AI = new _AI__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
  return {
    newGameboard,
    newShip
  };
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
    for (const {
      row,
      col
    } of ship.tiles) {
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
        adjacentTiles.forEach(adjTile => {
          if (playerGameboard.board[adjTile.row][adjTile.col].tileStatus === null) {
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
  adjacentUnattackedTiles.forEach(tile => {
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
        adjacentTiles.forEach(adjTile => {
          if (playerGameboard.board[adjTile.row][adjTile.col].tileStatus === null) {
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
  adjacentUnattackedTiles.forEach(tile => {
    unattackedBacktrackTiles.push(tile);
  });
  let targetTile;
  let hitShip = null;
  if (unattackedBacktrackTiles.length > 0) {
    console.log("debug", 6);
    targetTile = unattackedBacktrackTiles.pop();
    const adjacentTiles = getAdjacentTiles(playerGameboard, targetTile);
    adjacentTiles.forEach(adjTile => {
      if (playerGameboard.board[adjTile.row][adjTile.col].tileStatus === "hit" && hitShip === null) {
        hitShip = playerGameboard.board[adjTile.row][adjTile.col].ship;
      }
    });
  } else {
    // Targeting a new random tile
    console.log("debug", 1);
    const randomIndex = Math.floor(Math.random() * unattackedTiles.length);
    targetTile = unattackedTiles[randomIndex];
  }
  const attackResult = attack(targetTile.row, targetTile.col, playerGameboard);
  if (attackResult === "hit" && hitShip) {
    const shipSunk = hitShip.sunk;
    if (shipSunk) {
      hitShip = null;
      adjacentUnattackedTiles.clear();
    } else {
      const adjacentTiles = getAdjacentTiles(playerGameboard, targetTile);
      adjacentTiles.forEach(adjTile => {
        if (playerGameboard.board[adjTile.row][adjTile.col].tileStatus === null) {
          adjacentUnattackedTiles.add(adjTile);
        }
      });
    }
  }
  console.log(attackResult);
  return attackResult;
}

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

/***/ }),

/***/ "./src/scripts/gameComponents/Gameboard.js":
/*!*************************************************!*\
  !*** ./src/scripts/gameComponents/Gameboard.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ "./src/scripts/gameComponents/Tile.js");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = [];
    // this.orientation = true; //true vertical, false horizontal
    this.ships = [];
    for (let row = 0; row < this.size; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.board[row][col] = new _Tile_js__WEBPACK_IMPORTED_MODULE_0__["default"](row, col);
      }
    }
  }
}

/***/ }),

/***/ "./src/scripts/gameComponents/Player.js":
/*!**********************************************!*\
  !*** ./src/scripts/gameComponents/Player.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/scripts/gameComponents/Gameboard.js");
/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship.js */ "./src/scripts/gameComponents/Ship.js");


class Player {
  constructor() {
    this.name = null;
    this.gameboard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"](10);
    this.shipQueue = [new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](5, "Carrier"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](4, "Battleship"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, "Destroyer"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, "Submarine"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, "Patrol-Boat")];
  }
}

/***/ }),

/***/ "./src/scripts/gameComponents/Ship.js":
/*!********************************************!*\
  !*** ./src/scripts/gameComponents/Ship.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(size, name) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.sunk = false;
    this.isHorizontal = false;
    this.tiles = [];
  }
}

/***/ }),

/***/ "./src/scripts/gameComponents/Tile.js":
/*!********************************************!*\
  !*** ./src/scripts/gameComponents/Tile.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tile)
/* harmony export */ });
class Tile {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.ship = null;
    this.tileStatus = null;
    // null H M
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/App.js":
/*!*******************************************!*\
  !*** ./src/scripts/viewComponents/App.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _homePage_HomePage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homePage/HomePage.js */ "./src/scripts/viewComponents/homePage/HomePage.js");
/* harmony import */ var _mapPage_MapPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapPage/MapPage.js */ "./src/scripts/viewComponents/mapPage/MapPage.js");
/* harmony import */ var _gamePage_GamePage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gamePage/GamePage.js */ "./src/scripts/viewComponents/gamePage/GamePage.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/viewComponents/elem.js");





class App extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    // pass paramenter's to PubSubInterface's constructor
    super(viewModel, element);
  }

  // only updates if the model's currentPage has changed
  shouldUpdate(oldModel, newModel) {
    return oldModel.currentPage !== newModel.currentPage;
  }
  render(_ref) {
    let {
      currentPage
    } = _ref;
    const appElement = (0,_elem_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
      prop: "div",
      id: "app"
    });
    if (currentPage === "homePage") {
      // create the page component, pass it the viewModel and it's container
      new _homePage_HomePage_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.viewModel, appElement);
    } else if (currentPage === "mapPage") {
      new _mapPage_MapPage_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.viewModel, appElement);
    } else if (currentPage === "gamePage") {
      new _gamePage_GamePage_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.viewModel, appElement);
    }

    // return the new view component
    return appElement;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/elem.js":
/*!********************************************!*\
  !*** ./src/scripts/viewComponents/elem.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const elem = function (content) {
  let version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  let el = document.createElement(content["prop"]);
  let text = content["textContent"];
  if (text) {
    el.textContent = text;
  }
  let id = content["id"];
  if (id) {
    el.id = id;
  }
  let className = content["className"];
  if (className) {
    el.className = className;
  }
  let HTML = content["innerHTML"];
  if (HTML) {
    el.innerHTML = HTML;
  }
  let src = content["src"];
  if (src) {
    el.src = src;
  }
  let forI = content["for"];
  if (forI) {
    el.for = forI;
  }
  let type = content["type"];
  if (type) {
    el.type = type;
  }
  let name = content["name"];
  if (name) {
    el.name = name;
  }
  let value = content["value"];
  if (value) {
    el.value = value;
  }
  let placeholder = content["placeholder"];
  if (placeholder) {
    el.placeholder = placeholder;
  }
  let spellcheck = content["spellcheck"];
  if (spellcheck) {
    el.spellcheck = spellcheck;
  }
  let required = content["required"];
  if (required) {
    el.required = true;
  }
  let checked = content["checked"];
  if (checked) {
    el.checked = true;
  }
  let href = content["href"];
  if (href) {
    el.href = href;
  }
  let autoplay = content["autoplay"];
  if (autoplay) {
    el.autoplay = true;
  }
  let muted = content["muted"];
  if (muted) {
    el.muted = true;
  }
  let loop = content["loop"];
  if (loop) {
    el.loop = true;
  }
  let draggable = content["draggable"];
  if (draggable) {
    el.draggable = true;
  }
  let min = content["min"];
  if (min) {
    el.min = min;
  }
  let max = content["max"];
  if (max) {
    el.max = max;
  }
  let step = content["step"];
  if (step) {
    el.step = step;
  }
  let children = content["children"];
  if (children) {
    for (let child of children) {
      if (version === 2) {
        el.appendChild(elem(child, 2));
      } else {
        el.appendChild(child);
      }
    }
  }
  return el;
};

// function elem(content) {
//     const el = document.createElement(content["prop"]);

//     for (let key in content) {
//         if (content[key] === "prop") {
//             continue;
//         } else if (key === "classList") {
//             for (let className of content[classList]) {
//                 el.classList.add(content[classList][className]);
//             }
//         } else if (key === "children") {
//             console.log(content[key]);
//             for (let child of content[key]) {
//                 el.appendChild(elem(content[key][child]));
//             }
//         } else {
//             el[key] = content[key];
//         }
//     }

//     return el;
// }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elem);

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/AIBoardElem.js":
/*!************************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/AIBoardElem.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AIBoardElem)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _ShipElem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShipElem */ "./src/scripts/viewComponents/gamePage/ShipElem.js");
/* harmony import */ var _gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../gameComponents/Game */ "./src/scripts/gameComponents/Game.js");




class AIBoardElem extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    const shadowGrid = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "shadowGrid"
    });
    const board = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "board",
      children: [shadowGrid]
    });
    this.boardSize = model.AI.gameboard.size;
    const cells = [];
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
          prop: "div",
          className: "cell"
        });
        const tileRef = model.AI.gameboard.board[row][col];
        // sets data values for coordinates
        cell.dataset.row = row;
        cell.dataset.col = col;

        // delay the listener to prevent spam
        setTimeout(() => {
          cell.addEventListener("click", e => {
            const bound = this.handleClick.bind(this);
            bound(e, row, col, model, cell);
          });
        }, 0);
        if (this.lastClicked) {
          if (this.lastClicked.row === row && this.lastClicked.col === col) {
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
        const shipElem = new _ShipElem__WEBPACK_IMPORTED_MODULE_2__["default"](ship, clickedIndex => {
          // this.clickedEvent(index, clickedIndex);
        });
        const baseTile = ship.tiles[0];
        const endTile = ship.tiles[ship.size - 1];
        shipElem.element.style.gridArea = `${baseTile.row + 1} / ${baseTile.col + 1} / ${endTile.row + 2} / ${endTile.col + 2}`;
        shipElem.element.classList.add("boardShip");
        shipElem.tiles.forEach(tile => {
          tile.classList.add("onBoard");
        });
        shadowGrid.appendChild(shipElem.element);
      }
    });
    const boardBorder = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "boardBorder"
    });
    boardBorder.appendChild(board);
    return boardBorder;
  }
  handleClick(e, row, col, cell) {
    this.lastClicked = {
      row: row,
      col: col
    };
    this.viewModel.updateModel(oldModel => {
      const newModel = JSON.parse(JSON.stringify(oldModel));
      const AIgameboard = newModel.AI.gameboard;
      const attResponse = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.attack)(row, col, AIgameboard);
      newModel.lastClicked = {
        row: row,
        col: col
      };
      if (!attResponse) {
        newModel.stateMessage = "Already attacked there sir";
        return newModel;
      }
      const clickedTile = AIgameboard.board[row][col];
      if ((0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.checkAllShipsSunk)(AIgameboard.ships)) {
        newModel.gameState = "playerWins";
      }
      setTimeout(() => {
        this.viewModel.updateModel(oldModel1 => {
          const newModel = JSON.parse(JSON.stringify(oldModel1));
          const playerGameboard = newModel.player.gameboard;
          switch (newModel.AI.difficulty) {
            case "easy":
              (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveEasy)(playerGameboard);
              break;
            case "medium":
              (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveMedium)(playerGameboard);
              break;
            case "hard":
              (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveMedium)(playerGameboard);
              break;
          }
          const clickedTile = playerGameboard.board[row][col];
          if ((0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.checkAllShipsSunk)(playerGameboard.ships)) {
            newModel.gameState = "AIWins";
          }
          return newModel;
        });
      }, 0);
      return newModel;
    });
  }
  getCell(row, col) {
    if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
      return null;
    }
    return this.cells[row * this.boardSize + col];
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/Button.js":
/*!*******************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/Button.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../gameComponents/Game.js */ "./src/scripts/gameComponents/Game.js");



class Button extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element, type) {
    super(viewModel, element);
    this.type = type;
  }
  shouldUpdate(oldModel, newModel) {
    return newModel.gameState === "placeShips";
  }
  render(model) {
    switch (this.type) {
      case "rotate":
        if (model.allShipsPlaced) {
          return this.buildStartButton(model);
          break;
        }
        return this.buildRotateButton(model);
        break;
      case "autoPlace":
        return this.buildAutoPlaceButton(model);
        break;
      case "undo":
        return this.buildUndoButton(model);
        break;
      // case "start":
      //     return this.buildStartButton(model);
      //     break;
    }
  }

  buildRotateButton(model) {
    const rotateButton = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "button",
      id: "activate",
      className: "rotateButton",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span"
      })]
    });
    rotateButton.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
        newModel.player.shipQueue[0].isHorizontal = !newModel.player.shipQueue[0].isHorizontal;
        return newModel;
      });
    });
    const buttonHousing = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "leftButton",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "base",
        children: [rotateButton]
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "buttonText",
        textContent: "Rotate"
      })]
    });
    return buttonHousing;
  }
  buildAutoPlaceButton(model) {
    const autoPlaceButton = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "button",
      id: "activate",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span"
      })]
    });
    autoPlaceButton.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        const newModel = JSON.parse(JSON.stringify(oldModel));
        newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
        if (newModel.player.shipQueue.length === 0) {
          (0,_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_2__.resetBoard)(newModel.player.gameboard);
          (0,_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_2__.resetShips)(newModel.player);
        }
        while (newModel.player.shipQueue.length > 0) {
          const ship = newModel.player.shipQueue.shift();
          const {
            newGameboard,
            newShip
          } = (0,_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_2__.placeShipRandomly)(ship, newModel.player.gameboard);
          newModel.player.gameboard = newGameboard;
          newModel.player.gameboard.ships.push(newShip);
        }
        const allPlaced = (0,_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_2__.checkAllShipsPlaced)(newModel.player);
        if (allPlaced) {
          newModel.allShipsPlaced = true;
          newModel.stateMessage = `Good luck Admiral ${newModel.player.name}`;
        }
        return newModel;
      });
    });
    const autoPlaceHousing = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "middleButton",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "base",
        children: [autoPlaceButton]
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "buttonText",
        textContent: "Auto-place"
      })]
    });
    return autoPlaceHousing;
  }
  buildUndoButton(model) {
    const undoButton = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "button",
      id: "activate",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span"
      })]
    });
    undoButton.addEventListener("click", () => {
      if (model.dropQueue.length > 0) {
        this.viewModel.updateModel(oldModel => {
          const newModel = oldModel.dropQueue.pop();
          return newModel;
        });
      }
    });
    const undoButtonHousing = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "rightButton",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "base",
        children: [undoButton]
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "buttonText",
        textContent: "Undo"
      })]
    });
    return undoButtonHousing;
  }
  buildStartButton(model) {
    const startButton = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "button",
      id: "activate",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span"
      })]
    });
    startButton.addEventListener("click", e => {
      this.viewModel.updateModel(oldModel => {
        const newModel = JSON.parse(JSON.stringify(oldModel));
        newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
        newModel.gameState = "inGame";
        return newModel;
      });
    });
    const startButtonHousing = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "leftButton",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "base",
        children: [startButton]
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "div",
        className: "buttonText",
        textContent: "Begin"
      })]
    });
    return startButtonHousing;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/GameMessage.js":
/*!************************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/GameMessage.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameMessage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");


class GameMessage extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.stateMessage !== newModel.stateMessage;
  }
  render(_ref) {
    let {
      stateMessage
    } = _ref;
    return (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "p",
      className: "stagePara",
      textContent: stateMessage
    });
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/GamePage.js":
/*!*********************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/GamePage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GamePage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _assets_images_wavesAlt_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/images/wavesAlt.jpg */ "./src/assets/images/wavesAlt.jpg");
/* harmony import */ var _CSS_gamepage_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../CSS/gamepage.css */ "./src/CSS/gamepage.css");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _GameMessage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameMessage.js */ "./src/scripts/viewComponents/gamePage/GameMessage.js");
/* harmony import */ var _ShipQueue_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ShipQueue.js */ "./src/scripts/viewComponents/gamePage/ShipQueue.js");
/* harmony import */ var _playerBoardElem_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./playerBoardElem.js */ "./src/scripts/viewComponents/gamePage/playerBoardElem.js");
/* harmony import */ var _Radar_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Radar.js */ "./src/scripts/viewComponents/gamePage/Radar.js");
/* harmony import */ var _Button_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Button.js */ "./src/scripts/viewComponents/gamePage/Button.js");
/* harmony import */ var _OptionsMenu_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./OptionsMenu.js */ "./src/scripts/viewComponents/gamePage/OptionsMenu.js");
/* harmony import */ var _ScoreContainer_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ScoreContainer.js */ "./src/scripts/viewComponents/gamePage/ScoreContainer.js");
/* harmony import */ var _AIBoardElem_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./AIBoardElem.js */ "./src/scripts/viewComponents/gamePage/AIBoardElem.js");
// import Board from "./boardView.js";












class GamePage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.gameState !== newModel.gameState && newModel.currentPage === "gamePage" || oldModel.videoPlaying !== newModel.videoPlaying;
  }
  render(model) {
    switch (model.gameState) {
      case "placeShips":
        return this.buildPlaceShipsStage(model);
        break;
      case "inGame":
        return this.buildInGameStage(model);
        break;
    }
  }
  buildPlaceShipsStage(model) {
    const shipContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "shipContainer"
    });
    new _ShipQueue_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.viewModel, shipContainer, (shipIndex, clickedIndex) => {
      this.clickedIndex = clickedIndex;
      this.draggedShipIndex = shipIndex;
    });
    const messageContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "shipFooter"
    });
    new _GameMessage_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.viewModel, messageContainer);
    const game = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "game"
    });
    new _playerBoardElem_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.viewModel, game, () => {
      return [this.clickedIndex, model.player.shipQueue[this.draggedShipIndex]];
    });
    const radarContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "radarContainer"
    });
    new _Radar_js__WEBPACK_IMPORTED_MODULE_7__["default"](this.viewModel, radarContainer);
    const leftButtonContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "leftButtonContainer"
    });
    const middleButtonContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "leftButtonContainer"
    });
    const rightButtonContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "leftButtonContainer"
    });
    const buttonContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "buttonContainer",
      children: [leftButtonContainer, middleButtonContainer, rightButtonContainer]
    });
    new _Button_js__WEBPACK_IMPORTED_MODULE_8__["default"](this.viewModel, leftButtonContainer, "rotate");
    new _Button_js__WEBPACK_IMPORTED_MODULE_8__["default"](this.viewModel, middleButtonContainer, "autoPlace");
    new _Button_js__WEBPACK_IMPORTED_MODULE_8__["default"](this.viewModel, rightButtonContainer, "undo");
    const optionsContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "optionsContainer"
    });
    new _OptionsMenu_js__WEBPACK_IMPORTED_MODULE_9__["default"](this.viewModel, optionsContainer);
    let waves = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "img",
      src: _assets_images_wavesAlt_jpg__WEBPACK_IMPORTED_MODULE_1__,
      className: "wavesAlt"
    });
    if (model.videoPlaying) {
      waves.classList.add("animate");
    }
    const gameContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "gameContainer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1GridContainer",
        children: [waves, (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "shipBow",
          children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "shipBowWood"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel1"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel2"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel3"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel4"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel5"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel6"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCover"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCoverTop"
          })]
        }), game, optionsContainer]
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1OptionsContainer",
        children: [radarContainer, (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "p1ShipStage",
          draggable: false,
          children: [shipContainer, messageContainer]
        }), buttonContainer]
      })]
    });
    return gameContainer;
  }
  buildInGameStage(model) {
    const playerBoardContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "playerBoardContainer"
    });
    const AIBoardContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "AIBoardContainer"
    });
    const game = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "game",
      children: [playerBoardContainer, AIBoardContainer]
    });
    new _playerBoardElem_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.viewModel, playerBoardContainer, () => {
      return [this.clickedIndex, model.player.shipQueue[this.draggedShipIndex]];
    });
    new _AIBoardElem_js__WEBPACK_IMPORTED_MODULE_11__["default"](this.viewModel, AIBoardContainer, () => {
      return [this.clickedIndex, model.player.shipQueue[this.draggedShipIndex]];
    });
    let waves = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "img",
      src: _assets_images_wavesAlt_jpg__WEBPACK_IMPORTED_MODULE_1__,
      className: "wavesAlt"
    });
    if (model.videoPlaying) {
      waves.classList.add("animate");
    }
    const playerScoreContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "playerScoreContainer"
    });
    new _ScoreContainer_js__WEBPACK_IMPORTED_MODULE_10__["default"](this.viewModel, playerScoreContainer, "player");
    const messageContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "shipFooter"
    });
    new _GameMessage_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.viewModel, messageContainer);
    const radarContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "radarContainer"
    });
    new _Radar_js__WEBPACK_IMPORTED_MODULE_7__["default"](this.viewModel, radarContainer);
    const AIScoreContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "AIScoreContainer"
    });
    new _ScoreContainer_js__WEBPACK_IMPORTED_MODULE_10__["default"](this.viewModel, AIScoreContainer, "AI");
    const optionsContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "optionsContainer"
    });
    optionsContainer.classList.add("inGame");
    new _OptionsMenu_js__WEBPACK_IMPORTED_MODULE_9__["default"](this.viewModel, optionsContainer);
    const playerStage = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "playerStage",
      children: [playerScoreContainer, messageContainer]
    });
    const AIStage = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "AIStage",
      children: [AIScoreContainer, optionsContainer]
    });
    const gameContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "gameContainer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1GridContainer",
        children: [waves, (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "shipBow",
          children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "shipBowWood"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel1"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel2"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel3"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel4"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel5"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel6"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCover"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCoverTop"
          })]
        }), game]
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1OptionsContainer",
        children: [playerStage, radarContainer, AIStage]
      })]
    });
    return gameContainer;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/OptionsMenu.js":
/*!************************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/OptionsMenu.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OptionsMenu)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");


class OptionsMenu extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }

  // possible options...
  //
  // theme color
  // stop video
  //

  shouldUpdate(oldModel, newModel) {
    return true;
  }
  render(model) {
    return this.buildOptions(model);
  }
  buildOptions(model) {
    if (model.gameState === "inGame") {
      // maybe add a back button or new game button
    }
    const videoBtn = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      id: "videoBtn"
    });
    const videoBtnClass = model.videoPlaying ? "pause" : "play";
    videoBtn.classList.add(videoBtnClass);
    videoBtn.addEventListener("click", e => {
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
        newModel.videoPlaying = !oldModel.videoPlaying;
        return newModel;
      });
    });
    const hueSlider = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "input",
      type: "range",
      min: "0",
      max: "360",
      value: "120",
      className: "hueSlider"
    });
    hueSlider.addEventListener("input", e => {
      const sliderValue = parseInt(e.target.value);
      const root = document.querySelector(":root");
      const startingHue = 120;
      const hueRotation = (sliderValue - startingHue + 180) % 360 - 180;
      const themeColor = `hsla(${sliderValue}, 100%, 50%, 1)`;
      const lowAlphaColor = `hsla(${sliderValue}, 100%, 50%, 0.5)`;
      const oppositeRotation = (sliderValue - startingHue + 300) % 360;
      const oppositeTheme = `hsla(${oppositeRotation}, 100%, 50%, 1)`;
      const oppositeLowAlphaTheme = `hsla(${oppositeRotation}, 100%, 50%, .5)`;
      const oppositeHueRotate = (oppositeRotation - startingHue + 180) % 360 - 180;
      root.style.setProperty("--theme-color", themeColor);
      root.style.setProperty("--lowAlpha-color", lowAlphaColor);
      root.style.setProperty("--filter", `hue-rotate(${hueRotation}deg)`);
      root.style.setProperty("--opposite-filter", `hue-rotate(${oppositeHueRotate}deg)`);
      root.style.setProperty("--opposite-color", oppositeTheme);
      root.style.setProperty("--opposite-lowAlpha", oppositeLowAlphaTheme);
    });
    const slideContainer = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "slideContainer",
      children: [hueSlider]
    });
    const optionsHousing = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "optionsHousing",
      children: [videoBtn, slideContainer]
    });
    return optionsHousing;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/Radar.js":
/*!******************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/Radar.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Radar)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");


class Radar extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return newModel.gameState === "inGame" || oldModel.AI.gameboard.ships.length !== newModel.AI.gameboard.ships.length || oldModel.player.gameboard.ships.length !== newModel.player.gameboard.ships.length;
  }
  render(model) {
    return this.buildRadar(model);
  }
  buildRadar(model) {
    const radar = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "ul",
      className: "radar",
      children: [(0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      }), (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "radarLine"
      })]
    });
    const enemies = model.AI.gameboard.ships;
    enemies.forEach((ship, index) => {
      if (!ship.sunk) {
        radar.appendChild((0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
          prop: "li",
          className: `enemyPing${index}`
        }));
      }
    });
    const friendly = model.player.gameboard.ships;
    friendly.forEach((ship, index) => {
      if (!ship.sunk) {
        radar.appendChild((0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
          prop: "li",
          className: `friendlyPing${index}`
        }));
      }
    });
    return radar;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/ScoreContainer.js":
/*!***************************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/ScoreContainer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScoreContainer)
/* harmony export */ });
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/Carrier.svg */ "./src/assets/images/Carrier.svg");
/* harmony import */ var _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/Battleship2.svg */ "./src/assets/images/Battleship2.svg");
/* harmony import */ var _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/Destroyer.svg */ "./src/assets/images/Destroyer.svg");
/* harmony import */ var _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/Submarine.svg */ "./src/assets/images/Submarine.svg");
/* harmony import */ var _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../assets/images/Patrol-Boat.svg */ "./src/assets/images/Patrol-Boat.svg");







class ScoreContainer extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(viewModel, element, version) {
    super(viewModel, element);
    this.version = version;
  }
  shouldUpdate(oldModel, newModel) {
    return true;
  }
  render(model) {
    const player = this.version === "player" ? model.player : model.AI;
    return this.buildScoreContainer(player);
  }
  buildScoreContainer(player) {
    const scoreContainer = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "scoreContainer"
    });
    player.name === "AI" ? scoreContainer.classList.add(`AIScore`) : scoreContainer.classList.add(`playerScore`);
    const shipList = player.gameboard.ships;
    shipList.forEach((ship, index) => {
      const top = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "topSection"
      });
      const mid = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "midSection"
      });
      const bot = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "botSection"
      });
      const shipIcon = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "img",
        className: "scoreboardShipOverlay"
      });
      switch (ship.name) {
        case "Carrier":
          shipIcon.src = _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_2__;
          break;
        case "Battleship":
          shipIcon.src = _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_3__;
          break;
        case "Destroyer":
          shipIcon.src = _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_4__;
          break;
        case "Submarine":
          shipIcon.src = _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_5__;
          break;
        case "Patrol-Boat":
          shipIcon.src = _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_6__;
      }
      const score = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "shipScore",
        textContent: `${ship.size - ship.hits} / ${ship.size}`
      });
      mid.appendChild(score);
      if (!ship.sunk) {
        shipIcon.classList.add("alive");
        top.appendChild(shipIcon);
      } else {
        shipIcon.classList.add("sunk");
        bot.appendChild(shipIcon);
      }
      const shipCol = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "shipCol",
        children: [top, mid, bot]
      });
      scoreContainer.appendChild(shipCol);
    });
    return scoreContainer;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/ShipElem.js":
/*!*********************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/ShipElem.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/images/Carrier.svg */ "./src/assets/images/Carrier.svg");
/* harmony import */ var _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/Battleship2.svg */ "./src/assets/images/Battleship2.svg");
/* harmony import */ var _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/Destroyer.svg */ "./src/assets/images/Destroyer.svg");
/* harmony import */ var _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/Submarine.svg */ "./src/assets/images/Submarine.svg");
/* harmony import */ var _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/Patrol-Boat.svg */ "./src/assets/images/Patrol-Boat.svg");






class Ship {
  constructor(ship, clickedEvent) {
    this.shipModel = ship;
    this.tiles = [];
    this.clickedIndex = null;
    this.shipPulse = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div"
    });
    this.element = this.create();
    this.clickedEvent = clickedEvent;
  }
  create() {
    //ships container
    const ship = document.createElement("div");
    ship.id = this.shipModel.name;
    ship.classList.add("ship");
    ship.draggable = true;
    let shipSrc = null;
    let shipClass = this.shipModel.isHorizontal ? "horizontal" : "vertical";
    ship.classList.add(shipClass);

    // matches name of ship to the image source file
    switch (this.shipModel.name) {
      case "Carrier":
        shipSrc = _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_1__;
        break;
      case "Battleship":
        shipSrc = _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_2__;
        break;
      case "Destroyer":
        shipSrc = _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_3__;
        break;
      case "Submarine":
        shipSrc = _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_4__;
        break;
      case "Patrol-Boat":
        shipSrc = _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_5__;
    }

    // creates the inner divs for each ship
    // based on the size
    for (let i = 0; i < this.shipModel.size; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.boat = this.shipModel.name;
      tile.dataset.tile = i;
      tile.draggable = false;

      //add head class to front for styling
      if (i === 0) tile.classList.add("head");
      //add tail class to tail for styling
      if (i == this.shipModel.size - 1) tile.classList.add("tail");

      // adds click listener to set clicked index
      tile.addEventListener("mousedown", e => {
        this.clickedEvent(i);
      });

      // add tiles to the ship
      this.tiles.push(tile);
      ship.appendChild(tile);
    }

    // spice up the ship display
    const shipOverlay = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      className: `shipOverlay`,
      id: `${this.shipModel.name}Overlay`
    });
    this.overlay = shipOverlay;
    shipOverlay.src = shipSrc;
    let overlayClass = this.shipModel.isHorizontal ? "horizontal" : "vertical";
    shipOverlay.classList.add(overlayClass);
    shipOverlay.draggable = false;
    ship.appendChild(shipOverlay);
    ship.appendChild(this.shipPulse);
    ship.addEventListener("dragstart", e => {
      const bound = this.handleDragStart.bind(this);
      bound(e);
    });
    ship.addEventListener("dragend", e => {
      const bound = this.handleDragEnd.bind(this);
      bound(e);
    });
    return ship;
  }
  handleDragStart(e) {
    this.tiles.forEach(tile => {
      tile.style.width = "40px";
      tile.style.height = "40px";
      setTimeout(() => {
        tile.style.width = "30px";
        tile.style.height = "30px";
      }, 0);
    });
  }
  handleDragEnd(e) {
    e.preventDefault();
    // get all tiles with prior hover effects
    const tiles = Array.from(document.querySelectorAll(".hover", ".valid", ".invalid"));
    // clear their hover effects
    tiles.forEach(tile => {
      tile.classList.remove("hover", "invalid", "valid");
    });
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/ShipQueue.js":
/*!**********************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/ShipQueue.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipQueue)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _ShipElem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipElem.js */ "./src/scripts/viewComponents/gamePage/ShipElem.js");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");



class ShipQueue extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(viewModel, element, clickedEvent) {
    super(viewModel, element);
    this.clickedEvent = clickedEvent;
  }
  shouldUpdate(oldModel, newModel) {
    return newModel.gameState === "placeShips";
  }
  render(model) {
    return this.buildQueue(model);
  }
  buildQueue(model) {
    const stage = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "shipQueue",
      draggable: false
    });
    const next = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "nextShipContainer",
      draggable: false
    });
    if (!model.namePageIsOpen) {
      next.classList.add("hideNext");
    }
    const queue = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "queueContainer",
      children: [stage, next]
    });
    model.player.shipQueue.forEach((ship, index) => {
      if (ship) {
        const shipElem = new _ShipElem_js__WEBPACK_IMPORTED_MODULE_1__["default"](ship, clickedIndex => {
          this.clickedEvent(index, clickedIndex);
        });
        if (model.stateMessage.includes("Enemies")) {
          shipElem.element.addEventListener("mouseenter", e => {
            this.viewModel.updateModel(oldModel => {
              const newModel = {
                ...oldModel
              };
              newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
              return newModel;
            });
          });
        }
        if (index === 0) {
          next.appendChild(shipElem.element);
        } else {
          stage.prepend(shipElem.element);
        }
      }
    });
    return queue;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/gamePage/playerBoardElem.js":
/*!****************************************************************!*\
  !*** ./src/scripts/viewComponents/gamePage/playerBoardElem.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ playerBoardElem)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _ShipElem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShipElem */ "./src/scripts/viewComponents/gamePage/ShipElem.js");
/* harmony import */ var _gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../gameComponents/Game */ "./src/scripts/gameComponents/Game.js");




class playerBoardElem extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element, dragEnter) {
    super(viewModel, element);
    this.dragEnter = dragEnter;
    this.boardSize = null;
  }
  render(model) {
    return this.buildBoard(model);
  }
  buildBoard(model) {
    const shadowGrid = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "shadowGrid"
    });
    const board = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "board",
      children: [shadowGrid]
    });
    this.boardSize = model.player.gameboard.size;
    const cells = [];
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
          prop: "div",
          className: "cell"
        });
        const tileRef = model.player.gameboard.board[row][col];
        // sets data values for coordinates
        cell.dataset.row = row;
        cell.dataset.col = col;
        if (model.lastClicked) {
          if (model.lastClicked.row === row && model.lastClicked.col === col) {
            cell.classList.add("pulse");
          }
        }

        // adds the dragenter and drop listener
        cell.addEventListener("dragenter", e => {
          const bound = this.handleDragEnter.bind(this);
          bound(e, row, col, model);
        });
        cell.addEventListener("drop", e => {
          const bound = this.handleDrop.bind(this);
          bound(e, row, col, model);
        });
        cell.addEventListener("dragover", e => {
          const bound = this.handleDragOver.bind(this);
          bound(e, row, col);
        });
        if (tileRef.ship) {
          // display ship effect
          cell.classList.add;
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
    model.player.gameboard.ships.forEach((ship, index) => {
      const shipElem = new _ShipElem__WEBPACK_IMPORTED_MODULE_2__["default"](ship, clickedIndex => {
        // this.clickedEvent(index, clickedIndex);
      });
      const baseTile = ship.tiles[0];
      const endTile = ship.tiles[ship.size - 1];
      shipElem.element.style.gridArea = `${baseTile.row + 1} / ${baseTile.col + 1} / ${endTile.row + 2} / ${endTile.col + 2}`;
      shipElem.element.classList.add("boardShip");
      shipElem.tiles.forEach(tile => {
        tile.classList.add("onBoard");
      });
      if (model.gameState === "placeShips") {
        if (index === model.player.gameboard.ships.length - 1) {
          shipElem.shipPulse.classList.add("shipOverlayPulse");
        }
      }
      shadowGrid.appendChild(shipElem.element);
    });
    const boardBorder = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "boardBorder"
    });
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
    const tiles = Array.from(document.querySelectorAll(".hover", ".valid", ".invalid"));
    // clear their hover effects
    tiles.forEach(tile => {
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
    let isValid = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.isValidPlacement)(ship, baseRow, baseCol, model.player.gameboard);
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
    let baseCoords = this.getBaseTile(this.draggedShip, row, col, this.clickedIndex);
    let baseRow = baseCoords.row;
    let baseCol = baseCoords.col;
    let isValid = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.isValidPlacement)(this.draggedShip, baseRow, baseCol, model.player.gameboard);
    if (isValid) {
      this.viewModel.updateModel(oldModel => {
        const newModel = JSON.parse(JSON.stringify(oldModel));
        newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
        const {
          newGameboard,
          newShip
        } = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.placeShip)(this.draggedShip, baseRow, baseCol, oldModel.player.gameboard);
        newModel.player.gameboard = newGameboard;
        newModel.player.shipQueue.shift();
        if (newModel.player.shipQueue.length > 0) {
          newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
        }
        newModel.player.gameboard.ships.push(newShip);
        const allPlaced = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.checkAllShipsPlaced)(newModel.player);
        if (allPlaced) {
          newModel.allShipsPlaced = true;
          newModel.stateMessage = `Good luck Admiral ${newModel.player.name}`;
        }
        return newModel;
      });
    } else {
      // TODO: handle invalid placement drop\
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
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
    return {
      row: baseRow,
      col: baseCol
    };
  }

  /**  returns the DOM element for a given coordinate */
  getCell(row, col) {
    if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
      return null;
    }
    return this.cells[row * this.boardSize + col];
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/homePage/HomePage.js":
/*!*********************************************************!*\
  !*** ./src/scripts/viewComponents/homePage/HomePage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _CSS_homepage_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../CSS/homepage.css */ "./src/CSS/homepage.css");
/* harmony import */ var _HomePageInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HomePageInput.js */ "./src/scripts/viewComponents/homePage/HomePageInput.js");




class HomePage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(model) {
    const homepageContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "homepageContainer"
    });
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "header",
      textContent: "BATTLESHIP",
      className: "homeHeader"
    }));
    const newGame = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "main",
      className: "newGameContainer"
    });
    new _HomePageInput_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.viewModel, newGame);
    homepageContainer.appendChild(newGame);
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "ul",
      className: "smokeContainer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      })]
    }));
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "footer",
      className: "footer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span",
        textContent: "Created by Gluttz, "
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "a",
        textContent: "Image by upklyak on Freepik",
        href: "https://www.freepik.com/free-vector/sunken-cruise-ship-sea-harbor-morning_21584915.htm#query=battleship%20background&position=32&from_view=search&track=ais"
      })]
    }));
    return homepageContainer;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/homePage/HomePageInput.js":
/*!**************************************************************!*\
  !*** ./src/scripts/viewComponents/homePage/HomePageInput.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePageInput)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _CSS_namepage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../CSS/namepage.css */ "./src/CSS/namepage.css");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");



class HomePageInput extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(_ref) {
    let {
      namePageIsOpen
    } = _ref;
    const newGameBtn = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      textContent: "New Game",
      className: "newGame"
    });
    newGameBtn.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        return {
          namePageIsOpen: true
        };
      });
    });
    return namePageIsOpen ? this.buildForm() : newGameBtn;
  }
  buildForm() {
    const greeting = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "p",
      textContent: "Hello Admiral..."
    });
    const inputField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "input",
      type: "text",
      placeholder: "Name"
    });
    const button = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "button",
      type: "button",
      textContent: "Continue"
    });
    const nameField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "form",
      className: "nameForm",
      children: [inputField, button]
    });
    button.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
        newModel.currentPage = "mapPage";
        newModel.player.name = inputField.value;
        return newModel;
      });
    });
    const formContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "formContainer",
      children: [greeting, nameField]
    });
    return formContainer;
  }
}

/***/ }),

/***/ "./src/scripts/viewComponents/mapPage/MapPage.js":
/*!*******************************************************!*\
  !*** ./src/scripts/viewComponents/mapPage/MapPage.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MapPage)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/viewComponents/elem.js");
/* harmony import */ var _CSS_mappage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../CSS/mappage.css */ "./src/CSS/mappage.css");
/* harmony import */ var _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/red-pin.png */ "./src/assets/images/red-pin.png");
/* harmony import */ var _assets_images_sticky_note_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/sticky-note.svg */ "./src/assets/images/sticky-note.svg");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");





class MapPage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(_ref) {
    let {
      stateMessage,
      player
    } = _ref;
    const redPins = [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin1",
      id: "easy"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin2",
      id: "medium"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin3",
      id: "hard"
    })];
    redPins.forEach(pin => {
      pin.addEventListener("click", () => {
        this.viewModel.updateModel(oldModel => {
          const newModel = {
            ...oldModel
          };
          newModel.currentPage = "gamePage";
          newModel.gameState = "placeShips";
          newModel.stateMessage = "Enemies approach. Deploy the fleet.";
          newModel.AI.difficulty = pin.id;
          return newModel;
        });
      });
      if (stateMessage !== pin.id) {
        pin.addEventListener("mouseenter", () => {
          this.viewModel.updateModel(oldModel => {
            return {
              stateMessage: pin.id
            };
          });
        });
      }
    });
    const map = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "map",
      children: redPins
    });
    if (stateMessage) {
      const note = this.buildNote(stateMessage, player);
      map.appendChild(note);
    }
    return map;
  }
  buildNote(stateMessage, player) {
    const noteOptions = {
      note1: {
        location: "Somalian Coast",
        difficulty: "Easy",
        para: "I regret to inform you that a group of Somalian pirates have successfully commandeered an Indian carrier group in the Arabian Sea. "
      },
      note2: {
        location: "Black Sea",
        difficulty: "Medium",
        para: "I am writing to inform you about a group of Russian pirates who have commandeered a Russian carrier group. This group is a significant threat to the safety and security of the area."
      },
      note3: {
        location: "South China Sea",
        difficulty: "Hard",
        para: "A group of Chinese pirates has managed to seize control of a Chinese carrier group, and it poses a significant threat to regional security."
      }
    };
    let selectedOptions = {};
    switch (stateMessage) {
      case "easy":
        selectedOptions = noteOptions.note1;
        break;
      case "medium":
        selectedOptions = noteOptions.note2;
        break;
      case "hard":
        selectedOptions = noteOptions.note3;
        break;
    }
    const note = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "article",
      className: "noteContainer",
      id: stateMessage,
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "img",
        src: _assets_images_sticky_note_svg__WEBPACK_IMPORTED_MODULE_3__,
        className: "stickyNote"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "paraContainer",
        children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Location: ${selectedOptions.location}`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Difficulty: ${selectedOptions.difficulty}`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Admiral ${player.name},`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `${selectedOptions.para}`
        })]
      })]
    });
    return note;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/gamepage.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/gamepage.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n    --theme-color: hsla(120, 100%, 50%, 1);\n    --lowAlpha-color: hsla(120, 100%, 50%, 0.5);\n    --filter: hue-rotate();\n    --opposite-color: hsla(300, 100%, 50%, 1);\n    --opposite-lowAlpha: hsla(300, 100%, 50%, 0.5);\n    --opposite-filter: hue-rotate(180deg);\n}\n\n.gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n    border-bottom: 10px solid rgb(83, 83, 83);\n    border-right: 10px solid rgb(126, 126, 126);\n    border-top: 10px solid rgb(163, 163, 163);\n    border-left: 10px solid rgb(145, 145, 145);\n    box-shadow: 0 0 15px 5px black;\n    z-index: 1;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) scale(0.9);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px var(--lowAlpha-color),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: var(--theme-color);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid var(--theme-color);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, var(--theme-color) 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.enemyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 87%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 90%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 42%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 47%;\n    left: 45%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 55%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 55%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.leftButtonContainer,\n.middleButtonContainer,\n.rightButtonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(83, 83, 83);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 4vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 2vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        20px 100px 80px rgba(0, 0, 0, 0.726),\n        80px 160px 100px rgba(0, 0, 0, 0.507);\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(187, 186, 186);\n    border-right: 5px solid rgb(190, 190, 190);\n    border-top: 5px solid rgb(87, 87, 87);\n    border-left: 5px solid rgb(122, 122, 122);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(182, 182, 182);\n    border-right: 5px solid rgb(180, 180, 180);\n    border-top: 5px solid rgb(80, 80, 80);\n    border-left: 5px solid rgb(119, 119, 119);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(184, 184, 184);\n    border-right: 5px solid rgb(182, 181, 181);\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(119, 118, 118);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    margin-bottom: 1rem;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 8px solid rgb(158, 158, 158);\n    border-right: 8px solid rgb(199, 198, 198);\n    border-top: 8px solid rgb(68, 68, 68);\n    border-left: 8px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid rgb(243, 243, 243);\n    border-top: 5px solid rgb(58, 58, 58);\n    border-left: 5px solid rgb(80, 79, 79);\n    background-color: black;\n    box-shadow: inset 0 0 50px var(--lowAlpha-color);\n    display: flex;\n    overflow: hidden;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px var(--lowAlpha-color),\n        inset 0 0 10px var(--lowAlpha-color);\n}\n.hideNext {\n    box-shadow: none;\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px var(--theme-color), inset 0 0 10px var(--theme-color);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n    filter: var(--filter);\n}\n\n.AIBoardContainer #CarrierOverlay,\n.AIBoardContainer #BattleshipOverlay,\n.AIBoardContainer #DestroyerOverlay,\n.AIBoardContainer #SubmarineOverlay,\n.AIBoardContainer #Patrol-BoatOverlay {\n    filter: var(--opposite-filter);\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlayPulse {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border: none;\n    transform: scale(1);\n    animation: pulse 0.7s ease-out;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    50% {\n        transform: scale(1.4);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    100% {\n        transform: scale(1.8);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: space-evenly;\n    width: 100%;\n    height: 100%;\n}\n\n.boardBorder {\n    margin-top: auto;\n    position: relative;\n    border-bottom: 15px solid rgb(116, 116, 116);\n    border-right: 20px solid rgb(138, 137, 137);\n    border-top: 20px solid rgb(117, 117, 117);\n    border-left: 20px solid rgb(102, 102, 102);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    box-shadow: 0 0 15px black;\n    z-index: 2;\n}\n\n.board {\n    position: relative;\n    border-bottom: 15px solid rgb(155, 155, 155);\n    border-right: 20px solid rgb(182, 182, 182);\n    border-top: 20px solid rgb(53, 53, 53);\n    border-left: 20px solid rgb(75, 75, 75);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px var(--lowAlpha-color);\n\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    overflow: hidden;\n}\n\n.playerBoardContainer {\n    margin-top: auto;\n}\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.AIBoardContainer .board {\n    box-shadow: inset 0 0 140px var(--opposite-lowAlpha);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid var(--lowAlpha-color);\n}\n\n.cell.hit {\n    border: 5px solid red;\n}\n\n.cell.miss {\n    border: 5px solid green;\n}\n\n.cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell {\n    border: 1px solid var(--opposite-lowAlpha);\n    cursor: pointer;\n}\n.AIBoardContainer .cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell.hit {\n    border: 5px solid green;\n}\n\n.AIBoardContainer .cell.miss {\n    border: 5px solid red;\n}\n\n.cell.hit.pulse {\n    animation: pulse2 0.7s ease-out;\n}\n\n.cell.miss.pulse {\n    animation: pulse2 0.7s ease-out;\n}\n\n@keyframes pulse2 {\n    0% {\n        transform: scale(1);\n    }\n\n    90% {\n        transform: scale(2);\n    }\n\n    100% {\n    }\n}\n\n.cell[data-col=\"0\"] {\n    border-left: none;\n}\n.cell[data-col=\"9\"] {\n    border-right: none;\n}\n.cell[data-row=\"0\"] {\n    border-top: none;\n}\n.cell[data-row=\"9\"] {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.hueSlider {\n    -webkit-appearance: none;\n    appearance: none;\n    background-color: transparent;\n    width: 100%;\n    height: 25px;\n    border-radius: 10px;\n    box-shadow: inset 0 0 5px var(--theme-color), 0 0 5px var(--theme-color);\n    outline: none;\n    opacity: 0.7;\n    padding: 0 10px;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.hueSlider:hover {\n    opacity: 1;\n}\n\n.hueSlider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n.slider::-moz-range-thumb {\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n#videoBtn {\n    margin: 10px;\n    width: 40px;\n    height: 40px;\n    border: 4px solid var(--theme-color);\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 4px;\n    border-radius: 50%;\n    filter: blur(1px);\n    opacity: 0.8;\n    cursor: pointer;\n}\n\n#videoBtn:hover {\n    opacity: 1;\n}\n\n#videoBtn.pause::before {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.pause::after {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.play::after {\n    content: \"\";\n    border-top: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    border-left: 15px solid var(--theme-color);\n    position: absolute;\n    right: -3px;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n    overflow: hidden;\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: var(--theme-color);\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: var(--theme-color);\n    }\n}\n\n.wavesAlt {\n    position: absolute;\n    width: 100vw;\n    height: 100vh;\n\n    top: -100px;\n}\n\n.wavesAlt.animate {\n    animation: wave 10s ease-in-out infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n.AIStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage .shipFooter {\n    flex: 1;\n    display: flex;\n    align-items: center;\n}\n\n.AIScoreContainer {\n    height: 70%;\n    display: flex;\n}\n\n.playerScoreContainer {\n    height: 70%;\n    display: flex;\n}\n.scoreContainer {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    background-color: black;\n    box-shadow: inset 0 0 40px var(--lowAlpha-color);\n    padding: 0.8rem;\n}\n.scoreContainer.AIScore {\n    box-shadow: inset 0 0 40px var(--opposite-lowAlpha);\n}\n\n.shipCol {\n    width: 20%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n    cursor: pointer;\n}\n\n.AIStage .shipCol {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol img:hover {\n    transform: scale(1.2);\n}\n\n.shipCol:nth-child(1) {\n    border-left: none;\n}\n\n.shipCol:nth-child(5) {\n    border-right: none;\n}\n\n.shipCol img {\n    width: 80%;\n    height: 80%;\n    filter: var(--filter);\n}\n\n.AIStage .shipCol img {\n    filter: var(--opposite-filter);\n}\n\n.topSection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 33%;\n}\n\n.midSection {\n    height: 34%;\n    font-family: PressStart;\n    font-size: 0.9rem;\n    color: var(--theme-color);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.AIScore .midSection {\n    color: var(--opposite-color);\n}\n\n.AIStage .optionsHousing {\n    box-shadow: inset 0 0 20px var(--opposite-lowAlpha);\n}\n\n.botSection {\n    height: 33%;\n}\n\n.optionsContainer.inGame {\n    position: static;\n    border-bottom-left-radius: 0;\n    box-shadow: none;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    display: flex;\n    flex: 1;\n}\n\n.inGame .optionsHousing {\n    border-bottom: 0;\n    border-right: 0;\n    border-top: 0;\n    border-left: 0;\n    padding: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n}\n\n/* .optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n} */\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1600px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/gamepage.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n    --theme-color: hsla(120, 100%, 50%, 1);\n    --lowAlpha-color: hsla(120, 100%, 50%, 0.5);\n    --filter: hue-rotate();\n    --opposite-color: hsla(300, 100%, 50%, 1);\n    --opposite-lowAlpha: hsla(300, 100%, 50%, 0.5);\n    --opposite-filter: hue-rotate(180deg);\n}\n\n.gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n    border-bottom: 10px solid rgb(83, 83, 83);\n    border-right: 10px solid rgb(126, 126, 126);\n    border-top: 10px solid rgb(163, 163, 163);\n    border-left: 10px solid rgb(145, 145, 145);\n    box-shadow: 0 0 15px 5px black;\n    z-index: 1;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) scale(0.9);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px var(--lowAlpha-color),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: var(--theme-color);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid var(--theme-color);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, var(--theme-color) 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.enemyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 87%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 90%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 42%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 47%;\n    left: 45%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 55%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 55%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.leftButtonContainer,\n.middleButtonContainer,\n.rightButtonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(83, 83, 83);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 4vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 2vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        20px 100px 80px rgba(0, 0, 0, 0.726),\n        80px 160px 100px rgba(0, 0, 0, 0.507);\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(187, 186, 186);\n    border-right: 5px solid rgb(190, 190, 190);\n    border-top: 5px solid rgb(87, 87, 87);\n    border-left: 5px solid rgb(122, 122, 122);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(182, 182, 182);\n    border-right: 5px solid rgb(180, 180, 180);\n    border-top: 5px solid rgb(80, 80, 80);\n    border-left: 5px solid rgb(119, 119, 119);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(184, 184, 184);\n    border-right: 5px solid rgb(182, 181, 181);\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(119, 118, 118);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    margin-bottom: 1rem;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 8px solid rgb(158, 158, 158);\n    border-right: 8px solid rgb(199, 198, 198);\n    border-top: 8px solid rgb(68, 68, 68);\n    border-left: 8px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid rgb(243, 243, 243);\n    border-top: 5px solid rgb(58, 58, 58);\n    border-left: 5px solid rgb(80, 79, 79);\n    background-color: black;\n    box-shadow: inset 0 0 50px var(--lowAlpha-color);\n    display: flex;\n    overflow: hidden;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px var(--lowAlpha-color),\n        inset 0 0 10px var(--lowAlpha-color);\n}\n.hideNext {\n    box-shadow: none;\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px var(--theme-color), inset 0 0 10px var(--theme-color);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n    filter: var(--filter);\n}\n\n.AIBoardContainer #CarrierOverlay,\n.AIBoardContainer #BattleshipOverlay,\n.AIBoardContainer #DestroyerOverlay,\n.AIBoardContainer #SubmarineOverlay,\n.AIBoardContainer #Patrol-BoatOverlay {\n    filter: var(--opposite-filter);\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlayPulse {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border: none;\n    transform: scale(1);\n    animation: pulse 0.7s ease-out;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    50% {\n        transform: scale(1.4);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    100% {\n        transform: scale(1.8);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: space-evenly;\n    width: 100%;\n    height: 100%;\n}\n\n.boardBorder {\n    margin-top: auto;\n    position: relative;\n    border-bottom: 15px solid rgb(116, 116, 116);\n    border-right: 20px solid rgb(138, 137, 137);\n    border-top: 20px solid rgb(117, 117, 117);\n    border-left: 20px solid rgb(102, 102, 102);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    box-shadow: 0 0 15px black;\n    z-index: 2;\n}\n\n.board {\n    position: relative;\n    border-bottom: 15px solid rgb(155, 155, 155);\n    border-right: 20px solid rgb(182, 182, 182);\n    border-top: 20px solid rgb(53, 53, 53);\n    border-left: 20px solid rgb(75, 75, 75);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px var(--lowAlpha-color);\n\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    overflow: hidden;\n}\n\n.playerBoardContainer {\n    margin-top: auto;\n}\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.AIBoardContainer .board {\n    box-shadow: inset 0 0 140px var(--opposite-lowAlpha);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid var(--lowAlpha-color);\n}\n\n.cell.hit {\n    border: 5px solid red;\n}\n\n.cell.miss {\n    border: 5px solid green;\n}\n\n.cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell {\n    border: 1px solid var(--opposite-lowAlpha);\n    cursor: pointer;\n}\n.AIBoardContainer .cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell.hit {\n    border: 5px solid green;\n}\n\n.AIBoardContainer .cell.miss {\n    border: 5px solid red;\n}\n\n.cell.hit.pulse {\n    animation: pulse2 0.7s ease-out;\n}\n\n.cell.miss.pulse {\n    animation: pulse2 0.7s ease-out;\n}\n\n@keyframes pulse2 {\n    0% {\n        transform: scale(1);\n    }\n\n    90% {\n        transform: scale(2);\n    }\n\n    100% {\n    }\n}\n\n.cell[data-col=\"0\"] {\n    border-left: none;\n}\n.cell[data-col=\"9\"] {\n    border-right: none;\n}\n.cell[data-row=\"0\"] {\n    border-top: none;\n}\n.cell[data-row=\"9\"] {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.hueSlider {\n    -webkit-appearance: none;\n    appearance: none;\n    background-color: transparent;\n    width: 100%;\n    height: 25px;\n    border-radius: 10px;\n    box-shadow: inset 0 0 5px var(--theme-color), 0 0 5px var(--theme-color);\n    outline: none;\n    opacity: 0.7;\n    padding: 0 10px;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.hueSlider:hover {\n    opacity: 1;\n}\n\n.hueSlider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n.slider::-moz-range-thumb {\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n#videoBtn {\n    margin: 10px;\n    width: 40px;\n    height: 40px;\n    border: 4px solid var(--theme-color);\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 4px;\n    border-radius: 50%;\n    filter: blur(1px);\n    opacity: 0.8;\n    cursor: pointer;\n}\n\n#videoBtn:hover {\n    opacity: 1;\n}\n\n#videoBtn.pause::before {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.pause::after {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.play::after {\n    content: \"\";\n    border-top: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    border-left: 15px solid var(--theme-color);\n    position: absolute;\n    right: -3px;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n    overflow: hidden;\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: var(--theme-color);\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: var(--theme-color);\n    }\n}\n\n.wavesAlt {\n    position: absolute;\n    width: 100vw;\n    height: 100vh;\n\n    top: -100px;\n}\n\n.wavesAlt.animate {\n    animation: wave 10s ease-in-out infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n.AIStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage .shipFooter {\n    flex: 1;\n    display: flex;\n    align-items: center;\n}\n\n.AIScoreContainer {\n    height: 70%;\n    display: flex;\n}\n\n.playerScoreContainer {\n    height: 70%;\n    display: flex;\n}\n.scoreContainer {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    background-color: black;\n    box-shadow: inset 0 0 40px var(--lowAlpha-color);\n    padding: 0.8rem;\n}\n.scoreContainer.AIScore {\n    box-shadow: inset 0 0 40px var(--opposite-lowAlpha);\n}\n\n.shipCol {\n    width: 20%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n    cursor: pointer;\n}\n\n.AIStage .shipCol {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol img:hover {\n    transform: scale(1.2);\n}\n\n.shipCol:nth-child(1) {\n    border-left: none;\n}\n\n.shipCol:nth-child(5) {\n    border-right: none;\n}\n\n.shipCol img {\n    width: 80%;\n    height: 80%;\n    filter: var(--filter);\n}\n\n.AIStage .shipCol img {\n    filter: var(--opposite-filter);\n}\n\n.topSection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 33%;\n}\n\n.midSection {\n    height: 34%;\n    font-family: PressStart;\n    font-size: 0.9rem;\n    color: var(--theme-color);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.AIScore .midSection {\n    color: var(--opposite-color);\n}\n\n.AIStage .optionsHousing {\n    box-shadow: inset 0 0 20px var(--opposite-lowAlpha);\n}\n\n.botSection {\n    height: 33%;\n}\n\n.optionsContainer.inGame {\n    position: static;\n    border-bottom-left-radius: 0;\n    box-shadow: none;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    display: flex;\n    flex: 1;\n}\n\n.inGame .optionsHousing {\n    border-bottom: 0;\n    border-right: 0;\n    border-top: 0;\n    border-left: 0;\n    padding: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n}\n\n/* .optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n} */\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1600px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/BlackOpsOne.ttf */ "./src/assets/fonts/BlackOpsOne.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/PressStart.ttf */ "./src/assets/fonts/PressStart.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/homescreen.jpg */ "./src/assets/images/homescreen.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: BlackOps1;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n    overflow: hidden;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/homepage.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,4CAA2C;AAC/C;AACA;IACI,uBAAuB;IACvB,4CAA0C;AAC9C;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,6BAA6B;IAC7B,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;IACX,6BAA6B;IAC7B,yDAAwD;IACxD,sBAAsB;IACtB,2BAA2B;AAC/B;;AAEA;IACI,cAAc;IACd,sBAAsB;IACtB,eAAe;IACf,kBAAkB;IAClB;;gDAE4C;AAChD;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,uBAAuB;IACvB,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;IACxE,eAAe;IACf,0CAA0C;AAC9C;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,QAAQ;IACZ;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;QAEI,yBAAyB;IAC7B;IACA;QACI,kBAAkB;IACtB;AACJ;;AAEA;IACI,eAAe;IACf,WAAW;IACX,SAAS;IACT,2BAA2B;IAC3B,SAAS;IACT,UAAU;AACd;;AAEA;IACI;QACI,SAAS;IACb;AACJ;;AAEA;IACI;QACI,SAAS;IACb;;IAEA;QACI,eAAe;QACf,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,2CAA2C;AAC/C;AACA;IACI,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,4CAA4C;QAC5C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,6CAA6C;QAC7C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB","sourcesContent":["@font-face {\n    font-family: BlackOps1;\n    src: url(\"../assets/fonts/BlackOpsOne.ttf\");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(\"../assets/fonts/PressStart.ttf\");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n    overflow: hidden;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(\"../assets/images/homescreen.jpg\");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Kalam-Regular.ttf */ "./src/assets/fonts/Kalam-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/map.jpg */ "./src/assets/images/map.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: Kalam;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n\n.noteContainer {\n    width: 250px;\n    height: 250px;\n    position: fixed;\n    top: 60%;\n    left: 30%;\n    transform: rotate(-1deg);\n    animation: fly 0.1s linear;\n}\n.paraContainer {\n    position: absolute;\n    top: 10px;\n    font-family: Kalam;\n    transform: skew(-2deg, -2deg);\n}\n\n.stickyNote {\n    position: absolute;\n    top: -80px;\n    left: -70px;\n    width: 400px;\n    height: 400px;\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/mappage.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,4CAA6C;AACjD;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,yDAAiD;IACjD,sBAAsB;IACtB,2BAA2B;IAC3B,6BAA6B;IAC7B,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,eAAe;IACnB;AACJ;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,QAAQ;IACR,SAAS;IACT,wBAAwB;IACxB,0BAA0B;AAC9B;AACA;IACI,kBAAkB;IAClB,SAAS;IACT,kBAAkB;IAClB,6BAA6B;AACjC;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;IACA;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ","sourcesContent":["@font-face {\n    font-family: Kalam;\n    src: url(\"../assets/fonts/Kalam-Regular.ttf\");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(\"../assets/images/map.jpg\");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n\n.noteContainer {\n    width: 250px;\n    height: 250px;\n    position: fixed;\n    top: 60%;\n    left: 30%;\n    transform: rotate(-1deg);\n    animation: fly 0.1s linear;\n}\n.paraContainer {\n    position: absolute;\n    top: 10px;\n    font-family: Kalam;\n    transform: skew(-2deg, -2deg);\n}\n\n.stickyNote {\n    position: absolute;\n    top: -80px;\n    left: -70px;\n    width: 400px;\n    height: 400px;\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n.hide {\n    animation: burn 1s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/namepage.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,uBAAuB;IACvB,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;AAC5E;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,+BAA+B;IAC/B,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,sBAAsB;IACtB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,6BAA6B;IAC7B,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,yBAAyB;IACzB,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,UAAU;IACd;AACJ;;AAEA;IACI;QACI,UAAU;IACd;AACJ","sourcesContent":[".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n.hide {\n    animation: burn 1s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/CSS/gamepage.css":
/*!******************************!*\
  !*** ./src/CSS/gamepage.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_gamepage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./gamepage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/gamepage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_gamepage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_gamepage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_gamepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_gamepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/homepage.css":
/*!******************************!*\
  !*** ./src/CSS/homepage.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./homepage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/mappage.css":
/*!*****************************!*\
  !*** ./src/CSS/mappage.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./mappage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/namepage.css":
/*!******************************!*\
  !*** ./src/CSS/namepage.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./namepage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/BlackOpsOne.ttf":
/*!******************************************!*\
  !*** ./src/assets/fonts/BlackOpsOne.ttf ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b8437be32fe8faca71ed.ttf";

/***/ }),

/***/ "./src/assets/fonts/Kalam-Regular.ttf":
/*!********************************************!*\
  !*** ./src/assets/fonts/Kalam-Regular.ttf ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "831aaad03890ba2d7417.ttf";

/***/ }),

/***/ "./src/assets/fonts/PressStart.ttf":
/*!*****************************************!*\
  !*** ./src/assets/fonts/PressStart.ttf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "21503c6a5385ab41dde9.ttf";

/***/ }),

/***/ "./src/assets/images/Battleship2.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Battleship2.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "883f313d833466dee34c.svg";

/***/ }),

/***/ "./src/assets/images/Carrier.svg":
/*!***************************************!*\
  !*** ./src/assets/images/Carrier.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "25d6b7645493d9c3ae5f.svg";

/***/ }),

/***/ "./src/assets/images/Destroyer.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Destroyer.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6daaab3a46930b93669a.svg";

/***/ }),

/***/ "./src/assets/images/Patrol-Boat.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Patrol-Boat.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "41c4bcdc1385196c4b85.svg";

/***/ }),

/***/ "./src/assets/images/Submarine.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Submarine.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "252fc7ef725c923fda17.svg";

/***/ }),

/***/ "./src/assets/images/homescreen.jpg":
/*!******************************************!*\
  !*** ./src/assets/images/homescreen.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "06fa2c96e56f6a0aa95b.jpg";

/***/ }),

/***/ "./src/assets/images/map.jpg":
/*!***********************************!*\
  !*** ./src/assets/images/map.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "81a072d6fe494f6f4678.jpg";

/***/ }),

/***/ "./src/assets/images/red-pin.png":
/*!***************************************!*\
  !*** ./src/assets/images/red-pin.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "675115d5549ddfb36399.png";

/***/ }),

/***/ "./src/assets/images/sticky-note.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/sticky-note.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9429b1297ae21d9dbae.svg";

/***/ }),

/***/ "./src/assets/images/wavesAlt.jpg":
/*!****************************************!*\
  !*** ./src/assets/images/wavesAlt.jpg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e3dac7c6b7b4a29589c3.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/gameComponents/Game.js */ "./src/scripts/gameComponents/Game.js");
/* harmony import */ var _scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/ViewModel */ "./src/scripts/ViewModel.js");
/* harmony import */ var _scripts_viewComponents_App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/viewComponents/App.js */ "./src/scripts/viewComponents/App.js");



const model = new _scripts_gameComponents_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const viewModel = new _scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__["default"](model);
const view = new _scripts_viewComponents_App_js__WEBPACK_IMPORTED_MODULE_2__["default"](viewModel, document.querySelector("#container"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sT0FBTyxhQUFhLE9BQU8sUUFBUSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sTUFBTSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxPQUFPLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksU0FBUyxPQUFPLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxNQUFNLE1BQU0sWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLE9BQU8sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxTQUFTLFVBQVUsWUFBWSxPQUFPLFNBQVMsWUFBWSxhQUFhLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxPQUFPLEtBQUssWUFBWSxNQUFNLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksVUFBVSxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsTUFBTSxVQUFVLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxVQUFVLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsVUFBVSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxLQUFLLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sMkJBQTJCLE9BQU8sS0FBSyxZQUFZLFlBQVksTUFBTSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssWUFBWSxZQUFZLE1BQU0sVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxNQUFNLEtBQUssWUFBWSxZQUFZLE1BQU0sVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxVQUFVLFlBQVksTUFBTSxNQUFNLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxLQUFLLEtBQUssYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUs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dGxlc2hpcC8uL3NyYy9zY3JpcHRzL1B1YlN1YkludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvVmlld01vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQ29tcG9uZW50cy9BSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUNvbXBvbmVudHMvR2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUNvbXBvbmVudHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQ29tcG9uZW50cy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVDb21wb25lbnRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVDb21wb25lbnRzL1RpbGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvQUlCb2FyZEVsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvR2FtZU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL0dhbWVQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9PcHRpb25zTWVudS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvUmFkYXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL1Njb3JlQ29udGFpbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9TaGlwRWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvU2hpcFF1ZXVlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9wbGF5ZXJCb2FyZEVsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2hvbWVQYWdlL0hvbWVQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9ob21lUGFnZS9Ib21lUGFnZUlucHV0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9tYXBQYWdlL01hcFBhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvZ2FtZXBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9tYXBwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2dhbWVwYWdlLmNzcz9hNzczIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVwYWdlLmNzcz8xNGNmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL21hcHBhZ2UuY3NzPzcxZWEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbmFtZXBhZ2UuY3NzPzdhZGEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgLy8gYWxsIHZpZXcgY29tcG9uZW50cyB3aWxsIGV4dGVuZCB0aGlzXG4gICAgICAgIHRoaXMudmlld01vZGVsID0gdmlld01vZGVsO1xuXG4gICAgICAgIC8vIHNhdmUgdmlldyBjb21wb25lbnQncyBjb250YWluZXIgZm9yIGxhdGVyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIHZpZXcgY29tcG9uZW50IHRvIHRoZSB2aWV3TW9kZWwncyBwdWJzdWJcbiAgICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsLnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgLy8gZGVmYXVsdCBjb21wb25lbnRzIHJldHVybiB0cnVlXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZGVuIGluZGl2aWR1YWxseVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNb2RlbCB7XG4gICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgdGhpcy5wdWJzdWJzID0gW107XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbiAgICAvLyBlYWNoIHZpZXcgY29tcG9uZW50IHdpbGwgaW5kaXZpZHVhbGx5IGxpc3RlbiBmb3IgdXBkYXRlc1xuICAgIHJlZ2lzdGVyKHB1YnN1Yikge1xuICAgICAgICAvLyBhZGQgdGhlIGNvbXBvbmVudCB0byB0aGUgbGlzdCBvZiBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5wdWJzdWJzLnB1c2gocHVic3ViKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGxpc3RlbmVyJ3MgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwdWJzdWIuZ2V0RWxlbWVudCgpO1xuXG4gICAgICAgIC8vIHJlcGxhY2UgY29udGFpbmluZyBlbGVtZW50J3MgY2hpbGRyZW4gd2l0aCBmcmVzaCBjb21wb25lbnRcbiAgICAgICAgZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4ocHVic3ViLnJlbmRlcih0aGlzLm1vZGVsKSk7XG4gICAgfVxuXG4gICAgLy8gYWNjZXB0cyBhIGNhbGxiYWNrIGZ1bmN0aW9uIGZyb20gdGhlIHVwZGF0aW5nIHZpZXcgY29tcG9uZW50XG4gICAgdXBkYXRlTW9kZWwobW9kZWxVcGRhdGVGdW5jKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhIGRlZXAgY29weSBvZiB0aGUgY3VycmVudCBtb2RlbFxuICAgICAgICBjb25zdCBvbGRNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tb2RlbCkpO1xuXG4gICAgICAgIC8vIHBhc3MgdGhlIG1vZGVsIGNvcHkgaW50byB1cGRhdGluZyBjb21wb25lbnQncyBjYWxsYmFja1xuICAgICAgICAvLyB2aWV3IHdpbGwgdGhlbiBkZWNpZGUgd2hhdCBzaG91bGQgYmUgbW9kaWZpZWQgYmFzZWQgb24gdGhlIHVzZXIncyBpbnB1dFxuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IG1vZGVsVXBkYXRlRnVuYyhvbGRNb2RlbCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtb2RlbCB3aXRoIHRoZSBuZXcgdmFsdWVzIHJldHVybmVkIGZyb20gdGhlIGNhbGxiYWNrXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbFtrZXldID0gbmV3TW9kZWxba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggdGhlIGxpc3Qgb2YgbGlzdGVuaW5nIHZpZXcgY29tcG9uZW50c1xuICAgICAgICBmb3IgKGxldCBwdWJzdWIgb2YgdGhpcy5wdWJzdWJzKSB7XG4gICAgICAgICAgICAvLyBhc2sgdGhlbSBpZiB0aGV5IHdhbnQgdG8gdXBkYXRlIGJhc2VkIG9uIHRoZSBvbGQgbW9kZWwgYW5kIG5ld1xuICAgICAgICAgICAgaWYgKHB1YnN1Yi5zaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY29udGFpbmVyIG9mIHRoZSB2aWV3IGNvbXBvbmVuZXRcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHVic3ViLmdldEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGNvbXBvbmVudCB3aXRoIHRoZSBuZXcgdmVyc2lvblxuICAgICAgICAgICAgICAgIC8vIHJlbmRlcnMgcmV0dXJuIHRoZSBuZXcgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4ocHVic3ViLnJlbmRlcih0aGlzLm1vZGVsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IHsgcGxhY2VTaGlwUmFuZG9tbHkgfSBmcm9tIFwiLi9HYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFJIGV4dGVuZHMgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc3VwZXIubmFtZSA9IFwiQUlcIjtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdXRvRmlsbEJvYXJkKCk7XG4gICAgfVxuXG4gICAgYXV0b0ZpbGxCb2FyZCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuc2hpcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgY29uc3QgeyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfSA9IHBsYWNlU2hpcFJhbmRvbWx5KFxuICAgICAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgQUkgZnJvbSBcIi4vQUlcIjtcblxuLy8gbW9kZWxcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICAgICAgdGhpcy5BSSA9IG5ldyBBSSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRUdXJuID0gXCJwbGF5ZXJcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFwiaG9tZVBhZ2VcIjtcbiAgICAgICAgdGhpcy5uYW1lUGFnZUlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbGxTaGlwc1BsYWNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyb3BRdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLnZpZGVvUGxheWluZyA9IHRydWU7XG4gICAgICAgIHRoaXMubGFzdENsaWNrZWQgPSBudWxsO1xuICAgIH1cbn1cblxuLy8gYXNzdW1lcyByb3cgLyBjb2wgYXJlIHRoZSBiYXNlIHRpbGUgb2YgdGhlIHNoaXBcbmZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoc2hpcCwgcm93LCBjb2wsIGdhbWVib2FyZCkge1xuICAgIC8vIGNoZWNrcyBpZiBhbGwgaG92ZXJlZCB0aWxlcyBhcmUgb24gdGhlIGJvYXJkXG5cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUgJiYgY29sICsgc2hpcC5zaXplID4gZ2FtZWJvYXJkLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IGZhbHNlICYmIHJvdyArIHNoaXAuc2l6ZSA+IGdhbWVib2FyZC5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaXRlcmF0ZXMgb3ZlciBldmVyeSB0aWxlXG4gICAgLy8gY2hlY2tzIGlmIHRoZSBnYW1lYm9hcmQgdGlsZSBleGlzdHNcbiAgICAvLyBhbmQgaWYgdGhlIHRpbGUgY29udGFpbnMgYSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3crKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBnYW1lYm9hcmQpIHtcbiAgICAvLyBjcmVhdGVzIGEgY29weSBvZiBlYWNoIHRvIG1vZGlmeSBhbmQgcmV0dXJuXG4gICAgbGV0IG5ld0dhbWVib2FyZCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ2FtZWJvYXJkKSk7XG4gICAgbGV0IG5ld1NoaXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNoaXApKTtcblxuICAgIC8vIHZlcmlmaWVzIHRoZSBzaGlwIHRpbGUgZXhpc3RzXG4gICAgLy8gYW5kIGRvZXNuJ3QgY29udGFpbiBhIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSsrKSB7XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XSkge1xuICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldHMgdGlsZS5zaGlwIHRvIHRydWVcbiAgICAgICAgICAgICAgICAgICAgbmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2F2ZXMgdGlsZSByZWZlcmVuY2UgdG8gc2hpcFxuICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLnRpbGVzLnB1c2gobmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIHNob3VsZG4ndCBoYXBwZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9O1xufVxuXG4vLyByZWN1cnNpdmVseSB0cmllcyB0byBwbGFjZSBhIHNoaXAgcmFuZG9tbHkgdW50aWwgcGxhY2VtZW50IGlzIHZhbGlkXG4vLyByZXR1cm5zIHRoZSBuZXcgYm9hcmQgYW5kIG5ldyBzaGlwXG5mdW5jdGlvbiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpIHtcbiAgICAvL1xuICAgIHNoaXAuaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcblxuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lYm9hcmQuc2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVib2FyZC5zaXplKTtcblxuICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkUGxhY2VtZW50KHNoaXAsIHJhbmRSb3csIHJhbmRDb2wsIGdhbWVib2FyZCk7XG5cbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKHNoaXAsIHJhbmRSb3csIHJhbmRDb2wsIGdhbWVib2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcFJhbmRvbWx5KHNoaXAsIGdhbWVib2FyZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FsbFNoaXBzUGxhY2VkKHBsYXllcikge1xuICAgIHJldHVybiBwbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA8IDE7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Qm9hcmQoZ2FtZWJvYXJkKSB7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZ2FtZWJvYXJkLnNpemU7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdhbWVib2FyZC5zaXplOyBjb2wrKykge1xuICAgICAgICAgICAgZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gbnVsbDtcbiAgICAgICAgICAgIGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0udGlsZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2hpcHMocGxheWVyKSB7XG4gICAgd2hpbGUgKHBsYXllci5nYW1lYm9hcmQuc2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzWzBdLnRpbGVzID0gW107XG4gICAgICAgIHBsYXllci5zaGlwUXVldWUucHVzaChwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLnNoaWZ0KCkpO1xuICAgIH1cbn1cblxuLy8gdXBkYXRlIHRoZSBnYW1lYm9hcmQncyB0aWxlU3RhdXNcbi8vIGlmIHNoaXAsICsraGl0c1xuLy8gY2hlY2sgc3Vua1xuLy8gaWYgc3VuaywgY2hlY2sgYWxsIHN1bmtcbi8vIGlmIGFsbCBzdW5rIHVwZGF0ZSBnYW1lU3RhdGVcbmZ1bmN0aW9uIGF0dGFjayhyb3csIGNvbCwgZ2FtZWJvYXJkKSB7XG4gICAgY29uc3QgdGlsZSA9IGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF07XG5cbiAgICBpZiAodGlsZS50aWxlU3RhdHVzICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlRpbGUgYWxyZWFkeSBhdHRhY2tlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGlsZS5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgIHRpbGUudGlsZVN0YXR1cyA9IFwiaGl0XCI7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwKHJvdywgY29sLCBnYW1lYm9hcmQpO1xuICAgICAgICBzaGlwLmhpdHMrKztcbiAgICAgICAgaWYgKGNoZWNrU2hpcFN1bmsoc2hpcCkpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aWxlLnRpbGVTdGF0dXMgPSBcIm1pc3NcIjtcbiAgICB9XG4gICAgcmV0dXJuIGdhbWVib2FyZDtcbn1cblxuZnVuY3Rpb24gY2hlY2tTaGlwU3VuayhzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAuaGl0cyA9PT0gc2hpcC5zaXplO1xufVxuXG5mdW5jdGlvbiBjaGVja0FsbFNoaXBzU3VuayhzaGlwTGlzdCkge1xuICAgIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwTGlzdCkge1xuICAgICAgICBpZiAoIWNoZWNrU2hpcFN1bmsoc2hpcCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNoaXAoY1JvdywgY0NvbCwgZ2FtZWJvYXJkKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIGdhbWVib2FyZC5zaGlwcykge1xuICAgICAgICBmb3IgKGNvbnN0IHsgcm93LCBjb2wgfSBvZiBzaGlwLnRpbGVzKSB7XG4gICAgICAgICAgICBpZiAoY1JvdyA9PT0gcm93ICYmIGNDb2wgPT09IGNvbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiByYW5kb21JbmRleCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG59XG5cbmZ1bmN0aW9uIEFJTW92ZUVhc3kocGxheWVyR2FtZWJvYXJkKSB7XG4gICAgY29uc3QgcmFuZFJvdyA9IHJhbmRvbUluZGV4KCk7XG4gICAgY29uc3QgcmFuZENvbCA9IHJhbmRvbUluZGV4KCk7XG4gICAgY29uc3QgcmFuZFRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcmFuZFJvd11bcmFuZENvbF07XG4gICAgaWYgKHJhbmRUaWxlLnRpbGVTdGF0dXMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEFJTW92ZUVhc3kocGxheWVyR2FtZWJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXR0YWNrKHJhbmRSb3csIHJhbmRDb2wsIHBsYXllckdhbWVib2FyZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBBSU1vdmVNZWRpdW0ocGxheWVyR2FtZWJvYXJkKSB7XG4gICAgY29uc3QgdW5hdHRhY2tlZFRpbGVzID0gW107XG4gICAgY29uc3QgYXR0YWNrZWRUaWxlcyA9IFtdO1xuICAgIGNvbnN0IHVuYXR0YWNrZWRCYWNrdHJhY2tUaWxlcyA9IFtdO1xuXG4gICAgLy8gQ29sbGVjdCBhbGwgaGl0IHRpbGVzIGFuZCB0aGVpciBhZGphY2VudCB1bmF0dGFja2VkIHRpbGVzXG4gICAgY29uc3QgaGl0VGlsZXMgPSBbXTtcbiAgICBjb25zdCBhZGphY2VudFVuYXR0YWNrZWRUaWxlcyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZTsgcm93KyspIHtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgcGxheWVyR2FtZWJvYXJkLnNpemU7IGNvbCsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gcGxheWVyR2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgICAgICAgIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IFwiaGl0XCIpIHtcbiAgICAgICAgICAgICAgICBoaXRUaWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkamFjZW50VGlsZXMgPSBnZXRBZGphY2VudFRpbGVzKHBsYXllckdhbWVib2FyZCwgdGlsZSk7XG4gICAgICAgICAgICAgICAgYWRqYWNlbnRUaWxlcy5mb3JFYWNoKChhZGpUaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5ib2FyZFthZGpUaWxlLnJvd11bYWRqVGlsZS5jb2xdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpbGVTdGF0dXMgPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGphY2VudFVuYXR0YWNrZWRUaWxlcy5hZGQoYWRqVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZS50aWxlU3RhdHVzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdW5hdHRhY2tlZFRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbGUudGlsZVN0YXR1cyA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tlZFRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgYWRqYWNlbnQgdW5hdHRhY2tlZCB0aWxlcyB0byBiYWNrdHJhY2sgbGlzdFxuICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnB1c2godGlsZSk7XG4gICAgfSk7XG5cbiAgICBsZXQgdGFyZ2V0VGlsZTtcblxuICAgIGlmICh1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRlYnVnXCIsIDYpO1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRhcmdldGluZyBhIG5ldyByYW5kb20gdGlsZVxuICAgICAgICBjb25zb2xlLmxvZyhcImRlYnVnXCIsIDEpO1xuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuYXR0YWNrZWRUaWxlcy5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZFRpbGVzW3JhbmRvbUluZGV4XTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0YWNrKHRhcmdldFRpbGUucm93LCB0YXJnZXRUaWxlLmNvbCwgcGxheWVyR2FtZWJvYXJkKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWRqYWNlbnRUaWxlcyhwbGF5ZXJHYW1lYm9hcmQsIHRpbGUpIHtcbiAgICBjb25zdCBhZGphY2VudFRpbGVzID0gW107XG4gICAgaWYgKHRpbGUucm93ID4gMCkge1xuICAgICAgICBhZGphY2VudFRpbGVzLnB1c2gocGxheWVyR2FtZWJvYXJkLmJvYXJkW3RpbGUucm93IC0gMV1bdGlsZS5jb2xdKTsgLy8gVXBcbiAgICB9XG4gICAgaWYgKHRpbGUucm93IDwgcGxheWVyR2FtZWJvYXJkLnNpemUgLSAxKSB7XG4gICAgICAgIGFkamFjZW50VGlsZXMucHVzaChwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbdGlsZS5yb3cgKyAxXVt0aWxlLmNvbF0pOyAvLyBEb3duXG4gICAgfVxuICAgIGlmICh0aWxlLmNvbCA+IDApIHtcbiAgICAgICAgYWRqYWNlbnRUaWxlcy5wdXNoKHBsYXllckdhbWVib2FyZC5ib2FyZFt0aWxlLnJvd11bdGlsZS5jb2wgLSAxXSk7IC8vIExlZnRcbiAgICB9XG4gICAgaWYgKHRpbGUuY29sIDwgcGxheWVyR2FtZWJvYXJkLnNpemUgLSAxKSB7XG4gICAgICAgIGFkamFjZW50VGlsZXMucHVzaChwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbdGlsZS5yb3ddW3RpbGUuY29sICsgMV0pOyAvLyBSaWdodFxuICAgIH1cbiAgICByZXR1cm4gYWRqYWNlbnRUaWxlcztcbn1cblxuZnVuY3Rpb24gZ2V0VGlsZXNCZXR3ZWVuKHBsYXllckdhbWVib2FyZCwgdGlsZTEsIHRpbGUyKSB7XG4gICAgY29uc3QgdGlsZXNCZXR3ZWVuID0gW107XG4gICAgaWYgKHRpbGUxLnJvdyA9PT0gdGlsZTIucm93KSB7XG4gICAgICAgIC8vIEhvcml6b250YWxcbiAgICAgICAgY29uc3Qgc3RhcnRDb2wgPSBNYXRoLm1pbih0aWxlMS5jb2wsIHRpbGUyLmNvbCk7XG4gICAgICAgIGNvbnN0IGVuZENvbCA9IE1hdGgubWF4KHRpbGUxLmNvbCwgdGlsZTIuY29sKTtcbiAgICAgICAgZm9yIChsZXQgY29sID0gc3RhcnRDb2w7IGNvbCA8PSBlbmRDb2w7IGNvbCsrKSB7XG4gICAgICAgICAgICB0aWxlc0JldHdlZW4ucHVzaChwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbdGlsZTEucm93XVtjb2xdKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGlsZTEuY29sID09PSB0aWxlMi5jb2wpIHtcbiAgICAgICAgLy8gVmVydGljYWxcbiAgICAgICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLm1pbih0aWxlMS5yb3csIHRpbGUyLnJvdyk7XG4gICAgICAgIGNvbnN0IGVuZFJvdyA9IE1hdGgubWF4KHRpbGUxLnJvdywgdGlsZTIucm93KTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gc3RhcnRSb3c7IHJvdyA8PSBlbmRSb3c7IHJvdysrKSB7XG4gICAgICAgICAgICB0aWxlc0JldHdlZW4ucHVzaChwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVt0aWxlMS5jb2xdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGlsZXNCZXR3ZWVuO1xufVxuXG4vLyBUT0RPOiBtYWtlIGhhcmQgQUkgYWN0dWFsbHkgd29yayBEOlxuZnVuY3Rpb24gQUlNb3ZlSGFyZChwbGF5ZXJHYW1lYm9hcmQpIHtcbiAgICBjb25zdCB1bmF0dGFja2VkVGlsZXMgPSBbXTtcbiAgICBjb25zdCBhdHRhY2tlZFRpbGVzID0gW107XG4gICAgY29uc3QgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzID0gW107XG5cbiAgICAvLyBDb2xsZWN0IGFsbCBoaXQgdGlsZXMgYW5kIHRoZWlyIGFkamFjZW50IHVuYXR0YWNrZWQgdGlsZXNcbiAgICBjb25zdCBoaXRUaWxlcyA9IFtdO1xuICAgIGNvbnN0IGFkamFjZW50VW5hdHRhY2tlZFRpbGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHBsYXllckdhbWVib2FyZC5zaXplOyByb3crKykge1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgaWYgKHRpbGUudGlsZVN0YXR1cyA9PT0gXCJoaXRcIikge1xuICAgICAgICAgICAgICAgIGhpdFRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRqYWNlbnRUaWxlcyA9IGdldEFkamFjZW50VGlsZXMocGxheWVyR2FtZWJvYXJkLCB0aWxlKTtcbiAgICAgICAgICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLmJvYXJkW2FkalRpbGUucm93XVthZGpUaWxlLmNvbF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGlsZVN0YXR1cyA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmFkZChhZGpUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1bmF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZS50aWxlU3RhdHVzID09PSBcIm1pc3NcIikge1xuICAgICAgICAgICAgICAgIGF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBhZGphY2VudCB1bmF0dGFja2VkIHRpbGVzIHRvIGJhY2t0cmFjayBsaXN0XG4gICAgYWRqYWNlbnRVbmF0dGFja2VkVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICB1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMucHVzaCh0aWxlKTtcbiAgICB9KTtcblxuICAgIGxldCB0YXJnZXRUaWxlO1xuICAgIGxldCBoaXRTaGlwID0gbnVsbDtcblxuICAgIGlmICh1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRlYnVnXCIsIDYpO1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnBvcCgpO1xuICAgICAgICBjb25zdCBhZGphY2VudFRpbGVzID0gZ2V0QWRqYWNlbnRUaWxlcyhwbGF5ZXJHYW1lYm9hcmQsIHRhcmdldFRpbGUpO1xuICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbYWRqVGlsZS5yb3ddW2FkalRpbGUuY29sXS50aWxlU3RhdHVzID09PVxuICAgICAgICAgICAgICAgICAgICBcImhpdFwiICYmXG4gICAgICAgICAgICAgICAgaGl0U2hpcCA9PT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaGl0U2hpcCA9IHBsYXllckdhbWVib2FyZC5ib2FyZFthZGpUaWxlLnJvd11bYWRqVGlsZS5jb2xdLnNoaXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRhcmdldGluZyBhIG5ldyByYW5kb20gdGlsZVxuICAgICAgICBjb25zb2xlLmxvZyhcImRlYnVnXCIsIDEpO1xuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVuYXR0YWNrZWRUaWxlcy5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZFRpbGVzW3JhbmRvbUluZGV4XTtcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBhdHRhY2soXG4gICAgICAgIHRhcmdldFRpbGUucm93LFxuICAgICAgICB0YXJnZXRUaWxlLmNvbCxcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkXG4gICAgKTtcblxuICAgIGlmIChhdHRhY2tSZXN1bHQgPT09IFwiaGl0XCIgJiYgaGl0U2hpcCkge1xuICAgICAgICBjb25zdCBzaGlwU3VuayA9IGhpdFNoaXAuc3VuaztcbiAgICAgICAgaWYgKHNoaXBTdW5rKSB7XG4gICAgICAgICAgICBoaXRTaGlwID0gbnVsbDtcbiAgICAgICAgICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmNsZWFyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGphY2VudFRpbGVzID0gZ2V0QWRqYWNlbnRUaWxlcyhwbGF5ZXJHYW1lYm9hcmQsIHRhcmdldFRpbGUpO1xuICAgICAgICAgICAgYWRqYWNlbnRUaWxlcy5mb3JFYWNoKChhZGpUaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbYWRqVGlsZS5yb3ddW2FkalRpbGUuY29sXVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRpbGVTdGF0dXMgPT09IG51bGxcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgYWRqYWNlbnRVbmF0dGFja2VkVGlsZXMuYWRkKGFkalRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGF0dGFja1Jlc3VsdCk7XG4gICAgcmV0dXJuIGF0dGFja1Jlc3VsdDtcbn1cblxuZXhwb3J0IHtcbiAgICBpc1ZhbGlkUGxhY2VtZW50LFxuICAgIHBsYWNlU2hpcCxcbiAgICBwbGFjZVNoaXBSYW5kb21seSxcbiAgICBjaGVja0FsbFNoaXBzUGxhY2VkLFxuICAgIHJlc2V0Qm9hcmQsXG4gICAgcmVzZXRTaGlwcyxcbiAgICBhdHRhY2ssXG4gICAgY2hlY2tTaGlwU3VuayxcbiAgICBjaGVja0FsbFNoaXBzU3VuayxcbiAgICBBSU1vdmVFYXN5LFxuICAgIEFJTW92ZU1lZGl1bSxcbiAgICBBSU1vdmVIYXJkLFxufTtcbi8vIGZ1bmN0aW9uIEFJTW92ZU1lZGl1bShwbGF5ZXJHYW1lYm9hcmQpIHtcbi8vICAgICBjb25zdCB1bmF0dGFja2VkVGlsZXMgPSBbXTtcbi8vICAgICBjb25zdCBhdHRhY2tlZFRpbGVzID0gW107XG4vLyAgICAgY29uc3QgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzID0gW107XG4vLyAgICAgbGV0IGhpdFNoaXAgPSBudWxsO1xuLy8gICAgIGxldCBoaXREaXJlY3Rpb24gPSBudWxsO1xuXG4vLyAgICAgLy8gQ29sbGVjdCBhbGwgaGl0IHRpbGVzIGFuZCB0aGVpciBhZGphY2VudCB1bmF0dGFja2VkIHRpbGVzXG4vLyAgICAgY29uc3QgaGl0VGlsZXMgPSBbXTtcbi8vICAgICBjb25zdCBhZGphY2VudFVuYXR0YWNrZWRUaWxlcyA9IG5ldyBTZXQoKTtcbi8vICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZTsgcm93KyspIHtcbi8vICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgcGxheWVyR2FtZWJvYXJkLnNpemU7IGNvbCsrKSB7XG4vLyAgICAgICAgICAgICBjb25zdCB0aWxlID0gcGxheWVyR2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbi8vICAgICAgICAgICAgIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IFwiaGl0XCIpIHtcbi8vICAgICAgICAgICAgICAgICBoaXRUaWxlcy5wdXNoKHRpbGUpO1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGFkamFjZW50VGlsZXMgPSBnZXRBZGphY2VudFRpbGVzKHBsYXllckdhbWVib2FyZCwgdGlsZSk7XG4vLyAgICAgICAgICAgICAgICAgYWRqYWNlbnRUaWxlcy5mb3JFYWNoKChhZGpUaWxlKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5ib2FyZFthZGpUaWxlLnJvd11bYWRqVGlsZS5jb2xdXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpbGVTdGF0dXMgPT09IG51bGxcbi8vICAgICAgICAgICAgICAgICAgICAgKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhZGphY2VudFVuYXR0YWNrZWRUaWxlcy5hZGQoYWRqVGlsZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgICBpZiAoIWhpdFNoaXApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgaGl0LCBjaGVjayBpZiBpdCdzIHBhcnQgb2YgYSBzaGlwXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0U2hpcEF0KHRpbGUucm93LCB0aWxlLmNvbCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlwKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBoaXRTaGlwID0gc2hpcDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHNoaXBcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGlwLnBvc2l0aW9uc1swXS5yb3cgPT09IHNoaXAucG9zaXRpb25zWzFdLnJvdykge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpdERpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXREaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbGUudGlsZVN0YXR1cyA9PT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgICAgIHVuYXR0YWNrZWRUaWxlcy5wdXNoKHRpbGUpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IFwibWlzc1wiKSB7XG4vLyAgICAgICAgICAgICAgICAgYXR0YWNrZWRUaWxlcy5wdXNoKHRpbGUpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgLy8gQWRkIGFkamFjZW50IHVuYXR0YWNrZWQgdGlsZXMgdG8gYmFja3RyYWNrIGxpc3Rcbi8vICAgICBhZGphY2VudFVuYXR0YWNrZWRUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4vLyAgICAgICAgIHVuYXR0YWNrZWRCYWNrdHJhY2tUaWxlcy5wdXNoKHRpbGUpO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgbGV0IHRhcmdldFRpbGU7XG5cbi8vICAgICBpZiAoaGl0U2hpcCkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImRlYnVnXCIsIDcpO1xuLy8gICAgICAgICAvLyBpZiB0aGVyZSdzIGEgaGl0IHNoaXAsIGNvbnRpbnVlIGF0dGFja2luZyBpbiB0aGUgc2FtZSBkaXJlY3Rpb25cbi8vICAgICAgICAgaWYgKGhpdERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGhpdFNoaXAucG9zaXRpb25zWzBdLnJvdztcbi8vICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBNYXRoLm1pbiguLi5oaXRTaGlwLnBvc2l0aW9ucy5tYXAoKHBvcykgPT4gcG9zLmNvbCkpO1xuLy8gICAgICAgICAgICAgY29uc3QgZW5kSW5kZXggPSBNYXRoLm1heCguLi5oaXRTaGlwLnBvc2l0aW9ucy5tYXAoKHBvcykgPT4gcG9zLmNvbCkpO1xuLy8gICAgICAgICAgICAgbGV0IGNvbDtcbi8vICAgICAgICAgICAgIGlmIChoaXRTaGlwLmlzU3VuaygpKSB7XG4vLyAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHNoaXAgaXMgc3VuaywgYXR0YWNrIHJhbmRvbWx5XG4vLyAgICAgICAgICAgICAgICAgdGFyZ2V0VGlsZSA9IHVuYXR0YWNrZWRUaWxlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmF0dGFja2VkVGlsZXMubGVuZ3RoKV07XG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIC8vIGF0dGFjayB0aGUgbmV4dCB0aWxlIGluIHRoZSBzYW1lIGRpcmVjdGlvblxuLy8gICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlZFRpbGVzLmxlbmd0aCA+IDApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gcHJpb3JpdGl6ZSBhdHRhY2tpbmcgdGlsZXMgdGhhdCBhcmUgaW4gdGhlIHNhbWUgcm93IGFuZCBoYXZlbid0IGJlZW4gYXR0YWNrZWQgeWV0XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuYXR0YWNrZWRJblJvdyA9IHVuYXR0YWNrZWRUaWxlcy5maWx0ZXIoKHRpbGUpID0+IHRpbGUucm93ID09PSByb3cpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2tlZEluUm93ID0gYXR0YWNrZWRUaWxlcy5maWx0ZXIoKHRpbGUpID0+IHRpbGUucm93ID09PSByb3cpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBhdmFpbGFibGVUaWxlcyA9IHVuYXR0YWNrZWRJblJvdy5jb25jYXQoYXR0YWNrZWRJblJvdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDw9IGVuZEluZGV4OyBpKyspIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXZhaWxhYmxlVGlsZXMuc29tZSgodGlsZSkgPT4gdGlsZS5jb2wgPT09IGkpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sID0gaTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBpZiAoIWNvbCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gYWRqYWNlbnQgdW5hdHRhY2tlZCB0aWxlcyBpbiB0aGUgc2FtZSByb3csIGJhY2t0cmFja1xuLy8gICAgICAgICAgICAgICAgICAgICBjb2wgPSBoaXRUaWxlc1toaXRUaWxlcy5sZW5ndGggLSAxXS5jb2w7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGlmIChjb2wgPCBlbmRJbmRleCkge1xuLy8gICAgICAgICAgICAgICAgICAgICB0YXJnZXRUaWxlID0gcGxheWVyR2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sICsgMV07XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VGlsZSA9XG4iLCJpbXBvcnQgVGlsZSBmcm9tIFwiLi9UaWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmJvYXJkID0gW107XG4gICAgICAgIC8vIHRoaXMub3JpZW50YXRpb24gPSB0cnVlOyAvL3RydWUgdmVydGljYWwsIGZhbHNlIGhvcml6b250YWxcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuc2l6ZTsgcm93KyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5zaXplOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gbmV3IFRpbGUocm93LCBjb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9HYW1lYm9hcmQuanNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKDEwKTtcbiAgICAgICAgdGhpcy5zaGlwUXVldWUgPSBbXG4gICAgICAgICAgICBuZXcgU2hpcCg1LCBcIkNhcnJpZXJcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCg0LCBcIkJhdHRsZXNoaXBcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCgzLCBcIkRlc3Ryb3llclwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDMsIFwiU3VibWFyaW5lXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoMiwgXCJQYXRyb2wtQm9hdFwiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzSG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbGVzID0gW107XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iocm93LCBjb2wpIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuY29sID0gY29sO1xuICAgICAgICB0aGlzLnNoaXAgPSBudWxsO1xuICAgICAgICB0aGlzLnRpbGVTdGF0dXMgPSBudWxsO1xuICAgICAgICAvLyBudWxsIEggTVxuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSBcIi4vaG9tZVBhZ2UvSG9tZVBhZ2UuanNcIjtcbmltcG9ydCBNYXBQYWdlIGZyb20gXCIuL21hcFBhZ2UvTWFwUGFnZS5qc1wiO1xuaW1wb3J0IEdhbWVQYWdlIGZyb20gXCIuL2dhbWVQYWdlL0dhbWVQYWdlLmpzXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIC8vIHBhc3MgcGFyYW1lbnRlcidzIHRvIFB1YlN1YkludGVyZmFjZSdzIGNvbnN0cnVjdG9yXG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gb25seSB1cGRhdGVzIGlmIHRoZSBtb2RlbCdzIGN1cnJlbnRQYWdlIGhhcyBjaGFuZ2VkXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gb2xkTW9kZWwuY3VycmVudFBhZ2UgIT09IG5ld01vZGVsLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIHJlbmRlcih7IGN1cnJlbnRQYWdlIH0pIHtcbiAgICAgICAgY29uc3QgYXBwRWxlbWVudCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBpZDogXCJhcHBcIiB9KTtcblxuICAgICAgICBpZiAoY3VycmVudFBhZ2UgPT09IFwiaG9tZVBhZ2VcIikge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBwYWdlIGNvbXBvbmVudCwgcGFzcyBpdCB0aGUgdmlld01vZGVsIGFuZCBpdCdzIGNvbnRhaW5lclxuICAgICAgICAgICAgbmV3IEhvbWVQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gXCJtYXBQYWdlXCIpIHtcbiAgICAgICAgICAgIG5ldyBNYXBQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gXCJnYW1lUGFnZVwiKSB7XG4gICAgICAgICAgICBuZXcgR2FtZVBhZ2UodGhpcy52aWV3TW9kZWwsIGFwcEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBuZXcgdmlldyBjb21wb25lbnRcbiAgICAgICAgcmV0dXJuIGFwcEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiY29uc3QgZWxlbSA9IChjb250ZW50LCB2ZXJzaW9uID0gMSkgPT4ge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29udGVudFtcInByb3BcIl0pO1xuICAgIGxldCB0ZXh0ID0gY29udGVudFtcInRleHRDb250ZW50XCJdO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9XG4gICAgbGV0IGlkID0gY29udGVudFtcImlkXCJdO1xuICAgIGlmIChpZCkge1xuICAgICAgICBlbC5pZCA9IGlkO1xuICAgIH1cbiAgICBsZXQgY2xhc3NOYW1lID0gY29udGVudFtcImNsYXNzTmFtZVwiXTtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG4gICAgbGV0IEhUTUwgPSBjb250ZW50W1wiaW5uZXJIVE1MXCJdO1xuICAgIGlmIChIVE1MKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IEhUTUw7XG4gICAgfVxuICAgIGxldCBzcmMgPSBjb250ZW50W1wic3JjXCJdO1xuICAgIGlmIChzcmMpIHtcbiAgICAgICAgZWwuc3JjID0gc3JjO1xuICAgIH1cbiAgICBsZXQgZm9ySSA9IGNvbnRlbnRbXCJmb3JcIl07XG4gICAgaWYgKGZvckkpIHtcbiAgICAgICAgZWwuZm9yID0gZm9ySTtcbiAgICB9XG4gICAgbGV0IHR5cGUgPSBjb250ZW50W1widHlwZVwiXTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgICBlbC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgbGV0IG5hbWUgPSBjb250ZW50W1wibmFtZVwiXTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICBlbC5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gY29udGVudFtcInZhbHVlXCJdO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBjb250ZW50W1wicGxhY2Vob2xkZXJcIl07XG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGVsLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGxldCBzcGVsbGNoZWNrID0gY29udGVudFtcInNwZWxsY2hlY2tcIl07XG4gICAgaWYgKHNwZWxsY2hlY2spIHtcbiAgICAgICAgZWwuc3BlbGxjaGVjayA9IHNwZWxsY2hlY2s7XG4gICAgfVxuICAgIGxldCByZXF1aXJlZCA9IGNvbnRlbnRbXCJyZXF1aXJlZFwiXTtcbiAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgZWwucmVxdWlyZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgY2hlY2tlZCA9IGNvbnRlbnRbXCJjaGVja2VkXCJdO1xuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgaHJlZiA9IGNvbnRlbnRbXCJocmVmXCJdO1xuICAgIGlmIChocmVmKSB7XG4gICAgICAgIGVsLmhyZWYgPSBocmVmO1xuICAgIH1cbiAgICBsZXQgYXV0b3BsYXkgPSBjb250ZW50W1wiYXV0b3BsYXlcIl07XG4gICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIGVsLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG11dGVkID0gY29udGVudFtcIm11dGVkXCJdO1xuICAgIGlmIChtdXRlZCkge1xuICAgICAgICBlbC5tdXRlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBsb29wID0gY29udGVudFtcImxvb3BcIl07XG4gICAgaWYgKGxvb3ApIHtcbiAgICAgICAgZWwubG9vcCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBkcmFnZ2FibGUgPSBjb250ZW50W1wiZHJhZ2dhYmxlXCJdO1xuICAgIGlmIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZWwuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG1pbiA9IGNvbnRlbnRbXCJtaW5cIl07XG4gICAgaWYgKG1pbikge1xuICAgICAgICBlbC5taW4gPSBtaW47XG4gICAgfVxuICAgIGxldCBtYXggPSBjb250ZW50W1wibWF4XCJdO1xuICAgIGlmIChtYXgpIHtcbiAgICAgICAgZWwubWF4ID0gbWF4O1xuICAgIH1cbiAgICBsZXQgc3RlcCA9IGNvbnRlbnRbXCJzdGVwXCJdO1xuICAgIGlmIChzdGVwKSB7XG4gICAgICAgIGVsLnN0ZXAgPSBzdGVwO1xuICAgIH1cbiAgICBsZXQgY2hpbGRyZW4gPSBjb250ZW50W1wiY2hpbGRyZW5cIl07XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAodmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGVsZW0oY2hpbGQsIDIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbDtcbn07XG5cbi8vIGZ1bmN0aW9uIGVsZW0oY29udGVudCkge1xuLy8gICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb250ZW50W1wicHJvcFwiXSk7XG5cbi8vICAgICBmb3IgKGxldCBrZXkgaW4gY29udGVudCkge1xuLy8gICAgICAgICBpZiAoY29udGVudFtrZXldID09PSBcInByb3BcIikge1xuLy8gICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImNsYXNzTGlzdFwiKSB7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBjbGFzc05hbWUgb2YgY29udGVudFtjbGFzc0xpc3RdKSB7XG4vLyAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjb250ZW50W2NsYXNzTGlzdF1bY2xhc3NOYW1lXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImNoaWxkcmVuXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRba2V5XSk7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjb250ZW50W2tleV0pIHtcbi8vICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChlbGVtKGNvbnRlbnRba2V5XVtjaGlsZF0pKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGVsW2tleV0gPSBjb250ZW50W2tleV07XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gZWw7XG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IGVsZW07XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbVwiO1xuaW1wb3J0IHtcbiAgICBhdHRhY2ssXG4gICAgY2hlY2tBbGxTaGlwc1N1bmssXG4gICAgQUlNb3ZlRWFzeSxcbiAgICBBSU1vdmVNZWRpdW0sXG4gICAgQUlNb3ZlSGFyZCxcbn0gZnJvbSBcIi4uLy4uL2dhbWVDb21wb25lbnRzL0dhbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUlCb2FyZEVsZW0gZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgZHJhZ0VudGVyKSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ0VudGVyID0gZHJhZ0VudGVyO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdENsaWNrZWQgPSBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJvYXJkKG1vZGVsKTtcbiAgICB9XG5cbiAgICBidWlsZEJvYXJkKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0dyaWQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcInNoYWRvd0dyaWRcIiB9KTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYm9hcmRcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbc2hhZG93R3JpZF0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG1vZGVsLkFJLmdhbWVib2FyZC5zaXplO1xuICAgICAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLmJvYXJkU2l6ZTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuYm9hcmRTaXplOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImNlbGxcIiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlUmVmID0gbW9kZWwuQUkuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICAvLyBzZXRzIGRhdGEgdmFsdWVzIGZvciBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgICAgICAgICAgIC8vIGRlbGF5IHRoZSBsaXN0ZW5lciB0byBwcmV2ZW50IHNwYW1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wsIG1vZGVsLCBjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0Q2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RDbGlja2VkLnJvdyA9PT0gcm93ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RDbGlja2VkLmNvbCA9PT0gY29sXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwicHVsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRpbGVSZWYudGlsZVN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IGhpdCBtYXJrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWlzc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgbWlzcyBtYXJrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRzIHRoZSBjZWxsIHRvIHRoZSBib2FyZCBjb250YWluZXJcbiAgICAgICAgICAgICAgICAvLyBhZGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gY2VsbCB0byB0aGUgY2VsbHMgYXJyYXlcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcblxuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZWxscyA9IGNlbGxzO1xuXG4gICAgICAgIG1vZGVsLkFJLmdhbWVib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoaXAuc3Vuaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBFbGVtID0gbmV3IFNoaXAoc2hpcCwgKGNsaWNrZWRJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNsaWNrZWRFdmVudChpbmRleCwgY2xpY2tlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlVGlsZSA9IHNoaXAudGlsZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kVGlsZSA9IHNoaXAudGlsZXNbc2hpcC5zaXplIC0gMV07XG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5zdHlsZS5ncmlkQXJlYSA9IGAke2Jhc2VUaWxlLnJvdyArIDF9IC8gJHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZVRpbGUuY29sICsgMVxuICAgICAgICAgICAgICAgIH0gLyAke2VuZFRpbGUucm93ICsgMn0gLyAke2VuZFRpbGUuY29sICsgMn1gO1xuICAgICAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkU2hpcFwiKTtcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcIm9uQm9hcmRcIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzaGFkb3dHcmlkLmFwcGVuZENoaWxkKHNoaXBFbGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBib2FyZEJvcmRlciA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiYm9hcmRCb3JkZXJcIiB9KTtcbiAgICAgICAgYm9hcmRCb3JkZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRCb3JkZXI7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZSwgcm93LCBjb2wsIGNlbGwpIHtcbiAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZCA9IHsgcm93OiByb3csIGNvbDogY29sIH07XG4gICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IEFJZ2FtZWJvYXJkID0gbmV3TW9kZWwuQUkuZ2FtZWJvYXJkO1xuXG4gICAgICAgICAgICBjb25zdCBhdHRSZXNwb25zZSA9IGF0dGFjayhyb3csIGNvbCwgQUlnYW1lYm9hcmQpO1xuXG4gICAgICAgICAgICBuZXdNb2RlbC5sYXN0Q2xpY2tlZCA9IHsgcm93OiByb3csIGNvbDogY29sIH07XG5cbiAgICAgICAgICAgIGlmICghYXR0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBcIkFscmVhZHkgYXR0YWNrZWQgdGhlcmUgc2lyXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjbGlja2VkVGlsZSA9IEFJZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgICAgICAgIGlmIChjaGVja0FsbFNoaXBzU3VuayhBSWdhbWVib2FyZC5zaGlwcykpIHtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPSBcInBsYXllcldpbnNcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsMSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwxKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZDtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG5ld01vZGVsLkFJLmRpZmZpY3VsdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQUlNb3ZlRWFzeShwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFJTW92ZU1lZGl1bShwbGF5ZXJHYW1lYm9hcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFJTW92ZU1lZGl1bShwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZFRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tBbGxTaGlwc1N1bmsocGxheWVyR2FtZWJvYXJkLnNoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJBSVdpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDZWxsKHJvdywgY29sKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHJvdyA8IDAgfHxcbiAgICAgICAgICAgIHJvdyA+PSB0aGlzLmJvYXJkU2l6ZSB8fFxuICAgICAgICAgICAgY29sIDwgMCB8fFxuICAgICAgICAgICAgY29sID49IHRoaXMuYm9hcmRTaXplXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1tyb3cgKiB0aGlzLmJvYXJkU2l6ZSArIGNvbF07XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IHtcbiAgICBwbGFjZVNoaXBSYW5kb21seSxcbiAgICBjaGVja0FsbFNoaXBzUGxhY2VkLFxuICAgIHJlc2V0Qm9hcmQsXG4gICAgcmVzZXRTaGlwcyxcbn0gZnJvbSBcIi4uLy4uL2dhbWVDb21wb25lbnRzL0dhbWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQsIHR5cGUpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiBuZXdNb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcInJvdGF0ZVwiOlxuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5hbGxTaGlwc1BsYWNlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFN0YXJ0QnV0dG9uKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUm90YXRlQnV0dG9uKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhdXRvUGxhY2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEF1dG9QbGFjZUJ1dHRvbihtb2RlbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidW5kb1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVW5kb0J1dHRvbihtb2RlbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBjYXNlIFwic3RhcnRcIjpcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5idWlsZFN0YXJ0QnV0dG9uKG1vZGVsKTtcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkUm90YXRlQnV0dG9uKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIGlkOiBcImFjdGl2YXRlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicm90YXRlQnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW0oeyBwcm9wOiBcInNwYW5cIiB9KV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5pc0hvcml6b250YWwgPVxuICAgICAgICAgICAgICAgICAgICAhbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5pc0hvcml6b250YWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkhvdXNpbmcgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibGVmdEJ1dHRvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtyb3RhdGVCdXR0b25dLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJSb3RhdGVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBidXR0b25Ib3VzaW5nO1xuICAgIH1cblxuICAgIGJ1aWxkQXV0b1BsYWNlQnV0dG9uKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IGF1dG9QbGFjZUJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIGlkOiBcImFjdGl2YXRlXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW0oeyBwcm9wOiBcInNwYW5cIiB9KV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSk7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuZHJvcFF1ZXVlLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRCb2FyZChuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTaGlwcyhuZXdNb2RlbC5wbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpcCA9IG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUuc2hpZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9ID0gcGxhY2VTaGlwUmFuZG9tbHkoXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYWxsUGxhY2VkID0gY2hlY2tBbGxTaGlwc1BsYWNlZChuZXdNb2RlbC5wbGF5ZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFsbFBsYWNlZCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5hbGxTaGlwc1BsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBHb29kIGx1Y2sgQWRtaXJhbCAke25ld01vZGVsLnBsYXllci5uYW1lfWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGF1dG9QbGFjZUhvdXNpbmcgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibWlkZGxlQnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2F1dG9QbGFjZUJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkF1dG8tcGxhY2VcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhdXRvUGxhY2VIb3VzaW5nO1xuICAgIH1cblxuICAgIGJ1aWxkVW5kb0J1dHRvbihtb2RlbCkge1xuICAgICAgICBjb25zdCB1bmRvQnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdW5kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1vZGVsLmRyb3BRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gb2xkTW9kZWwuZHJvcFF1ZXVlLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdW5kb0J1dHRvbkhvdXNpbmcgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicmlnaHRCdXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbdW5kb0J1dHRvbl0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIlVuZG9cIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1bmRvQnV0dG9uSG91c2luZztcbiAgICB9XG5cbiAgICBidWlsZFN0YXJ0QnV0dG9uKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5kcm9wUXVldWUucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSkpO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmdhbWVTdGF0ZSA9IFwiaW5HYW1lXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uSG91c2luZyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJsZWZ0QnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3N0YXJ0QnV0dG9uXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQmVnaW5cIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzdGFydEJ1dHRvbkhvdXNpbmc7XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWVzc2FnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gb2xkTW9kZWwuc3RhdGVNZXNzYWdlICE9PSBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgc3RhdGVNZXNzYWdlIH0pIHtcbiAgICAgICAgcmV0dXJuIGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic3RhZ2VQYXJhXCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogc3RhdGVNZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRWaWV3LmpzXCI7XG5pbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcbmltcG9ydCB3YXZlc0FsdCBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy93YXZlc0FsdC5qcGdcIjtcbmltcG9ydCBcIi4uLy4uLy4uL0NTUy9nYW1lcGFnZS5jc3NcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtLmpzXCI7XG5pbXBvcnQgR2FtZU1lc3NhZ2UgZnJvbSBcIi4vR2FtZU1lc3NhZ2UuanNcIjtcbmltcG9ydCBTaGlwUXVldWUgZnJvbSBcIi4vU2hpcFF1ZXVlLmpzXCI7XG5pbXBvcnQgcGxheWVyQm9hcmRFbGVtIGZyb20gXCIuL3BsYXllckJvYXJkRWxlbS5qc1wiO1xuaW1wb3J0IFJhZGFyIGZyb20gXCIuL1JhZGFyLmpzXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuL0J1dHRvbi5qc1wiO1xuaW1wb3J0IE9wdGlvbnNNZW51IGZyb20gXCIuL09wdGlvbnNNZW51LmpzXCI7XG5pbXBvcnQgU2NvcmVDb250YWluZXIgZnJvbSBcIi4vU2NvcmVDb250YWluZXIuanNcIjtcbmltcG9ydCBBSUJvYXJkRWxlbSBmcm9tIFwiLi9BSUJvYXJkRWxlbS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUGFnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKG9sZE1vZGVsLmdhbWVTdGF0ZSAhPT0gbmV3TW9kZWwuZ2FtZVN0YXRlICYmXG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuY3VycmVudFBhZ2UgPT09IFwiZ2FtZVBhZ2VcIikgfHxcbiAgICAgICAgICAgIG9sZE1vZGVsLnZpZGVvUGxheWluZyAhPT0gbmV3TW9kZWwudmlkZW9QbGF5aW5nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZWwuZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwicGxhY2VTaGlwc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUGxhY2VTaGlwc1N0YWdlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpbkdhbWVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEluR2FtZVN0YWdlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkUGxhY2VTaGlwc1N0YWdlKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHNoaXBDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcENvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2hpcFF1ZXVlKFxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwsXG4gICAgICAgICAgICBzaGlwQ29udGFpbmVyLFxuICAgICAgICAgICAgKHNoaXBJbmRleCwgY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcEluZGV4ID0gc2hpcEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEZvb3RlclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgR2FtZU1lc3NhZ2UodGhpcy52aWV3TW9kZWwsIG1lc3NhZ2VDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWUgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImdhbWVcIiB9KTtcblxuICAgICAgICBuZXcgcGxheWVyQm9hcmRFbGVtKHRoaXMudmlld01vZGVsLCBnYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4LFxuICAgICAgICAgICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWVbdGhpcy5kcmFnZ2VkU2hpcEluZGV4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJhZGFyQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBSYWRhcih0aGlzLnZpZXdNb2RlbCwgcmFkYXJDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGxlZnRCdXR0b25Db250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibGVmdEJ1dHRvbkNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWlkZGxlQnV0dG9uQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25Db250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25Db250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25Db250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgbGVmdEJ1dHRvbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBtaWRkbGVCdXR0b25Db250YWluZXIsXG4gICAgICAgICAgICAgICAgcmlnaHRCdXR0b25Db250YWluZXIsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCBsZWZ0QnV0dG9uQ29udGFpbmVyLCBcInJvdGF0ZVwiKTtcblxuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCBtaWRkbGVCdXR0b25Db250YWluZXIsIFwiYXV0b1BsYWNlXCIpO1xuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCByaWdodEJ1dHRvbkNvbnRhaW5lciwgXCJ1bmRvXCIpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnNDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwib3B0aW9uc0NvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgT3B0aW9uc01lbnUodGhpcy52aWV3TW9kZWwsIG9wdGlvbnNDb250YWluZXIpO1xuXG4gICAgICAgIGxldCB3YXZlcyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgIHNyYzogd2F2ZXNBbHQsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2F2ZXNBbHRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1vZGVsLnZpZGVvUGxheWluZykge1xuICAgICAgICAgICAgd2F2ZXMuY2xhc3NMaXN0LmFkZChcImFuaW1hdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdhbWVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMUdyaWRDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhdmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hpcEJvd1dvb2RcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsMVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwyXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDNcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw1XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDZcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQ292ZXJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxT3B0aW9uc0NvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFkYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMVNoaXBTdGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtzaGlwQ29udGFpbmVyLCBtZXNzYWdlQ29udGFpbmVyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnYW1lQ29udGFpbmVyO1xuICAgIH1cblxuICAgIGJ1aWxkSW5HYW1lU3RhZ2UobW9kZWwpIHtcbiAgICAgICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyQm9hcmRDb250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IEFJQm9hcmRDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiQUlCb2FyZENvbnRhaW5lclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZ2FtZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJnYW1lXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3BsYXllckJvYXJkQ29udGFpbmVyLCBBSUJvYXJkQ29udGFpbmVyXSxcbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBwbGF5ZXJCb2FyZEVsZW0odGhpcy52aWV3TW9kZWwsIHBsYXllckJvYXJkQ29udGFpbmVyLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4LFxuICAgICAgICAgICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWVbdGhpcy5kcmFnZ2VkU2hpcEluZGV4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBBSUJvYXJkRWxlbSh0aGlzLnZpZXdNb2RlbCwgQUlCb2FyZENvbnRhaW5lciwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCxcbiAgICAgICAgICAgICAgICBtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlW3RoaXMuZHJhZ2dlZFNoaXBJbmRleF0sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgd2F2ZXMgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICBzcmM6IHdhdmVzQWx0LFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndhdmVzQWx0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb2RlbC52aWRlb1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHdhdmVzLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGxheWVyU2NvcmVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyU2NvcmVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNjb3JlQ29udGFpbmVyKHRoaXMudmlld01vZGVsLCBwbGF5ZXJTY29yZUNvbnRhaW5lciwgXCJwbGF5ZXJcIik7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwRm9vdGVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBHYW1lTWVzc2FnZSh0aGlzLnZpZXdNb2RlbCwgbWVzc2FnZUNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgcmFkYXJDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFJhZGFyKHRoaXMudmlld01vZGVsLCByYWRhckNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgQUlTY29yZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJBSVNjb3JlQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTY29yZUNvbnRhaW5lcih0aGlzLnZpZXdNb2RlbCwgQUlTY29yZUNvbnRhaW5lciwgXCJBSVwiKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm9wdGlvbnNDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3B0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaW5HYW1lXCIpO1xuXG4gICAgICAgIG5ldyBPcHRpb25zTWVudSh0aGlzLnZpZXdNb2RlbCwgb3B0aW9uc0NvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgcGxheWVyU3RhZ2UgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyU3RhZ2VcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbcGxheWVyU2NvcmVDb250YWluZXIsIG1lc3NhZ2VDb250YWluZXJdLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBBSVN0YWdlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIkFJU3RhZ2VcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbQUlTY29yZUNvbnRhaW5lciwgb3B0aW9uc0NvbnRhaW5lcl0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZ2FtZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxR3JpZENvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgd2F2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwQm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJzaGlwQm93V29vZFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwxXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsM1wiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw0XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDVcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNlwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZmxha0NvdmVyVG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUsXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMU9wdGlvbnNDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtwbGF5ZXJTdGFnZSwgcmFkYXJDb250YWluZXIsIEFJU3RhZ2VdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnYW1lQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZVwiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uc01lbnUgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIHBvc3NpYmxlIG9wdGlvbnMuLi5cbiAgICAvL1xuICAgIC8vIHRoZW1lIGNvbG9yXG4gICAgLy8gc3RvcCB2aWRlb1xuICAgIC8vXG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZE9wdGlvbnMobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkT3B0aW9ucyhtb2RlbCkge1xuICAgICAgICBpZiAobW9kZWwuZ2FtZVN0YXRlID09PSBcImluR2FtZVwiKSB7XG4gICAgICAgICAgICAvLyBtYXliZSBhZGQgYSBiYWNrIGJ1dHRvbiBvciBuZXcgZ2FtZSBidXR0b25cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpZGVvQnRuID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgaWQ6IFwidmlkZW9CdG5cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdmlkZW9CdG5DbGFzcyA9IG1vZGVsLnZpZGVvUGxheWluZyA/IFwicGF1c2VcIiA6IFwicGxheVwiO1xuXG4gICAgICAgIHZpZGVvQnRuLmNsYXNzTGlzdC5hZGQodmlkZW9CdG5DbGFzcyk7XG5cbiAgICAgICAgdmlkZW9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC52aWRlb1BsYXlpbmcgPSAhb2xkTW9kZWwudmlkZW9QbGF5aW5nO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGh1ZVNsaWRlciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbnB1dFwiLFxuICAgICAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICAgICAgbWluOiBcIjBcIixcbiAgICAgICAgICAgIG1heDogXCIzNjBcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIjEyMFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImh1ZVNsaWRlclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBodWVTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJWYWx1ZSA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIik7XG4gICAgICAgICAgICBjb25zdCBzdGFydGluZ0h1ZSA9IDEyMDtcbiAgICAgICAgICAgIGNvbnN0IGh1ZVJvdGF0aW9uID0gKChzbGlkZXJWYWx1ZSAtIHN0YXJ0aW5nSHVlICsgMTgwKSAlIDM2MCkgLSAxODA7XG4gICAgICAgICAgICBjb25zdCB0aGVtZUNvbG9yID0gYGhzbGEoJHtzbGlkZXJWYWx1ZX0sIDEwMCUsIDUwJSwgMSlgO1xuICAgICAgICAgICAgY29uc3QgbG93QWxwaGFDb2xvciA9IGBoc2xhKCR7c2xpZGVyVmFsdWV9LCAxMDAlLCA1MCUsIDAuNSlgO1xuICAgICAgICAgICAgY29uc3Qgb3Bwb3NpdGVSb3RhdGlvbiA9IChzbGlkZXJWYWx1ZSAtIHN0YXJ0aW5nSHVlICsgMzAwKSAlIDM2MDtcbiAgICAgICAgICAgIGNvbnN0IG9wcG9zaXRlVGhlbWUgPSBgaHNsYSgke29wcG9zaXRlUm90YXRpb259LCAxMDAlLCA1MCUsIDEpYDtcbiAgICAgICAgICAgIGNvbnN0IG9wcG9zaXRlTG93QWxwaGFUaGVtZSA9IGBoc2xhKCR7b3Bwb3NpdGVSb3RhdGlvbn0sIDEwMCUsIDUwJSwgLjUpYDtcbiAgICAgICAgICAgIGNvbnN0IG9wcG9zaXRlSHVlUm90YXRlID1cbiAgICAgICAgICAgICAgICAoKG9wcG9zaXRlUm90YXRpb24gLSBzdGFydGluZ0h1ZSArIDE4MCkgJSAzNjApIC0gMTgwO1xuXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS10aGVtZS1jb2xvclwiLCB0aGVtZUNvbG9yKTtcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWxvd0FscGhhLWNvbG9yXCIsIGxvd0FscGhhQ29sb3IpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tZmlsdGVyXCIsIGBodWUtcm90YXRlKCR7aHVlUm90YXRpb259ZGVnKWApO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBcIi0tb3Bwb3NpdGUtZmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgYGh1ZS1yb3RhdGUoJHtvcHBvc2l0ZUh1ZVJvdGF0ZX1kZWcpYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLW9wcG9zaXRlLWNvbG9yXCIsIG9wcG9zaXRlVGhlbWUpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBcIi0tb3Bwb3NpdGUtbG93QWxwaGFcIixcbiAgICAgICAgICAgICAgICBvcHBvc2l0ZUxvd0FscGhhVGhlbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNsaWRlQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNsaWRlQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2h1ZVNsaWRlcl0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnNIb3VzaW5nID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm9wdGlvbnNIb3VzaW5nXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3ZpZGVvQnRuLCBzbGlkZUNvbnRhaW5lcl0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zSG91c2luZztcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGFyIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPT09IFwiaW5HYW1lXCIgfHxcbiAgICAgICAgICAgIG9sZE1vZGVsLkFJLmdhbWVib2FyZC5zaGlwcy5sZW5ndGggIT09XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuQUkuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aCB8fFxuICAgICAgICAgICAgb2xkTW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5sZW5ndGggIT09XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5sZW5ndGhcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSYWRhcihtb2RlbCk7XG4gICAgfVxuXG4gICAgYnVpbGRSYWRhcihtb2RlbCkge1xuICAgICAgICBjb25zdCByYWRhciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJ1bFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVuZW1pZXMgPSBtb2RlbC5BSS5nYW1lYm9hcmQuc2hpcHM7XG4gICAgICAgIGVuZW1pZXMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgcmFkYXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogYGVuZW15UGluZyR7aW5kZXh9YCB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGZyaWVuZGx5ID0gbW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcztcbiAgICAgICAgZnJpZW5kbHkuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgcmFkYXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogYGZyaWVuZGx5UGluZyR7aW5kZXh9YCB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByYWRhcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgY2FycmllclNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9DYXJyaWVyLnN2Z1wiO1xuaW1wb3J0IGJhdHRsZXNoaXBTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvQmF0dGxlc2hpcDIuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvU3VibWFyaW5lLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbEJvYXRTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUGF0cm9sLUJvYXQuc3ZnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlQ29udGFpbmVyIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQsIHZlcnNpb24pIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLnZlcnNpb24gPT09IFwicGxheWVyXCIgPyBtb2RlbC5wbGF5ZXIgOiBtb2RlbC5BSTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRTY29yZUNvbnRhaW5lcihwbGF5ZXIpO1xuICAgIH1cblxuICAgIGJ1aWxkU2NvcmVDb250YWluZXIocGxheWVyKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNjb3JlQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gXCJBSVwiXG4gICAgICAgICAgICA/IHNjb3JlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYEFJU2NvcmVgKVxuICAgICAgICAgICAgOiBzY29yZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwbGF5ZXJTY29yZWApO1xuXG4gICAgICAgIGNvbnN0IHNoaXBMaXN0ID0gcGxheWVyLmdhbWVib2FyZC5zaGlwcztcblxuICAgICAgICBzaGlwTGlzdC5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9wID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJ0b3BTZWN0aW9uXCIgfSk7XG4gICAgICAgICAgICBjb25zdCBtaWQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcIm1pZFNlY3Rpb25cIiB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJvdCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiYm90U2VjdGlvblwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzaGlwSWNvbiA9IGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNjb3JlYm9hcmRTaGlwT3ZlcmxheVwiLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoc2hpcC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkNhcnJpZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgc2hpcEljb24uc3JjID0gY2FycmllclNyYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgICAgICAgICAgc2hpcEljb24uc3JjID0gYmF0dGxlc2hpcFNyYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgICAgICBzaGlwSWNvbi5zcmMgPSBkZXN0cm95ZXJTcmM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJTdWJtYXJpbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2hpcEljb24uc3JjID0gc3VibWFyaW5lU3JjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiUGF0cm9sLUJvYXRcIjpcbiAgICAgICAgICAgICAgICAgICAgc2hpcEljb24uc3JjID0gcGF0cm9sQm9hdFNyYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcFNjb3JlXCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGAke3NoaXAuc2l6ZSAtIHNoaXAuaGl0c30gLyAke3NoaXAuc2l6ZX1gLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1pZC5hcHBlbmRDaGlsZChzY29yZSk7XG5cbiAgICAgICAgICAgIGlmICghc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgc2hpcEljb24uY2xhc3NMaXN0LmFkZChcImFsaXZlXCIpO1xuICAgICAgICAgICAgICAgIHRvcC5hcHBlbmRDaGlsZChzaGlwSWNvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNoaXBJY29uLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgICAgICAgICAgIGJvdC5hcHBlbmRDaGlsZChzaGlwSWNvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb2wgPSBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwQ29sXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt0b3AsIG1pZCwgYm90XSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzY29yZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwQ29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzY29yZUNvbnRhaW5lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IGNhcnJpZXJTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvQ2Fycmllci5zdmdcIjtcbmltcG9ydCBiYXR0bGVzaGlwU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0JhdHRsZXNoaXAyLnN2Z1wiO1xuaW1wb3J0IGRlc3Ryb3llclNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9EZXN0cm95ZXIuc3ZnXCI7XG5pbXBvcnQgc3VibWFyaW5lU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBwYXRyb2xCb2F0U3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1BhdHJvbC1Cb2F0LnN2Z1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihzaGlwLCBjbGlja2VkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zaGlwTW9kZWwgPSBzaGlwO1xuXG4gICAgICAgIHRoaXMudGlsZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zaGlwUHVsc2UgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50ID0gY2xpY2tlZEV2ZW50O1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgLy9zaGlwcyBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNoaXAuaWQgPSB0aGlzLnNoaXBNb2RlbC5uYW1lO1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICBzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIGxldCBzaGlwU3JjID0gbnVsbDtcblxuICAgICAgICBsZXQgc2hpcENsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChzaGlwQ2xhc3MpO1xuXG4gICAgICAgIC8vIG1hdGNoZXMgbmFtZSBvZiBzaGlwIHRvIHRoZSBpbWFnZSBzb3VyY2UgZmlsZVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2hpcE1vZGVsLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IGNhcnJpZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBiYXR0bGVzaGlwU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBkZXN0cm95ZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiU3VibWFyaW5lXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IHN1Ym1hcmluZVNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQYXRyb2wtQm9hdFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBwYXRyb2xCb2F0U3JjO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlcyB0aGUgaW5uZXIgZGl2cyBmb3IgZWFjaCBzaGlwXG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBzaXplXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwTW9kZWwuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQuYm9hdCA9IHRoaXMuc2hpcE1vZGVsLm5hbWU7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQudGlsZSA9IGk7XG4gICAgICAgICAgICB0aWxlLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL2FkZCBoZWFkIGNsYXNzIHRvIGZyb250IGZvciBzdHlsaW5nXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgdGlsZS5jbGFzc0xpc3QuYWRkKFwiaGVhZFwiKTtcbiAgICAgICAgICAgIC8vYWRkIHRhaWwgY2xhc3MgdG8gdGFpbCBmb3Igc3R5bGluZ1xuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5zaGlwTW9kZWwuc2l6ZSAtIDEpIHRpbGUuY2xhc3NMaXN0LmFkZChcInRhaWxcIik7XG5cbiAgICAgICAgICAgIC8vIGFkZHMgY2xpY2sgbGlzdGVuZXIgdG8gc2V0IGNsaWNrZWQgaW5kZXhcbiAgICAgICAgICAgIHRpbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aWxlcyB0byB0aGUgc2hpcFxuICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgc2hpcC5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNwaWNlIHVwIHRoZSBzaGlwIGRpc3BsYXlcbiAgICAgICAgY29uc3Qgc2hpcE92ZXJsYXkgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBzaGlwT3ZlcmxheWAsXG4gICAgICAgICAgICBpZDogYCR7dGhpcy5zaGlwTW9kZWwubmFtZX1PdmVybGF5YCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHNoaXBPdmVybGF5O1xuICAgICAgICBzaGlwT3ZlcmxheS5zcmMgPSBzaGlwU3JjO1xuICAgICAgICBsZXQgb3ZlcmxheUNsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsXG4gICAgICAgICAgICA/IFwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICA6IFwidmVydGljYWxcIjtcbiAgICAgICAgc2hpcE92ZXJsYXkuY2xhc3NMaXN0LmFkZChvdmVybGF5Q2xhc3MpO1xuICAgICAgICBzaGlwT3ZlcmxheS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgc2hpcC5hcHBlbmRDaGlsZChzaGlwT3ZlcmxheSk7XG5cbiAgICAgICAgc2hpcC5hcHBlbmRDaGlsZCh0aGlzLnNoaXBQdWxzZSk7XG5cbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBib3VuZChlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBib3VuZChlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdTdGFydChlKSB7XG4gICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGlsZS5zdHlsZS53aWR0aCA9IFwiNDBweFwiO1xuICAgICAgICAgICAgdGlsZS5zdHlsZS5oZWlnaHQgPSBcIjQwcHhcIjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbGUuc3R5bGUud2lkdGggPSBcIjMwcHhcIjtcbiAgICAgICAgICAgICAgICB0aWxlLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGdldCBhbGwgdGlsZXMgd2l0aCBwcmlvciBob3ZlciBlZmZlY3RzXG4gICAgICAgIGNvbnN0IHRpbGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJcIiwgXCIudmFsaWRcIiwgXCIuaW52YWxpZFwiKVxuICAgICAgICApO1xuICAgICAgICAvLyBjbGVhciB0aGVpciBob3ZlciBlZmZlY3RzXG4gICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIsIFwiaW52YWxpZFwiLCBcInZhbGlkXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbS5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcEVsZW0uanNcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwUXVldWUgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgY2xpY2tlZEV2ZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50ID0gY2xpY2tlZEV2ZW50O1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ld01vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUXVldWUobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkUXVldWUobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcFF1ZXVlXCIsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXh0U2hpcENvbnRhaW5lclwiLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFtb2RlbC5uYW1lUGFnZUlzT3Blbikge1xuICAgICAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKFwiaGlkZU5leHRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBxdWV1ZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJxdWV1ZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtzdGFnZSwgbmV4dF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWUuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChzaGlwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50KGluZGV4LCBjbGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5zdGF0ZU1lc3NhZ2UuaW5jbHVkZXMoXCJFbmVtaWVzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBQbGFjZSB5b3VyICR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LmFwcGVuZENoaWxkKHNoaXBFbGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLnByZXBlbmQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcXVldWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcEVsZW1cIjtcbmltcG9ydCB7XG4gICAgY2hlY2tBbGxTaGlwc1BsYWNlZCxcbiAgICBpc1ZhbGlkUGxhY2VtZW50LFxuICAgIHBsYWNlU2hpcCxcbn0gZnJvbSBcIi4uLy4uL2dhbWVDb21wb25lbnRzL0dhbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQm9hcmRFbGVtIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQsIGRyYWdFbnRlcikge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRyYWdFbnRlciA9IGRyYWdFbnRlcjtcbiAgICAgICAgdGhpcy5ib2FyZFNpemUgPSBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJvYXJkKG1vZGVsKTtcbiAgICB9XG5cbiAgICBidWlsZEJvYXJkKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0dyaWQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcInNoYWRvd0dyaWRcIiB9KTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYm9hcmRcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbc2hhZG93R3JpZF0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuc2l6ZTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZFNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmJvYXJkU2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJjZWxsXCIgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZVJlZiA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgIC8vIHNldHMgZGF0YSB2YWx1ZXMgZm9yIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmxhc3RDbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhc3RDbGlja2VkLnJvdyA9PT0gcm93ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXN0Q2xpY2tlZC5jb2wgPT09IGNvbFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInB1bHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkcyB0aGUgZHJhZ2VudGVyIGFuZCBkcm9wIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZVJlZi5zaGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgc2hpcCBlZmZlY3RcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGlsZVJlZi50aWxlU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgaGl0IG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtaXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBtaXNzIG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdGhlIGNlbGwgdG8gdGhlIGJvYXJkIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC8vIGFkZHMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBjZWxsIHRvIHRoZSBjZWxscyBhcnJheVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XG5cbiAgICAgICAgbW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jbGlja2VkRXZlbnQoaW5kZXgsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VUaWxlID0gc2hpcC50aWxlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFRpbGUgPSBzaGlwLnRpbGVzW3NoaXAuc2l6ZSAtIDFdO1xuICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5zdHlsZS5ncmlkQXJlYSA9IGAke2Jhc2VUaWxlLnJvdyArIDF9IC8gJHtcbiAgICAgICAgICAgICAgICBiYXNlVGlsZS5jb2wgKyAxXG4gICAgICAgICAgICB9IC8gJHtlbmRUaWxlLnJvdyArIDJ9IC8gJHtlbmRUaWxlLmNvbCArIDJ9YDtcbiAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkU2hpcFwiKTtcbiAgICAgICAgICAgIHNoaXBFbGVtLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJvbkJvYXJkXCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEVsZW0uc2hpcFB1bHNlLmNsYXNzTGlzdC5hZGQoXCJzaGlwT3ZlcmxheVB1bHNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hhZG93R3JpZC5hcHBlbmRDaGlsZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYm9hcmRCb3JkZXIgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImJvYXJkQm9yZGVyXCIgfSk7XG4gICAgICAgIGJvYXJkQm9yZGVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICAgICAgcmV0dXJuIGJvYXJkQm9yZGVyO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdPdmVyKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdMZWF2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW50ZXIoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgW2NsaWNrZWRJbmRleCwgc2hpcF0gPSB0aGlzLmRyYWdFbnRlcigpO1xuICAgICAgICB0aGlzLmRyYWdnZWRTaGlwID0gc2hpcDtcbiAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgIC8vIGdldCBhbGwgdGlsZXMgd2l0aCBwcmlvciBob3ZlciBlZmZlY3RzXG4gICAgICAgIGNvbnN0IHRpbGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJcIiwgXCIudmFsaWRcIiwgXCIuaW52YWxpZFwiKVxuICAgICAgICApO1xuICAgICAgICAvLyBjbGVhciB0aGVpciBob3ZlciBlZmZlY3RzXG4gICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIsIFwiaW52YWxpZFwiLCBcInZhbGlkXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gc2hpcC5zaXplO1xuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJhc2UgdGlsZSBmb3IgdGhlIGRyYWdnZWQgc2hpcFxuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgc2hpcCBpbmRleCB0aGF0IHdhcyBjbGlja2VkIGFuZCB0aWxlIGN1cnJlbnQgaG92ZXJlZFxuICAgICAgICAvLyAobGVmdCBtb3N0IGZvciBob3Jpem9udGFsLCB0b3AgbW9zdCBmb3IgdmVydGljYWwpXG4gICAgICAgIGNvbnN0IGJhc2VDb29yZHMgPSB0aGlzLmdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpO1xuICAgICAgICBjb25zdCBiYXNlUm93ID0gYmFzZUNvb3Jkcy5yb3c7XG4gICAgICAgIGNvbnN0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICAvLyBjaGVjayBpZiBob3ZlcmVkIHRpbGVzIGFyZSBhbGwgb24gdGhlIGJvYXJkIGFuZCBkb250IG92ZXJsYXAgYSBzaGlwXG4gICAgICAgIGxldCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChcbiAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICBiYXNlUm93LFxuICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgIG1vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHJvd09mZnNldCA9IGJhc2VSb3c7XG4gICAgICAgIGxldCBjb2xPZmZzZXQgPSBiYXNlQ29sO1xuXG4gICAgICAgIC8vIGFxdWlyZSB0aGUgZGl2IGZvciBldmVyeSBjZWxsXG4gICAgICAgIC8vIGFuZCBzdHlsZSBhY2NvcmRpbmcgdG8gdmFsaWRpdHlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJvd09mZnNldCA+PSB0aGlzLmJvYXJkU2l6ZSB8fCBjb2xPZmZzZXQgPj0gdGhpcy5ib2FyZFNpemUpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jZWxsc1tOdW1iZXIoYCR7cm93T2Zmc2V0fWAgKyBgJHtjb2xPZmZzZXR9YCldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGNvbE9mZnNldCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3dPZmZzZXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICByb3dPZmZzZXQgPSBiYXNlUm93O1xuICAgICAgICAgICAgY29sT2Zmc2V0ID0gYmFzZUNvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKHJvd09mZnNldCwgY29sT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93T2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gcm93T2Zmc2V0IDogcm93T2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQgPSBpc0hvcml6b250YWwgPyBjb2xPZmZzZXQgKyAxIDogY29sT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93T2Zmc2V0ID0gYmFzZVJvdztcbiAgICAgICAgICAgIGNvbE9mZnNldCA9IGJhc2VDb2w7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChyb3dPZmZzZXQsIGNvbE9mZnNldCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvd09mZnNldCA9IGlzSG9yaXpvbnRhbCA/IHJvd09mZnNldCA6IHJvd09mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgY29sT2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gY29sT2Zmc2V0ICsgMSA6IGNvbE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyb3AoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgYmFzZUNvb3JkcyA9IHRoaXMuZ2V0QmFzZVRpbGUoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJhc2VSb3cgPSBiYXNlQ29vcmRzLnJvdztcbiAgICAgICAgbGV0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICBsZXQgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgIGJhc2VDb2wsXG4gICAgICAgICAgICBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmRyb3BRdWV1ZS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfSA9IHBsYWNlU2hpcChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCxcbiAgICAgICAgICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgICAgICAgICAgb2xkTW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBQbGFjZSB5b3VyICR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBsYWNlZCA9IGNoZWNrQWxsU2hpcHNQbGFjZWQobmV3TW9kZWwucGxheWVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChhbGxQbGFjZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuYWxsU2hpcHNQbGFjZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBgR29vZCBsdWNrIEFkbWlyYWwgJHtuZXdNb2RlbC5wbGF5ZXIubmFtZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGludmFsaWQgcGxhY2VtZW50IGRyb3BcXFxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYCR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfSB3ZW50IG91dCBvZiBib3VuZHMsIHRyeSBhZ2Fpbi5gO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqICBjYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3Qgb3IgdG9wIG1vc3QgdGlsZSAqL1xuICAgIGdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpIHtcbiAgICAgICAgLy8gZ2V0cyB0aGUgaW5kZXggdGhhdCB0aGUgc2hpcCB3YXMgcGlja2VkIHVwIGJ5XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICBsZXQgb2Zmc2V0Um93ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldENvbCA9IDA7XG5cbiAgICAgICAgLy8gb2Zmc2V0cyB0aGUgaG92ZXJlZCB0aWxlIGFjY29yZGluZyB0byB0aGUgZ3JhYmJlZCBpbmRleFxuICAgICAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG9mZnNldENvbCA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0Um93ID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlUm93ID0gcm93IC0gb2Zmc2V0Um93O1xuICAgICAgICBjb25zdCBiYXNlQ29sID0gY29sIC0gb2Zmc2V0Q29sO1xuXG4gICAgICAgIHJldHVybiB7IHJvdzogYmFzZVJvdywgY29sOiBiYXNlQ29sIH07XG4gICAgfVxuXG4gICAgLyoqICByZXR1cm5zIHRoZSBET00gZWxlbWVudCBmb3IgYSBnaXZlbiBjb29yZGluYXRlICovXG4gICAgZ2V0Q2VsbChyb3csIGNvbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICByb3cgPCAwIHx8XG4gICAgICAgICAgICByb3cgPj0gdGhpcy5ib2FyZFNpemUgfHxcbiAgICAgICAgICAgIGNvbCA8IDAgfHxcbiAgICAgICAgICAgIGNvbCA+PSB0aGlzLmJvYXJkU2l6ZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHNbcm93ICogdGhpcy5ib2FyZFNpemUgKyBjb2xdO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL0NTUy9ob21lcGFnZS5jc3NcIjtcbmltcG9ydCBIb21lUGFnZUlucHV0IGZyb20gXCIuL0hvbWVQYWdlSW5wdXQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBjb25zdCBob21lcGFnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lcGFnZUNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQkFUVExFU0hJUFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lSGVhZGVyXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld0dhbWUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwibWFpblwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IEhvbWVQYWdlSW5wdXQodGhpcy52aWV3TW9kZWwsIG5ld0dhbWUpO1xuXG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0dhbWUpO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwidWxcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic21va2VDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvb3RlclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcInNwYW5cIiwgdGV4dENvbnRlbnQ6IFwiQ3JlYXRlZCBieSBHbHV0dHosIFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiSW1hZ2UgYnkgdXBrbHlhayBvbiBGcmVlcGlrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vd3d3LmZyZWVwaWsuY29tL2ZyZWUtdmVjdG9yL3N1bmtlbi1jcnVpc2Utc2hpcC1zZWEtaGFyYm9yLW1vcm5pbmdfMjE1ODQ5MTUuaHRtI3F1ZXJ5PWJhdHRsZXNoaXAlMjBiYWNrZ3JvdW5kJnBvc2l0aW9uPTMyJmZyb21fdmlldz1zZWFyY2gmdHJhY2s9YWlzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBob21lcGFnZUNvbnRhaW5lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbS5qc1wiO1xuaW1wb3J0IFwiLi4vLi4vLi4vQ1NTL25hbWVwYWdlLmNzc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlSW5wdXQgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcih7IG5hbWVQYWdlSXNPcGVuIH0pIHtcbiAgICAgICAgY29uc3QgbmV3R2FtZUJ0biA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBcIk5ldyBHYW1lXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmV3R2FtZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lUGFnZUlzT3BlbjogdHJ1ZSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuYW1lUGFnZUlzT3BlbiA/IHRoaXMuYnVpbGRGb3JtKCkgOiBuZXdHYW1lQnRuO1xuICAgIH1cblxuICAgIGJ1aWxkRm9ybSgpIHtcbiAgICAgICAgY29uc3QgZ3JlZXRpbmcgPSBlbGVtKHsgcHJvcDogXCJwXCIsIHRleHRDb250ZW50OiBcIkhlbGxvIEFkbWlyYWwuLi5cIiB9KTtcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbnB1dFwiLFxuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJOYW1lXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQ29udGludWVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJmb3JtXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmFtZUZvcm1cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbaW5wdXRGaWVsZCwgYnV0dG9uXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuY3VycmVudFBhZ2UgPSBcIm1hcFBhZ2VcIjtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIubmFtZSA9IGlucHV0RmllbGQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm1Db250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZ3JlZXRpbmcsIG5hbWVGaWVsZF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtLmpzXCI7XG5pbXBvcnQgXCIuLi8uLi8uLi9DU1MvbWFwcGFnZS5jc3NcIjtcbmltcG9ydCByZWRQaW5TcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcmVkLXBpbi5wbmdcIjtcbmltcG9ydCBzdGlja3lOb3RlU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3N0aWNreS1ub3RlLnN2Z1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcih7IHN0YXRlTWVzc2FnZSwgcGxheWVyIH0pIHtcbiAgICAgICAgY29uc3QgcmVkUGlucyA9IFtcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjFcIixcbiAgICAgICAgICAgICAgICBpZDogXCJlYXN5XCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjJcIixcbiAgICAgICAgICAgICAgICBpZDogXCJtZWRpdW1cIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBzcmM6IHJlZFBpblNyYyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmVkUGluM1wiLFxuICAgICAgICAgICAgICAgIGlkOiBcImhhcmRcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuXG4gICAgICAgIHJlZFBpbnMuZm9yRWFjaCgocGluKSA9PiB7XG4gICAgICAgICAgICBwaW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmN1cnJlbnRQYWdlID0gXCJnYW1lUGFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPSBcInBsYWNlU2hpcHNcIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRW5lbWllcyBhcHByb2FjaC4gRGVwbG95IHRoZSBmbGVldC5cIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuQUkuZGlmZmljdWx0eSA9IHBpbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc3RhdGVNZXNzYWdlICE9PSBwaW4uaWQpIHtcbiAgICAgICAgICAgICAgICBwaW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXRlTWVzc2FnZTogcGluLmlkIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtYXAgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibWFwXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogcmVkUGlucyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlTWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc3Qgbm90ZSA9IHRoaXMuYnVpbGROb3RlKHN0YXRlTWVzc2FnZSwgcGxheWVyKTtcbiAgICAgICAgICAgIG1hcC5hcHBlbmRDaGlsZChub3RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgYnVpbGROb3RlKHN0YXRlTWVzc2FnZSwgcGxheWVyKSB7XG4gICAgICAgIGNvbnN0IG5vdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgbm90ZTE6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJTb21hbGlhbiBDb2FzdFwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiRWFzeVwiLFxuICAgICAgICAgICAgICAgIHBhcmE6IFwiSSByZWdyZXQgdG8gaW5mb3JtIHlvdSB0aGF0IGEgZ3JvdXAgb2YgU29tYWxpYW4gcGlyYXRlcyBoYXZlIHN1Y2Nlc3NmdWxseSBjb21tYW5kZWVyZWQgYW4gSW5kaWFuIGNhcnJpZXIgZ3JvdXAgaW4gdGhlIEFyYWJpYW4gU2VhLiBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlMjoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIkJsYWNrIFNlYVwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiTWVkaXVtXCIsXG4gICAgICAgICAgICAgICAgcGFyYTogXCJJIGFtIHdyaXRpbmcgdG8gaW5mb3JtIHlvdSBhYm91dCBhIGdyb3VwIG9mIFJ1c3NpYW4gcGlyYXRlcyB3aG8gaGF2ZSBjb21tYW5kZWVyZWQgYSBSdXNzaWFuIGNhcnJpZXIgZ3JvdXAuIFRoaXMgZ3JvdXAgaXMgYSBzaWduaWZpY2FudCB0aHJlYXQgdG8gdGhlIHNhZmV0eSBhbmQgc2VjdXJpdHkgb2YgdGhlIGFyZWEuXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90ZTM6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJTb3V0aCBDaGluYSBTZWFcIixcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5OiBcIkhhcmRcIixcbiAgICAgICAgICAgICAgICBwYXJhOiBcIkEgZ3JvdXAgb2YgQ2hpbmVzZSBwaXJhdGVzIGhhcyBtYW5hZ2VkIHRvIHNlaXplIGNvbnRyb2wgb2YgYSBDaGluZXNlIGNhcnJpZXIgZ3JvdXAsIGFuZCBpdCBwb3NlcyBhIHNpZ25pZmljYW50IHRocmVhdCB0byByZWdpb25hbCBzZWN1cml0eS5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgc3dpdGNoIChzdGF0ZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVkaXVtXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucyA9IG5vdGVPcHRpb25zLm5vdGUzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vdGUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYXJ0aWNsZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5vdGVDb250YWluZXJcIixcbiAgICAgICAgICAgIGlkOiBzdGF0ZU1lc3NhZ2UsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgICAgICBzcmM6IHN0aWNreU5vdGVTcmMsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzdGlja3lOb3RlXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwYXJhQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYExvY2F0aW9uOiAke3NlbGVjdGVkT3B0aW9ucy5sb2NhdGlvbn1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYERpZmZpY3VsdHk6ICR7c2VsZWN0ZWRPcHRpb25zLmRpZmZpY3VsdHl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBBZG1pcmFsICR7cGxheWVyLm5hbWV9LGAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgJHtzZWxlY3RlZE9wdGlvbnMucGFyYX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gICAgLS10aGVtZS1jb2xvcjogaHNsYSgxMjAsIDEwMCUsIDUwJSwgMSk7XFxuICAgIC0tbG93QWxwaGEtY29sb3I6IGhzbGEoMTIwLCAxMDAlLCA1MCUsIDAuNSk7XFxuICAgIC0tZmlsdGVyOiBodWUtcm90YXRlKCk7XFxuICAgIC0tb3Bwb3NpdGUtY29sb3I6IGhzbGEoMzAwLCAxMDAlLCA1MCUsIDEpO1xcbiAgICAtLW9wcG9zaXRlLWxvd0FscGhhOiBoc2xhKDMwMCwgMTAwJSwgNTAlLCAwLjUpO1xcbiAgICAtLW9wcG9zaXRlLWZpbHRlcjogaHVlLXJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4uZ2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLnF1ZXVlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnAxT3B0aW9uc0NvbnRhaW5lciB7XFxuICAgIGZsZXg6IDEuMztcXG4gICAgZGlzcGxheTogZmxleDtcXG5cXG4gICAgYmFja2dyb3VuZDogcmdiKDE0NCwgMTQ0LCAxNDQpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNDAsIDE0MCwgMTQwLCAxKSAxMSUsXFxuICAgICAgICByZ2JhKDEzNiwgMTM2LCAxMzYsIDEpIDIxJSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgNjklLFxcbiAgICAgICAgcmdiYSgxMzgsIDEzOCwgMTM4LCAxKSA4NyUsXFxuICAgICAgICByZ2JhKDE2OCwgMTY4LCAxNjgsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgbWluLWhlaWdodDogMjAwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDgzLCA4MywgODMpO1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDEyNiwgMTI2LCAxMjYpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYigxNjMsIDE2MywgMTYzKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDE0NSwgMTQ1LCAxNDUpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCA1cHggYmxhY2s7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcbi5wMUdyaWRDb250YWluZXIge1xcbiAgICBmbGV4OiAzO1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLnJhZGFyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwLjkpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHdpZHRoOiAyNjNweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJvcmRlcjogMTBweCBzb2xpZCAjNmQ2ZDZkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogM3B4IDEwcHggMCAjYzVjNWM1LCBpbnNldCAwIDAgNTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAtNXB4IC01cHggMjBweCBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMyksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMikge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMykge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDUpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSkge1xcbiAgICB3aWR0aDogNzVweDtcXG4gICAgaGVpZ2h0OiA3NXB4O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDYpIHtcXG4gICAgd2lkdGg6IDE3NXB4O1xcbiAgICBoZWlnaHQ6IDE3NXB4O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDcpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHZhcigtLXRoZW1lLWNvbG9yKSAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcXG4gICAgYW5pbWF0aW9uOiByYWRhciAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBsZWZ0O1xcbn1cXG5cXG4uZW5lbXlQaW5nMCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDg3JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmVuZW15UGluZzEge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA5MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5lbmVteVBpbmcyIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogODUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nMyB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmVuZW15UGluZzQge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5mcmllbmRseVBpbmcwIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogNDIlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uZnJpZW5kbHlQaW5nMSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NyU7XFxuICAgIGxlZnQ6IDQ1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmZyaWVuZGx5UGluZzIge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTUlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5mcmllbmRseVBpbmczIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogNTUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZnJpZW5kbHlQaW5nNCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MyU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyByYWRhciB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3cge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG4uYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDkwLCA5MCwgOTApO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLmxlZnRCdXR0b25Db250YWluZXIsXFxuLm1pZGRsZUJ1dHRvbkNvbnRhaW5lcixcXG4ucmlnaHRCdXR0b25Db250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoODMsIDgzLCA4Myk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4uYmFzZSB7XFxuICAgIGJhY2tncm91bmQ6ICNjYWNhY2E7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiAyN3ZtaW47XFxuICAgIGJveC1zaGFkb3c6IDAgNnZtaW4gMC4xNXZtaW4gMHZtaW4gcmdiKDkyLCA5MiwgOTIpLFxcbiAgICAgICAgMCA0dm1pbiAwLjE1dm1pbiAwdm1pbiByZ2IoOTIsIDkyLCA5MiksXFxuICAgICAgICAwIDJ2bWluIDAuMTV2bWluIDB2bWluIHJnYig5MiwgOTIsIDkyKSxcXG4gICAgICAgIDIwcHggMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuNzI2KSxcXG4gICAgICAgIDgwcHggMTYwcHggMTAwcHggcmdiYSgwLCAwLCAwLCAwLjUwNyk7XFxuICAgIHBhZGRpbmc6IDB2bWluIDJ2bWluIDJ2bWluIDJ2bWluO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZykgcm90YXRlWigwZGVnKTtcXG4gICAgbWFyZ2luLXRvcDogLTQuNXZtaW47XFxuICAgIGhlaWdodDogOTAlO1xcbn1cXG5cXG5idXR0b24jYWN0aXZhdGUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZDYwNTA1O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHdpZHRoOiAyMHZtaW47XFxuICAgIGhlaWdodDogMTl2bWluO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogMCA0dm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDJ2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogLTIuNXZtaW47XFxuICAgIGJvcmRlcjogMC41dm1pbiBzb2xpZCAjYWYwMDAwYTE7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlIDBzO1xcbn1cXG5cXG5idXR0b24jYWN0aXZhdGU6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDN2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMS41dm1pbjtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlOmFjdGl2ZSxcXG5idXR0b24jYWN0aXZhdGUucHVzaGVkIHtcXG4gICAgYm94LXNoYWRvdzogMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogMC41dm1pbjtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMjBweCAxMHB4ICNmZjNjM2MsIDAgMCAxMDBweCA1MHB4ICNmZjI4Mjg7XFxuICAgIGJhY2tncm91bmQ6ICNmZjAwMDA7XFxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjMDAwMDAwMjA7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgc2NhbGU6IDAuMztcXG59XFxuLnJpZ2h0QnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxODcsIDE4NiwgMTg2KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDE5MCwgMTkwLCAxOTApO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMjIsIDEyMiwgMTIyKTtcXG59XFxuLm1pZGRsZUJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTgyLCAxODIsIDE4Mik7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYigxODAsIDE4MCwgMTgwKTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig4MCwgODAsIDgwKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxufVxcbi5sZWZ0QnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxODQsIDE4NCwgMTg0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDE4MiwgMTgxLCAxODEpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDkwLCA5MCwgOTApO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMTksIDExOCwgMTE4KTtcXG59XFxuXFxuLmJ1dHRvblRleHQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmQ2ZDZkO1xcbiAgICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAxNSU7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gICAgdGV4dC1zaGFkb3c6IC0xcHggLTFweCAxcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIyYjJiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjVweDtcXG4gICAgbGVmdDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG4uYnV0dG9uVGV4dDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIyYjJiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjVweDtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBibGFjaztcXG59XFxuXFxuLm1pZGRsZUJ1dHRvbiAuYnV0dG9uVGV4dCB7XFxuICAgIHBhZGRpbmc6IDFyZW0gMS4xcmVtO1xcbn1cXG5cXG4ucDFTaGlwU3RhZ2Uge1xcbiAgICBmbGV4OiA1O1xcbiAgICBib3JkZXItYm90dG9tOiA4cHggc29saWQgcmdiKDE1OCwgMTU4LCAxNTgpO1xcbiAgICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCByZ2IoMTk5LCAxOTgsIDE5OCk7XFxuICAgIGJvcmRlci10b3A6IDhweCBzb2xpZCByZ2IoNjgsIDY4LCA2OCk7XFxuICAgIGJvcmRlci1sZWZ0OiA4cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5zaGlwQ29udGFpbmVyIHtcXG4gICAgZmxleDogMTtcXG5cXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDI0MywgMjQzLCAyNDMpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDU4LCA1OCwgNTgpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYig4MCwgNzksIDc5KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1MHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnNoaXBRdWV1ZSB7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIGZsZXg6IDM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMTglO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmaWx0ZXI6IGJsdXIoNXB4KTtcXG59XFxuLm5leHRTaGlwQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDkwJTtcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG4uaGlkZU5leHQge1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5cXG4ubmV4dFNoaXBDb250YWluZXI6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCB2YXIoLS10aGVtZS1jb2xvciksIGluc2V0IDAgMCAxMHB4IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuXFxuLm5leHRTaGlwOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbn1cXG5cXG4ubmV4dFNoaXAge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5DYXJyaWVyQ29udGFpbmVyLFxcbi5CYXR0bGVzaGlwQ29udGFpbmVyLFxcbi5EZXN0cm95ZXJDb250YWluZXIsXFxuLlN1Ym1hcmluZUNvbnRhaW5lcixcXG4uUGF0cm9sLUJvYXRDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jQ2Fycmllck92ZXJsYXksXFxuI0JhdHRsZXNoaXBPdmVybGF5LFxcbiNEZXN0cm95ZXJPdmVybGF5LFxcbiNTdWJtYXJpbmVPdmVybGF5LFxcbiNQYXRyb2wtQm9hdE92ZXJsYXkge1xcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xcbiAgICBmaWx0ZXI6IHZhcigtLWZpbHRlcik7XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyICNDYXJyaWVyT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjQmF0dGxlc2hpcE92ZXJsYXksXFxuLkFJQm9hcmRDb250YWluZXIgI0Rlc3Ryb3llck92ZXJsYXksXFxuLkFJQm9hcmRDb250YWluZXIgI1N1Ym1hcmluZU92ZXJsYXksXFxuLkFJQm9hcmRDb250YWluZXIgI1BhdHJvbC1Cb2F0T3ZlcmxheSB7XFxuICAgIGZpbHRlcjogdmFyKC0tb3Bwb3NpdGUtZmlsdGVyKTtcXG59XFxuXFxuI0NhcnJpZXIsXFxuI0JhdHRsZXNoaXAsXFxuI0Rlc3Ryb3llcixcXG4jU3VibWFyaW5lLFxcbiNQYXRyb2wtQm9hdCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uc2hpcE92ZXJsYXlQdWxzZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBhbmltYXRpb246IHB1bHNlIDAuN3MgZWFzZS1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcHVsc2Uge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAgICAgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcXG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgICAgIDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAgICAgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIH1cXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICAvKiBhbmltYXRpb246IHJvdGF0ZSAwLjRzIGVhc2UtaW4tb3V0OyAqL1xcbn1cXG5cXG4vKiAuc2hpcE92ZXJsYXkuaG9yaXpvbnRhbCB7XFxuICAgIGFuaW1hdGlvbjogcm90YXRlMSAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNS41KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUxIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjYpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxufSAqL1xcblxcbiNQYXRyb2wtQm9hdE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoMyk7XFxufVxcblxcbi5zaGlwVGlsZSB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnNoaXAuaG9yaXpvbnRhbCB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5nYW1lIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5ib2FyZEJvcmRlciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTVweCBzb2xpZCByZ2IoMTE2LCAxMTYsIDExNik7XFxuICAgIGJvcmRlci1yaWdodDogMjBweCBzb2xpZCByZ2IoMTM4LCAxMzcsIDEzNyk7XFxuICAgIGJvcmRlci10b3A6IDIwcHggc29saWQgcmdiKDExNywgMTE3LCAxMTcpO1xcbiAgICBib3JkZXItbGVmdDogMjBweCBzb2xpZCByZ2IoMTAyLCAxMDIsIDEwMik7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCBibGFjaztcXG4gICAgei1pbmRleDogMjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3JkZXItYm90dG9tOiAxNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAyMHB4IHNvbGlkIHJnYigxODIsIDE4MiwgMTgyKTtcXG4gICAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGJvcmRlci1sZWZ0OiAyMHB4IHNvbGlkIHJnYig3NSwgNzUsIDc1KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTQwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcblxcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnBsYXllckJvYXJkQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG59XFxuLkFJQm9hcmRDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuYm9hcmQge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTQwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uc2hhZG93R3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZyxcXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcDpob3ZlcixcXG4jRGVzdHJveWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jU3VibWFyaW5lLmJvYXJkU2hpcDpob3ZlcixcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwOmhvdmVyIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4udGlsZSB7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IDMwcHg7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uY2VsbC5oaXQge1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZWQ7XFxufVxcblxcbi5jZWxsLm1pc3Mge1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCBncmVlbjtcXG59XFxuXFxuLmNlbGw6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyIC5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5BSUJvYXJkQ29udGFpbmVyIC5jZWxsOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbC5oaXQge1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCBncmVlbjtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgLmNlbGwubWlzcyB7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHJlZDtcXG59XFxuXFxuLmNlbGwuaGl0LnB1bHNlIHtcXG4gICAgYW5pbWF0aW9uOiBwdWxzZTIgMC43cyBlYXNlLW91dDtcXG59XFxuXFxuLmNlbGwubWlzcy5wdWxzZSB7XFxuICAgIGFuaW1hdGlvbjogcHVsc2UyIDAuN3MgZWFzZS1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcHVsc2UyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcblxcbiAgICA5MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG4uY2VsbFtkYXRhLWNvbD1cXFwiMFxcXCJdIHtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5jZWxsW2RhdGEtY29sPVxcXCI5XFxcIl0ge1xcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxufVxcbi5jZWxsW2RhdGEtcm93PVxcXCIwXFxcIl0ge1xcbiAgICBib3JkZXItdG9wOiBub25lO1xcbn1cXG4uY2VsbFtkYXRhLXJvdz1cXFwiOVxcXCJdIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jU3VibWFyaW5lIGltZy5ob3Jpem9udGFsIHtcXG4gICAgbGVmdDogLTUlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxufVxcblxcbi5ib2FyZFNoaXAge1xcbiAgICB6LWluZGV4OiA5O1xcbn1cXG5cXG4uYm9hcmRTaGlwIGltZyB7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoOCwgNik7XFxuICAgIGxlZnQ6IDMzJTtcXG4gICAgdG9wOiA0OCU7XFxufVxcblxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNi41LCA1KTtcXG4gICAgbGVmdDogMTglO1xcbiAgICB0b3A6IDQ3JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdG9wOiA0NiU7XFxuICAgIGxlZnQ6IDI0JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYsIDgpO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogLTMlO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuNiwgMik7XFxuICAgIHRvcDogOCU7XFxuICAgIGxlZnQ6IDMyJTtcXG59XFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjIsIDIpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4zLCAyLjUpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMiwgMi42KTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDE3JTtcXG59XFxuXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRvcDogMTUlO1xcbn1cXG4udGlsZS5vbkJvYXJkIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG59XFxuXFxuLmRyYWdnZWRPdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5pbnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMDtcXG59XFxuXFxuLnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5vcHRpb25zQ29udGFpbmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoMTE0LCAxMTQsIDExNCk7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IGJsYWNrO1xcbn1cXG4ub3B0aW9uc0hvdXNpbmcge1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHJnYigxODcsIDE4NywgMTg3KTtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgcGFkZGluZzogMC41cmVtIDJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuXFxuLmh1ZVNsaWRlciB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggdmFyKC0tdGhlbWUtY29sb3IpLCAwIDAgNXB4IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogMC4ycztcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzO1xcbn1cXG5cXG4uaHVlU2xpZGVyOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmh1ZVNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZpbHRlcjogYmx1cigxcHgpIGh1ZS1yb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuLnNsaWRlcjo6LW1vei1yYW5nZS10aHVtYiB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZpbHRlcjogYmx1cigxcHgpIGh1ZS1yb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuI3ZpZGVvQnRuIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICB3aWR0aDogNDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigxcHgpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3ZpZGVvQnRuOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuI3ZpZGVvQnRuLnBhdXNlOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDVweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxufVxcblxcbiN2aWRlb0J0bi5wYXVzZTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDVweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxufVxcblxcbiN2aWRlb0J0bi5wbGF5OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1sZWZ0OiAxNXB4IHNvbGlkIHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTNweDtcXG59XFxuXFxuLnNoaXBGb290ZXIge1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc3RhZ2VQYXJhIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBjb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBmb250LXdlaWdodDogMTAwO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDIuNXMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0MiAxcyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldDIge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgfVxcbn1cXG5cXG4ud2F2ZXNBbHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG5cXG4gICAgdG9wOiAtMTAwcHg7XFxufVxcblxcbi53YXZlc0FsdC5hbmltYXRlIHtcXG4gICAgYW5pbWF0aW9uOiB3YXZlIDEwcyBlYXNlLWluLW91dCBpbmZpbml0ZTtcXG59XFxuLnNoaXBCb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTk0LCAxOTQsIDE5NCwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogLTQwMHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuLnNoaXBCb3dXb29kIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDExOSwgNTcsIDApO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjQsIDc5LCAwLCAxKSA0NiUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDEwMCVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAtNjQwcHg7XFxuICAgIGxlZnQ6IDE2MHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxLFxcbi5mbGFrQmFycmVsMixcXG4uZmxha0JhcnJlbDMsXFxuLmZsYWtCYXJyZWw0LFxcbi5mbGFrQmFycmVsNSxcXG4uZmxha0JhcnJlbDYge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDIge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsMyB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuLmZsYWtCYXJyZWw0IHtcXG4gICAgdG9wOiAtOTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsNSB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDYge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuXFxuLmZsYWtDb3ZlciB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAxNTBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDIwMHB4O1xcbn1cXG4uZmxha0NvdmVyVG9wIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDE1OCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTU4LCAxNTgsIDE1OCwgMSkgMSUsXFxuICAgICAgICByZ2JhKDExMywgMTEzLCAxMTMsIDEpIDQ3JSxcXG4gICAgICAgIHJnYmEoMTEyLCAxMTIsIDExMiwgMSkgOTklXFxuICAgICk7XFxuXFxuICAgIHRvcDogMTAwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHdhdmUge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTUlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG4uQUlTdGFnZSB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTE0LCAxMTQsIDExNCk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxufVxcblxcbi5wbGF5ZXJTdGFnZSB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTE0LCAxMTQsIDExNCk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxufVxcblxcbi5wbGF5ZXJTdGFnZSAuc2hpcEZvb3RlciB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5BSVNjb3JlQ29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiA3MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wbGF5ZXJTY29yZUNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogNzAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4uc2NvcmVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA0MHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgcGFkZGluZzogMC44cmVtO1xcbn1cXG4uc2NvcmVDb250YWluZXIuQUlTY29yZSB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA0MHB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLnNoaXBDb2wge1xcbiAgICB3aWR0aDogMjAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5BSVN0YWdlIC5zaGlwQ29sIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLnNoaXBDb2wgaW1nOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcbn1cXG5cXG4uc2hpcENvbDpudGgtY2hpbGQoMSkge1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuXFxuLnNoaXBDb2w6bnRoLWNoaWxkKDUpIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbn1cXG5cXG4uc2hpcENvbCBpbWcge1xcbiAgICB3aWR0aDogODAlO1xcbiAgICBoZWlnaHQ6IDgwJTtcXG4gICAgZmlsdGVyOiB2YXIoLS1maWx0ZXIpO1xcbn1cXG5cXG4uQUlTdGFnZSAuc2hpcENvbCBpbWcge1xcbiAgICBmaWx0ZXI6IHZhcigtLW9wcG9zaXRlLWZpbHRlcik7XFxufVxcblxcbi50b3BTZWN0aW9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMzMlO1xcbn1cXG5cXG4ubWlkU2VjdGlvbiB7XFxuICAgIGhlaWdodDogMzQlO1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAwLjlyZW07XFxuICAgIGNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uQUlTY29yZSAubWlkU2VjdGlvbiB7XFxuICAgIGNvbG9yOiB2YXIoLS1vcHBvc2l0ZS1jb2xvcik7XFxufVxcblxcbi5BSVN0YWdlIC5vcHRpb25zSG91c2luZyB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLmJvdFNlY3Rpb24ge1xcbiAgICBoZWlnaHQ6IDMzJTtcXG59XFxuXFxuLm9wdGlvbnNDb250YWluZXIuaW5HYW1lIHtcXG4gICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuLmluR2FtZSAub3B0aW9uc0hvdXNpbmcge1xcbiAgICBib3JkZXItYm90dG9tOiAwO1xcbiAgICBib3JkZXItcmlnaHQ6IDA7XFxuICAgIGJvcmRlci10b3A6IDA7XFxuICAgIGJvcmRlci1sZWZ0OiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuXFxuLyogLm9wdGlvbnNDb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggYmxhY2s7XFxufVxcbi5vcHRpb25zSG91c2luZyB7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn0gKi9cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTgwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxOTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTYwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICB0b3A6IC0yMHB4O1xcbiAgICAgICAgbGVmdDogLTUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICAgICAgd2lkdGg6IDM1MHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICByaWdodDogMDtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIH1cXG5cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDEwMHB4O1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgdG9wOiAtNTBweDtcXG4gICAgICAgIGxlZnQ6IC04MHB4O1xcbiAgICB9XFxuXFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgaGVpZ2h0OiA2MHZoO1xcbiAgICB9XFxuXFxuICAgIC5wMUdyaWRDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICB9XFxuXFxuICAgIC5ib2FyZCB7XFxuICAgICAgICBtYXJnaW4tdG9wOiBub25lO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICB9XFxuICAgIC5jZWxsIHtcXG4gICAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0b3A6IGF1dG87XFxuICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgYm90dG9tOiAtNTBweDtcXG4gICAgICAgIHJpZ2h0OiAtMTAwcHg7XFxuICAgICAgICB6LWluZGV4OiA1O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL2dhbWVwYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHNDQUFzQztJQUN0QywyQ0FBMkM7SUFDM0Msc0JBQXNCO0lBQ3RCLHlDQUF5QztJQUN6Qyw4Q0FBOEM7SUFDOUMscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxhQUFhOztJQUViLDhCQUE4QjtJQUM5Qjs7Ozs7Ozs7S0FRQztJQUNELGlCQUFpQjtJQUNqQix5Q0FBeUM7SUFDekMsMkNBQTJDO0lBQzNDLHlDQUF5QztJQUN6QywwQ0FBMEM7SUFDMUMsOEJBQThCO0lBQzlCLFVBQVU7QUFDZDtBQUNBO0lBQ0ksT0FBTzs7SUFFUCw2QkFBNkI7SUFDN0IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLGlDQUFpQztJQUNqQyx3Q0FBd0M7SUFDeEMseUNBQXlDO0FBQzdDOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsMkNBQTJDO0lBQzNDLFNBQVM7SUFDVCxVQUFVO0lBQ1YsWUFBWTtJQUNaLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2Qjs0QkFDd0I7SUFDeEIsZ0JBQWdCO0FBQ3BCOztBQUVBOzs7O0lBSUksZ0JBQWdC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U0FBUztRQUNULHFCQUFxQjtJQUN6QjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLFFBQVE7UUFDUixNQUFNO1FBQ04sc0JBQXNCO1FBQ3RCLHFCQUFxQjtJQUN6Qjs7SUFFQTs7Ozs7O1FBTUksK0NBQStDO0lBQ25EO0lBQ0E7O1FBRUksNEJBQTRCO0lBQ2hDO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7SUFDQTtRQUNJLFNBQVM7UUFDVCxtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0kscUJBQXFCO1FBQ3JCLFVBQVU7UUFDVixXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFdBQVc7SUFDZjtJQUNBO1FBQ0ksc0JBQXNCOztRQUV0QixnQkFBZ0I7UUFDaEIsWUFBWTtJQUNoQjs7SUFFQTtRQUNJLGFBQWE7UUFDYixPQUFPO1FBQ1AsVUFBVTtRQUNWLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGdCQUFnQjtRQUNoQixvQ0FBb0M7UUFDcEMsdUNBQXVDO0lBQzNDO0lBQ0E7UUFDSSxXQUFXO1FBQ1gsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksU0FBUztRQUNULFVBQVU7UUFDVixhQUFhO1FBQ2IsYUFBYTtRQUNiLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0k7UUFDSSxhQUFhO0lBQ2pCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgICAtLXRoZW1lLWNvbG9yOiBoc2xhKDEyMCwgMTAwJSwgNTAlLCAxKTtcXG4gICAgLS1sb3dBbHBoYS1jb2xvcjogaHNsYSgxMjAsIDEwMCUsIDUwJSwgMC41KTtcXG4gICAgLS1maWx0ZXI6IGh1ZS1yb3RhdGUoKTtcXG4gICAgLS1vcHBvc2l0ZS1jb2xvcjogaHNsYSgzMDAsIDEwMCUsIDUwJSwgMSk7XFxuICAgIC0tb3Bwb3NpdGUtbG93QWxwaGE6IGhzbGEoMzAwLCAxMDAlLCA1MCUsIDAuNSk7XFxuICAgIC0tb3Bwb3NpdGUtZmlsdGVyOiBodWUtcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbi5nYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucXVldWVDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgZmxleDogMS4zO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcblxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTQ0LCAxNDQsIDE0NCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE0MCwgMTQwLCAxNDAsIDEpIDExJSxcXG4gICAgICAgIHJnYmEoMTM2LCAxMzYsIDEzNiwgMSkgMjElLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSA2OSUsXFxuICAgICAgICByZ2JhKDEzOCwgMTM4LCAxMzgsIDEpIDg3JSxcXG4gICAgICAgIHJnYmEoMTY4LCAxNjgsIDE2OCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoODMsIDgzLCA4Myk7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCByZ2IoMTI2LCAxMjYsIDEyNik7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgcmdiKDE2MywgMTYzLCAxNjMpO1xcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2IoMTQ1LCAxNDUsIDE0NSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IDVweCBibGFjaztcXG4gICAgei1pbmRleDogMTtcXG59XFxuLnAxR3JpZENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDM7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucmFkYXJDb250YWluZXIge1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4ucmFkYXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuOSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDI2M3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm9yZGVyOiAxMHB4IHNvbGlkICM2ZDZkNmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggMTBweCAwICNjNWM1YzUsIGluc2V0IDAgMCA1MHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgIC01cHggLTVweCAyMHB4IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMiksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgaGVpZ2h0OiAxcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSB7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICB3aWR0aDogMTc1cHg7XFxuICAgIGhlaWdodDogMTc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNykge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tdGhlbWUtY29sb3IpIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xcbiAgICBhbmltYXRpb246IHJhZGFyIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxufVxcblxcbi5lbmVteVBpbmcwIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODclO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nMSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDkwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmVuZW15UGluZzIge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA4NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5lbmVteVBpbmczIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nNCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLmZyaWVuZGx5UGluZzAge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiA0MiU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5mcmllbmRseVBpbmcxIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ3JTtcXG4gICAgbGVmdDogNDUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZnJpZW5kbHlQaW5nMiB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1NSU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmZyaWVuZGx5UGluZzMge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA1NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5mcmllbmRseVBpbmc0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJhZGFyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvdyB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbi5idXR0b25Db250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoOTAsIDkwLCA5MCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4ubGVmdEJ1dHRvbkNvbnRhaW5lcixcXG4ubWlkZGxlQnV0dG9uQ29udGFpbmVyLFxcbi5yaWdodEJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig4MywgODMsIDgzKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgYmFja2dyb3VuZDogI2NhY2FjYTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI3dm1pbjtcXG4gICAgYm94LXNoYWRvdzogMCA2dm1pbiAwLjE1dm1pbiAwdm1pbiByZ2IoOTIsIDkyLCA5MiksXFxuICAgICAgICAwIDR2bWluIDAuMTV2bWluIDB2bWluIHJnYig5MiwgOTIsIDkyKSxcXG4gICAgICAgIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gcmdiKDkyLCA5MiwgOTIpLFxcbiAgICAgICAgMjBweCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC43MjYpLFxcbiAgICAgICAgODBweCAxNjBweCAxMDBweCByZ2JhKDAsIDAsIDAsIDAuNTA3KTtcXG4gICAgcGFkZGluZzogMHZtaW4gMnZtaW4gMnZtaW4gMnZtaW47XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSByb3RhdGVaKDBkZWcpO1xcbiAgICBtYXJnaW4tdG9wOiAtNC41dm1pbjtcXG4gICAgaGVpZ2h0OiA5MCU7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNkNjA1MDU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgd2lkdGg6IDIwdm1pbjtcXG4gICAgaGVpZ2h0OiAxOXZtaW47XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwIDR2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMi41dm1pbjtcXG4gICAgYm9yZGVyOiAwLjV2bWluIHNvbGlkICNhZjAwMDBhMTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZTpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgM3ZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0xLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGU6YWN0aXZlLFxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAwLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAyMHB4IDEwcHggI2ZmM2MzYywgMCAwIDEwMHB4IDUwcHggI2ZmMjgyODtcXG4gICAgYmFja2dyb3VuZDogI2ZmMDAwMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwMDAwMDAyMDtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBzY2FsZTogMC4zO1xcbn1cXG4ucmlnaHRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDE4NywgMTg2LCAxODYpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMTkwLCAxOTAsIDE5MCk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEyMiwgMTIyLCAxMjIpO1xcbn1cXG4ubWlkZGxlQnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxODIsIDE4MiwgMTgyKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDE4MCwgMTgwLCAxODApO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDgwLCA4MCwgODApO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG59XFxuLmxlZnRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDE4NCwgMTg0LCAxODQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMTgyLCAxODEsIDE4MSk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoOTAsIDkwLCA5MCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDExOSwgMTE4LCAxMTgpO1xcbn1cXG5cXG4uYnV0dG9uVGV4dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZDZkNmQ7XFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggYmxhY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbiAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDFweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG5cXG4ubWlkZGxlQnV0dG9uIC5idXR0b25UZXh0IHtcXG4gICAgcGFkZGluZzogMXJlbSAxLjFyZW07XFxufVxcblxcbi5wMVNoaXBTdGFnZSB7XFxuICAgIGZsZXg6IDU7XFxuICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCByZ2IoMTU4LCAxNTgsIDE1OCk7XFxuICAgIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHJnYigxOTksIDE5OCwgMTk4KTtcXG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkIHJnYig2OCwgNjgsIDY4KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBDb250YWluZXIge1xcbiAgICBmbGV4OiAxO1xcblxcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMjQzLCAyNDMsIDI0Myk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoNTgsIDU4LCA1OCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDgwLCA3OSwgNzkpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDUwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2hpcFF1ZXVlIHtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgZmxleDogMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxOCU7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZpbHRlcjogYmx1cig1cHgpO1xcbn1cXG4ubmV4dFNoaXBDb250YWluZXIge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGhlaWdodDogOTAlO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcbi5oaWRlTmV4dCB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5uZXh0U2hpcENvbnRhaW5lcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHZhcigtLXRoZW1lLWNvbG9yKSwgaW5zZXQgMCAwIDEwcHggdmFyKC0tdGhlbWUtY29sb3IpO1xcbn1cXG5cXG4ubmV4dFNoaXA6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi5uZXh0U2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkNhcnJpZXJDb250YWluZXIsXFxuLkJhdHRsZXNoaXBDb250YWluZXIsXFxuLkRlc3Ryb3llckNvbnRhaW5lcixcXG4uU3VibWFyaW5lQ29udGFpbmVyLFxcbi5QYXRyb2wtQm9hdENvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNDYXJyaWVyT3ZlcmxheSxcXG4jQmF0dGxlc2hpcE92ZXJsYXksXFxuI0Rlc3Ryb3llck92ZXJsYXksXFxuI1N1Ym1hcmluZU92ZXJsYXksXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheSB7XFxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XFxuICAgIGZpbHRlcjogdmFyKC0tZmlsdGVyKTtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgI0NhcnJpZXJPdmVybGF5LFxcbi5BSUJvYXJkQ29udGFpbmVyICNCYXR0bGVzaGlwT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjRGVzdHJveWVyT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjU3VibWFyaW5lT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjUGF0cm9sLUJvYXRPdmVybGF5IHtcXG4gICAgZmlsdGVyOiB2YXIoLS1vcHBvc2l0ZS1maWx0ZXIpO1xcbn1cXG5cXG4jQ2FycmllcixcXG4jQmF0dGxlc2hpcCxcXG4jRGVzdHJveWVyLFxcbiNTdWJtYXJpbmUsXFxuI1BhdHJvbC1Cb2F0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5zaGlwT3ZlcmxheVB1bHNlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIGFuaW1hdGlvbjogcHVsc2UgMC43cyBlYXNlLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyBwdWxzZSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgICAgICAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgfVxcblxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAgICAgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgICAgICAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgfVxcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIC8qIGFuaW1hdGlvbjogcm90YXRlIDAuNHMgZWFzZS1pbi1vdXQ7ICovXFxufVxcblxcbi8qIC5zaGlwT3ZlcmxheS5ob3Jpem9udGFsIHtcXG4gICAgYW5pbWF0aW9uOiByb3RhdGUxIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1LjUpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNSkgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZTEge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNikgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG59ICovXFxuXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSgzKTtcXG59XFxuXFxuLnNoaXBUaWxlIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc2hpcC5ob3Jpem9udGFsIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmdhbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmJvYXJkQm9yZGVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3JkZXItYm90dG9tOiAxNXB4IHNvbGlkIHJnYigxMTYsIDExNiwgMTE2KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAyMHB4IHNvbGlkIHJnYigxMzgsIDEzNywgMTM3KTtcXG4gICAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCByZ2IoMTE3LCAxMTcsIDExNyk7XFxuICAgIGJvcmRlci1sZWZ0OiAyMHB4IHNvbGlkIHJnYigxMDIsIDEwMiwgMTAyKTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IGJsYWNrO1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJvcmRlci1ib3R0b206IDE1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItcmlnaHQ6IDIwcHggc29saWQgcmdiKDE4MiwgMTgyLCAxODIpO1xcbiAgICBib3JkZXItdG9wOiAyMHB4IHNvbGlkIHJnYig1MywgNTMsIDUzKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDIwcHggc29saWQgcmdiKDc1LCA3NSwgNzUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ucGxheWVyQm9hcmRDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG4uQUlCb2FyZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyIC5ib2FyZCB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5zaGFkb3dHcmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZyxcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZyxcXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXA6aG92ZXIsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwOmhvdmVyLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwOmhvdmVyLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXA6aG92ZXIge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi50aWxlIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5jZWxsLmhpdCB7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHJlZDtcXG59XFxuXFxuLmNlbGwubWlzcyB7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIGdyZWVuO1xcbn1cXG5cXG4uY2VsbDpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLkFJQm9hcmRDb250YWluZXIgLmNlbGw6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyIC5jZWxsLmhpdCB7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIGdyZWVuO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbC5taXNzIHtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgcmVkO1xcbn1cXG5cXG4uY2VsbC5oaXQucHVsc2Uge1xcbiAgICBhbmltYXRpb246IHB1bHNlMiAwLjdzIGVhc2Utb3V0O1xcbn1cXG5cXG4uY2VsbC5taXNzLnB1bHNlIHtcXG4gICAgYW5pbWF0aW9uOiBwdWxzZTIgMC43cyBlYXNlLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyBwdWxzZTIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxuXFxuICAgIDkwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbi5jZWxsW2RhdGEtY29sPVxcXCIwXFxcIl0ge1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmNlbGxbZGF0YS1jb2w9XFxcIjlcXFwiXSB7XFxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuLmNlbGxbZGF0YS1yb3c9XFxcIjBcXFwiXSB7XFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxufVxcbi5jZWxsW2RhdGEtcm93PVxcXCI5XFxcIl0ge1xcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNTdWJtYXJpbmUgaW1nLmhvcml6b250YWwge1xcbiAgICBsZWZ0OiAtNSU7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG59XFxuXFxuLmJvYXJkU2hpcCB7XFxuICAgIHotaW5kZXg6IDk7XFxufVxcblxcbi5ib2FyZFNoaXAgaW1nIHtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg4LCA2KTtcXG4gICAgbGVmdDogMzMlO1xcbiAgICB0b3A6IDQ4JTtcXG59XFxuXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LjUsIDUpO1xcbiAgICBsZWZ0OiAxOCU7XFxuICAgIHRvcDogNDclO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0b3A6IDQ2JTtcXG4gICAgbGVmdDogMjQlO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNiwgOCk7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiAtMyU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi42LCAyKTtcXG4gICAgdG9wOiA4JTtcXG4gICAgbGVmdDogMzIlO1xcbn1cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMiwgMik7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjMsIDIuNSk7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyLjYpO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogMTclO1xcbn1cXG5cXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdG9wOiAxNSU7XFxufVxcbi50aWxlLm9uQm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uZHJhZ2dlZE92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmludmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLm9wdGlvbnNDb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggYmxhY2s7XFxufVxcbi5vcHRpb25zSG91c2luZyB7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uaHVlU2xpZGVyIHtcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMjVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS10aGVtZS1jb2xvciksIDAgMCA1cHggdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjJzO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XFxufVxcblxcbi5odWVTbGlkZXI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaHVlU2xpZGVyOjotd2Via2l0LXNsaWRlci10aHVtYiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDFweCkgaHVlLXJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4uc2xpZGVyOjotbW96LXJhbmdlLXRodW1iIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDFweCkgaHVlLXJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4jdmlkZW9CdG4ge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIHdpZHRoOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA0cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDFweCk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jdmlkZW9CdG46aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jdmlkZW9CdG4ucGF1c2U6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogNXB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuXFxuI3ZpZGVvQnRuLnBhdXNlOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogNXB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuXFxuI3ZpZGVvQnRuLnBsYXk6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWxlZnQ6IDE1cHggc29saWQgdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAtM3B4O1xcbn1cXG5cXG4uc2hpcEZvb3RlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5zdGFnZVBhcmEge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMi41cyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQyIDFzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0MiB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICB9XFxufVxcblxcbi53YXZlc0FsdCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcblxcbiAgICB0b3A6IC0xMDBweDtcXG59XFxuXFxuLndhdmVzQWx0LmFuaW1hdGUge1xcbiAgICBhbmltYXRpb246IHdhdmUgMTBzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcbn1cXG4uc2hpcEJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxOTQsIDE5NCwgMTk0LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAtNDAwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG4uc2hpcEJvd1dvb2Qge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTE5LCA1NywgMCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NCwgNzksIDAsIDEpIDQ2JSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMTAwJVxcbiAgICApO1xcblxcbiAgICB0b3A6IC02NDBweDtcXG4gICAgbGVmdDogMTYwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEsXFxuLmZsYWtCYXJyZWwyLFxcbi5mbGFrQmFycmVsMyxcXG4uZmxha0JhcnJlbDQsXFxuLmZsYWtCYXJyZWw1LFxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsMiB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWwzIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDQge1xcbiAgICB0b3A6IC05MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWw1IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG5cXG4uZmxha0NvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IDE1MHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMjAwcHg7XFxufVxcbi5mbGFrQ292ZXJUb3Age1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMTU4KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNTgsIDE1OCwgMTU4LCAxKSAxJSxcXG4gICAgICAgIHJnYmEoMTEzLCAxMTMsIDExMywgMSkgNDclLFxcbiAgICAgICAgcmdiYSgxMTIsIDExMiwgMTEyLCAxKSA5OSVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAxMDBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbkBrZXlmcmFtZXMgd2F2ZSB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNSUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcbi5BSVN0YWdlIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG59XFxuXFxuLnBsYXllclN0YWdlIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG59XFxuXFxuLnBsYXllclN0YWdlIC5zaGlwRm9vdGVyIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLkFJU2NvcmVDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDcwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnBsYXllclNjb3JlQ29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiA3MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5zY29yZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDQwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBwYWRkaW5nOiAwLjhyZW07XFxufVxcbi5zY29yZUNvbnRhaW5lci5BSVNjb3JlIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDQwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uc2hpcENvbCB7XFxuICAgIHdpZHRoOiAyMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkFJU3RhZ2UgLnNoaXBDb2wge1xcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uc2hpcENvbCBpbWc6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxufVxcblxcbi5zaGlwQ29sOm50aC1jaGlsZCgxKSB7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG5cXG4uc2hpcENvbDpudGgtY2hpbGQoNSkge1xcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxufVxcblxcbi5zaGlwQ29sIGltZyB7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBmaWx0ZXI6IHZhcigtLWZpbHRlcik7XFxufVxcblxcbi5BSVN0YWdlIC5zaGlwQ29sIGltZyB7XFxuICAgIGZpbHRlcjogdmFyKC0tb3Bwb3NpdGUtZmlsdGVyKTtcXG59XFxuXFxuLnRvcFNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAzMyU7XFxufVxcblxcbi5taWRTZWN0aW9uIHtcXG4gICAgaGVpZ2h0OiAzNCU7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBmb250LXNpemU6IDAuOXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5BSVNjb3JlIC5taWRTZWN0aW9uIHtcXG4gICAgY29sb3I6IHZhcigtLW9wcG9zaXRlLWNvbG9yKTtcXG59XFxuXFxuLkFJU3RhZ2UgLm9wdGlvbnNIb3VzaW5nIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uYm90U2VjdGlvbiB7XFxuICAgIGhlaWdodDogMzMlO1xcbn1cXG5cXG4ub3B0aW9uc0NvbnRhaW5lci5pbkdhbWUge1xcbiAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG4uaW5HYW1lIC5vcHRpb25zSG91c2luZyB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7XFxuICAgIGJvcmRlci1yaWdodDogMDtcXG4gICAgYm9yZGVyLXRvcDogMDtcXG4gICAgYm9yZGVyLWxlZnQ6IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG5cXG4vKiAub3B0aW9uc0NvbnRhaW5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCBibGFjaztcXG59XFxuLm9wdGlvbnNIb3VzaW5nIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufSAqL1xcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxODAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDE5MHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIHRvcDogLTIwcHg7XFxuICAgICAgICBsZWZ0OiAtNTBweDtcXG4gICAgICAgIGhlaWdodDogMzAwcHg7XFxuICAgICAgICB3aWR0aDogMzUwcHg7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTU1MHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTAwcHgpIHtcXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIHJpZ2h0OiAwO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcXG4gICAgfVxcblxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4KTtcXG4gICAgfVxcbiAgICAuc2hpcEJvd1dvb2Qge1xcbiAgICAgICAgbGVmdDogMTAwcHg7XFxuICAgIH1cXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMik7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDk1MHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgICAgICB0b3A6IC01MHB4O1xcbiAgICAgICAgbGVmdDogLTgwcHg7XFxuICAgIH1cXG5cXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBoZWlnaHQ6IDYwdmg7XFxuICAgIH1cXG5cXG4gICAgLnAxR3JpZENvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleDogMTtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgIH1cXG5cXG4gICAgLmJvYXJkIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IG5vbmU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgIH1cXG4gICAgLmNlbGwge1xcbiAgICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIH1cXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRvcDogYXV0bztcXG4gICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICBib3R0b206IC01MHB4O1xcbiAgICAgICAgcmlnaHQ6IC0xMDBweDtcXG4gICAgICAgIHotaW5kZXg6IDU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0JsYWNrT3BzT25lLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaG9tZXNjcmVlbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR5cGluZyB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldCB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2VDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5zbW9rZSB7XFxuICAgICAgICBsZWZ0OiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxuICAgIC5zbW9rZUNvbnRhaW5lciB7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG5cXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlRXZlbiAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNtb2tlOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlT2RkIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDEpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgyKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg0KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4ycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg1KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS42cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoOCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuOHM7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLDRDQUEyQztBQUMvQztBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLDRDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixVQUFVO0lBQ1YsU0FBUztJQUNULHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDZCQUE2QjtJQUM3QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLDZCQUE2QjtJQUM3Qix5REFBd0Q7SUFDeEQsc0JBQXNCO0lBQ3RCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQjs7Z0RBRTRDO0FBQ2hEOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix3RUFBd0U7SUFDeEUsZUFBZTtJQUNmLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSTtRQUNJLFFBQVE7SUFDWjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0o7O0FBRUE7SUFDSTs7UUFFSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGtCQUFrQjtJQUN0QjtBQUNKOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxTQUFTO0lBQ1QsMkJBQTJCO0lBQzNCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxTQUFTO0lBQ2I7O0lBRUE7UUFDSSxlQUFlO1FBQ2YsbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO1FBQ2YsbUJBQW1CO0lBQ3ZCO0lBQ0E7UUFDSSxpQkFBaUI7SUFDckI7QUFDSjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQztBQUNBO0lBQ0ksMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDRDQUE0QztRQUM1QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLG1DQUFtQztRQUNuQyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSSw2Q0FBNkM7UUFDN0MsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtBQUNKOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvQmxhY2tPcHNPbmUudHRmXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlxcXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vYXNzZXRzL2ltYWdlcy9ob21lc2NyZWVuLmpwZ1xcXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5ob21lSGVhZGVyIHtcXG4gICAgbWFyZ2luOiA0cmVtIDA7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogN3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDFweCA1cHggMXB4ICNhOGE4YTgsIDFweCA2cHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggN3B4IDFweCAjYThhOGE4LCAxcHggOHB4IDFweCAjYThhOGE4O1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5uZXdHYW1lIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xODUpO1xcbn1cXG5cXG4ubmV3R2FtZTpob3ZlciB7XFxuICAgIGNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuQGtleWZyYW1lcyB0eXBpbmcge1xcbiAgICBmcm9tIHtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IGdyZXk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDQwJTtcXG4gICAgbGVmdDogNjUlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuc21va2Uge1xcbiAgICAgICAgbGVmdDogNzUlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xcbiAgICAuc21va2VDb250YWluZXIge1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxuXFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICB3aWR0aDogODBweDtcXG4gICAgaGVpZ2h0OiA4MHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMjYyNjI2O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZChldmVuKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZUV2ZW4gMy41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQob2RkKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZU9kZCAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCg5KSB7XFxuICAgIGFuaW1hdGlvbjogbm9uZTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGVFdmVuIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MDBweCkgc2NhbGUoMyk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZU9kZCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHNjYWxlKDEpO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCgxKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuOHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuNnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDcpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjRzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDgpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjhzO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9LYWxhbS1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcblxcbi5tYXAge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBhbmltYXRpb246IHVuYmx1ciAwLjVzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgdW5ibHVyIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDApO1xcbiAgICB9XFxufVxcbi5yZWRQaW4xIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQxJTtcXG4gICAgbGVmdDogNjMlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLnJlZFBpbjIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTklO1xcbiAgICBsZWZ0OiA1NyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgxJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcblxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5ub3RlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDI1MHB4O1xcbiAgICBoZWlnaHQ6IDI1MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNjAlO1xcbiAgICBsZWZ0OiAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBmbHkgMC4xcyBsaW5lYXI7XFxufVxcbi5wYXJhQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG4gICAgdHJhbnNmb3JtOiBza2V3KC0yZGVnLCAtMmRlZyk7XFxufVxcblxcbi5zdGlja3lOb3RlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC04MHB4O1xcbiAgICBsZWZ0OiAtNzBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZseSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTcwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjElO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMiU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIzJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjIlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgxJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjQlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY1JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODclO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU4JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDkwJTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL21hcHBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRDQUE2QztBQUNqRDs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHlEQUFpRDtJQUNqRCxzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCx3QkFBd0I7SUFDeEIsMEJBQTBCO0FBQzlCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULGtCQUFrQjtJQUNsQiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJO1FBQ0ksMkJBQTJCO0lBQy9CO0lBQ0E7SUFDQTtBQUNKOztBQUVBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL0thbGFtLVJlZ3VsYXIudHRmXFxcIik7XFxufVxcblxcbi5tYXAge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL21hcC5qcGdcXFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBhbmltYXRpb246IHVuYmx1ciAwLjVzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgdW5ibHVyIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDApO1xcbiAgICB9XFxufVxcbi5yZWRQaW4xIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQxJTtcXG4gICAgbGVmdDogNjMlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLnJlZFBpbjIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTklO1xcbiAgICBsZWZ0OiA1NyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgxJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcblxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5ub3RlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDI1MHB4O1xcbiAgICBoZWlnaHQ6IDI1MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNjAlO1xcbiAgICBsZWZ0OiAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBmbHkgMC4xcyBsaW5lYXI7XFxufVxcbi5wYXJhQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG4gICAgdHJhbnNmb3JtOiBza2V3KC0yZGVnLCAtMmRlZyk7XFxufVxcblxcbi5zdGlja3lOb3RlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC04MHB4O1xcbiAgICBsZWZ0OiAtNzBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZseSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTcwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjElO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMiU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIzJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjIlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgxJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjQlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY1JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODclO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU4JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDkwJTtcXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG59XFxuXFxuLm5ld0dhbWVDb250YWluZXIgcCB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbi5uYW1lRm9ybSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMTBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBhZGRpbmc6IDFyZW0gMXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGNhcmV0LWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogM3B4IDNweCA1cHggI2E4YThhODtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6Zm9jdXMge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiByZ2IoNzEsIDcxLCA3MSk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5oaWRlIHtcXG4gICAgYW5pbWF0aW9uOiBidXJuIDFzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgYnVybiB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5uYW1lRm9ybSBpbnB1dCB7XFxuICAgICAgICB3aWR0aDogODAlO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbmFtZXBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFDdEIsd0VBQXdFO0FBQzVFOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsK0JBQStCO0lBQy9CLG1CQUFtQjtJQUNuQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsZUFBZTtJQUNmLFlBQVk7SUFDWiw2QkFBNkI7SUFDN0Isc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0k7SUFDQTtJQUNBO1FBQ0ksVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFVBQVU7SUFDZDtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgcGFkZGluZzogMXJlbSAxcmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgY2FyZXQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDVweCAjYThhOGE4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogM3B4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDpmb2N1cyB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6IHJnYig3MSwgNzEsIDcxKTtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyBidXJuIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgICAgIHdpZHRoOiA4MCU7XFxuICAgIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZXBhZ2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWVwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZXBhZ2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21hcHBhZ2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYXBwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYW1lcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25hbWVwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vc2NyaXB0cy9nYW1lQ29tcG9uZW50cy9HYW1lLmpzXCI7XG5pbXBvcnQgVmlld01vZGVsIGZyb20gXCIuL3NjcmlwdHMvVmlld01vZGVsXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvQXBwLmpzXCI7XG5cbmNvbnN0IG1vZGVsID0gbmV3IEdhbWUoKTtcblxuY29uc3Qgdmlld01vZGVsID0gbmV3IFZpZXdNb2RlbChtb2RlbCk7XG5cbmNvbnN0IHZpZXcgPSBuZXcgQXBwKHZpZXdNb2RlbCwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIikpO1xuIl0sIm5hbWVzIjpbIlB1YlN1YkludGVyZmFjZSIsImNvbnN0cnVjdG9yIiwidmlld01vZGVsIiwiZWxlbWVudCIsIm9uSW5pdCIsInJlZ2lzdGVyIiwic2hvdWxkVXBkYXRlIiwib2xkTW9kZWwiLCJuZXdNb2RlbCIsImdldEVsZW1lbnQiLCJWaWV3TW9kZWwiLCJtb2RlbCIsInB1YnN1YnMiLCJwdWJzdWIiLCJwdXNoIiwicmVwbGFjZUNoaWxkcmVuIiwicmVuZGVyIiwidXBkYXRlTW9kZWwiLCJtb2RlbFVwZGF0ZUZ1bmMiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJrZXkiLCJQbGF5ZXIiLCJwbGFjZVNoaXBSYW5kb21seSIsIkFJIiwibmFtZSIsImRpZmZpY3VsdHkiLCJhdXRvRmlsbEJvYXJkIiwic2hpcFF1ZXVlIiwibGVuZ3RoIiwic2hpcCIsInNoaWZ0IiwibmV3R2FtZWJvYXJkIiwibmV3U2hpcCIsImdhbWVib2FyZCIsInNoaXBzIiwiR2FtZSIsInBsYXllciIsImN1cnJlbnRUdXJuIiwiY3VycmVudFBhZ2UiLCJuYW1lUGFnZUlzT3BlbiIsInN0YXRlTWVzc2FnZSIsImdhbWVTdGF0ZSIsImFsbFNoaXBzUGxhY2VkIiwiZHJvcFF1ZXVlIiwidmlkZW9QbGF5aW5nIiwibGFzdENsaWNrZWQiLCJpc1ZhbGlkUGxhY2VtZW50Iiwicm93IiwiY29sIiwiaXNIb3Jpem9udGFsIiwic2l6ZSIsImkiLCJib2FyZCIsInBsYWNlU2hpcCIsInRpbGVzIiwiY29uc29sZSIsIndhcm4iLCJNYXRoIiwicmFuZG9tIiwicmFuZFJvdyIsImZsb29yIiwicmFuZENvbCIsImlzVmFsaWQiLCJjaGVja0FsbFNoaXBzUGxhY2VkIiwicmVzZXRCb2FyZCIsInRpbGVTdGF0dXMiLCJyZXNldFNoaXBzIiwiYXR0YWNrIiwidGlsZSIsImdldFNoaXAiLCJoaXRzIiwiY2hlY2tTaGlwU3VuayIsInN1bmsiLCJjaGVja0FsbFNoaXBzU3VuayIsInNoaXBMaXN0IiwiY1JvdyIsImNDb2wiLCJyYW5kb21JbmRleCIsIkFJTW92ZUVhc3kiLCJwbGF5ZXJHYW1lYm9hcmQiLCJyYW5kVGlsZSIsIkFJTW92ZU1lZGl1bSIsInVuYXR0YWNrZWRUaWxlcyIsImF0dGFja2VkVGlsZXMiLCJ1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMiLCJoaXRUaWxlcyIsImFkamFjZW50VW5hdHRhY2tlZFRpbGVzIiwiU2V0IiwiYWRqYWNlbnRUaWxlcyIsImdldEFkamFjZW50VGlsZXMiLCJmb3JFYWNoIiwiYWRqVGlsZSIsImFkZCIsInRhcmdldFRpbGUiLCJsb2ciLCJwb3AiLCJnZXRUaWxlc0JldHdlZW4iLCJ0aWxlMSIsInRpbGUyIiwidGlsZXNCZXR3ZWVuIiwic3RhcnRDb2wiLCJtaW4iLCJlbmRDb2wiLCJtYXgiLCJzdGFydFJvdyIsImVuZFJvdyIsIkFJTW92ZUhhcmQiLCJoaXRTaGlwIiwiYXR0YWNrUmVzdWx0Iiwic2hpcFN1bmsiLCJjbGVhciIsIlRpbGUiLCJHYW1lYm9hcmQiLCJTaGlwIiwiSG9tZVBhZ2UiLCJNYXBQYWdlIiwiR2FtZVBhZ2UiLCJlbGVtIiwiQXBwIiwiYXBwRWxlbWVudCIsInByb3AiLCJpZCIsImNvbnRlbnQiLCJ2ZXJzaW9uIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJjbGFzc05hbWUiLCJIVE1MIiwiaW5uZXJIVE1MIiwic3JjIiwiZm9ySSIsImZvciIsInR5cGUiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwic3BlbGxjaGVjayIsInJlcXVpcmVkIiwiY2hlY2tlZCIsImhyZWYiLCJhdXRvcGxheSIsIm11dGVkIiwibG9vcCIsImRyYWdnYWJsZSIsInN0ZXAiLCJjaGlsZHJlbiIsImNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJBSUJvYXJkRWxlbSIsImRyYWdFbnRlciIsImJvYXJkU2l6ZSIsImJ1aWxkQm9hcmQiLCJzaGFkb3dHcmlkIiwiY2VsbHMiLCJjZWxsIiwidGlsZVJlZiIsImRhdGFzZXQiLCJzZXRUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJib3VuZCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImNsYXNzTGlzdCIsImluZGV4Iiwic2hpcEVsZW0iLCJjbGlja2VkSW5kZXgiLCJiYXNlVGlsZSIsImVuZFRpbGUiLCJzdHlsZSIsImdyaWRBcmVhIiwiYm9hcmRCb3JkZXIiLCJBSWdhbWVib2FyZCIsImF0dFJlc3BvbnNlIiwiY2xpY2tlZFRpbGUiLCJvbGRNb2RlbDEiLCJnZXRDZWxsIiwiQnV0dG9uIiwiYnVpbGRTdGFydEJ1dHRvbiIsImJ1aWxkUm90YXRlQnV0dG9uIiwiYnVpbGRBdXRvUGxhY2VCdXR0b24iLCJidWlsZFVuZG9CdXR0b24iLCJyb3RhdGVCdXR0b24iLCJidXR0b25Ib3VzaW5nIiwiYXV0b1BsYWNlQnV0dG9uIiwiYWxsUGxhY2VkIiwiYXV0b1BsYWNlSG91c2luZyIsInVuZG9CdXR0b24iLCJ1bmRvQnV0dG9uSG91c2luZyIsInN0YXJ0QnV0dG9uIiwic3RhcnRCdXR0b25Ib3VzaW5nIiwiR2FtZU1lc3NhZ2UiLCJ3YXZlc0FsdCIsIlNoaXBRdWV1ZSIsInBsYXllckJvYXJkRWxlbSIsIlJhZGFyIiwiT3B0aW9uc01lbnUiLCJTY29yZUNvbnRhaW5lciIsImJ1aWxkUGxhY2VTaGlwc1N0YWdlIiwiYnVpbGRJbkdhbWVTdGFnZSIsInNoaXBDb250YWluZXIiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcEluZGV4IiwibWVzc2FnZUNvbnRhaW5lciIsImdhbWUiLCJyYWRhckNvbnRhaW5lciIsImxlZnRCdXR0b25Db250YWluZXIiLCJtaWRkbGVCdXR0b25Db250YWluZXIiLCJyaWdodEJ1dHRvbkNvbnRhaW5lciIsImJ1dHRvbkNvbnRhaW5lciIsIm9wdGlvbnNDb250YWluZXIiLCJ3YXZlcyIsImdhbWVDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsIkFJQm9hcmRDb250YWluZXIiLCJwbGF5ZXJTY29yZUNvbnRhaW5lciIsIkFJU2NvcmVDb250YWluZXIiLCJwbGF5ZXJTdGFnZSIsIkFJU3RhZ2UiLCJidWlsZE9wdGlvbnMiLCJ2aWRlb0J0biIsInZpZGVvQnRuQ2xhc3MiLCJodWVTbGlkZXIiLCJzbGlkZXJWYWx1ZSIsInBhcnNlSW50IiwidGFyZ2V0Iiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJzdGFydGluZ0h1ZSIsImh1ZVJvdGF0aW9uIiwidGhlbWVDb2xvciIsImxvd0FscGhhQ29sb3IiLCJvcHBvc2l0ZVJvdGF0aW9uIiwib3Bwb3NpdGVUaGVtZSIsIm9wcG9zaXRlTG93QWxwaGFUaGVtZSIsIm9wcG9zaXRlSHVlUm90YXRlIiwic2V0UHJvcGVydHkiLCJzbGlkZUNvbnRhaW5lciIsIm9wdGlvbnNIb3VzaW5nIiwiYnVpbGRSYWRhciIsInJhZGFyIiwiZW5lbWllcyIsImZyaWVuZGx5IiwiY2FycmllclNyYyIsImJhdHRsZXNoaXBTcmMiLCJkZXN0cm95ZXJTcmMiLCJzdWJtYXJpbmVTcmMiLCJwYXRyb2xCb2F0U3JjIiwiYnVpbGRTY29yZUNvbnRhaW5lciIsInNjb3JlQ29udGFpbmVyIiwidG9wIiwibWlkIiwiYm90Iiwic2hpcEljb24iLCJzY29yZSIsInNoaXBDb2wiLCJjbGlja2VkRXZlbnQiLCJzaGlwTW9kZWwiLCJzaGlwUHVsc2UiLCJjcmVhdGUiLCJzaGlwU3JjIiwic2hpcENsYXNzIiwiYm9hdCIsInNoaXBPdmVybGF5Iiwib3ZlcmxheSIsIm92ZXJsYXlDbGFzcyIsImhhbmRsZURyYWdTdGFydCIsImhhbmRsZURyYWdFbmQiLCJ3aWR0aCIsImhlaWdodCIsInByZXZlbnREZWZhdWx0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImJ1aWxkUXVldWUiLCJzdGFnZSIsIm5leHQiLCJxdWV1ZSIsImluY2x1ZGVzIiwicHJlcGVuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyb3AiLCJoYW5kbGVEcmFnT3ZlciIsImhhbmRsZURyYWdMZWF2ZSIsImRyYWdnZWRTaGlwIiwiYmFzZUNvb3JkcyIsImdldEJhc2VUaWxlIiwiYmFzZVJvdyIsImJhc2VDb2wiLCJyb3dPZmZzZXQiLCJjb2xPZmZzZXQiLCJOdW1iZXIiLCJvZmZzZXRSb3ciLCJvZmZzZXRDb2wiLCJIb21lUGFnZUlucHV0IiwiaG9tZXBhZ2VDb250YWluZXIiLCJuZXdHYW1lIiwibmV3R2FtZUJ0biIsImJ1aWxkRm9ybSIsImdyZWV0aW5nIiwiaW5wdXRGaWVsZCIsImJ1dHRvbiIsIm5hbWVGaWVsZCIsImZvcm1Db250YWluZXIiLCJyZWRQaW5TcmMiLCJzdGlja3lOb3RlU3JjIiwicmVkUGlucyIsInBpbiIsIm1hcCIsIm5vdGUiLCJidWlsZE5vdGUiLCJub3RlT3B0aW9ucyIsIm5vdGUxIiwibG9jYXRpb24iLCJwYXJhIiwibm90ZTIiLCJub3RlMyIsInNlbGVjdGVkT3B0aW9ucyIsInZpZXciXSwic291cmNlUm9vdCI6IiJ9