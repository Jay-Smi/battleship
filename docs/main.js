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
    this.newGameState = null;
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
  let ship = null;
  if (tile.ship !== null) {
    tile.tileStatus = "hit";
    ship = getShip(row, col, gameboard);
    ship.hits++;
    if (checkShipSunk(ship)) {
      ship.sunk = true;
    }
  } else {
    tile.tileStatus = "miss";
  }
  return {
    tileStatus: tile.tileStatus,
    ship
  };
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
    const attackResponse = attack(randRow, randCol, playerGameboard);
    return {
      row: randRow,
      col: randCol,
      attackResponse
    };
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
  adjacentUnattackedTiles.forEach(tile => {
    unattackedBacktrackTiles.push(tile);
  });
  let targetTile;
  if (unattackedBacktrackTiles.length > 0) {
    targetTile = unattackedBacktrackTiles.pop();
  } else {
    // target a new random tile

    const randomIndex = Math.floor(Math.random() * unattackedTiles.length);
    targetTile = unattackedTiles[randomIndex];
  }
  const attackResponse = attack(targetTile.row, targetTile.col, playerGameboard);
  return {
    row: targetTile.row,
    col: targetTile.col,
    attackResponse
  };
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

  // add adjacent unattacked tiles to backtrack list
  adjacentUnattackedTiles.forEach(tile => {
    unattackedBacktrackTiles.push(tile);
  });
  let targetTile;
  let hitShip = null;
  if (unattackedBacktrackTiles.length > 0) {
    targetTile = unattackedBacktrackTiles.pop();
    const adjacentTiles = getAdjacentTiles(playerGameboard, targetTile);
    adjacentTiles.forEach(adjTile => {
      if (playerGameboard.board[adjTile.row][adjTile.col].tileStatus === "hit" && hitShip === null) {
        hitShip = playerGameboard.board[adjTile.row][adjTile.col].ship;
      }
    });
  } else {
    // target a new random tile

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
  return attackResult;
}


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
/* harmony export */   "default": () => (/* binding */ elem)
/* harmony export */ });
function elem(content) {
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
}

// export default function elem(content) {
//     const el = document.createElement(content.prop);
//     Object.entries(content).forEach(([key, value]) => {
//         if (key === "children") {
//             if (value && value.length > 0) {
//                 value.forEach((child) => el.appendChild(elem(child)));
//             }
//         } else if (value) {
//             el[key] = value;
//         }
//     });
//     return el;
// }

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
      if (attResponse.tileStatus === "hit") {
        newModel.stateMessage = "Direct hit sir!";
      }
      if (attResponse.tileStatus === "miss") {
        newModel.stateMessage = "Nothing there sir!";
      }
      let enemyDelay = 1500;
      if (attResponse.ship) {
        if (attResponse.ship.sunk) {
          newModel.stateMessage = `We've sunk their ${attResponse.ship.name}`;
          enemyDelay = 2500;
        }
      }
      const clickedTile = AIgameboard.board[row][col];
      if ((0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.checkAllShipsSunk)(AIgameboard.ships)) {
        newModel.gameState = "playerWins";
      }
      setTimeout(() => {
        this.viewModel.updateModel(oldModel1 => {
          this.lastClicked = null;
          const newModel = JSON.parse(JSON.stringify(oldModel1));
          const playerGameboard = newModel.player.gameboard;
          switch (newModel.AI.difficulty) {
            case "easy":
              newModel.lastClicked = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveEasy)(playerGameboard);
              break;
            case "medium":
              newModel.lastClicked = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveMedium)(playerGameboard);
              break;
            case "hard":
              newModel.lastClicked = (0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.AIMoveMedium)(playerGameboard);
              break;
          }
          if (newModel.lastClicked.attackResponse.tileStatus === "hit") {
            newModel.stateMessage = "We're taking on water sir!";
          }
          if (newModel.lastClicked.attackResponse.tileStatus === "miss") {
            newModel.stateMessage = "The enemy must be blind";
          }
          if (newModel.lastClicked.attackResponse.ship) {
            if (newModel.lastClicked.attackResponse.ship.sunk) {
              newModel.stateMessage = `They've sunk our ${newModel.lastClicked.attackResponse.ship.name}`;
            }
          }
          if ((0,_gameComponents_Game__WEBPACK_IMPORTED_MODULE_3__.checkAllShipsSunk)(playerGameboard.ships)) {
            newModel.gameState = "AIWins";
          }
          return newModel;
        });
      }, enemyDelay);
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
/* harmony import */ var _assets_images_wood_jpg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../assets/images/wood.jpg */ "./src/assets/images/wood.jpg");
// import Board from "./boardView.js";













class GamePage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.gameState !== newModel.gameState && newModel.currentPage === "gamePage" || oldModel.videoPlaying !== newModel.videoPlaying || newModel.gameState === "playerWins" || newModel.gameState === "AIWins";
  }
  render(model) {
    switch (model.gameState) {
      case "placeShips":
        return this.buildPlaceShipsStage(model);
        break;
      case "inGame":
        return this.buildInGameStage(model);
        break;
      case "playerWins":
        return this.buildInGameStage(model);
        break;
      case "AIWins":
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
    if (model.gameState === "playerWins" || model.gameState === "AIWins") {
      const newGameBtn = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        textContent: "New Game",
        className: "newGameButton"
      });
      newGameBtn.addEventListener("click", () => {
        this.viewModel.updateModel(oldModel => {
          return oldModel.newGameState;
        });
      });
      const newGameBorder = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "newGameBorder",
        children: [newGameBtn]
      });
      const winText = model.gameState === "playerWins" ? "VICTORY" : "DEFEAT";
      const winState = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "winState",
        textContent: winText
      });
      const title = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "h1",
        className: "title",
        textContent: "BATTLESHIP"
      });
      const titleBorder = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "titleBorder",
        children: [title]
      });
      const topDiv = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "topDiv",
        children: [titleBorder]
      });
      const midDiv = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "midDiv",
        children: [winState]
      });
      const botDiv = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "botDiv",
        children: [newGameBorder]
      });
      const frameContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "frameContainer",
        children: [topDiv, midDiv, botDiv]
      });
      const mask = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "img",
        className: "mask",
        src: _assets_images_wood_jpg__WEBPACK_IMPORTED_MODULE_12__
      });
      const gameOverContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "gameOverContainer",
        children: [frameContainer, mask]
      });
      const modalContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "modelContainer",
        children: [gameOverContainer]
      });
      gameContainer.appendChild(modalContainer);
    }
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
      const shipCol = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "shipCol",
        children: [top, mid, bot]
      });
      if (!ship.sunk) {
        shipIcon.classList.add("alive");
        top.appendChild(shipIcon);
      } else {
        shipIcon.classList.add("sunk");
        shipCol.classList.add("shipSunk");
        bot.appendChild(shipIcon);
      }
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
    queue.draggable = false;
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
    shadowGrid.draggable = false;
    board.draggable = false;
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
        cell.draggable = false;
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
        textContent: "Created by Gluttz"
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
        newModel.newGameState = JSON.parse(JSON.stringify(newModel));
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
/* harmony import */ var _assets_images_clipboard_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/clipboard.png */ "./src/assets/images/clipboard.png");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");






class MapPage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_5__["default"] {
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
          newModel.stateMessage = "Deploy the fleet, sir.";
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
        src: _assets_images_clipboard_png__WEBPACK_IMPORTED_MODULE_4__,
        className: "stickyNote"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "paraContainer",
        children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Location: ${selectedOptions.location}`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          innerHTML: `Difficulty: <u>${selectedOptions.difficulty}</u>`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Admiral ${player.name},`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `${selectedOptions.para}`
        })]
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "shadow"
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n    --theme-color: hsla(120, 100%, 50%, 1);\n    --lowAlpha-color: hsla(120, 100%, 50%, 0.5);\n    --filter: hue-rotate();\n    --opposite-color: hsla(300, 100%, 50%, 1);\n    --opposite-lowAlpha: hsla(300, 100%, 50%, 0.5);\n    --opposite-filter: hue-rotate(180deg);\n}\n\n.gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n    border-bottom: 10px solid rgb(83, 83, 83);\n    border-right: 10px solid rgb(126, 126, 126);\n    border-top: 10px solid rgb(163, 163, 163);\n    border-left: 10px solid rgb(145, 145, 145);\n    box-shadow: 0 0 15px 5px black;\n    z-index: 1;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) scale(0.9);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px var(--lowAlpha-color),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: var(--theme-color);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid var(--theme-color);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, var(--theme-color) 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.enemyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 87%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 90%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 42%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 47%;\n    left: 45%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 55%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 55%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.leftButtonContainer,\n.middleButtonContainer,\n.rightButtonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(83, 83, 83);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 4vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 2vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        20px 100px 80px rgba(0, 0, 0, 0.726),\n        80px 160px 100px rgba(0, 0, 0, 0.507);\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(187, 186, 186);\n    border-right: 5px solid rgb(190, 190, 190);\n    border-top: 5px solid rgb(87, 87, 87);\n    border-left: 5px solid rgb(122, 122, 122);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(182, 182, 182);\n    border-right: 5px solid rgb(180, 180, 180);\n    border-top: 5px solid rgb(80, 80, 80);\n    border-left: 5px solid rgb(119, 119, 119);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(184, 184, 184);\n    border-right: 5px solid rgb(182, 181, 181);\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(119, 118, 118);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    margin-bottom: 1rem;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 8px solid rgb(158, 158, 158);\n    border-right: 8px solid rgb(199, 198, 198);\n    border-top: 8px solid rgb(68, 68, 68);\n    border-left: 8px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid rgb(243, 243, 243);\n    border-top: 5px solid rgb(58, 58, 58);\n    border-left: 5px solid rgb(80, 79, 79);\n    background-color: black;\n    box-shadow: inset 0 0 50px var(--lowAlpha-color);\n    display: flex;\n    overflow: hidden;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px var(--lowAlpha-color),\n        inset 0 0 10px var(--lowAlpha-color);\n}\n.hideNext {\n    box-shadow: none;\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px var(--theme-color), inset 0 0 10px var(--theme-color);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n    filter: var(--filter);\n}\n\n.AIBoardContainer #CarrierOverlay,\n.AIBoardContainer #BattleshipOverlay,\n.AIBoardContainer #DestroyerOverlay,\n.AIBoardContainer #SubmarineOverlay,\n.AIBoardContainer #Patrol-BoatOverlay {\n    filter: var(--opposite-filter);\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlayPulse {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border: none;\n    transform: scale(1);\n    animation: pulse 0.7s ease-out;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    50% {\n        transform: scale(1.4);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    100% {\n        transform: scale(1.8);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: space-evenly;\n    width: 100%;\n    height: 100%;\n}\n\n.boardBorder {\n    margin-top: auto;\n    position: relative;\n    border-bottom: 15px solid rgb(116, 116, 116);\n    border-right: 20px solid rgb(138, 137, 137);\n    border-top: 20px solid rgb(117, 117, 117);\n    border-left: 20px solid rgb(102, 102, 102);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    box-shadow: 0 0 15px black;\n    z-index: 2;\n}\n\n.board {\n    position: relative;\n    border-bottom: 15px solid rgb(155, 155, 155);\n    border-right: 20px solid rgb(182, 182, 182);\n    border-top: 20px solid rgb(53, 53, 53);\n    border-left: 20px solid rgb(75, 75, 75);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px var(--lowAlpha-color);\n\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    overflow: hidden;\n}\n\n.playerBoardContainer {\n    margin-top: auto;\n}\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.AIBoardContainer .board {\n    box-shadow: inset 0 0 140px var(--opposite-lowAlpha);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.cell {\n    border: 1px solid var(--lowAlpha-color);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n}\n\n.cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.cell.hit::after {\n    content: \"\";\n    background-color: var(--opposite-lowAlpha);\n    box-shadow: 0 0 15px var(--opposite-lowAlpha);\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    opacity: 60%;\n}\n\n.cell.hit::before {\n    position: absolute;\n    content: \"\";\n    border: 3px solid var(--opposite-lowAlpha);\n    box-shadow: inset 0 0 15px var(--opposite-lowAlpha),\n        0 0 15px var(--opposite-lowAlpha);\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    opacity: 60%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.cell.miss::before {\n    content: \"\";\n    border: 3px solid var(--lowAlpha-color);\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    opacity: 70%;\n    box-shadow: inset 0 0 15px var(--lowAlpha-color),\n        0 0 15px var(--lowAlpha-color);\n    margin-left: auto;\n    margin-right: auto;\n    filter: blur(1.5px);\n}\n\n.AIBoardContainer .cell {\n    border: 1px solid var(--opposite-lowAlpha);\n    cursor: crosshair;\n}\n.AIBoardContainer .cell.miss::before {\n    border: 3px solid var(--opposite-lowAlpha);\n    box-shadow: inset 0 0 10px var(--opposite-lowAlpha),\n        0 0 10px var(--opposite-lowAlpha);\n}\n\n.AIBoardContainer .cell.hit::after {\n    background-color: var(--lowAlpha-color);\n    box-shadow: 0 0 15px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell.hit::before {\n    border: 3px solid var(--lowAlpha-color);\n    box-shadow: inset 0 0 15px var(--lowAlpha-color),\n        0 0 15px var(--lowAlpha-color);\n}\n\n.cell.pulse::before {\n    animation: pulse2 1s linear;\n}\n\n@keyframes pulse2 {\n    0% {\n        transform: scale(1);\n    }\n\n    40% {\n        transform: scale(3);\n    }\n\n    50% {\n        transform: scale(1);\n    }\n    90% {\n        transform: scale(3);\n    }\n\n    100% {\n        transform: scale(1);\n    }\n}\n\n.cell[data-col=\"0\"] {\n    border-left: none;\n}\n.cell[data-col=\"9\"] {\n    border-right: none;\n}\n.cell[data-row=\"0\"] {\n    border-top: none;\n}\n.cell[data-row=\"9\"] {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.hueSlider {\n    -webkit-appearance: none;\n    appearance: none;\n    background-color: transparent;\n    width: 100%;\n    height: 25px;\n    border-radius: 10px;\n    box-shadow: inset 0 0 5px var(--theme-color), 0 0 5px var(--theme-color);\n    outline: none;\n    opacity: 0.7;\n    padding: 0 10px;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.hueSlider:hover {\n    opacity: 1;\n}\n\n.hueSlider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n.slider::-moz-range-thumb {\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n#videoBtn {\n    margin: 10px;\n    width: 40px;\n    height: 40px;\n    border: 4px solid var(--theme-color);\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 4px;\n    border-radius: 50%;\n    filter: blur(1px);\n    opacity: 0.8;\n    cursor: pointer;\n}\n\n#videoBtn:hover {\n    opacity: 1;\n}\n\n#videoBtn.pause::before {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.pause::after {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.play::after {\n    content: \"\";\n    border-top: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    border-left: 15px solid var(--theme-color);\n    position: absolute;\n    right: -3px;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n    overflow: hidden;\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: var(--theme-color);\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: var(--theme-color);\n    }\n}\n\n.wavesAlt {\n    position: absolute;\n    width: 100vw;\n    height: 100vh;\n\n    top: -100px;\n}\n\n.wavesAlt.animate {\n    animation: wave 10s ease-in-out infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n.AIStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage .shipFooter {\n    flex: 1;\n    display: flex;\n    align-items: center;\n}\n\n.AIScoreContainer {\n    height: 70%;\n    display: flex;\n}\n\n.playerScoreContainer {\n    height: 70%;\n    display: flex;\n}\n.scoreContainer {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    background-color: black;\n    box-shadow: inset 0 0 40px var(--lowAlpha-color);\n    padding: 0.8rem;\n}\n.scoreContainer.AIScore {\n    box-shadow: inset 0 0 40px var(--opposite-lowAlpha);\n}\n\n.shipCol {\n    width: 20%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n    cursor: pointer;\n}\n\n.AIStage .shipCol {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol img:hover {\n    transform: scale(1.2);\n}\n\n.shipCol img {\n    width: 80%;\n    height: 80%;\n    filter: var(--filter);\n}\n\n.AIStage .shipCol img {\n    filter: var(--opposite-filter);\n}\n\n.topSection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 33%;\n}\n\n.midSection {\n    height: 34%;\n    font-family: PressStart;\n    font-size: 0.9rem;\n    color: var(--theme-color);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.AIScore .midSection {\n    color: var(--opposite-color);\n}\n\n.AIStage .optionsHousing {\n    box-shadow: inset 0 0 20px var(--opposite-lowAlpha);\n}\n\n.botSection {\n    height: 33%;\n}\n\n.shipCol.shipSunk {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol.shipSunk .midSection {\n    color: var(--opposite-color);\n}\n.shipCol.shipSunk img {\n    filter: var(--opposite-filter);\n}\n\n.AIStage .shipCol.shipSunk {\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n}\n\n.AIStage .shipCol.shipSunk .midSection {\n    color: var(--theme-color);\n}\n.AIStage .shipCol.shipSunk img {\n    filter: var(--filter);\n}\n\n#container .shipCol:nth-child(1) {\n    border-left: none;\n}\n\n#container .shipCol:nth-child(5) {\n    border-right: none;\n}\n\n.optionsContainer.inGame {\n    position: static;\n    border-bottom-left-radius: 0;\n    box-shadow: none;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    display: flex;\n    flex: 1;\n}\n\n.inGame .optionsHousing {\n    border-bottom: 0;\n    border-right: 0;\n    border-top: 0;\n    border-left: 0;\n    padding: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n}\n\n.modelContainer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.644);\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2;\n}\n\n.gameOverContainer {\n    width: 70%;\n    height: 60%;\n\n    background: radial-gradient(\n                circle 100px at top left,\n                #0000 98%,\n                rgb(88, 88, 88)\n            )\n            top left,\n        radial-gradient(circle 100px at top right, #0000 98%, rgb(88, 88, 88))\n            top right,\n        radial-gradient(circle 100px at bottom left, #0000 98%, rgb(88, 88, 88))\n            bottom left,\n        radial-gradient(\n                circle 100px at bottom right,\n                #0000 98%,\n                rgb(88, 88, 88)\n            )\n            bottom right;\n    background-size: 51% 51%;\n\n    background-repeat: no-repeat;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.frameContainer {\n    width: 92%;\n    height: 85%;\n    background-color: grey;\n    background: radial-gradient(\n                circle 100px at top left,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            top left,\n        radial-gradient(\n                circle 100px at top right,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            top right,\n        radial-gradient(\n                circle 100px at bottom left,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            bottom left,\n        radial-gradient(\n                circle 100px at bottom right,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            bottom right;\n    background-size: 51% 51%;\n    background-repeat: no-repeat;\n    display: flex;\n\n    align-items: center;\n    flex-direction: column;\n}\n.mask {\n    width: 63%;\n    height: 48%;\n    -webkit-mask: radial-gradient(circle 100px at top left, #0000 98%, #000) top\n            left,\n        radial-gradient(circle 100px at top right, #0000 98%, #000) top right,\n        radial-gradient(circle 100px at bottom left, #0000 98%, #000) bottom\n            left,\n        radial-gradient(circle 100px at bottom right, #0000 98%, #000) bottom\n            right;\n    -webkit-mask-size: 51% 51%;\n    -webkit-mask-repeat: no-repeat;\n    position: absolute;\n}\n\n.topDiv,\n.midDiv,\n.botDiv {\n    z-index: 1;\n}\n\n.titleBorder {\n    border: 5px solid rgb(80, 80, 80);\n    background-color: rgb(131, 131, 131);\n    border-radius: 50px;\n    padding: 0 2rem;\n    position: relative;\n    margin-top: 3rem;\n}\n.titleBorder::before {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    left: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.titleBorder::after {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    right: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.title {\n    font-family: BlackOps1;\n    color: rgb(46, 46, 46);\n    font-size: 5rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #818181, 1px 2px 1px #818181, 1px 3px 1px #818181,\n        1px 4px 1px #818181, 3px 6px 10px black;\n    letter-spacing: 10px;\n}\n\n.winState {\n    font-family: BlackOps1;\n    color: rgb(99, 99, 99);\n    font-size: 8rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 5px 10px 20px black;\n    letter-spacing: 10px;\n    margin-top: 1rem;\n}\n\n.newGameBorder {\n    border: 5px solid rgb(80, 80, 80);\n    background-color: rgb(153, 153, 153);\n    border-radius: 50px;\n    padding: 0 2rem;\n    position: relative;\n    cursor: pointer;\n    box-shadow: 3px 3px 10px black;\n    animation: alert 2s linear infinite;\n}\n\n.newGameBorder:hover {\n    box-shadow: 3px 3px 20px black;\n}\n\n.newGameBorder::before {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    right: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.newGameBorder::after {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    left: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.newGameButton {\n    font-family: BlackOps1;\n    color: rgb(61, 61, 61);\n    font-size: 3rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 5px 10px 20px black;\n    letter-spacing: 10px;\n}\n\n@keyframes alert {\n    0% {\n        transform: scale(1);\n    }\n    50% {\n        transform: scale(1.1);\n    }\n    100% {\n        transform: scale(1);\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1600px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/gamepage.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n    --theme-color: hsla(120, 100%, 50%, 1);\n    --lowAlpha-color: hsla(120, 100%, 50%, 0.5);\n    --filter: hue-rotate();\n    --opposite-color: hsla(300, 100%, 50%, 1);\n    --opposite-lowAlpha: hsla(300, 100%, 50%, 0.5);\n    --opposite-filter: hue-rotate(180deg);\n}\n\n.gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n    border-bottom: 10px solid rgb(83, 83, 83);\n    border-right: 10px solid rgb(126, 126, 126);\n    border-top: 10px solid rgb(163, 163, 163);\n    border-left: 10px solid rgb(145, 145, 145);\n    box-shadow: 0 0 15px 5px black;\n    z-index: 1;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%) scale(0.9);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px var(--lowAlpha-color),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: var(--theme-color);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid var(--theme-color);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, var(--theme-color) 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.enemyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 87%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 90%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.enemyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing0 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 42%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n.friendlyPing1 {\n    list-style: none;\n    position: absolute;\n    top: 47%;\n    left: 45%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing2 {\n    list-style: none;\n    position: absolute;\n    top: 55%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing3 {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 55%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.friendlyPing4 {\n    list-style: none;\n    position: absolute;\n    top: 43%;\n    left: 50%;\n    width: 8px;\n    height: 8px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.leftButtonContainer,\n.middleButtonContainer,\n.rightButtonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(83, 83, 83);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 4vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        0 2vmin 0.15vmin 0vmin rgb(92, 92, 92),\n        20px 100px 80px rgba(0, 0, 0, 0.726),\n        80px 160px 100px rgba(0, 0, 0, 0.507);\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(187, 186, 186);\n    border-right: 5px solid rgb(190, 190, 190);\n    border-top: 5px solid rgb(87, 87, 87);\n    border-left: 5px solid rgb(122, 122, 122);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(182, 182, 182);\n    border-right: 5px solid rgb(180, 180, 180);\n    border-top: 5px solid rgb(80, 80, 80);\n    border-left: 5px solid rgb(119, 119, 119);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid rgb(184, 184, 184);\n    border-right: 5px solid rgb(182, 181, 181);\n    border-top: 5px solid rgb(90, 90, 90);\n    border-left: 5px solid rgb(119, 118, 118);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    margin-bottom: 1rem;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 8px solid rgb(158, 158, 158);\n    border-right: 8px solid rgb(199, 198, 198);\n    border-top: 8px solid rgb(68, 68, 68);\n    border-left: 8px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid rgb(243, 243, 243);\n    border-top: 5px solid rgb(58, 58, 58);\n    border-left: 5px solid rgb(80, 79, 79);\n    background-color: black;\n    box-shadow: inset 0 0 50px var(--lowAlpha-color);\n    display: flex;\n    overflow: hidden;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px var(--lowAlpha-color),\n        inset 0 0 10px var(--lowAlpha-color);\n}\n.hideNext {\n    box-shadow: none;\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px var(--theme-color), inset 0 0 10px var(--theme-color);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n    filter: var(--filter);\n}\n\n.AIBoardContainer #CarrierOverlay,\n.AIBoardContainer #BattleshipOverlay,\n.AIBoardContainer #DestroyerOverlay,\n.AIBoardContainer #SubmarineOverlay,\n.AIBoardContainer #Patrol-BoatOverlay {\n    filter: var(--opposite-filter);\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlayPulse {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border: none;\n    transform: scale(1);\n    animation: pulse 0.7s ease-out;\n}\n\n@keyframes pulse {\n    0% {\n        transform: scale(1);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    50% {\n        transform: scale(1.4);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n\n    100% {\n        transform: scale(1.8);\n        box-shadow: inset 0 0 5px var(--lowAlpha-color),\n            0 0 5px var(--lowAlpha-color);\n    }\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: space-evenly;\n    width: 100%;\n    height: 100%;\n}\n\n.boardBorder {\n    margin-top: auto;\n    position: relative;\n    border-bottom: 15px solid rgb(116, 116, 116);\n    border-right: 20px solid rgb(138, 137, 137);\n    border-top: 20px solid rgb(117, 117, 117);\n    border-left: 20px solid rgb(102, 102, 102);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    box-shadow: 0 0 15px black;\n    z-index: 2;\n}\n\n.board {\n    position: relative;\n    border-bottom: 15px solid rgb(155, 155, 155);\n    border-right: 20px solid rgb(182, 182, 182);\n    border-top: 20px solid rgb(53, 53, 53);\n    border-left: 20px solid rgb(75, 75, 75);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px var(--lowAlpha-color);\n\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    overflow: hidden;\n}\n\n.playerBoardContainer {\n    margin-top: auto;\n}\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.AIBoardContainer .board {\n    box-shadow: inset 0 0 140px var(--opposite-lowAlpha);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.AIBoardContainer {\n    margin-top: auto;\n}\n\n.cell {\n    border: 1px solid var(--lowAlpha-color);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n}\n\n.cell:hover {\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.cell.hit::after {\n    content: \"\";\n    background-color: var(--opposite-lowAlpha);\n    box-shadow: 0 0 15px var(--opposite-lowAlpha);\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    opacity: 60%;\n}\n\n.cell.hit::before {\n    position: absolute;\n    content: \"\";\n    border: 3px solid var(--opposite-lowAlpha);\n    box-shadow: inset 0 0 15px var(--opposite-lowAlpha),\n        0 0 15px var(--opposite-lowAlpha);\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    opacity: 60%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.cell.miss::before {\n    content: \"\";\n    border: 3px solid var(--lowAlpha-color);\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    opacity: 70%;\n    box-shadow: inset 0 0 15px var(--lowAlpha-color),\n        0 0 15px var(--lowAlpha-color);\n    margin-left: auto;\n    margin-right: auto;\n    filter: blur(1.5px);\n}\n\n.AIBoardContainer .cell {\n    border: 1px solid var(--opposite-lowAlpha);\n    cursor: crosshair;\n}\n.AIBoardContainer .cell.miss::before {\n    border: 3px solid var(--opposite-lowAlpha);\n    box-shadow: inset 0 0 10px var(--opposite-lowAlpha),\n        0 0 10px var(--opposite-lowAlpha);\n}\n\n.AIBoardContainer .cell.hit::after {\n    background-color: var(--lowAlpha-color);\n    box-shadow: 0 0 15px var(--lowAlpha-color);\n}\n\n.AIBoardContainer .cell.hit::before {\n    border: 3px solid var(--lowAlpha-color);\n    box-shadow: inset 0 0 15px var(--lowAlpha-color),\n        0 0 15px var(--lowAlpha-color);\n}\n\n.cell.pulse::before {\n    animation: pulse2 1s linear;\n}\n\n@keyframes pulse2 {\n    0% {\n        transform: scale(1);\n    }\n\n    40% {\n        transform: scale(3);\n    }\n\n    50% {\n        transform: scale(1);\n    }\n    90% {\n        transform: scale(3);\n    }\n\n    100% {\n        transform: scale(1);\n    }\n}\n\n.cell[data-col=\"0\"] {\n    border-left: none;\n}\n.cell[data-col=\"9\"] {\n    border-right: none;\n}\n.cell[data-row=\"0\"] {\n    border-top: none;\n}\n.cell[data-row=\"9\"] {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.optionsContainer {\n    background-color: black;\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-bottom: 10px solid rgb(114, 114, 114);\n    border-right: 10px solid rgb(87, 87, 87);\n    border-top: 10px solid rgb(119, 119, 119);\n    border-left: 10px solid rgb(155, 155, 155);\n    border-bottom-left-radius: 10px;\n    box-shadow: 0 0 15px black;\n}\n.optionsHousing {\n    border-bottom: 10px solid lightgrey;\n    border-right: 10px solid rgb(187, 187, 187);\n    border-top: 10px solid rgb(87, 87, 87);\n    border-left: 10px solid rgb(107, 107, 107);\n    padding: 0.5rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 2rem;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n}\n\n.hueSlider {\n    -webkit-appearance: none;\n    appearance: none;\n    background-color: transparent;\n    width: 100%;\n    height: 25px;\n    border-radius: 10px;\n    box-shadow: inset 0 0 5px var(--theme-color), 0 0 5px var(--theme-color);\n    outline: none;\n    opacity: 0.7;\n    padding: 0 10px;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.hueSlider:hover {\n    opacity: 1;\n}\n\n.hueSlider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n.slider::-moz-range-thumb {\n    width: 20px;\n    height: 20px;\n    background: var(--theme-color);\n    border-radius: 50%;\n    cursor: pointer;\n    filter: blur(1px) hue-rotate(180deg);\n}\n\n#videoBtn {\n    margin: 10px;\n    width: 40px;\n    height: 40px;\n    border: 4px solid var(--theme-color);\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 4px;\n    border-radius: 50%;\n    filter: blur(1px);\n    opacity: 0.8;\n    cursor: pointer;\n}\n\n#videoBtn:hover {\n    opacity: 1;\n}\n\n#videoBtn.pause::before {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.pause::after {\n    content: \"\";\n    width: 5px;\n    height: 20px;\n\n    background-color: var(--theme-color);\n}\n\n#videoBtn.play::after {\n    content: \"\";\n    border-top: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    border-left: 15px solid var(--theme-color);\n    position: absolute;\n    right: -3px;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px var(--lowAlpha-color);\n    overflow: hidden;\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: var(--theme-color);\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: var(--theme-color);\n    }\n}\n\n.wavesAlt {\n    position: absolute;\n    width: 100vw;\n    height: 100vh;\n\n    top: -100px;\n}\n\n.wavesAlt.animate {\n    animation: wave 10s ease-in-out infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n.AIStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n}\n\n.playerStage .shipFooter {\n    flex: 1;\n    display: flex;\n    align-items: center;\n}\n\n.AIScoreContainer {\n    height: 70%;\n    display: flex;\n}\n\n.playerScoreContainer {\n    height: 70%;\n    display: flex;\n}\n.scoreContainer {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    background-color: black;\n    box-shadow: inset 0 0 40px var(--lowAlpha-color);\n    padding: 0.8rem;\n}\n.scoreContainer.AIScore {\n    box-shadow: inset 0 0 40px var(--opposite-lowAlpha);\n}\n\n.shipCol {\n    width: 20%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n    cursor: pointer;\n}\n\n.AIStage .shipCol {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol img:hover {\n    transform: scale(1.2);\n}\n\n.shipCol img {\n    width: 80%;\n    height: 80%;\n    filter: var(--filter);\n}\n\n.AIStage .shipCol img {\n    filter: var(--opposite-filter);\n}\n\n.topSection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 33%;\n}\n\n.midSection {\n    height: 34%;\n    font-family: PressStart;\n    font-size: 0.9rem;\n    color: var(--theme-color);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.AIScore .midSection {\n    color: var(--opposite-color);\n}\n\n.AIStage .optionsHousing {\n    box-shadow: inset 0 0 20px var(--opposite-lowAlpha);\n}\n\n.botSection {\n    height: 33%;\n}\n\n.shipCol.shipSunk {\n    border-left: 1px solid var(--opposite-lowAlpha);\n    border-right: 1px solid var(--opposite-lowAlpha);\n}\n\n.shipCol.shipSunk .midSection {\n    color: var(--opposite-color);\n}\n.shipCol.shipSunk img {\n    filter: var(--opposite-filter);\n}\n\n.AIStage .shipCol.shipSunk {\n    border-left: 1px solid var(--lowAlpha-color);\n    border-right: 1px solid var(--lowAlpha-color);\n}\n\n.AIStage .shipCol.shipSunk .midSection {\n    color: var(--theme-color);\n}\n.AIStage .shipCol.shipSunk img {\n    filter: var(--filter);\n}\n\n#container .shipCol:nth-child(1) {\n    border-left: none;\n}\n\n#container .shipCol:nth-child(5) {\n    border-right: none;\n}\n\n.optionsContainer.inGame {\n    position: static;\n    border-bottom-left-radius: 0;\n    box-shadow: none;\n    border-bottom: 5px solid rgb(114, 114, 114);\n    border-right: 5px solid rgb(87, 87, 87);\n    border-top: 5px solid rgb(119, 119, 119);\n    border-left: 5px solid rgb(155, 155, 155);\n    display: flex;\n    flex: 1;\n}\n\n.inGame .optionsHousing {\n    border-bottom: 0;\n    border-right: 0;\n    border-top: 0;\n    border-left: 0;\n    padding: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n}\n\n.modelContainer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.644);\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2;\n}\n\n.gameOverContainer {\n    width: 70%;\n    height: 60%;\n\n    background: radial-gradient(\n                circle 100px at top left,\n                #0000 98%,\n                rgb(88, 88, 88)\n            )\n            top left,\n        radial-gradient(circle 100px at top right, #0000 98%, rgb(88, 88, 88))\n            top right,\n        radial-gradient(circle 100px at bottom left, #0000 98%, rgb(88, 88, 88))\n            bottom left,\n        radial-gradient(\n                circle 100px at bottom right,\n                #0000 98%,\n                rgb(88, 88, 88)\n            )\n            bottom right;\n    background-size: 51% 51%;\n\n    background-repeat: no-repeat;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.frameContainer {\n    width: 92%;\n    height: 85%;\n    background-color: grey;\n    background: radial-gradient(\n                circle 100px at top left,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            top left,\n        radial-gradient(\n                circle 100px at top right,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            top right,\n        radial-gradient(\n                circle 100px at bottom left,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            bottom left,\n        radial-gradient(\n                circle 100px at bottom right,\n                #0000 98%,\n                rgb(143, 143, 143)\n            )\n            bottom right;\n    background-size: 51% 51%;\n    background-repeat: no-repeat;\n    display: flex;\n\n    align-items: center;\n    flex-direction: column;\n}\n.mask {\n    width: 63%;\n    height: 48%;\n    -webkit-mask: radial-gradient(circle 100px at top left, #0000 98%, #000) top\n            left,\n        radial-gradient(circle 100px at top right, #0000 98%, #000) top right,\n        radial-gradient(circle 100px at bottom left, #0000 98%, #000) bottom\n            left,\n        radial-gradient(circle 100px at bottom right, #0000 98%, #000) bottom\n            right;\n    -webkit-mask-size: 51% 51%;\n    -webkit-mask-repeat: no-repeat;\n    position: absolute;\n}\n\n.topDiv,\n.midDiv,\n.botDiv {\n    z-index: 1;\n}\n\n.titleBorder {\n    border: 5px solid rgb(80, 80, 80);\n    background-color: rgb(131, 131, 131);\n    border-radius: 50px;\n    padding: 0 2rem;\n    position: relative;\n    margin-top: 3rem;\n}\n.titleBorder::before {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    left: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.titleBorder::after {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    right: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.title {\n    font-family: BlackOps1;\n    color: rgb(46, 46, 46);\n    font-size: 5rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #818181, 1px 2px 1px #818181, 1px 3px 1px #818181,\n        1px 4px 1px #818181, 3px 6px 10px black;\n    letter-spacing: 10px;\n}\n\n.winState {\n    font-family: BlackOps1;\n    color: rgb(99, 99, 99);\n    font-size: 8rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 5px 10px 20px black;\n    letter-spacing: 10px;\n    margin-top: 1rem;\n}\n\n.newGameBorder {\n    border: 5px solid rgb(80, 80, 80);\n    background-color: rgb(153, 153, 153);\n    border-radius: 50px;\n    padding: 0 2rem;\n    position: relative;\n    cursor: pointer;\n    box-shadow: 3px 3px 10px black;\n    animation: alert 2s linear infinite;\n}\n\n.newGameBorder:hover {\n    box-shadow: 3px 3px 20px black;\n}\n\n.newGameBorder::before {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    right: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.newGameBorder::after {\n    content: \"\";\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background-color: #474747;\n    position: absolute;\n    top: 45%;\n    left: 15px;\n    box-shadow: inset 1px 1px 3px black;\n}\n\n.newGameButton {\n    font-family: BlackOps1;\n    color: rgb(61, 61, 61);\n    font-size: 3rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 5px 10px 20px black;\n    letter-spacing: 10px;\n}\n\n@keyframes alert {\n    0% {\n        transform: scale(1);\n    }\n    50% {\n        transform: scale(1.1);\n    }\n    100% {\n        transform: scale(1);\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1600px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: BlackOps1;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n    overflow: hidden;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\nspan {\n    font-size: 1.2rem;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/homepage.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,4CAA2C;AAC/C;AACA;IACI,uBAAuB;IACvB,4CAA0C;AAC9C;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,6BAA6B;IAC7B,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;IACX,6BAA6B;IAC7B,yDAAwD;IACxD,sBAAsB;IACtB,2BAA2B;AAC/B;;AAEA;IACI,cAAc;IACd,sBAAsB;IACtB,eAAe;IACf,kBAAkB;IAClB;;gDAE4C;AAChD;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,uBAAuB;IACvB,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;IACxE,eAAe;IACf,0CAA0C;AAC9C;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI;QACI,QAAQ;IACZ;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;QAEI,yBAAyB;IAC7B;IACA;QACI,kBAAkB;IACtB;AACJ;;AAEA;IACI,eAAe;IACf,WAAW;IACX,SAAS;IACT,2BAA2B;IAC3B,SAAS;IACT,UAAU;AACd;;AAEA;IACI;QACI,SAAS;IACb;AACJ;;AAEA;IACI;QACI,SAAS;IACb;;IAEA;QACI,eAAe;QACf,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,2CAA2C;AAC/C;AACA;IACI,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,4CAA4C;QAC5C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,6CAA6C;QAC7C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB","sourcesContent":["@font-face {\n    font-family: BlackOps1;\n    src: url(\"../assets/fonts/BlackOpsOne.ttf\");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(\"../assets/fonts/PressStart.ttf\");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n    overflow: hidden;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(\"../assets/images/homescreen.jpg\");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\nspan {\n    font-size: 1.2rem;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: Kalam;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 1;\n    filter: hue-rotate(130deg);\n}\n\n.redPin1::before {\n    content: \"\";\n    width: 300px;\n    height: 300px;\n    background-color: red;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    z-index: 9;\n}\n\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 1;\n    filter: hue-rotate(70deg) brightness(2);\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 1;\n}\n\n.redPin1:hover {\n    filter: hue-rotate(130deg) brightness(1.4);\n}\n.redPin2:hover {\n    filter: hue-rotate(70deg) brightness(2.4);\n}\n.redPin3:hover {\n    filter: brightness(1.4);\n}\n\n.noteContainer {\n    width: 600px;\n    height: 600px;\n    position: fixed;\n    top: 15%;\n    left: 5%;\n    transform: rotate(-4deg);\n    animation: fly 0.1s linear;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.paraContainer {\n    position: absolute;\n    top: 20%;\n    left: 30%;\n    font-family: Kalam;\n\n    width: 260px;\n    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.247);\n}\n\n.paraContainer p:nth-child(1) {\n    font-size: 1.4rem;\n    margin-bottom: 1rem;\n}\n\n.paraContainer p:nth-child(2) {\n    font-size: 1.4rem;\n    font-weight: 600;\n    letter-spacing: 2px;\n    margin-bottom: 1rem;\n}\n\n.paraContainer p:nth-child(3) {\n    font-size: 1.1rem;\n\n    margin-bottom: 0.5rem;\n}\n\n.paraContainer p:nth-child(4) {\n    line-height: 2rem;\n}\n\n.stickyNote {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 600px;\n}\n\n.shadow {\n    width: 380px;\n\n    height: 530px;\n    box-shadow: 10px 10px 50px black;\n}\n\n#hard .paraContainer u {\n    color: rgb(196, 0, 0);\n}\n#medium .paraContainer u {\n    color: rgb(119, 117, 0);\n}\n#easy .paraContainer u {\n    color: rgb(28, 109, 28);\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/mappage.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,4CAA6C;AACjD;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,yDAAiD;IACjD,sBAAsB;IACtB,2BAA2B;IAC3B,6BAA6B;IAC7B,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,eAAe;IACnB;AACJ;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,UAAU;IACV,0BAA0B;AAC9B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,qBAAqB;IACrB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;AACd;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,UAAU;IACV,uCAAuC;AAC3C;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,UAAU;AACd;;AAEA;IACI,0CAA0C;AAC9C;AACA;IACI,yCAAyC;AAC7C;AACA;IACI,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,QAAQ;IACR,QAAQ;IACR,wBAAwB;IACxB,0BAA0B;;IAE1B,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,kBAAkB;;IAElB,YAAY;IACZ,6CAA6C;AACjD;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;;IAEjB,qBAAqB;AACzB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,MAAM;IACN,OAAO;IACP,YAAY;AAChB;;AAEA;IACI,YAAY;;IAEZ,aAAa;IACb,gCAAgC;AACpC;;AAEA;IACI,qBAAqB;AACzB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,uBAAuB;AAC3B;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;IACA;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ","sourcesContent":["@font-face {\n    font-family: Kalam;\n    src: url(\"../assets/fonts/Kalam-Regular.ttf\");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(\"../assets/images/map.jpg\");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 1;\n    filter: hue-rotate(130deg);\n}\n\n.redPin1::before {\n    content: \"\";\n    width: 300px;\n    height: 300px;\n    background-color: red;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    z-index: 9;\n}\n\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 1;\n    filter: hue-rotate(70deg) brightness(2);\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 1;\n}\n\n.redPin1:hover {\n    filter: hue-rotate(130deg) brightness(1.4);\n}\n.redPin2:hover {\n    filter: hue-rotate(70deg) brightness(2.4);\n}\n.redPin3:hover {\n    filter: brightness(1.4);\n}\n\n.noteContainer {\n    width: 600px;\n    height: 600px;\n    position: fixed;\n    top: 15%;\n    left: 5%;\n    transform: rotate(-4deg);\n    animation: fly 0.1s linear;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.paraContainer {\n    position: absolute;\n    top: 20%;\n    left: 30%;\n    font-family: Kalam;\n\n    width: 260px;\n    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.247);\n}\n\n.paraContainer p:nth-child(1) {\n    font-size: 1.4rem;\n    margin-bottom: 1rem;\n}\n\n.paraContainer p:nth-child(2) {\n    font-size: 1.4rem;\n    font-weight: 600;\n    letter-spacing: 2px;\n    margin-bottom: 1rem;\n}\n\n.paraContainer p:nth-child(3) {\n    font-size: 1.1rem;\n\n    margin-bottom: 0.5rem;\n}\n\n.paraContainer p:nth-child(4) {\n    line-height: 2rem;\n}\n\n.stickyNote {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 600px;\n}\n\n.shadow {\n    width: 380px;\n\n    height: 530px;\n    box-shadow: 10px 10px 50px black;\n}\n\n#hard .paraContainer u {\n    color: rgb(196, 0, 0);\n}\n#medium .paraContainer u {\n    color: rgb(119, 117, 0);\n}\n#easy .paraContainer u {\n    color: rgb(28, 109, 28);\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "3b3cd2fe7dc94429fd77.svg";

/***/ }),

/***/ "./src/assets/images/Carrier.svg":
/*!***************************************!*\
  !*** ./src/assets/images/Carrier.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cc2fedf4d1908f25751e.svg";

/***/ }),

/***/ "./src/assets/images/Destroyer.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Destroyer.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "48d82565d635d8338f62.svg";

/***/ }),

/***/ "./src/assets/images/Patrol-Boat.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Patrol-Boat.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bb9cb7b04d70ef7deffb.svg";

/***/ }),

/***/ "./src/assets/images/Submarine.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Submarine.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "11c4b854c399277571b3.svg";

/***/ }),

/***/ "./src/assets/images/clipboard.png":
/*!*****************************************!*\
  !*** ./src/assets/images/clipboard.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2cdfd78afaaf23a35837.png";

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

/***/ }),

/***/ "./src/assets/images/wood.jpg":
/*!************************************!*\
  !*** ./src/assets/images/wood.jpg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "044810efc64747be480b.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxXQUFXLFlBQVksYUFBYSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxPQUFPLGFBQWEsT0FBTyxRQUFRLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLE9BQU8sVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxTQUFTLE9BQU8sYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sT0FBTyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLFNBQVMsVUFBVSxZQUFZLE9BQU8sU0FBUyxZQUFZLGFBQWEsT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFBWSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLHdCQUF3QixPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sT0FBTyxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsS0FBSyxPQUFPLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLE1BQU0sWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sS0FBSyxZQUFZLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsS0FBSyxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxVQUFVLE1BQU0sVUFBVSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsVUFBVSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksVUFBVSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFVBQVUsTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssS0FBSyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxtQkFBbUIsT0FBTyxjQUFjLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLDRCQUE0QixRQUFRLGFBQWEsYUFBYSxZQUFZLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxZQUFZLGFBQWEsYUFBYSxPQUFPLE9BQU8sVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLE9BQU8sYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLE9BQU8sYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLE9BQU8sYUFBYSxPQUFPLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxL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QUFHLHVCQUF1Qiw0QkFBNEIsR0FBRyx1QkFBdUIsNEJBQTRCLEdBQUcsdUJBQXVCLDBCQUEwQixHQUFHLHVCQUF1Qiw0QkFBNEIsR0FBRyx1QkFBdUIsNEJBQTRCLEdBQUcsU0FBUyx1RkFBdUYsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sT0FBTyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxZQUFZ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QTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7O0FDQW9EO0FBQ1I7QUFDTTtBQUVsRCxNQUFNdlQsS0FBSyxHQUFHLElBQUkwQix1RUFBSSxFQUFFO0FBRXhCLE1BQU1uQyxTQUFTLEdBQUcsSUFBSVEsMERBQVMsQ0FBQ0MsS0FBSyxDQUFDO0FBRXRDLE1BQU1nVSxJQUFJLEdBQUcsSUFBSTVOLHNFQUFHLENBQUM3RyxTQUFTLEVBQUVvSCxRQUFRLENBQUN5SCxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9QdWJTdWJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL1ZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUNvbXBvbmVudHMvQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVDb21wb25lbnRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVDb21wb25lbnRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUNvbXBvbmVudHMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQ29tcG9uZW50cy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQ29tcG9uZW50cy9UaWxlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2VsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL0FJQm9hcmRFbGVtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9CdXR0b24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL0dhbWVNZXNzYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9HYW1lUGFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvT3B0aW9uc01lbnUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL1JhZGFyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9nYW1lUGFnZS9TY29yZUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvU2hpcEVsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL2dhbWVQYWdlL1NoaXBRdWV1ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvZ2FtZVBhZ2UvcGxheWVyQm9hcmRFbGVtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy92aWV3Q29tcG9uZW50cy9ob21lUGFnZS9Ib21lUGFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvaG9tZVBhZ2UvSG9tZVBhZ2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvdmlld0NvbXBvbmVudHMvbWFwUGFnZS9NYXBQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2dhbWVwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9ob21lcGFnZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbWFwcGFnZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbmFtZXBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9nYW1lcGFnZS5jc3M/YTc3MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9ob21lcGFnZS5jc3M/MTRjZiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9tYXBwYWdlLmNzcz83MWVhIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL25hbWVwYWdlLmNzcz83YWRhIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIC8vIGFsbCB2aWV3IGNvbXBvbmVudHMgd2lsbCBleHRlbmQgdGhpc1xuICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IHZpZXdNb2RlbDtcblxuICAgICAgICAvLyBzYXZlIHZpZXcgY29tcG9uZW50J3MgY29udGFpbmVyIGZvciBsYXRlclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSB2aWV3IGNvbXBvbmVudCB0byB0aGUgdmlld01vZGVsJ3MgcHVic3ViXG4gICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgfVxuXG4gICAgb25Jbml0KCkge1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5yZWdpc3Rlcih0aGlzKTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgY29tcG9uZW50cyByZXR1cm4gdHJ1ZVxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGRlbiBpbmRpdmlkdWFsbHlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgIHRoaXMucHVic3VicyA9IFtdO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgfVxuXG4gICAgLy8gZWFjaCB2aWV3IGNvbXBvbmVudCB3aWxsIGluZGl2aWR1YWxseSBsaXN0ZW4gZm9yIHVwZGF0ZXNcbiAgICByZWdpc3RlcihwdWJzdWIpIHtcbiAgICAgICAgLy8gYWRkIHRoZSBjb21wb25lbnQgdG8gdGhlIGxpc3Qgb2YgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMucHVic3Vicy5wdXNoKHB1YnN1Yik7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsaXN0ZW5lcidzIGNvbnRhaW5pbmcgZWxlbWVudFxuICAgICAgICBjb25zdCBlbGVtZW50ID0gcHVic3ViLmdldEVsZW1lbnQoKTtcblxuICAgICAgICAvLyByZXBsYWNlIGNvbnRhaW5pbmcgZWxlbWVudCdzIGNoaWxkcmVuIHdpdGggZnJlc2ggY29tcG9uZW50XG4gICAgICAgIGVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKHB1YnN1Yi5yZW5kZXIodGhpcy5tb2RlbCkpO1xuICAgIH1cblxuICAgIC8vIGFjY2VwdHMgYSBjYWxsYmFjayBmdW5jdGlvbiBmcm9tIHRoZSB1cGRhdGluZyB2aWV3IGNvbXBvbmVudFxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsVXBkYXRlRnVuYykge1xuICAgICAgICAvLyBjcmVhdGUgYSBkZWVwIGNvcHkgb2YgdGhlIGN1cnJlbnQgbW9kZWxcbiAgICAgICAgY29uc3Qgb2xkTW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWwpKTtcblxuICAgICAgICAvLyBwYXNzIHRoZSBtb2RlbCBjb3B5IGludG8gdXBkYXRpbmcgY29tcG9uZW50J3MgY2FsbGJhY2tcbiAgICAgICAgLy8gdmlldyB3aWxsIHRoZW4gZGVjaWRlIHdoYXQgc2hvdWxkIGJlIG1vZGlmaWVkIGJhc2VkIG9uIHRoZSB1c2VyJ3MgaW5wdXRcbiAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBtb2RlbFVwZGF0ZUZ1bmMob2xkTW9kZWwpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB0aGUgbmV3IHZhbHVlcyByZXR1cm5lZCBmcm9tIHRoZSBjYWxsYmFja1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxba2V5XSA9IG5ld01vZGVsW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnbyB0aHJvdWdoIHRoZSBsaXN0IG9mIGxpc3RlbmluZyB2aWV3IGNvbXBvbmVudHNcbiAgICAgICAgZm9yIChsZXQgcHVic3ViIG9mIHRoaXMucHVic3Vicykge1xuICAgICAgICAgICAgLy8gYXNrIHRoZW0gaWYgdGhleSB3YW50IHRvIHVwZGF0ZSBiYXNlZCBvbiB0aGUgb2xkIG1vZGVsIGFuZCBuZXdcbiAgICAgICAgICAgIGlmIChwdWJzdWIuc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNvbnRhaW5lciBvZiB0aGUgdmlldyBjb21wb25lbmV0XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHB1YnN1Yi5nZXRFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjb21wb25lbnQgd2l0aCB0aGUgbmV3IHZlcnNpb25cbiAgICAgICAgICAgICAgICAvLyByZW5kZXJzIHJldHVybiB0aGUgbmV3IGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKHB1YnN1Yi5yZW5kZXIodGhpcy5tb2RlbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCB7IHBsYWNlU2hpcFJhbmRvbWx5IH0gZnJvbSBcIi4vR2FtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBSSBleHRlbmRzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHN1cGVyLm5hbWUgPSBcIkFJXCI7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXV0b0ZpbGxCb2FyZCgpO1xuICAgIH1cblxuICAgIGF1dG9GaWxsQm9hcmQoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnNoaXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgbmV3R2FtZWJvYXJkLCBuZXdTaGlwIH0gPSBwbGFjZVNoaXBSYW5kb21seShcbiAgICAgICAgICAgICAgICBzaGlwLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZCA9IG5ld0dhbWVib2FyZDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IEFJIGZyb20gXCIuL0FJXCI7XG5cbi8vIG1vZGVsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIHRoaXMuQUkgPSBuZXcgQUkoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHVybiA9IFwicGxheWVyXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBcImhvbWVQYWdlXCI7XG4gICAgICAgIHRoaXMubmFtZVBhZ2VJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZU1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWxsU2hpcHNQbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcm9wUXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy52aWRlb1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhc3RDbGlja2VkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXdHYW1lU3RhdGUgPSBudWxsO1xuICAgIH1cbn1cblxuLy8gYXNzdW1lcyByb3cgLyBjb2wgYXJlIHRoZSBiYXNlIHRpbGUgb2YgdGhlIHNoaXBcbmZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoc2hpcCwgcm93LCBjb2wsIGdhbWVib2FyZCkge1xuICAgIC8vIGNoZWNrcyBpZiBhbGwgaG92ZXJlZCB0aWxlcyBhcmUgb24gdGhlIGJvYXJkXG5cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUgJiYgY29sICsgc2hpcC5zaXplID4gZ2FtZWJvYXJkLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IGZhbHNlICYmIHJvdyArIHNoaXAuc2l6ZSA+IGdhbWVib2FyZC5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaXRlcmF0ZXMgb3ZlciBldmVyeSB0aWxlXG4gICAgLy8gY2hlY2tzIGlmIHRoZSBnYW1lYm9hcmQgdGlsZSBleGlzdHNcbiAgICAvLyBhbmQgaWYgdGhlIHRpbGUgY29udGFpbnMgYSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3crKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBnYW1lYm9hcmQpIHtcbiAgICAvLyBjcmVhdGVzIGEgY29weSBvZiBlYWNoIHRvIG1vZGlmeSBhbmQgcmV0dXJuXG4gICAgbGV0IG5ld0dhbWVib2FyZCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ2FtZWJvYXJkKSk7XG4gICAgbGV0IG5ld1NoaXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNoaXApKTtcblxuICAgIC8vIHZlcmlmaWVzIHRoZSBzaGlwIHRpbGUgZXhpc3RzXG4gICAgLy8gYW5kIGRvZXNuJ3QgY29udGFpbiBhIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSsrKSB7XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XSkge1xuICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldHMgdGlsZS5zaGlwIHRvIHRydWVcbiAgICAgICAgICAgICAgICAgICAgbmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2F2ZXMgdGlsZSByZWZlcmVuY2UgdG8gc2hpcFxuICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLnRpbGVzLnB1c2gobmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIHNob3VsZG4ndCBoYXBwZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9O1xufVxuXG4vLyByZWN1cnNpdmVseSB0cmllcyB0byBwbGFjZSBhIHNoaXAgcmFuZG9tbHkgdW50aWwgcGxhY2VtZW50IGlzIHZhbGlkXG4vLyByZXR1cm5zIHRoZSBuZXcgYm9hcmQgYW5kIG5ldyBzaGlwXG5mdW5jdGlvbiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpIHtcbiAgICAvL1xuICAgIHNoaXAuaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcblxuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lYm9hcmQuc2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVib2FyZC5zaXplKTtcblxuICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkUGxhY2VtZW50KHNoaXAsIHJhbmRSb3csIHJhbmRDb2wsIGdhbWVib2FyZCk7XG5cbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKHNoaXAsIHJhbmRSb3csIHJhbmRDb2wsIGdhbWVib2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcFJhbmRvbWx5KHNoaXAsIGdhbWVib2FyZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FsbFNoaXBzUGxhY2VkKHBsYXllcikge1xuICAgIHJldHVybiBwbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA8IDE7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Qm9hcmQoZ2FtZWJvYXJkKSB7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZ2FtZWJvYXJkLnNpemU7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdhbWVib2FyZC5zaXplOyBjb2wrKykge1xuICAgICAgICAgICAgZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gbnVsbDtcbiAgICAgICAgICAgIGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0udGlsZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2hpcHMocGxheWVyKSB7XG4gICAgd2hpbGUgKHBsYXllci5nYW1lYm9hcmQuc2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzWzBdLnRpbGVzID0gW107XG4gICAgICAgIHBsYXllci5zaGlwUXVldWUucHVzaChwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLnNoaWZ0KCkpO1xuICAgIH1cbn1cblxuLy8gdXBkYXRlIHRoZSBnYW1lYm9hcmQncyB0aWxlU3RhdXNcbi8vIGlmIHNoaXAsICsraGl0c1xuLy8gY2hlY2sgc3Vua1xuLy8gaWYgc3VuaywgY2hlY2sgYWxsIHN1bmtcbi8vIGlmIGFsbCBzdW5rIHVwZGF0ZSBnYW1lU3RhdGVcbmZ1bmN0aW9uIGF0dGFjayhyb3csIGNvbCwgZ2FtZWJvYXJkKSB7XG4gICAgY29uc3QgdGlsZSA9IGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF07XG5cbiAgICBpZiAodGlsZS50aWxlU3RhdHVzICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlRpbGUgYWxyZWFkeSBhdHRhY2tlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2hpcCA9IG51bGw7XG5cbiAgICBpZiAodGlsZS5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgIHRpbGUudGlsZVN0YXR1cyA9IFwiaGl0XCI7XG4gICAgICAgIHNoaXAgPSBnZXRTaGlwKHJvdywgY29sLCBnYW1lYm9hcmQpO1xuICAgICAgICBzaGlwLmhpdHMrKztcbiAgICAgICAgaWYgKGNoZWNrU2hpcFN1bmsoc2hpcCkpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aWxlLnRpbGVTdGF0dXMgPSBcIm1pc3NcIjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aWxlU3RhdHVzOiB0aWxlLnRpbGVTdGF0dXMsXG4gICAgICAgIHNoaXAsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTaGlwU3VuayhzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAuaGl0cyA9PT0gc2hpcC5zaXplO1xufVxuXG5mdW5jdGlvbiBjaGVja0FsbFNoaXBzU3VuayhzaGlwTGlzdCkge1xuICAgIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwTGlzdCkge1xuICAgICAgICBpZiAoIWNoZWNrU2hpcFN1bmsoc2hpcCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNoaXAoY1JvdywgY0NvbCwgZ2FtZWJvYXJkKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIGdhbWVib2FyZC5zaGlwcykge1xuICAgICAgICBmb3IgKGNvbnN0IHsgcm93LCBjb2wgfSBvZiBzaGlwLnRpbGVzKSB7XG4gICAgICAgICAgICBpZiAoY1JvdyA9PT0gcm93ICYmIGNDb2wgPT09IGNvbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiByYW5kb21JbmRleCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG59XG5cbmZ1bmN0aW9uIEFJTW92ZUVhc3kocGxheWVyR2FtZWJvYXJkKSB7XG4gICAgY29uc3QgcmFuZFJvdyA9IHJhbmRvbUluZGV4KCk7XG4gICAgY29uc3QgcmFuZENvbCA9IHJhbmRvbUluZGV4KCk7XG4gICAgY29uc3QgcmFuZFRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcmFuZFJvd11bcmFuZENvbF07XG4gICAgaWYgKHJhbmRUaWxlLnRpbGVTdGF0dXMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEFJTW92ZUVhc3kocGxheWVyR2FtZWJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdHRhY2tSZXNwb25zZSA9IGF0dGFjayhyYW5kUm93LCByYW5kQ29sLCBwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgICByZXR1cm4geyByb3c6IHJhbmRSb3csIGNvbDogcmFuZENvbCwgYXR0YWNrUmVzcG9uc2UgfTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIEFJTW92ZU1lZGl1bShwbGF5ZXJHYW1lYm9hcmQpIHtcbiAgICBjb25zdCB1bmF0dGFja2VkVGlsZXMgPSBbXTtcbiAgICBjb25zdCBhdHRhY2tlZFRpbGVzID0gW107XG4gICAgY29uc3QgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzID0gW107XG5cbiAgICAvLyBDb2xsZWN0IGFsbCBoaXQgdGlsZXMgYW5kIHRoZWlyIGFkamFjZW50IHVuYXR0YWNrZWQgdGlsZXNcbiAgICBjb25zdCBoaXRUaWxlcyA9IFtdO1xuICAgIGNvbnN0IGFkamFjZW50VW5hdHRhY2tlZFRpbGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHBsYXllckdhbWVib2FyZC5zaXplOyByb3crKykge1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgaWYgKHRpbGUudGlsZVN0YXR1cyA9PT0gXCJoaXRcIikge1xuICAgICAgICAgICAgICAgIGhpdFRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRqYWNlbnRUaWxlcyA9IGdldEFkamFjZW50VGlsZXMocGxheWVyR2FtZWJvYXJkLCB0aWxlKTtcbiAgICAgICAgICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLmJvYXJkW2FkalRpbGUucm93XVthZGpUaWxlLmNvbF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGlsZVN0YXR1cyA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmFkZChhZGpUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1bmF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZS50aWxlU3RhdHVzID09PSBcIm1pc3NcIikge1xuICAgICAgICAgICAgICAgIGF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnB1c2godGlsZSk7XG4gICAgfSk7XG5cbiAgICBsZXQgdGFyZ2V0VGlsZTtcblxuICAgIGlmICh1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRhcmdldCBhIG5ldyByYW5kb20gdGlsZVxuXG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5hdHRhY2tlZFRpbGVzLmxlbmd0aCk7XG4gICAgICAgIHRhcmdldFRpbGUgPSB1bmF0dGFja2VkVGlsZXNbcmFuZG9tSW5kZXhdO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFja1Jlc3BvbnNlID0gYXR0YWNrKFxuICAgICAgICB0YXJnZXRUaWxlLnJvdyxcbiAgICAgICAgdGFyZ2V0VGlsZS5jb2wsXG4gICAgICAgIHBsYXllckdhbWVib2FyZFxuICAgICk7XG5cbiAgICByZXR1cm4geyByb3c6IHRhcmdldFRpbGUucm93LCBjb2w6IHRhcmdldFRpbGUuY29sLCBhdHRhY2tSZXNwb25zZSB9O1xufVxuXG5mdW5jdGlvbiBnZXRBZGphY2VudFRpbGVzKHBsYXllckdhbWVib2FyZCwgdGlsZSkge1xuICAgIGNvbnN0IGFkamFjZW50VGlsZXMgPSBbXTtcbiAgICBpZiAodGlsZS5yb3cgPiAwKSB7XG4gICAgICAgIGFkamFjZW50VGlsZXMucHVzaChwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbdGlsZS5yb3cgLSAxXVt0aWxlLmNvbF0pOyAvLyBVcFxuICAgIH1cbiAgICBpZiAodGlsZS5yb3cgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZSAtIDEpIHtcbiAgICAgICAgYWRqYWNlbnRUaWxlcy5wdXNoKHBsYXllckdhbWVib2FyZC5ib2FyZFt0aWxlLnJvdyArIDFdW3RpbGUuY29sXSk7IC8vIERvd25cbiAgICB9XG4gICAgaWYgKHRpbGUuY29sID4gMCkge1xuICAgICAgICBhZGphY2VudFRpbGVzLnB1c2gocGxheWVyR2FtZWJvYXJkLmJvYXJkW3RpbGUucm93XVt0aWxlLmNvbCAtIDFdKTsgLy8gTGVmdFxuICAgIH1cbiAgICBpZiAodGlsZS5jb2wgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZSAtIDEpIHtcbiAgICAgICAgYWRqYWNlbnRUaWxlcy5wdXNoKHBsYXllckdhbWVib2FyZC5ib2FyZFt0aWxlLnJvd11bdGlsZS5jb2wgKyAxXSk7IC8vIFJpZ2h0XG4gICAgfVxuICAgIHJldHVybiBhZGphY2VudFRpbGVzO1xufVxuXG4vLyBUT0RPOiBtYWtlIGhhcmQgQUkgYWN0dWFsbHkgd29yayBEOlxuZnVuY3Rpb24gQUlNb3ZlSGFyZChwbGF5ZXJHYW1lYm9hcmQpIHtcbiAgICBjb25zdCB1bmF0dGFja2VkVGlsZXMgPSBbXTtcbiAgICBjb25zdCBhdHRhY2tlZFRpbGVzID0gW107XG4gICAgY29uc3QgdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzID0gW107XG5cbiAgICAvLyBDb2xsZWN0IGFsbCBoaXQgdGlsZXMgYW5kIHRoZWlyIGFkamFjZW50IHVuYXR0YWNrZWQgdGlsZXNcbiAgICBjb25zdCBoaXRUaWxlcyA9IFtdO1xuICAgIGNvbnN0IGFkamFjZW50VW5hdHRhY2tlZFRpbGVzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHBsYXllckdhbWVib2FyZC5zaXplOyByb3crKykge1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBwbGF5ZXJHYW1lYm9hcmQuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgaWYgKHRpbGUudGlsZVN0YXR1cyA9PT0gXCJoaXRcIikge1xuICAgICAgICAgICAgICAgIGhpdFRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRqYWNlbnRUaWxlcyA9IGdldEFkamFjZW50VGlsZXMocGxheWVyR2FtZWJvYXJkLCB0aWxlKTtcbiAgICAgICAgICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLmJvYXJkW2FkalRpbGUucm93XVthZGpUaWxlLmNvbF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGlsZVN0YXR1cyA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkamFjZW50VW5hdHRhY2tlZFRpbGVzLmFkZChhZGpUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aWxlLnRpbGVTdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1bmF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZS50aWxlU3RhdHVzID09PSBcIm1pc3NcIikge1xuICAgICAgICAgICAgICAgIGF0dGFja2VkVGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBhZGphY2VudCB1bmF0dGFja2VkIHRpbGVzIHRvIGJhY2t0cmFjayBsaXN0XG4gICAgYWRqYWNlbnRVbmF0dGFja2VkVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICB1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMucHVzaCh0aWxlKTtcbiAgICB9KTtcblxuICAgIGxldCB0YXJnZXRUaWxlO1xuICAgIGxldCBoaXRTaGlwID0gbnVsbDtcblxuICAgIGlmICh1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YXJnZXRUaWxlID0gdW5hdHRhY2tlZEJhY2t0cmFja1RpbGVzLnBvcCgpO1xuICAgICAgICBjb25zdCBhZGphY2VudFRpbGVzID0gZ2V0QWRqYWNlbnRUaWxlcyhwbGF5ZXJHYW1lYm9hcmQsIHRhcmdldFRpbGUpO1xuICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuYm9hcmRbYWRqVGlsZS5yb3ddW2FkalRpbGUuY29sXS50aWxlU3RhdHVzID09PVxuICAgICAgICAgICAgICAgICAgICBcImhpdFwiICYmXG4gICAgICAgICAgICAgICAgaGl0U2hpcCA9PT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaGl0U2hpcCA9IHBsYXllckdhbWVib2FyZC5ib2FyZFthZGpUaWxlLnJvd11bYWRqVGlsZS5jb2xdLnNoaXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRhcmdldCBhIG5ldyByYW5kb20gdGlsZVxuXG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5hdHRhY2tlZFRpbGVzLmxlbmd0aCk7XG4gICAgICAgIHRhcmdldFRpbGUgPSB1bmF0dGFja2VkVGlsZXNbcmFuZG9tSW5kZXhdO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGF0dGFjayhcbiAgICAgICAgdGFyZ2V0VGlsZS5yb3csXG4gICAgICAgIHRhcmdldFRpbGUuY29sLFxuICAgICAgICBwbGF5ZXJHYW1lYm9hcmRcbiAgICApO1xuXG4gICAgaWYgKGF0dGFja1Jlc3VsdCA9PT0gXCJoaXRcIiAmJiBoaXRTaGlwKSB7XG4gICAgICAgIGNvbnN0IHNoaXBTdW5rID0gaGl0U2hpcC5zdW5rO1xuICAgICAgICBpZiAoc2hpcFN1bmspIHtcbiAgICAgICAgICAgIGhpdFNoaXAgPSBudWxsO1xuICAgICAgICAgICAgYWRqYWNlbnRVbmF0dGFja2VkVGlsZXMuY2xlYXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFkamFjZW50VGlsZXMgPSBnZXRBZGphY2VudFRpbGVzKHBsYXllckdhbWVib2FyZCwgdGFyZ2V0VGlsZSk7XG4gICAgICAgICAgICBhZGphY2VudFRpbGVzLmZvckVhY2goKGFkalRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5ib2FyZFthZGpUaWxlLnJvd11bYWRqVGlsZS5jb2xdXG4gICAgICAgICAgICAgICAgICAgICAgICAudGlsZVN0YXR1cyA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBhZGphY2VudFVuYXR0YWNrZWRUaWxlcy5hZGQoYWRqVGlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0YWNrUmVzdWx0O1xufVxuXG5leHBvcnQge1xuICAgIGlzVmFsaWRQbGFjZW1lbnQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHBsYWNlU2hpcFJhbmRvbWx5LFxuICAgIGNoZWNrQWxsU2hpcHNQbGFjZWQsXG4gICAgcmVzZXRCb2FyZCxcbiAgICByZXNldFNoaXBzLFxuICAgIGF0dGFjayxcbiAgICBjaGVja1NoaXBTdW5rLFxuICAgIGNoZWNrQWxsU2hpcHNTdW5rLFxuICAgIEFJTW92ZUVhc3ksXG4gICAgQUlNb3ZlTWVkaXVtLFxuICAgIEFJTW92ZUhhcmQsXG59O1xuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4vVGlsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICAvLyB0aGlzLm9yaWVudGF0aW9uID0gdHJ1ZTsgLy90cnVlIHZlcnRpY2FsLCBmYWxzZSBob3Jpem9udGFsXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ldyBUaWxlKHJvdywgY29sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG4gICAgICAgIHRoaXMuc2hpcFF1ZXVlID0gW1xuICAgICAgICAgICAgbmV3IFNoaXAoNSwgXCJDYXJyaWVyXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoNCwgXCJCYXR0bGVzaGlwXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoMywgXCJEZXN0cm95ZXJcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCgzLCBcIlN1Ym1hcmluZVwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDIsIFwiUGF0cm9sLUJvYXRcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5zaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy50aWxlU3RhdHVzID0gbnVsbDtcbiAgICAgICAgLy8gbnVsbCBIIE1cbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcblxuaW1wb3J0IEhvbWVQYWdlIGZyb20gXCIuL2hvbWVQYWdlL0hvbWVQYWdlLmpzXCI7XG5pbXBvcnQgTWFwUGFnZSBmcm9tIFwiLi9tYXBQYWdlL01hcFBhZ2UuanNcIjtcbmltcG9ydCBHYW1lUGFnZSBmcm9tIFwiLi9nYW1lUGFnZS9HYW1lUGFnZS5qc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICAvLyBwYXNzIHBhcmFtZW50ZXIncyB0byBQdWJTdWJJbnRlcmZhY2UncyBjb25zdHJ1Y3RvclxuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgdXBkYXRlcyBpZiB0aGUgbW9kZWwncyBjdXJyZW50UGFnZSBoYXMgY2hhbmdlZFxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG9sZE1vZGVsLmN1cnJlbnRQYWdlICE9PSBuZXdNb2RlbC5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBjdXJyZW50UGFnZSB9KSB7XG4gICAgICAgIGNvbnN0IGFwcEVsZW1lbnQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgaWQ6IFwiYXBwXCIgfSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlID09PSBcImhvbWVQYWdlXCIpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgcGFnZSBjb21wb25lbnQsIHBhc3MgaXQgdGhlIHZpZXdNb2RlbCBhbmQgaXQncyBjb250YWluZXJcbiAgICAgICAgICAgIG5ldyBIb21lUGFnZSh0aGlzLnZpZXdNb2RlbCwgYXBwRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT09IFwibWFwUGFnZVwiKSB7XG4gICAgICAgICAgICBuZXcgTWFwUGFnZSh0aGlzLnZpZXdNb2RlbCwgYXBwRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT09IFwiZ2FtZVBhZ2VcIikge1xuICAgICAgICAgICAgbmV3IEdhbWVQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGUgbmV3IHZpZXcgY29tcG9uZW50XG4gICAgICAgIHJldHVybiBhcHBFbGVtZW50O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsZW0oY29udGVudCwgdmVyc2lvbiA9IDEpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbnRlbnRbXCJwcm9wXCJdKTtcbiAgICBsZXQgdGV4dCA9IGNvbnRlbnRbXCJ0ZXh0Q29udGVudFwiXTtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfVxuICAgIGxldCBpZCA9IGNvbnRlbnRbXCJpZFwiXTtcbiAgICBpZiAoaWQpIHtcbiAgICAgICAgZWwuaWQgPSBpZDtcbiAgICB9XG4gICAgbGV0IGNsYXNzTmFtZSA9IGNvbnRlbnRbXCJjbGFzc05hbWVcIl07XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuICAgIGxldCBIVE1MID0gY29udGVudFtcImlubmVySFRNTFwiXTtcbiAgICBpZiAoSFRNTCkge1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBIVE1MO1xuICAgIH1cbiAgICBsZXQgc3JjID0gY29udGVudFtcInNyY1wiXTtcbiAgICBpZiAoc3JjKSB7XG4gICAgICAgIGVsLnNyYyA9IHNyYztcbiAgICB9XG4gICAgbGV0IGZvckkgPSBjb250ZW50W1wiZm9yXCJdO1xuICAgIGlmIChmb3JJKSB7XG4gICAgICAgIGVsLmZvciA9IGZvckk7XG4gICAgfVxuICAgIGxldCB0eXBlID0gY29udGVudFtcInR5cGVcIl07XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgZWwudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGxldCBuYW1lID0gY29udGVudFtcIm5hbWVcIl07XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWwubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IGNvbnRlbnRbXCJ2YWx1ZVwiXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gY29udGVudFtcInBsYWNlaG9sZGVyXCJdO1xuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICBlbC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBsZXQgc3BlbGxjaGVjayA9IGNvbnRlbnRbXCJzcGVsbGNoZWNrXCJdO1xuICAgIGlmIChzcGVsbGNoZWNrKSB7XG4gICAgICAgIGVsLnNwZWxsY2hlY2sgPSBzcGVsbGNoZWNrO1xuICAgIH1cbiAgICBsZXQgcmVxdWlyZWQgPSBjb250ZW50W1wicmVxdWlyZWRcIl07XG4gICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgIGVsLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGNoZWNrZWQgPSBjb250ZW50W1wiY2hlY2tlZFwiXTtcbiAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICBlbC5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGhyZWYgPSBjb250ZW50W1wiaHJlZlwiXTtcbiAgICBpZiAoaHJlZikge1xuICAgICAgICBlbC5ocmVmID0gaHJlZjtcbiAgICB9XG4gICAgbGV0IGF1dG9wbGF5ID0gY29udGVudFtcImF1dG9wbGF5XCJdO1xuICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICBlbC5hdXRvcGxheSA9IHRydWU7XG4gICAgfVxuICAgIGxldCBtdXRlZCA9IGNvbnRlbnRbXCJtdXRlZFwiXTtcbiAgICBpZiAobXV0ZWQpIHtcbiAgICAgICAgZWwubXV0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgbG9vcCA9IGNvbnRlbnRbXCJsb29wXCJdO1xuICAgIGlmIChsb29wKSB7XG4gICAgICAgIGVsLmxvb3AgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgZHJhZ2dhYmxlID0gY29udGVudFtcImRyYWdnYWJsZVwiXTtcbiAgICBpZiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGVsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgfVxuICAgIGxldCBtaW4gPSBjb250ZW50W1wibWluXCJdO1xuICAgIGlmIChtaW4pIHtcbiAgICAgICAgZWwubWluID0gbWluO1xuICAgIH1cbiAgICBsZXQgbWF4ID0gY29udGVudFtcIm1heFwiXTtcbiAgICBpZiAobWF4KSB7XG4gICAgICAgIGVsLm1heCA9IG1heDtcbiAgICB9XG4gICAgbGV0IHN0ZXAgPSBjb250ZW50W1wic3RlcFwiXTtcbiAgICBpZiAoc3RlcCkge1xuICAgICAgICBlbC5zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgbGV0IGNoaWxkcmVuID0gY29udGVudFtcImNoaWxkcmVuXCJdO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKHZlcnNpb24gPT09IDIpIHtcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChlbGVtKGNoaWxkLCAyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWw7XG59XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsZW0oY29udGVudCkge1xuLy8gICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb250ZW50LnByb3ApO1xuLy8gICAgIE9iamVjdC5lbnRyaWVzKGNvbnRlbnQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuLy8gICAgICAgICBpZiAoa2V5ID09PSBcImNoaWxkcmVuXCIpIHtcbi8vICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4vLyAgICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoY2hpbGQpID0+IGVsLmFwcGVuZENoaWxkKGVsZW0oY2hpbGQpKSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbi8vICAgICAgICAgICAgIGVsW2tleV0gPSB2YWx1ZTtcbi8vICAgICAgICAgfVxuLy8gICAgIH0pO1xuLy8gICAgIHJldHVybiBlbDtcbi8vIH1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZVwiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBFbGVtXCI7XG5pbXBvcnQge1xuICAgIGF0dGFjayxcbiAgICBjaGVja0FsbFNoaXBzU3VuayxcbiAgICBBSU1vdmVFYXN5LFxuICAgIEFJTW92ZU1lZGl1bSxcbiAgICBBSU1vdmVIYXJkLFxufSBmcm9tIFwiLi4vLi4vZ2FtZUNvbXBvbmVudHMvR2FtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBSUJvYXJkRWxlbSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50LCBkcmFnRW50ZXIpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5kcmFnRW50ZXIgPSBkcmFnRW50ZXI7XG4gICAgICAgIHRoaXMuYm9hcmRTaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQm9hcmQobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkQm9hcmQobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93R3JpZCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hhZG93R3JpZFwiIH0pO1xuICAgICAgICBjb25zdCBib2FyZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJib2FyZFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtzaGFkb3dHcmlkXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hcmRTaXplID0gbW9kZWwuQUkuZ2FtZWJvYXJkLnNpemU7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gW107XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuYm9hcmRTaXplOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5ib2FyZFNpemU7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiY2VsbFwiIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGVSZWYgPSBtb2RlbC5BSS5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgIC8vIHNldHMgZGF0YSB2YWx1ZXMgZm9yIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAgICAgICAgICAgLy8gZGVsYXkgdGhlIGxpc3RlbmVyIHRvIHByZXZlbnQgc3BhbVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZChlLCByb3csIGNvbCwgbW9kZWwsIGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RDbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdENsaWNrZWQucm93ID09PSByb3cgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdENsaWNrZWQuY29sID09PSBjb2xcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJwdWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGlsZVJlZi50aWxlU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgaGl0IG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtaXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBtaXNzIG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdGhlIGNlbGwgdG8gdGhlIGJvYXJkIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC8vIGFkZHMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBjZWxsIHRvIHRoZSBjZWxscyBhcnJheVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XG5cbiAgICAgICAgbW9kZWwuQUkuZ2FtZWJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xpY2tlZEV2ZW50KGluZGV4LCBjbGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VUaWxlID0gc2hpcC50aWxlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRUaWxlID0gc2hpcC50aWxlc1tzaGlwLnNpemUgLSAxXTtcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5lbGVtZW50LnN0eWxlLmdyaWRBcmVhID0gYCR7YmFzZVRpbGUucm93ICsgMX0gLyAke1xuICAgICAgICAgICAgICAgICAgICBiYXNlVGlsZS5jb2wgKyAxXG4gICAgICAgICAgICAgICAgfSAvICR7ZW5kVGlsZS5yb3cgKyAyfSAvICR7ZW5kVGlsZS5jb2wgKyAyfWA7XG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRTaGlwXCIpO1xuICAgICAgICAgICAgICAgIHNoaXBFbGVtLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwib25Cb2FyZFwiKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNoYWRvd0dyaWQuYXBwZW5kQ2hpbGQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJvYXJkQm9yZGVyID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJib2FyZEJvcmRlclwiIH0pO1xuICAgICAgICBib2FyZEJvcmRlci5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZEJvcmRlcjtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhlLCByb3csIGNvbCwgY2VsbCkge1xuICAgICAgICB0aGlzLmxhc3RDbGlja2VkID0geyByb3c6IHJvdywgY29sOiBjb2wgfTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKTtcblxuICAgICAgICAgICAgY29uc3QgQUlnYW1lYm9hcmQgPSBuZXdNb2RlbC5BSS5nYW1lYm9hcmQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGF0dFJlc3BvbnNlID0gYXR0YWNrKHJvdywgY29sLCBBSWdhbWVib2FyZCk7XG5cbiAgICAgICAgICAgIG5ld01vZGVsLmxhc3RDbGlja2VkID0geyByb3c6IHJvdywgY29sOiBjb2wgfTtcblxuICAgICAgICAgICAgaWYgKCFhdHRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IFwiQWxyZWFkeSBhdHRhY2tlZCB0aGVyZSBzaXJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0UmVzcG9uc2UudGlsZVN0YXR1cyA9PT0gXCJoaXRcIikge1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IFwiRGlyZWN0IGhpdCBzaXIhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0UmVzcG9uc2UudGlsZVN0YXR1cyA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBcIk5vdGhpbmcgdGhlcmUgc2lyIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVuZW15RGVsYXkgPSAxNTAwO1xuICAgICAgICAgICAgaWYgKGF0dFJlc3BvbnNlLnNoaXApIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0UmVzcG9uc2Uuc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBXZSd2ZSBzdW5rIHRoZWlyICR7YXR0UmVzcG9uc2Uuc2hpcC5uYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgIGVuZW15RGVsYXkgPSAyNTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2xpY2tlZFRpbGUgPSBBSWdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF07XG4gICAgICAgICAgICBpZiAoY2hlY2tBbGxTaGlwc1N1bmsoQUlnYW1lYm9hcmQuc2hpcHMpKSB7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJwbGF5ZXJXaW5zXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbDEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbDEpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobmV3TW9kZWwuQUkuZGlmZmljdWx0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVhc3lcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5sYXN0Q2xpY2tlZCA9IEFJTW92ZUVhc3kocGxheWVyR2FtZWJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtZWRpdW1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5sYXN0Q2xpY2tlZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFJTW92ZU1lZGl1bShwbGF5ZXJHYW1lYm9hcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmxhc3RDbGlja2VkID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQUlNb3ZlTWVkaXVtKHBsYXllckdhbWVib2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5sYXN0Q2xpY2tlZC5hdHRhY2tSZXNwb25zZS50aWxlU3RhdHVzID09PSBcImhpdFwiXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gXCJXZSdyZSB0YWtpbmcgb24gd2F0ZXIgc2lyIVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmxhc3RDbGlja2VkLmF0dGFja1Jlc3BvbnNlLnRpbGVTdGF0dXMgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1pc3NcIlxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IFwiVGhlIGVuZW15IG11c3QgYmUgYmxpbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3TW9kZWwubGFzdENsaWNrZWQuYXR0YWNrUmVzcG9uc2Uuc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld01vZGVsLmxhc3RDbGlja2VkLmF0dGFja1Jlc3BvbnNlLnNoaXAuc3Vuaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBUaGV5J3ZlIHN1bmsgb3VyICR7bmV3TW9kZWwubGFzdENsaWNrZWQuYXR0YWNrUmVzcG9uc2Uuc2hpcC5uYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tBbGxTaGlwc1N1bmsocGxheWVyR2FtZWJvYXJkLnNoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJBSVdpbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGVuZW15RGVsYXkpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENlbGwocm93LCBjb2wpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcm93IDwgMCB8fFxuICAgICAgICAgICAgcm93ID49IHRoaXMuYm9hcmRTaXplIHx8XG4gICAgICAgICAgICBjb2wgPCAwIHx8XG4gICAgICAgICAgICBjb2wgPj0gdGhpcy5ib2FyZFNpemVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxzW3JvdyAqIHRoaXMuYm9hcmRTaXplICsgY29sXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQge1xuICAgIHBsYWNlU2hpcFJhbmRvbWx5LFxuICAgIGNoZWNrQWxsU2hpcHNQbGFjZWQsXG4gICAgcmVzZXRCb2FyZCxcbiAgICByZXNldFNoaXBzLFxufSBmcm9tIFwiLi4vLi4vZ2FtZUNvbXBvbmVudHMvR2FtZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgdHlwZSkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ld01vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwicm90YXRlXCI6XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmFsbFNoaXBzUGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkU3RhcnRCdXR0b24obW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRSb3RhdGVCdXR0b24obW9kZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF1dG9QbGFjZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXV0b1BsYWNlQnV0dG9uKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRvXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRVbmRvQnV0dG9uKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgXCJzdGFydFwiOlxuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLmJ1aWxkU3RhcnRCdXR0b24obW9kZWwpO1xuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRSb3RhdGVCdXR0b24obW9kZWwpIHtcbiAgICAgICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyb3RhdGVCdXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLmlzSG9yaXpvbnRhbCA9XG4gICAgICAgICAgICAgICAgICAgICFuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uSG91c2luZyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJsZWZ0QnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3JvdGF0ZUJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIlJvdGF0ZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbkhvdXNpbmc7XG4gICAgfVxuXG4gICAgYnVpbGRBdXRvUGxhY2VCdXR0b24obW9kZWwpIHtcbiAgICAgICAgY29uc3QgYXV0b1BsYWNlQnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXV0b1BsYWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5kcm9wUXVldWUucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSkpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNldEJvYXJkKG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICByZXNldFNoaXBzKG5ld01vZGVsLnBsYXllcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmV3R2FtZWJvYXJkLCBuZXdTaGlwIH0gPSBwbGFjZVNoaXBSYW5kb21seShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQgPSBuZXdHYW1lYm9hcmQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhbGxQbGFjZWQgPSBjaGVja0FsbFNoaXBzUGxhY2VkKG5ld01vZGVsLnBsYXllcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWxsUGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmFsbFNoaXBzUGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYEdvb2QgbHVjayBBZG1pcmFsICR7bmV3TW9kZWwucGxheWVyLm5hbWV9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYXV0b1BsYWNlSG91c2luZyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtaWRkbGVCdXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbYXV0b1BsYWNlQnV0dG9uXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQXV0by1wbGFjZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGF1dG9QbGFjZUhvdXNpbmc7XG4gICAgfVxuXG4gICAgYnVpbGRVbmRvQnV0dG9uKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHVuZG9CdXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtlbGVtKHsgcHJvcDogXCJzcGFuXCIgfSldLFxuICAgICAgICB9KTtcblxuICAgICAgICB1bmRvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAobW9kZWwuZHJvcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBvbGRNb2RlbC5kcm9wUXVldWUucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB1bmRvQnV0dG9uSG91c2luZyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyaWdodEJ1dHRvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt1bmRvQnV0dG9uXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiVW5kb1wiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHVuZG9CdXR0b25Ib3VzaW5nO1xuICAgIH1cblxuICAgIGJ1aWxkU3RhcnRCdXR0b24obW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRCdXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtlbGVtKHsgcHJvcDogXCJzcGFuXCIgfSldLFxuICAgICAgICB9KTtcblxuICAgICAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmRyb3BRdWV1ZS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKSk7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJpbkdhbWVcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRCdXR0b25Ib3VzaW5nID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbc3RhcnRCdXR0b25dLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJCZWdpblwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YXJ0QnV0dG9uSG91c2luZztcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNZXNzYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiBvbGRNb2RlbC5zdGF0ZU1lc3NhZ2UgIT09IG5ld01vZGVsLnN0YXRlTWVzc2FnZTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBzdGF0ZU1lc3NhZ2UgfSkge1xuICAgICAgICByZXR1cm4gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzdGFnZVBhcmFcIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBzdGF0ZU1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIGltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZFZpZXcuanNcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuaW1wb3J0IHdhdmVzQWx0IGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3dhdmVzQWx0LmpwZ1wiO1xuaW1wb3J0IFwiLi4vLi4vLi4vQ1NTL2dhbWVwYWdlLmNzc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW0uanNcIjtcbmltcG9ydCBHYW1lTWVzc2FnZSBmcm9tIFwiLi9HYW1lTWVzc2FnZS5qc1wiO1xuaW1wb3J0IFNoaXBRdWV1ZSBmcm9tIFwiLi9TaGlwUXVldWUuanNcIjtcbmltcG9ydCBwbGF5ZXJCb2FyZEVsZW0gZnJvbSBcIi4vcGxheWVyQm9hcmRFbGVtLmpzXCI7XG5pbXBvcnQgUmFkYXIgZnJvbSBcIi4vUmFkYXIuanNcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4vQnV0dG9uLmpzXCI7XG5pbXBvcnQgT3B0aW9uc01lbnUgZnJvbSBcIi4vT3B0aW9uc01lbnUuanNcIjtcbmltcG9ydCBTY29yZUNvbnRhaW5lciBmcm9tIFwiLi9TY29yZUNvbnRhaW5lci5qc1wiO1xuaW1wb3J0IEFJQm9hcmRFbGVtIGZyb20gXCIuL0FJQm9hcmRFbGVtLmpzXCI7XG5pbXBvcnQgd29vZCBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy93b29kLmpwZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUGFnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKG9sZE1vZGVsLmdhbWVTdGF0ZSAhPT0gbmV3TW9kZWwuZ2FtZVN0YXRlICYmXG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuY3VycmVudFBhZ2UgPT09IFwiZ2FtZVBhZ2VcIikgfHxcbiAgICAgICAgICAgIG9sZE1vZGVsLnZpZGVvUGxheWluZyAhPT0gbmV3TW9kZWwudmlkZW9QbGF5aW5nIHx8XG4gICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPT09IFwicGxheWVyV2luc1wiIHx8XG4gICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPT09IFwiQUlXaW5zXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgc3dpdGNoIChtb2RlbC5nYW1lU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbGFjZVNoaXBzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRQbGFjZVNoaXBzU3RhZ2UobW9kZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluR2FtZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkSW5HYW1lU3RhZ2UobW9kZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXllcldpbnNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEluR2FtZVN0YWdlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJBSVdpbnNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEluR2FtZVN0YWdlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkUGxhY2VTaGlwc1N0YWdlKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHNoaXBDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcENvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2hpcFF1ZXVlKFxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwsXG4gICAgICAgICAgICBzaGlwQ29udGFpbmVyLFxuICAgICAgICAgICAgKHNoaXBJbmRleCwgY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcEluZGV4ID0gc2hpcEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEZvb3RlclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgR2FtZU1lc3NhZ2UodGhpcy52aWV3TW9kZWwsIG1lc3NhZ2VDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWUgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImdhbWVcIiB9KTtcblxuICAgICAgICBuZXcgcGxheWVyQm9hcmRFbGVtKHRoaXMudmlld01vZGVsLCBnYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4LFxuICAgICAgICAgICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWVbdGhpcy5kcmFnZ2VkU2hpcEluZGV4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJhZGFyQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBSYWRhcih0aGlzLnZpZXdNb2RlbCwgcmFkYXJDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGxlZnRCdXR0b25Db250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibGVmdEJ1dHRvbkNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWlkZGxlQnV0dG9uQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25Db250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25Db250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25Db250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgbGVmdEJ1dHRvbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBtaWRkbGVCdXR0b25Db250YWluZXIsXG4gICAgICAgICAgICAgICAgcmlnaHRCdXR0b25Db250YWluZXIsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCBsZWZ0QnV0dG9uQ29udGFpbmVyLCBcInJvdGF0ZVwiKTtcblxuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCBtaWRkbGVCdXR0b25Db250YWluZXIsIFwiYXV0b1BsYWNlXCIpO1xuICAgICAgICBuZXcgQnV0dG9uKHRoaXMudmlld01vZGVsLCByaWdodEJ1dHRvbkNvbnRhaW5lciwgXCJ1bmRvXCIpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnNDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwib3B0aW9uc0NvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgT3B0aW9uc01lbnUodGhpcy52aWV3TW9kZWwsIG9wdGlvbnNDb250YWluZXIpO1xuXG4gICAgICAgIGxldCB3YXZlcyA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgIHNyYzogd2F2ZXNBbHQsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2F2ZXNBbHRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1vZGVsLnZpZGVvUGxheWluZykge1xuICAgICAgICAgICAgd2F2ZXMuY2xhc3NMaXN0LmFkZChcImFuaW1hdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdhbWVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMUdyaWRDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhdmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hpcEJvd1dvb2RcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsMVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwyXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDNcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw1XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDZcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQ292ZXJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxT3B0aW9uc0NvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFkYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMVNoaXBTdGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtzaGlwQ29udGFpbmVyLCBtZXNzYWdlQ29udGFpbmVyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnYW1lQ29udGFpbmVyO1xuICAgIH1cblxuICAgIGJ1aWxkSW5HYW1lU3RhZ2UobW9kZWwpIHtcbiAgICAgICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyQm9hcmRDb250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IEFJQm9hcmRDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiQUlCb2FyZENvbnRhaW5lclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZ2FtZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJnYW1lXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3BsYXllckJvYXJkQ29udGFpbmVyLCBBSUJvYXJkQ29udGFpbmVyXSxcbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBwbGF5ZXJCb2FyZEVsZW0odGhpcy52aWV3TW9kZWwsIHBsYXllckJvYXJkQ29udGFpbmVyLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4LFxuICAgICAgICAgICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWVbdGhpcy5kcmFnZ2VkU2hpcEluZGV4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBBSUJvYXJkRWxlbSh0aGlzLnZpZXdNb2RlbCwgQUlCb2FyZENvbnRhaW5lciwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCxcbiAgICAgICAgICAgICAgICBtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlW3RoaXMuZHJhZ2dlZFNoaXBJbmRleF0sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgd2F2ZXMgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICBzcmM6IHdhdmVzQWx0LFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndhdmVzQWx0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb2RlbC52aWRlb1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHdhdmVzLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGxheWVyU2NvcmVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyU2NvcmVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNjb3JlQ29udGFpbmVyKHRoaXMudmlld01vZGVsLCBwbGF5ZXJTY29yZUNvbnRhaW5lciwgXCJwbGF5ZXJcIik7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwRm9vdGVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBHYW1lTWVzc2FnZSh0aGlzLnZpZXdNb2RlbCwgbWVzc2FnZUNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgcmFkYXJDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFJhZGFyKHRoaXMudmlld01vZGVsLCByYWRhckNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgQUlTY29yZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJBSVNjb3JlQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTY29yZUNvbnRhaW5lcih0aGlzLnZpZXdNb2RlbCwgQUlTY29yZUNvbnRhaW5lciwgXCJBSVwiKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm9wdGlvbnNDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3B0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaW5HYW1lXCIpO1xuXG4gICAgICAgIG5ldyBPcHRpb25zTWVudSh0aGlzLnZpZXdNb2RlbCwgb3B0aW9uc0NvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgcGxheWVyU3RhZ2UgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWVyU3RhZ2VcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbcGxheWVyU2NvcmVDb250YWluZXIsIG1lc3NhZ2VDb250YWluZXJdLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBBSVN0YWdlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIkFJU3RhZ2VcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbQUlTY29yZUNvbnRhaW5lciwgb3B0aW9uc0NvbnRhaW5lcl0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZ2FtZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxR3JpZENvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgd2F2ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwQm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJzaGlwQm93V29vZFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwxXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsM1wiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw0XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDVcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNlwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZmxha0NvdmVyVG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUsXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMU9wdGlvbnNDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtwbGF5ZXJTdGFnZSwgcmFkYXJDb250YWluZXIsIEFJU3RhZ2VdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGF5ZXJXaW5zXCIgfHwgbW9kZWwuZ2FtZVN0YXRlID09PSBcIkFJV2luc1wiKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdHYW1lQnRuID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJOZXcgR2FtZVwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXdHYW1lQnV0dG9uXCIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2xkTW9kZWwubmV3R2FtZVN0YXRlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBuZXdHYW1lQm9yZGVyID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibmV3R2FtZUJvcmRlclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbbmV3R2FtZUJ0bl0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgd2luVGV4dCA9XG4gICAgICAgICAgICAgICAgbW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYXllcldpbnNcIiA/IFwiVklDVE9SWVwiIDogXCJERUZFQVRcIjtcbiAgICAgICAgICAgIGNvbnN0IHdpblN0YXRlID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwid2luU3RhdGVcIixcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogd2luVGV4dCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaDFcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJCQVRUTEVTSElQXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlQm9yZGVyID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidGl0bGVCb3JkZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3RpdGxlXSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB0b3BEaXYgPSBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0b3BEaXZcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3RpdGxlQm9yZGVyXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgbWlkRGl2ID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibWlkRGl2XCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt3aW5TdGF0ZV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJvdERpdiA9IGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJvdERpdlwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbbmV3R2FtZUJvcmRlcl0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgZnJhbWVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmcmFtZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbdG9wRGl2LCBtaWREaXYsIGJvdERpdl0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWFzayA9IGVsZW0oeyBwcm9wOiBcImltZ1wiLCBjbGFzc05hbWU6IFwibWFza1wiLCBzcmM6IHdvb2QgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVPdmVyQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZ2FtZU92ZXJDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2ZyYW1lQ29udGFpbmVyLCBtYXNrXSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGVsQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtnYW1lT3ZlckNvbnRhaW5lcl0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtb2RhbENvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdhbWVDb250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zTWVudSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gcG9zc2libGUgb3B0aW9ucy4uLlxuICAgIC8vXG4gICAgLy8gdGhlbWUgY29sb3JcbiAgICAvLyBzdG9wIHZpZGVvXG4gICAgLy9cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkT3B0aW9ucyhtb2RlbCk7XG4gICAgfVxuXG4gICAgYnVpbGRPcHRpb25zKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwiaW5HYW1lXCIpIHtcbiAgICAgICAgICAgIC8vIG1heWJlIGFkZCBhIGJhY2sgYnV0dG9uIG9yIG5ldyBnYW1lIGJ1dHRvblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmlkZW9CdG4gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBpZDogXCJ2aWRlb0J0blwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB2aWRlb0J0bkNsYXNzID0gbW9kZWwudmlkZW9QbGF5aW5nID8gXCJwYXVzZVwiIDogXCJwbGF5XCI7XG5cbiAgICAgICAgdmlkZW9CdG4uY2xhc3NMaXN0LmFkZCh2aWRlb0J0bkNsYXNzKTtcblxuICAgICAgICB2aWRlb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnZpZGVvUGxheWluZyA9ICFvbGRNb2RlbC52aWRlb1BsYXlpbmc7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaHVlU2xpZGVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImlucHV0XCIsXG4gICAgICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgICAgICBtaW46IFwiMFwiLFxuICAgICAgICAgICAgbWF4OiBcIjM2MFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiMTIwXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiaHVlU2xpZGVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGh1ZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlclZhbHVlID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0aW5nSHVlID0gMTIwO1xuICAgICAgICAgICAgY29uc3QgaHVlUm90YXRpb24gPSAoKHNsaWRlclZhbHVlIC0gc3RhcnRpbmdIdWUgKyAxODApICUgMzYwKSAtIDE4MDtcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lQ29sb3IgPSBgaHNsYSgke3NsaWRlclZhbHVlfSwgMTAwJSwgNTAlLCAxKWA7XG4gICAgICAgICAgICBjb25zdCBsb3dBbHBoYUNvbG9yID0gYGhzbGEoJHtzbGlkZXJWYWx1ZX0sIDEwMCUsIDUwJSwgMC41KWA7XG4gICAgICAgICAgICBjb25zdCBvcHBvc2l0ZVJvdGF0aW9uID0gKHNsaWRlclZhbHVlIC0gc3RhcnRpbmdIdWUgKyAzMDApICUgMzYwO1xuICAgICAgICAgICAgY29uc3Qgb3Bwb3NpdGVUaGVtZSA9IGBoc2xhKCR7b3Bwb3NpdGVSb3RhdGlvbn0sIDEwMCUsIDUwJSwgMSlgO1xuICAgICAgICAgICAgY29uc3Qgb3Bwb3NpdGVMb3dBbHBoYVRoZW1lID0gYGhzbGEoJHtvcHBvc2l0ZVJvdGF0aW9ufSwgMTAwJSwgNTAlLCAuNSlgO1xuICAgICAgICAgICAgY29uc3Qgb3Bwb3NpdGVIdWVSb3RhdGUgPVxuICAgICAgICAgICAgICAgICgob3Bwb3NpdGVSb3RhdGlvbiAtIHN0YXJ0aW5nSHVlICsgMTgwKSAlIDM2MCkgLSAxODA7XG5cbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLXRoZW1lLWNvbG9yXCIsIHRoZW1lQ29sb3IpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbG93QWxwaGEtY29sb3JcIiwgbG93QWxwaGFDb2xvcik7XG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1maWx0ZXJcIiwgYGh1ZS1yb3RhdGUoJHtodWVSb3RhdGlvbn1kZWcpYCk7XG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIFwiLS1vcHBvc2l0ZS1maWx0ZXJcIixcbiAgICAgICAgICAgICAgICBgaHVlLXJvdGF0ZSgke29wcG9zaXRlSHVlUm90YXRlfWRlZylgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tb3Bwb3NpdGUtY29sb3JcIiwgb3Bwb3NpdGVUaGVtZSk7XG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIFwiLS1vcHBvc2l0ZS1sb3dBbHBoYVwiLFxuICAgICAgICAgICAgICAgIG9wcG9zaXRlTG93QWxwaGFUaGVtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2xpZGVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2xpZGVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbaHVlU2xpZGVyXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uc0hvdXNpbmcgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwib3B0aW9uc0hvdXNpbmdcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbdmlkZW9CdG4sIHNsaWRlQ29udGFpbmVyXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNIb3VzaW5nO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZVwiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkYXIgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIG5ld01vZGVsLmdhbWVTdGF0ZSA9PT0gXCJpbkdhbWVcIiB8fFxuICAgICAgICAgICAgb2xkTW9kZWwuQUkuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aCAhPT1cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5BSS5nYW1lYm9hcmQuc2hpcHMubGVuZ3RoIHx8XG4gICAgICAgICAgICBvbGRNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aCAhPT1cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJhZGFyKG1vZGVsKTtcbiAgICB9XG5cbiAgICBidWlsZFJhZGFyKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHJhZGFyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcInVsXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZW5lbWllcyA9IG1vZGVsLkFJLmdhbWVib2FyZC5zaGlwcztcbiAgICAgICAgZW5lbWllcy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICByYWRhci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBgZW5lbXlQaW5nJHtpbmRleH1gIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZnJpZW5kbHkgPSBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzO1xuICAgICAgICBmcmllbmRseS5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICByYWRhci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBgZnJpZW5kbHlQaW5nJHtpbmRleH1gIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJhZGFyO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBjYXJyaWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9CYXR0bGVzaGlwMi5zdmdcIjtcbmltcG9ydCBkZXN0cm95ZXJTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvRGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHN1Ym1hcmluZVNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9TdWJtYXJpbmUuc3ZnXCI7XG5pbXBvcnQgcGF0cm9sQm9hdFNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9QYXRyb2wtQm9hdC5zdmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVDb250YWluZXIgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgdmVyc2lvbikge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMudmVyc2lvbiA9PT0gXCJwbGF5ZXJcIiA/IG1vZGVsLnBsYXllciA6IG1vZGVsLkFJO1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFNjb3JlQ29udGFpbmVyKHBsYXllcik7XG4gICAgfVxuXG4gICAgYnVpbGRTY29yZUNvbnRhaW5lcihwbGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2NvcmVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllci5uYW1lID09PSBcIkFJXCJcbiAgICAgICAgICAgID8gc2NvcmVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgQUlTY29yZWApXG4gICAgICAgICAgICA6IHNjb3JlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHBsYXllclNjb3JlYCk7XG5cbiAgICAgICAgY29uc3Qgc2hpcExpc3QgPSBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzO1xuXG4gICAgICAgIHNoaXBMaXN0LmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcInRvcFNlY3Rpb25cIiB9KTtcbiAgICAgICAgICAgIGNvbnN0IG1pZCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwibWlkU2VjdGlvblwiIH0pO1xuICAgICAgICAgICAgY29uc3QgYm90ID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJib3RTZWN0aW9uXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaXBJY29uID0gZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic2NvcmVib2FyZFNoaXBPdmVybGF5XCIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc3dpdGNoIChzaGlwLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ2FycmllclwiOlxuICAgICAgICAgICAgICAgICAgICBzaGlwSWNvbi5zcmMgPSBjYXJyaWVyU3JjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiQmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgICAgICBzaGlwSWNvbi5zcmMgPSBiYXR0bGVzaGlwU3JjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRGVzdHJveWVyXCI6XG4gICAgICAgICAgICAgICAgICAgIHNoaXBJY29uLnNyYyA9IGRlc3Ryb3llclNyYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgICAgICAgICBzaGlwSWNvbi5zcmMgPSBzdWJtYXJpbmVTcmM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQYXRyb2wtQm9hdFwiOlxuICAgICAgICAgICAgICAgICAgICBzaGlwSWNvbi5zcmMgPSBwYXRyb2xCb2F0U3JjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwU2NvcmVcIixcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYCR7c2hpcC5zaXplIC0gc2hpcC5oaXRzfSAvICR7c2hpcC5zaXplfWAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWlkLmFwcGVuZENoaWxkKHNjb3JlKTtcblxuICAgICAgICAgICAgY29uc3Qgc2hpcENvbCA9IGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNoaXBDb2xcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3RvcCwgbWlkLCBib3RdLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghc2hpcC5zdW5rKSB7XG4gICAgICAgICAgICAgICAgc2hpcEljb24uY2xhc3NMaXN0LmFkZChcImFsaXZlXCIpO1xuICAgICAgICAgICAgICAgIHRvcC5hcHBlbmRDaGlsZChzaGlwSWNvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNoaXBJY29uLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgICAgICAgICAgICAgIHNoaXBDb2wuY2xhc3NMaXN0LmFkZChcInNoaXBTdW5rXCIpO1xuICAgICAgICAgICAgICAgIGJvdC5hcHBlbmRDaGlsZChzaGlwSWNvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBDb2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNjb3JlQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgY2FycmllclNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9DYXJyaWVyLnN2Z1wiO1xuaW1wb3J0IGJhdHRsZXNoaXBTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvQmF0dGxlc2hpcDIuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvU3VibWFyaW5lLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbEJvYXRTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUGF0cm9sLUJvYXQuc3ZnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHNoaXAsIGNsaWNrZWRFdmVudCkge1xuICAgICAgICB0aGlzLnNoaXBNb2RlbCA9IHNoaXA7XG5cbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNoaXBQdWxzZSA9IGVsZW0oeyBwcm9wOiBcImRpdlwiIH0pO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQgPSBjbGlja2VkRXZlbnQ7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICAvL3NoaXBzIGNvbnRhaW5lclxuICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2hpcC5pZCA9IHRoaXMuc2hpcE1vZGVsLm5hbWU7XG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIHNoaXAuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNoaXBTcmMgPSBudWxsO1xuXG4gICAgICAgIGxldCBzaGlwQ2xhc3MgPSB0aGlzLnNoaXBNb2RlbC5pc0hvcml6b250YWwgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKHNoaXBDbGFzcyk7XG5cbiAgICAgICAgLy8gbWF0Y2hlcyBuYW1lIG9mIHNoaXAgdG8gdGhlIGltYWdlIHNvdXJjZSBmaWxlXG4gICAgICAgIHN3aXRjaCAodGhpcy5zaGlwTW9kZWwubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcIkNhcnJpZXJcIjpcbiAgICAgICAgICAgICAgICBzaGlwU3JjID0gY2FycmllclNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJCYXR0bGVzaGlwXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IGJhdHRsZXNoaXBTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRGVzdHJveWVyXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IGRlc3Ryb3llclNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJTdWJtYXJpbmVcIjpcbiAgICAgICAgICAgICAgICBzaGlwU3JjID0gc3VibWFyaW5lU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlBhdHJvbC1Cb2F0XCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IHBhdHJvbEJvYXRTcmM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGVzIHRoZSBpbm5lciBkaXZzIGZvciBlYWNoIHNoaXBcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIHNpemVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBNb2RlbC5zaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwidGlsZVwiKTtcbiAgICAgICAgICAgIHRpbGUuZGF0YXNldC5ib2F0ID0gdGhpcy5zaGlwTW9kZWwubmFtZTtcbiAgICAgICAgICAgIHRpbGUuZGF0YXNldC50aWxlID0gaTtcbiAgICAgICAgICAgIHRpbGUuZHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vYWRkIGhlYWQgY2xhc3MgdG8gZnJvbnQgZm9yIHN0eWxpbmdcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB0aWxlLmNsYXNzTGlzdC5hZGQoXCJoZWFkXCIpO1xuICAgICAgICAgICAgLy9hZGQgdGFpbCBjbGFzcyB0byB0YWlsIGZvciBzdHlsaW5nXG4gICAgICAgICAgICBpZiAoaSA9PSB0aGlzLnNoaXBNb2RlbC5zaXplIC0gMSkgdGlsZS5jbGFzc0xpc3QuYWRkKFwidGFpbFwiKTtcblxuICAgICAgICAgICAgLy8gYWRkcyBjbGljayBsaXN0ZW5lciB0byBzZXQgY2xpY2tlZCBpbmRleFxuICAgICAgICAgICAgdGlsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gYWRkIHRpbGVzIHRvIHRoZSBzaGlwXG4gICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgICAgICBzaGlwLmFwcGVuZENoaWxkKHRpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3BpY2UgdXAgdGhlIHNoaXAgZGlzcGxheVxuICAgICAgICBjb25zdCBzaGlwT3ZlcmxheSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogYHNoaXBPdmVybGF5YCxcbiAgICAgICAgICAgIGlkOiBgJHt0aGlzLnNoaXBNb2RlbC5uYW1lfU92ZXJsYXlgLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gc2hpcE92ZXJsYXk7XG4gICAgICAgIHNoaXBPdmVybGF5LnNyYyA9IHNoaXBTcmM7XG4gICAgICAgIGxldCBvdmVybGF5Q2xhc3MgPSB0aGlzLnNoaXBNb2RlbC5pc0hvcml6b250YWxcbiAgICAgICAgICAgID8gXCJob3Jpem9udGFsXCJcbiAgICAgICAgICAgIDogXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICBzaGlwT3ZlcmxheS5jbGFzc0xpc3QuYWRkKG92ZXJsYXlDbGFzcyk7XG4gICAgICAgIHNoaXBPdmVybGF5LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICBzaGlwLmFwcGVuZENoaWxkKHNoaXBPdmVybGF5KTtcblxuICAgICAgICBzaGlwLmFwcGVuZENoaWxkKHRoaXMuc2hpcFB1bHNlKTtcblxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGJvdW5kKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGJvdW5kKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNoaXA7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ1N0YXJ0KGUpIHtcbiAgICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLndpZHRoID0gXCI0MHB4XCI7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLmhlaWdodCA9IFwiNDBweFwiO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGlsZS5zdHlsZS53aWR0aCA9IFwiMzBweFwiO1xuICAgICAgICAgICAgICAgIHRpbGUuc3R5bGUuaGVpZ2h0ID0gXCIzMHB4XCI7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VuZChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZ2V0IGFsbCB0aWxlcyB3aXRoIHByaW9yIGhvdmVyIGVmZmVjdHNcbiAgICAgICAgY29uc3QgdGlsZXMgPSBBcnJheS5mcm9tKFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3ZlclwiLCBcIi52YWxpZFwiLCBcIi5pbnZhbGlkXCIpXG4gICAgICAgICk7XG4gICAgICAgIC8vIGNsZWFyIHRoZWlyIGhvdmVyIGVmZmVjdHNcbiAgICAgICAgdGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGlsZS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIiwgXCJpbnZhbGlkXCIsIFwidmFsaWRcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbS5qc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBRdWV1ZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50LCBjbGlja2VkRXZlbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQgPSBjbGlja2VkRXZlbnQ7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gbmV3TW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIjtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRRdWV1ZShtb2RlbCk7XG4gICAgfVxuXG4gICAgYnVpbGRRdWV1ZShtb2RlbCkge1xuICAgICAgICBjb25zdCBzdGFnZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwUXVldWVcIixcbiAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXh0ID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5leHRTaGlwQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIW1vZGVsLm5hbWVQYWdlSXNPcGVuKSB7XG4gICAgICAgICAgICBuZXh0LmNsYXNzTGlzdC5hZGQoXCJoaWRlTmV4dFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInF1ZXVlQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3N0YWdlLCBuZXh0XSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcXVldWUuZHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgbW9kZWwucGxheWVyLnNoaXBRdWV1ZS5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoaXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IG5ldyBTaGlwKHNoaXAsIChjbGlja2VkSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQoaW5kZXgsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLnN0YXRlTWVzc2FnZS5pbmNsdWRlcyhcIkVuZW1pZXNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYFBsYWNlIHlvdXIgJHtuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLm5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQuYXBwZW5kQ2hpbGQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UucHJlcGVuZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBxdWV1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbVwiO1xuaW1wb3J0IHtcbiAgICBjaGVja0FsbFNoaXBzUGxhY2VkLFxuICAgIGlzVmFsaWRQbGFjZW1lbnQsXG4gICAgcGxhY2VTaGlwLFxufSBmcm9tIFwiLi4vLi4vZ2FtZUNvbXBvbmVudHMvR2FtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXJCb2FyZEVsZW0gZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgZHJhZ0VudGVyKSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ0VudGVyID0gZHJhZ0VudGVyO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQm9hcmQobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkQm9hcmQobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93R3JpZCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hhZG93R3JpZFwiIH0pO1xuICAgICAgICBjb25zdCBib2FyZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJib2FyZFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtzaGFkb3dHcmlkXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHNoYWRvd0dyaWQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIGJvYXJkLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuc2l6ZTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZFNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmJvYXJkU2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJjZWxsXCIgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZVJlZiA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgIC8vIHNldHMgZGF0YSB2YWx1ZXMgZm9yIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sO1xuICAgICAgICAgICAgICAgIGNlbGwuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmxhc3RDbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhc3RDbGlja2VkLnJvdyA9PT0gcm93ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXN0Q2xpY2tlZC5jb2wgPT09IGNvbFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInB1bHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkcyB0aGUgZHJhZ2VudGVyIGFuZCBkcm9wIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZVJlZi5zaGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgc2hpcCBlZmZlY3RcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGlsZVJlZi50aWxlU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgaGl0IG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtaXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBtaXNzIG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdGhlIGNlbGwgdG8gdGhlIGJvYXJkIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC8vIGFkZHMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBjZWxsIHRvIHRoZSBjZWxscyBhcnJheVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XG5cbiAgICAgICAgbW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jbGlja2VkRXZlbnQoaW5kZXgsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VUaWxlID0gc2hpcC50aWxlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFRpbGUgPSBzaGlwLnRpbGVzW3NoaXAuc2l6ZSAtIDFdO1xuICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5zdHlsZS5ncmlkQXJlYSA9IGAke2Jhc2VUaWxlLnJvdyArIDF9IC8gJHtcbiAgICAgICAgICAgICAgICBiYXNlVGlsZS5jb2wgKyAxXG4gICAgICAgICAgICB9IC8gJHtlbmRUaWxlLnJvdyArIDJ9IC8gJHtlbmRUaWxlLmNvbCArIDJ9YDtcbiAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkU2hpcFwiKTtcbiAgICAgICAgICAgIHNoaXBFbGVtLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJvbkJvYXJkXCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEVsZW0uc2hpcFB1bHNlLmNsYXNzTGlzdC5hZGQoXCJzaGlwT3ZlcmxheVB1bHNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hhZG93R3JpZC5hcHBlbmRDaGlsZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYm9hcmRCb3JkZXIgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImJvYXJkQm9yZGVyXCIgfSk7XG4gICAgICAgIGJvYXJkQm9yZGVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICAgICAgcmV0dXJuIGJvYXJkQm9yZGVyO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdPdmVyKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdMZWF2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW50ZXIoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgW2NsaWNrZWRJbmRleCwgc2hpcF0gPSB0aGlzLmRyYWdFbnRlcigpO1xuICAgICAgICB0aGlzLmRyYWdnZWRTaGlwID0gc2hpcDtcbiAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgIC8vIGdldCBhbGwgdGlsZXMgd2l0aCBwcmlvciBob3ZlciBlZmZlY3RzXG4gICAgICAgIGNvbnN0IHRpbGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJcIiwgXCIudmFsaWRcIiwgXCIuaW52YWxpZFwiKVxuICAgICAgICApO1xuICAgICAgICAvLyBjbGVhciB0aGVpciBob3ZlciBlZmZlY3RzXG4gICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIsIFwiaW52YWxpZFwiLCBcInZhbGlkXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gc2hpcC5zaXplO1xuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJhc2UgdGlsZSBmb3IgdGhlIGRyYWdnZWQgc2hpcFxuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgc2hpcCBpbmRleCB0aGF0IHdhcyBjbGlja2VkIGFuZCB0aWxlIGN1cnJlbnQgaG92ZXJlZFxuICAgICAgICAvLyAobGVmdCBtb3N0IGZvciBob3Jpem9udGFsLCB0b3AgbW9zdCBmb3IgdmVydGljYWwpXG4gICAgICAgIGNvbnN0IGJhc2VDb29yZHMgPSB0aGlzLmdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpO1xuICAgICAgICBjb25zdCBiYXNlUm93ID0gYmFzZUNvb3Jkcy5yb3c7XG4gICAgICAgIGNvbnN0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICAvLyBjaGVjayBpZiBob3ZlcmVkIHRpbGVzIGFyZSBhbGwgb24gdGhlIGJvYXJkIGFuZCBkb250IG92ZXJsYXAgYSBzaGlwXG4gICAgICAgIGxldCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChcbiAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICBiYXNlUm93LFxuICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgIG1vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHJvd09mZnNldCA9IGJhc2VSb3c7XG4gICAgICAgIGxldCBjb2xPZmZzZXQgPSBiYXNlQ29sO1xuXG4gICAgICAgIC8vIGFxdWlyZSB0aGUgZGl2IGZvciBldmVyeSBjZWxsXG4gICAgICAgIC8vIGFuZCBzdHlsZSBhY2NvcmRpbmcgdG8gdmFsaWRpdHlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJvd09mZnNldCA+PSB0aGlzLmJvYXJkU2l6ZSB8fCBjb2xPZmZzZXQgPj0gdGhpcy5ib2FyZFNpemUpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jZWxsc1tOdW1iZXIoYCR7cm93T2Zmc2V0fWAgKyBgJHtjb2xPZmZzZXR9YCldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGNvbE9mZnNldCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3dPZmZzZXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICByb3dPZmZzZXQgPSBiYXNlUm93O1xuICAgICAgICAgICAgY29sT2Zmc2V0ID0gYmFzZUNvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKHJvd09mZnNldCwgY29sT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93T2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gcm93T2Zmc2V0IDogcm93T2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQgPSBpc0hvcml6b250YWwgPyBjb2xPZmZzZXQgKyAxIDogY29sT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93T2Zmc2V0ID0gYmFzZVJvdztcbiAgICAgICAgICAgIGNvbE9mZnNldCA9IGJhc2VDb2w7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChyb3dPZmZzZXQsIGNvbE9mZnNldCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvd09mZnNldCA9IGlzSG9yaXpvbnRhbCA/IHJvd09mZnNldCA6IHJvd09mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgY29sT2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gY29sT2Zmc2V0ICsgMSA6IGNvbE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyb3AoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgYmFzZUNvb3JkcyA9IHRoaXMuZ2V0QmFzZVRpbGUoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJhc2VSb3cgPSBiYXNlQ29vcmRzLnJvdztcbiAgICAgICAgbGV0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICBsZXQgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgIGJhc2VDb2wsXG4gICAgICAgICAgICBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmRyb3BRdWV1ZS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfSA9IHBsYWNlU2hpcChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCxcbiAgICAgICAgICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgICAgICAgICAgb2xkTW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBQbGFjZSB5b3VyICR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBsYWNlZCA9IGNoZWNrQWxsU2hpcHNQbGFjZWQobmV3TW9kZWwucGxheWVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChhbGxQbGFjZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuYWxsU2hpcHNQbGFjZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBgR29vZCBsdWNrIEFkbWlyYWwgJHtuZXdNb2RlbC5wbGF5ZXIubmFtZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGludmFsaWQgcGxhY2VtZW50IGRyb3BcXFxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYCR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfSB3ZW50IG91dCBvZiBib3VuZHMsIHRyeSBhZ2Fpbi5gO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqICBjYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3Qgb3IgdG9wIG1vc3QgdGlsZSAqL1xuICAgIGdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpIHtcbiAgICAgICAgLy8gZ2V0cyB0aGUgaW5kZXggdGhhdCB0aGUgc2hpcCB3YXMgcGlja2VkIHVwIGJ5XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICBsZXQgb2Zmc2V0Um93ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldENvbCA9IDA7XG5cbiAgICAgICAgLy8gb2Zmc2V0cyB0aGUgaG92ZXJlZCB0aWxlIGFjY29yZGluZyB0byB0aGUgZ3JhYmJlZCBpbmRleFxuICAgICAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG9mZnNldENvbCA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0Um93ID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlUm93ID0gcm93IC0gb2Zmc2V0Um93O1xuICAgICAgICBjb25zdCBiYXNlQ29sID0gY29sIC0gb2Zmc2V0Q29sO1xuXG4gICAgICAgIHJldHVybiB7IHJvdzogYmFzZVJvdywgY29sOiBiYXNlQ29sIH07XG4gICAgfVxuXG4gICAgLyoqICByZXR1cm5zIHRoZSBET00gZWxlbWVudCBmb3IgYSBnaXZlbiBjb29yZGluYXRlICovXG4gICAgZ2V0Q2VsbChyb3csIGNvbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICByb3cgPCAwIHx8XG4gICAgICAgICAgICByb3cgPj0gdGhpcy5ib2FyZFNpemUgfHxcbiAgICAgICAgICAgIGNvbCA8IDAgfHxcbiAgICAgICAgICAgIGNvbCA+PSB0aGlzLmJvYXJkU2l6ZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHNbcm93ICogdGhpcy5ib2FyZFNpemUgKyBjb2xdO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL0NTUy9ob21lcGFnZS5jc3NcIjtcbmltcG9ydCBIb21lUGFnZUlucHV0IGZyb20gXCIuL0hvbWVQYWdlSW5wdXQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBjb25zdCBob21lcGFnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lcGFnZUNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQkFUVExFU0hJUFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lSGVhZGVyXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld0dhbWUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwibWFpblwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IEhvbWVQYWdlSW5wdXQodGhpcy52aWV3TW9kZWwsIG5ld0dhbWUpO1xuXG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0dhbWUpO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwidWxcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic21va2VDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvb3RlclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcInNwYW5cIiwgdGV4dENvbnRlbnQ6IFwiQ3JlYXRlZCBieSBHbHV0dHpcIiB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gaG9tZXBhZ2VDb250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL0NTUy9uYW1lcGFnZS5jc3NcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lUGFnZUlucHV0IGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBuYW1lUGFnZUlzT3BlbiB9KSB7XG4gICAgICAgIGNvbnN0IG5ld0dhbWVCdG4gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogXCJOZXcgR2FtZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZVBhZ2VJc09wZW46IHRydWUgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmFtZVBhZ2VJc09wZW4gPyB0aGlzLmJ1aWxkRm9ybSgpIDogbmV3R2FtZUJ0bjtcbiAgICB9XG5cbiAgICBidWlsZEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IGdyZWV0aW5nID0gZWxlbSh7IHByb3A6IFwicFwiLCB0ZXh0Q29udGVudDogXCJIZWxsbyBBZG1pcmFsLi4uXCIgfSk7XG4gICAgICAgIGNvbnN0IGlucHV0RmllbGQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW5wdXRcIixcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmFtZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkNvbnRpbnVlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZm9ybVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5hbWVGb3JtXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2lucHV0RmllbGQsIGJ1dHRvbl0sXG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmN1cnJlbnRQYWdlID0gXCJtYXBQYWdlXCI7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLm5hbWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLm5ld0dhbWVTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobmV3TW9kZWwpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtncmVldGluZywgbmFtZUZpZWxkXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1Db250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL0NTUy9tYXBwYWdlLmNzc1wiO1xuaW1wb3J0IHJlZFBpblNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9yZWQtcGluLnBuZ1wiO1xuaW1wb3J0IHN0aWNreU5vdGVTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvc3RpY2t5LW5vdGUuc3ZnXCI7XG5pbXBvcnQgY2xpcGJvYXJkU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2NsaXBib2FyZC5wbmdcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBQYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBzdGF0ZU1lc3NhZ2UsIHBsYXllciB9KSB7XG4gICAgICAgIGNvbnN0IHJlZFBpbnMgPSBbXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHNyYzogcmVkUGluU3JjLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyZWRQaW4xXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiZWFzeVwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHNyYzogcmVkUGluU3JjLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyZWRQaW4yXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwibWVkaXVtXCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjNcIixcbiAgICAgICAgICAgICAgICBpZDogXCJoYXJkXCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcblxuICAgICAgICByZWRQaW5zLmZvckVhY2goKHBpbikgPT4ge1xuICAgICAgICAgICAgcGluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5jdXJyZW50UGFnZSA9IFwiZ2FtZVBhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJwbGFjZVNoaXBzXCI7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IFwiRGVwbG95IHRoZSBmbGVldCwgc2lyLlwiO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5BSS5kaWZmaWN1bHR5ID0gcGluLmlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzdGF0ZU1lc3NhZ2UgIT09IHBpbi5pZCkge1xuICAgICAgICAgICAgICAgIHBpbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGVNZXNzYWdlOiBwaW4uaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG1hcCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtYXBcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiByZWRQaW5zLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhdGVNZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBub3RlID0gdGhpcy5idWlsZE5vdGUoc3RhdGVNZXNzYWdlLCBwbGF5ZXIpO1xuICAgICAgICAgICAgbWFwLmFwcGVuZENoaWxkKG5vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBidWlsZE5vdGUoc3RhdGVNZXNzYWdlLCBwbGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgbm90ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RlMToge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIlNvbWFsaWFuIENvYXN0XCIsXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTogXCJFYXN5XCIsXG4gICAgICAgICAgICAgICAgcGFyYTogXCJJIHJlZ3JldCB0byBpbmZvcm0geW91IHRoYXQgYSBncm91cCBvZiBTb21hbGlhbiBwaXJhdGVzIGhhdmUgc3VjY2Vzc2Z1bGx5IGNvbW1hbmRlZXJlZCBhbiBJbmRpYW4gY2FycmllciBncm91cCBpbiB0aGUgQXJhYmlhbiBTZWEuIFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGUyOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFwiQmxhY2sgU2VhXCIsXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTogXCJNZWRpdW1cIixcbiAgICAgICAgICAgICAgICBwYXJhOiBcIkkgYW0gd3JpdGluZyB0byBpbmZvcm0geW91IGFib3V0IGEgZ3JvdXAgb2YgUnVzc2lhbiBwaXJhdGVzIHdobyBoYXZlIGNvbW1hbmRlZXJlZCBhIFJ1c3NpYW4gY2FycmllciBncm91cC4gVGhpcyBncm91cCBpcyBhIHNpZ25pZmljYW50IHRocmVhdCB0byB0aGUgc2FmZXR5IGFuZCBzZWN1cml0eSBvZiB0aGUgYXJlYS5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlMzoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIlNvdXRoIENoaW5hIFNlYVwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiSGFyZFwiLFxuICAgICAgICAgICAgICAgIHBhcmE6IFwiQSBncm91cCBvZiBDaGluZXNlIHBpcmF0ZXMgaGFzIG1hbmFnZWQgdG8gc2VpemUgY29udHJvbCBvZiBhIENoaW5lc2UgY2FycmllciBncm91cCwgYW5kIGl0IHBvc2VzIGEgc2lnbmlmaWNhbnQgdGhyZWF0IHRvIHJlZ2lvbmFsIHNlY3VyaXR5LlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IHt9O1xuICAgICAgICBzd2l0Y2ggKHN0YXRlTWVzc2FnZSkge1xuICAgICAgICAgICAgY2FzZSBcImVhc3lcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMgPSBub3RlT3B0aW9ucy5ub3RlMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtZWRpdW1cIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMgPSBub3RlT3B0aW9ucy5ub3RlMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJoYXJkXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm90ZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJhcnRpY2xlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibm90ZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgaWQ6IHN0YXRlTWVzc2FnZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogY2xpcGJvYXJkU3JjLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic3RpY2t5Tm90ZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicGFyYUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBMb2NhdGlvbjogJHtzZWxlY3RlZE9wdGlvbnMubG9jYXRpb259YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBgRGlmZmljdWx0eTogPHU+JHtzZWxlY3RlZE9wdGlvbnMuZGlmZmljdWx0eX08L3U+YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBBZG1pcmFsICR7cGxheWVyLm5hbWV9LGAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgJHtzZWxlY3RlZE9wdGlvbnMucGFyYX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJzaGFkb3dcIiB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgICAtLXRoZW1lLWNvbG9yOiBoc2xhKDEyMCwgMTAwJSwgNTAlLCAxKTtcXG4gICAgLS1sb3dBbHBoYS1jb2xvcjogaHNsYSgxMjAsIDEwMCUsIDUwJSwgMC41KTtcXG4gICAgLS1maWx0ZXI6IGh1ZS1yb3RhdGUoKTtcXG4gICAgLS1vcHBvc2l0ZS1jb2xvcjogaHNsYSgzMDAsIDEwMCUsIDUwJSwgMSk7XFxuICAgIC0tb3Bwb3NpdGUtbG93QWxwaGE6IGhzbGEoMzAwLCAxMDAlLCA1MCUsIDAuNSk7XFxuICAgIC0tb3Bwb3NpdGUtZmlsdGVyOiBodWUtcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbi5nYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucXVldWVDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgZmxleDogMS4zO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcblxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTQ0LCAxNDQsIDE0NCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE0MCwgMTQwLCAxNDAsIDEpIDExJSxcXG4gICAgICAgIHJnYmEoMTM2LCAxMzYsIDEzNiwgMSkgMjElLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSA2OSUsXFxuICAgICAgICByZ2JhKDEzOCwgMTM4LCAxMzgsIDEpIDg3JSxcXG4gICAgICAgIHJnYmEoMTY4LCAxNjgsIDE2OCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoODMsIDgzLCA4Myk7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCByZ2IoMTI2LCAxMjYsIDEyNik7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgcmdiKDE2MywgMTYzLCAxNjMpO1xcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2IoMTQ1LCAxNDUsIDE0NSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IDVweCBibGFjaztcXG4gICAgei1pbmRleDogMTtcXG59XFxuLnAxR3JpZENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDM7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucmFkYXJDb250YWluZXIge1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4ucmFkYXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuOSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDI2M3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm9yZGVyOiAxMHB4IHNvbGlkICM2ZDZkNmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggMTBweCAwICNjNWM1YzUsIGluc2V0IDAgMCA1MHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgIC01cHggLTVweCAyMHB4IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMiksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgaGVpZ2h0OiAxcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSB7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICB3aWR0aDogMTc1cHg7XFxuICAgIGhlaWdodDogMTc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNykge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tdGhlbWUtY29sb3IpIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xcbiAgICBhbmltYXRpb246IHJhZGFyIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxufVxcblxcbi5lbmVteVBpbmcwIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODclO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nMSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDkwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmVuZW15UGluZzIge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA4NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5lbmVteVBpbmczIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nNCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLmZyaWVuZGx5UGluZzAge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiA0MiU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5mcmllbmRseVBpbmcxIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ3JTtcXG4gICAgbGVmdDogNDUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZnJpZW5kbHlQaW5nMiB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1NSU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmZyaWVuZGx5UGluZzMge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA1NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5mcmllbmRseVBpbmc0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJhZGFyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvdyB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbi5idXR0b25Db250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoOTAsIDkwLCA5MCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4ubGVmdEJ1dHRvbkNvbnRhaW5lcixcXG4ubWlkZGxlQnV0dG9uQ29udGFpbmVyLFxcbi5yaWdodEJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig4MywgODMsIDgzKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgYmFja2dyb3VuZDogI2NhY2FjYTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI3dm1pbjtcXG4gICAgYm94LXNoYWRvdzogMCA2dm1pbiAwLjE1dm1pbiAwdm1pbiByZ2IoOTIsIDkyLCA5MiksXFxuICAgICAgICAwIDR2bWluIDAuMTV2bWluIDB2bWluIHJnYig5MiwgOTIsIDkyKSxcXG4gICAgICAgIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gcmdiKDkyLCA5MiwgOTIpLFxcbiAgICAgICAgMjBweCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC43MjYpLFxcbiAgICAgICAgODBweCAxNjBweCAxMDBweCByZ2JhKDAsIDAsIDAsIDAuNTA3KTtcXG4gICAgcGFkZGluZzogMHZtaW4gMnZtaW4gMnZtaW4gMnZtaW47XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSByb3RhdGVaKDBkZWcpO1xcbiAgICBtYXJnaW4tdG9wOiAtNC41dm1pbjtcXG4gICAgaGVpZ2h0OiA5MCU7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNkNjA1MDU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgd2lkdGg6IDIwdm1pbjtcXG4gICAgaGVpZ2h0OiAxOXZtaW47XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwIDR2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMi41dm1pbjtcXG4gICAgYm9yZGVyOiAwLjV2bWluIHNvbGlkICNhZjAwMDBhMTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZTpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgM3ZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0xLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGU6YWN0aXZlLFxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAwLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAyMHB4IDEwcHggI2ZmM2MzYywgMCAwIDEwMHB4IDUwcHggI2ZmMjgyODtcXG4gICAgYmFja2dyb3VuZDogI2ZmMDAwMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwMDAwMDAyMDtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBzY2FsZTogMC4zO1xcbn1cXG4ucmlnaHRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDE4NywgMTg2LCAxODYpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMTkwLCAxOTAsIDE5MCk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEyMiwgMTIyLCAxMjIpO1xcbn1cXG4ubWlkZGxlQnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxODIsIDE4MiwgMTgyKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDE4MCwgMTgwLCAxODApO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDgwLCA4MCwgODApO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG59XFxuLmxlZnRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDE4NCwgMTg0LCAxODQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMTgyLCAxODEsIDE4MSk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoOTAsIDkwLCA5MCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDExOSwgMTE4LCAxMTgpO1xcbn1cXG5cXG4uYnV0dG9uVGV4dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZDZkNmQ7XFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggYmxhY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbiAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDFweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG5cXG4ubWlkZGxlQnV0dG9uIC5idXR0b25UZXh0IHtcXG4gICAgcGFkZGluZzogMXJlbSAxLjFyZW07XFxufVxcblxcbi5wMVNoaXBTdGFnZSB7XFxuICAgIGZsZXg6IDU7XFxuICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCByZ2IoMTU4LCAxNTgsIDE1OCk7XFxuICAgIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHJnYigxOTksIDE5OCwgMTk4KTtcXG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkIHJnYig2OCwgNjgsIDY4KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBDb250YWluZXIge1xcbiAgICBmbGV4OiAxO1xcblxcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMjQzLCAyNDMsIDI0Myk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoNTgsIDU4LCA1OCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDgwLCA3OSwgNzkpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDUwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2hpcFF1ZXVlIHtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgZmxleDogMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxOCU7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZpbHRlcjogYmx1cig1cHgpO1xcbn1cXG4ubmV4dFNoaXBDb250YWluZXIge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGhlaWdodDogOTAlO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcbi5oaWRlTmV4dCB7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5uZXh0U2hpcENvbnRhaW5lcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHZhcigtLXRoZW1lLWNvbG9yKSwgaW5zZXQgMCAwIDEwcHggdmFyKC0tdGhlbWUtY29sb3IpO1xcbn1cXG5cXG4ubmV4dFNoaXA6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi5uZXh0U2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkNhcnJpZXJDb250YWluZXIsXFxuLkJhdHRsZXNoaXBDb250YWluZXIsXFxuLkRlc3Ryb3llckNvbnRhaW5lcixcXG4uU3VibWFyaW5lQ29udGFpbmVyLFxcbi5QYXRyb2wtQm9hdENvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNDYXJyaWVyT3ZlcmxheSxcXG4jQmF0dGxlc2hpcE92ZXJsYXksXFxuI0Rlc3Ryb3llck92ZXJsYXksXFxuI1N1Ym1hcmluZU92ZXJsYXksXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheSB7XFxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XFxuICAgIGZpbHRlcjogdmFyKC0tZmlsdGVyKTtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgI0NhcnJpZXJPdmVybGF5LFxcbi5BSUJvYXJkQ29udGFpbmVyICNCYXR0bGVzaGlwT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjRGVzdHJveWVyT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjU3VibWFyaW5lT3ZlcmxheSxcXG4uQUlCb2FyZENvbnRhaW5lciAjUGF0cm9sLUJvYXRPdmVybGF5IHtcXG4gICAgZmlsdGVyOiB2YXIoLS1vcHBvc2l0ZS1maWx0ZXIpO1xcbn1cXG5cXG4jQ2FycmllcixcXG4jQmF0dGxlc2hpcCxcXG4jRGVzdHJveWVyLFxcbiNTdWJtYXJpbmUsXFxuI1BhdHJvbC1Cb2F0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5zaGlwT3ZlcmxheVB1bHNlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIGFuaW1hdGlvbjogcHVsc2UgMC43cyBlYXNlLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyBwdWxzZSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgICAgICAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgfVxcblxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAgICAgMCAwIDVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgICAgICAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgfVxcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIC8qIGFuaW1hdGlvbjogcm90YXRlIDAuNHMgZWFzZS1pbi1vdXQ7ICovXFxufVxcblxcbi8qIC5zaGlwT3ZlcmxheS5ob3Jpem9udGFsIHtcXG4gICAgYW5pbWF0aW9uOiByb3RhdGUxIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1LjUpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNSkgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZTEge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNikgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG59ICovXFxuXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSgzKTtcXG59XFxuXFxuLnNoaXBUaWxlIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc2hpcC5ob3Jpem9udGFsIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmdhbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmJvYXJkQm9yZGVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3JkZXItYm90dG9tOiAxNXB4IHNvbGlkIHJnYigxMTYsIDExNiwgMTE2KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAyMHB4IHNvbGlkIHJnYigxMzgsIDEzNywgMTM3KTtcXG4gICAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCByZ2IoMTE3LCAxMTcsIDExNyk7XFxuICAgIGJvcmRlci1sZWZ0OiAyMHB4IHNvbGlkIHJnYigxMDIsIDEwMiwgMTAyKTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IGJsYWNrO1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJvcmRlci1ib3R0b206IDE1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItcmlnaHQ6IDIwcHggc29saWQgcmdiKDE4MiwgMTgyLCAxODIpO1xcbiAgICBib3JkZXItdG9wOiAyMHB4IHNvbGlkIHJnYig1MywgNTMsIDUzKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDIwcHggc29saWQgcmdiKDc1LCA3NSwgNzUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ucGxheWVyQm9hcmRDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG4uQUlCb2FyZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyIC5ib2FyZCB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5zaGFkb3dHcmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZyxcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZyxcXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXA6aG92ZXIsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwOmhvdmVyLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwOmhvdmVyLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXA6aG92ZXIge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi50aWxlIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLmNlbGw6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5jZWxsLmhpdDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIHdpZHRoOiAyNnB4O1xcbiAgICBoZWlnaHQ6IDI2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgb3BhY2l0eTogNjAlO1xcbn1cXG5cXG4uY2VsbC5oaXQ6OmJlZm9yZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE1cHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpLFxcbiAgICAgICAgMCAwIDE1cHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIG9wYWNpdHk6IDYwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLmNlbGwubWlzczo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG5cXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBvcGFjaXR5OiA3MCU7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgIDAgMCAxNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgZmlsdGVyOiBibHVyKDEuNXB4KTtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgLmNlbGwge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbC5taXNzOjpiZWZvcmUge1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxMHB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKSxcXG4gICAgICAgIDAgMCAxMHB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgLmNlbGwuaGl0OjphZnRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbC5oaXQ6OmJlZm9yZSB7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgMCAwIDE1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uY2VsbC5wdWxzZTo6YmVmb3JlIHtcXG4gICAgYW5pbWF0aW9uOiBwdWxzZTIgMXMgbGluZWFyO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHB1bHNlMiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIH1cXG5cXG4gICAgNDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMyk7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIH1cXG4gICAgOTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMyk7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxufVxcblxcbi5jZWxsW2RhdGEtY29sPVxcXCIwXFxcIl0ge1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmNlbGxbZGF0YS1jb2w9XFxcIjlcXFwiXSB7XFxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuLmNlbGxbZGF0YS1yb3c9XFxcIjBcXFwiXSB7XFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxufVxcbi5jZWxsW2RhdGEtcm93PVxcXCI5XFxcIl0ge1xcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNTdWJtYXJpbmUgaW1nLmhvcml6b250YWwge1xcbiAgICBsZWZ0OiAtNSU7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG59XFxuXFxuLmJvYXJkU2hpcCB7XFxuICAgIHotaW5kZXg6IDk7XFxufVxcblxcbi5ib2FyZFNoaXAgaW1nIHtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg4LCA2KTtcXG4gICAgbGVmdDogMzMlO1xcbiAgICB0b3A6IDQ4JTtcXG59XFxuXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LjUsIDUpO1xcbiAgICBsZWZ0OiAxOCU7XFxuICAgIHRvcDogNDclO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0b3A6IDQ2JTtcXG4gICAgbGVmdDogMjQlO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNiwgOCk7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiAtMyU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi42LCAyKTtcXG4gICAgdG9wOiA4JTtcXG4gICAgbGVmdDogMzIlO1xcbn1cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMiwgMik7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjMsIDIuNSk7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyLjYpO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogMTclO1xcbn1cXG5cXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdG9wOiAxNSU7XFxufVxcbi50aWxlLm9uQm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uZHJhZ2dlZE92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmludmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLm9wdGlvbnNDb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggYmxhY2s7XFxufVxcbi5vcHRpb25zSG91c2luZyB7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDE4NywgMTg3LCAxODcpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbn1cXG5cXG4uaHVlU2xpZGVyIHtcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMjVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDVweCB2YXIoLS10aGVtZS1jb2xvciksIDAgMCA1cHggdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjJzO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XFxufVxcblxcbi5odWVTbGlkZXI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaHVlU2xpZGVyOjotd2Via2l0LXNsaWRlci10aHVtYiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDFweCkgaHVlLXJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4uc2xpZGVyOjotbW96LXJhbmdlLXRodW1iIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDFweCkgaHVlLXJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4jdmlkZW9CdG4ge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIHdpZHRoOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA0cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDFweCk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jdmlkZW9CdG46aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jdmlkZW9CdG4ucGF1c2U6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogNXB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuXFxuI3ZpZGVvQnRuLnBhdXNlOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogNXB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuXFxuI3ZpZGVvQnRuLnBsYXk6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWxlZnQ6IDE1cHggc29saWQgdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAtM3B4O1xcbn1cXG5cXG4uc2hpcEZvb3RlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5zdGFnZVBhcmEge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMi41cyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQyIDFzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0MiB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICB9XFxufVxcblxcbi53YXZlc0FsdCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcblxcbiAgICB0b3A6IC0xMDBweDtcXG59XFxuXFxuLndhdmVzQWx0LmFuaW1hdGUge1xcbiAgICBhbmltYXRpb246IHdhdmUgMTBzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcbn1cXG4uc2hpcEJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxOTQsIDE5NCwgMTk0LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAtNDAwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG4uc2hpcEJvd1dvb2Qge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTE5LCA1NywgMCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NCwgNzksIDAsIDEpIDQ2JSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMTAwJVxcbiAgICApO1xcblxcbiAgICB0b3A6IC02NDBweDtcXG4gICAgbGVmdDogMTYwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEsXFxuLmZsYWtCYXJyZWwyLFxcbi5mbGFrQmFycmVsMyxcXG4uZmxha0JhcnJlbDQsXFxuLmZsYWtCYXJyZWw1LFxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsMiB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWwzIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDQge1xcbiAgICB0b3A6IC05MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWw1IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG5cXG4uZmxha0NvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IDE1MHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMjAwcHg7XFxufVxcbi5mbGFrQ292ZXJUb3Age1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMTU4KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNTgsIDE1OCwgMTU4LCAxKSAxJSxcXG4gICAgICAgIHJnYmEoMTEzLCAxMTMsIDExMywgMSkgNDclLFxcbiAgICAgICAgcmdiYSgxMTIsIDExMiwgMTEyLCAxKSA5OSVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAxMDBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbkBrZXlmcmFtZXMgd2F2ZSB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNSUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcbi5BSVN0YWdlIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG59XFxuXFxuLnBsYXllclN0YWdlIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG59XFxuXFxuLnBsYXllclN0YWdlIC5zaGlwRm9vdGVyIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLkFJU2NvcmVDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDcwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnBsYXllclNjb3JlQ29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiA3MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5zY29yZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDQwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBwYWRkaW5nOiAwLjhyZW07XFxufVxcbi5zY29yZUNvbnRhaW5lci5BSVNjb3JlIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDQwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uc2hpcENvbCB7XFxuICAgIHdpZHRoOiAyMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkFJU3RhZ2UgLnNoaXBDb2wge1xcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uc2hpcENvbCBpbWc6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxufVxcblxcbi5zaGlwQ29sIGltZyB7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBmaWx0ZXI6IHZhcigtLWZpbHRlcik7XFxufVxcblxcbi5BSVN0YWdlIC5zaGlwQ29sIGltZyB7XFxuICAgIGZpbHRlcjogdmFyKC0tb3Bwb3NpdGUtZmlsdGVyKTtcXG59XFxuXFxuLnRvcFNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAzMyU7XFxufVxcblxcbi5taWRTZWN0aW9uIHtcXG4gICAgaGVpZ2h0OiAzNCU7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBmb250LXNpemU6IDAuOXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5BSVNjb3JlIC5taWRTZWN0aW9uIHtcXG4gICAgY29sb3I6IHZhcigtLW9wcG9zaXRlLWNvbG9yKTtcXG59XFxuXFxuLkFJU3RhZ2UgLm9wdGlvbnNIb3VzaW5nIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uYm90U2VjdGlvbiB7XFxuICAgIGhlaWdodDogMzMlO1xcbn1cXG5cXG4uc2hpcENvbC5zaGlwU3VuayB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5zaGlwQ29sLnNoaXBTdW5rIC5taWRTZWN0aW9uIHtcXG4gICAgY29sb3I6IHZhcigtLW9wcG9zaXRlLWNvbG9yKTtcXG59XFxuLnNoaXBDb2wuc2hpcFN1bmsgaW1nIHtcXG4gICAgZmlsdGVyOiB2YXIoLS1vcHBvc2l0ZS1maWx0ZXIpO1xcbn1cXG5cXG4uQUlTdGFnZSAuc2hpcENvbC5zaGlwU3VuayB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5BSVN0YWdlIC5zaGlwQ29sLnNoaXBTdW5rIC5taWRTZWN0aW9uIHtcXG4gICAgY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG59XFxuLkFJU3RhZ2UgLnNoaXBDb2wuc2hpcFN1bmsgaW1nIHtcXG4gICAgZmlsdGVyOiB2YXIoLS1maWx0ZXIpO1xcbn1cXG5cXG4jY29udGFpbmVyIC5zaGlwQ29sOm50aC1jaGlsZCgxKSB7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG5cXG4jY29udGFpbmVyIC5zaGlwQ29sOm50aC1jaGlsZCg1KSB7XFxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuXFxuLm9wdGlvbnNDb250YWluZXIuaW5HYW1lIHtcXG4gICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHJnYigxMTQsIDExNCwgMTE0KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuLmluR2FtZSAub3B0aW9uc0hvdXNpbmcge1xcbiAgICBib3JkZXItYm90dG9tOiAwO1xcbiAgICBib3JkZXItcmlnaHQ6IDA7XFxuICAgIGJvcmRlci10b3A6IDA7XFxuICAgIGJvcmRlci1sZWZ0OiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuXFxuLm1vZGVsQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42NDQpO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMjtcXG59XFxuXFxuLmdhbWVPdmVyQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiA2MCU7XFxuXFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgICAgICAgICAgY2lyY2xlIDEwMHB4IGF0IHRvcCBsZWZ0LFxcbiAgICAgICAgICAgICAgICAjMDAwMCA5OCUsXFxuICAgICAgICAgICAgICAgIHJnYig4OCwgODgsIDg4KVxcbiAgICAgICAgICAgIClcXG4gICAgICAgICAgICB0b3AgbGVmdCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgdG9wIHJpZ2h0LCAjMDAwMCA5OCUsIHJnYig4OCwgODgsIDg4KSlcXG4gICAgICAgICAgICB0b3AgcmlnaHQsXFxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIDEwMHB4IGF0IGJvdHRvbSBsZWZ0LCAjMDAwMCA5OCUsIHJnYig4OCwgODgsIDg4KSlcXG4gICAgICAgICAgICBib3R0b20gbGVmdCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgICAgICAgICAgY2lyY2xlIDEwMHB4IGF0IGJvdHRvbSByaWdodCxcXG4gICAgICAgICAgICAgICAgIzAwMDAgOTglLFxcbiAgICAgICAgICAgICAgICByZ2IoODgsIDg4LCA4OClcXG4gICAgICAgICAgICApXFxuICAgICAgICAgICAgYm90dG9tIHJpZ2h0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDUxJSA1MSU7XFxuXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZnJhbWVDb250YWluZXIge1xcbiAgICB3aWR0aDogOTIlO1xcbiAgICBoZWlnaHQ6IDg1JTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgICAgICAgICBjaXJjbGUgMTAwcHggYXQgdG9wIGxlZnQsXFxuICAgICAgICAgICAgICAgICMwMDAwIDk4JSxcXG4gICAgICAgICAgICAgICAgcmdiKDE0MywgMTQzLCAxNDMpXFxuICAgICAgICAgICAgKVxcbiAgICAgICAgICAgIHRvcCBsZWZ0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgICAgICAgICBjaXJjbGUgMTAwcHggYXQgdG9wIHJpZ2h0LFxcbiAgICAgICAgICAgICAgICAjMDAwMCA5OCUsXFxuICAgICAgICAgICAgICAgIHJnYigxNDMsIDE0MywgMTQzKVxcbiAgICAgICAgICAgIClcXG4gICAgICAgICAgICB0b3AgcmlnaHQsXFxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgIGNpcmNsZSAxMDBweCBhdCBib3R0b20gbGVmdCxcXG4gICAgICAgICAgICAgICAgIzAwMDAgOTglLFxcbiAgICAgICAgICAgICAgICByZ2IoMTQzLCAxNDMsIDE0MylcXG4gICAgICAgICAgICApXFxuICAgICAgICAgICAgYm90dG9tIGxlZnQsXFxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgIGNpcmNsZSAxMDBweCBhdCBib3R0b20gcmlnaHQsXFxuICAgICAgICAgICAgICAgICMwMDAwIDk4JSxcXG4gICAgICAgICAgICAgICAgcmdiKDE0MywgMTQzLCAxNDMpXFxuICAgICAgICAgICAgKVxcbiAgICAgICAgICAgIGJvdHRvbSByaWdodDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA1MSUgNTElO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcblxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4ubWFzayB7XFxuICAgIHdpZHRoOiA2MyU7XFxuICAgIGhlaWdodDogNDglO1xcbiAgICAtd2Via2l0LW1hc2s6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgdG9wIGxlZnQsICMwMDAwIDk4JSwgIzAwMCkgdG9wXFxuICAgICAgICAgICAgbGVmdCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgdG9wIHJpZ2h0LCAjMDAwMCA5OCUsICMwMDApIHRvcCByaWdodCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgYm90dG9tIGxlZnQsICMwMDAwIDk4JSwgIzAwMCkgYm90dG9tXFxuICAgICAgICAgICAgbGVmdCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgYm90dG9tIHJpZ2h0LCAjMDAwMCA5OCUsICMwMDApIGJvdHRvbVxcbiAgICAgICAgICAgIHJpZ2h0O1xcbiAgICAtd2Via2l0LW1hc2stc2l6ZTogNTElIDUxJTtcXG4gICAgLXdlYmtpdC1tYXNrLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi50b3BEaXYsXFxuLm1pZERpdixcXG4uYm90RGl2IHtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLnRpdGxlQm9yZGVyIHtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDgwLCA4MCwgODApO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTMxLCAxMzEsIDEzMSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICAgIHBhZGRpbmc6IDAgMnJlbTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4udGl0bGVCb3JkZXI6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDE1cHg7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IGJsYWNrO1xcbn1cXG5cXG4udGl0bGVCb3JkZXI6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgcmlnaHQ6IDE1cHg7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IGJsYWNrO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBjb2xvcjogcmdiKDQ2LCA0NiwgNDYpO1xcbiAgICBmb250LXNpemU6IDVyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4ICM4MTgxODEsIDFweCAycHggMXB4ICM4MTgxODEsIDFweCAzcHggMXB4ICM4MTgxODEsXFxuICAgICAgICAxcHggNHB4IDFweCAjODE4MTgxLCAzcHggNnB4IDEwcHggYmxhY2s7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbn1cXG5cXG4ud2luU3RhdGUge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBjb2xvcjogcmdiKDk5LCA5OSwgOTkpO1xcbiAgICBmb250LXNpemU6IDhyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4ICNhOGE4YTgsIDFweCAycHggMXB4ICNhOGE4YTgsIDFweCAzcHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggNHB4IDFweCAjYThhOGE4LCA1cHggMTBweCAyMHB4IGJsYWNrO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMTBweDtcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG59XFxuXFxuLm5ld0dhbWVCb3JkZXIge1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoODAsIDgwLCA4MCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNTMsIDE1MywgMTUzKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gICAgcGFkZGluZzogMCAycmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm94LXNoYWRvdzogM3B4IDNweCAxMHB4IGJsYWNrO1xcbiAgICBhbmltYXRpb246IGFsZXJ0IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLm5ld0dhbWVCb3JkZXI6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDIwcHggYmxhY2s7XFxufVxcblxcbi5uZXdHYW1lQm9yZGVyOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEycHg7XFxuICAgIGhlaWdodDogMTJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICByaWdodDogMTVweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAzcHggYmxhY2s7XFxufVxcblxcbi5uZXdHYW1lQm9yZGVyOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDE1cHg7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IGJsYWNrO1xcbn1cXG5cXG4ubmV3R2FtZUJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGNvbG9yOiByZ2IoNjEsIDYxLCA2MSk7XFxuICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDVweCAxMHB4IDIwcHggYmxhY2s7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFsZXJ0IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTgwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxOTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTYwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTUwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbiAgICB9XFxuXFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxMDBweDtcXG4gICAgfVxcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG4gICAgfVxcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgdG9wOiAtMjBweDtcXG4gICAgICAgIGxlZnQ6IC01MHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgICAgIHdpZHRoOiAzNTBweDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgdG9wOiAtNTBweDtcXG4gICAgICAgIGxlZnQ6IC04MHB4O1xcbiAgICB9XFxuXFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgaGVpZ2h0OiA2MHZoO1xcbiAgICB9XFxuXFxuICAgIC5wMUdyaWRDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICB9XFxuXFxuICAgIC5ib2FyZCB7XFxuICAgICAgICBtYXJnaW4tdG9wOiBub25lO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICB9XFxuICAgIC5jZWxsIHtcXG4gICAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0b3A6IGF1dG87XFxuICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgYm90dG9tOiAtNTBweDtcXG4gICAgICAgIHJpZ2h0OiAtMTAwcHg7XFxuICAgICAgICB6LWluZGV4OiA1O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL2dhbWVwYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHNDQUFzQztJQUN0QywyQ0FBMkM7SUFDM0Msc0JBQXNCO0lBQ3RCLHlDQUF5QztJQUN6Qyw4Q0FBOEM7SUFDOUMscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxhQUFhOztJQUViLDhCQUE4QjtJQUM5Qjs7Ozs7Ozs7S0FRQztJQUNELGlCQUFpQjtJQUNqQix5Q0FBeUM7SUFDekMsMkNBQTJDO0lBQzNDLHlDQUF5QztJQUN6QywwQ0FBMEM7SUFDMUMsOEJBQThCO0lBQzlCLFVBQVU7QUFDZDtBQUNBO0lBQ0ksT0FBTzs7SUFFUCw2QkFBNkI7SUFDN0IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lB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YTtRQUNiLE9BQU87UUFDUCxVQUFVO1FBQ1YsU0FBUztJQUNiOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLG9DQUFvQztRQUNwQyx1Q0FBdUM7SUFDM0M7SUFDQTtRQUNJLFdBQVc7UUFDWCxZQUFZO0lBQ2hCO0lBQ0E7UUFDSSxTQUFTO1FBQ1QsVUFBVTtRQUNWLGFBQWE7UUFDYixhQUFhO1FBQ2IsVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGFBQWE7SUFDakI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAgIC0tdGhlbWUtY29sb3I6IGhzbGEoMTIwLCAxMDAlLCA1MCUsIDEpO1xcbiAgICAtLWxvd0FscGhhLWNvbG9yOiBoc2xhKDEyMCwgMTAwJSwgNTAlLCAwLjUpO1xcbiAgICAtLWZpbHRlcjogaHVlLXJvdGF0ZSgpO1xcbiAgICAtLW9wcG9zaXRlLWNvbG9yOiBoc2xhKDMwMCwgMTAwJSwgNTAlLCAxKTtcXG4gICAgLS1vcHBvc2l0ZS1sb3dBbHBoYTogaHNsYSgzMDAsIDEwMCUsIDUwJSwgMC41KTtcXG4gICAgLS1vcHBvc2l0ZS1maWx0ZXI6IGh1ZS1yb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuLmdhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5xdWV1ZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICBmbGV4OiAxLjM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuXFxuICAgIGJhY2tncm91bmQ6IHJnYigxNDQsIDE0NCwgMTQ0KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTQwLCAxNDAsIDE0MCwgMSkgMTElLFxcbiAgICAgICAgcmdiYSgxMzYsIDEzNiwgMTM2LCAxKSAyMSUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDY5JSxcXG4gICAgICAgIHJnYmEoMTM4LCAxMzgsIDEzOCwgMSkgODclLFxcbiAgICAgICAgcmdiYSgxNjgsIDE2OCwgMTY4LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig4MywgODMsIDgzKTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHJnYigxMjYsIDEyNiwgMTI2KTtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCByZ2IoMTYzLCAxNjMsIDE2Myk7XFxuICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYigxNDUsIDE0NSwgMTQ1KTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggNXB4IGJsYWNrO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG4ucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgZmxleDogMztcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5yYWRhckNvbnRhaW5lciB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5yYWRhciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMC45KTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB3aWR0aDogMjYzcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBib3JkZXI6IDEwcHggc29saWQgIzZkNmQ2ZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAxMHB4IDAgI2M1YzVjNSwgaW5zZXQgMCAwIDUwcHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgLTVweCAtNXB4IDIwcHggYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoMSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDYpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDUpIHtcXG4gICAgd2lkdGg6IDc1cHg7XFxuICAgIGhlaWdodDogNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIHdpZHRoOiAxNzVweDtcXG4gICAgaGVpZ2h0OiAxNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg3KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB2YXIoLS10aGVtZS1jb2xvcikgMCUsIHRyYW5zcGFyZW50IDUwJSk7XFxuICAgIGFuaW1hdGlvbjogcmFkYXIgMnMgbGluZWFyIGluZmluaXRlO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG59XFxuXFxuLmVuZW15UGluZzAge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA4NyU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5lbmVteVBpbmcxIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogOTAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZW5lbXlQaW5nMiB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDg1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmVuZW15UGluZzMge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5lbmVteVBpbmc0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uZnJpZW5kbHlQaW5nMCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MyU7XFxuICAgIGxlZnQ6IDQyJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLmZyaWVuZGx5UGluZzEge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDclO1xcbiAgICBsZWZ0OiA0NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5mcmllbmRseVBpbmcyIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDU1JTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uZnJpZW5kbHlQaW5nMyB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDU1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLmZyaWVuZGx5UGluZzQge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgcmFkYXIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBnbG93IHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig5MCwgOTAsIDkwKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5sZWZ0QnV0dG9uQ29udGFpbmVyLFxcbi5taWRkbGVCdXR0b25Db250YWluZXIsXFxuLnJpZ2h0QnV0dG9uQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDgzLCA4MywgODMpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBiYWNrZ3JvdW5kOiAjY2FjYWNhO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjd2bWluO1xcbiAgICBib3gtc2hhZG93OiAwIDZ2bWluIDAuMTV2bWluIDB2bWluIHJnYig5MiwgOTIsIDkyKSxcXG4gICAgICAgIDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gcmdiKDkyLCA5MiwgOTIpLFxcbiAgICAgICAgMCAydm1pbiAwLjE1dm1pbiAwdm1pbiByZ2IoOTIsIDkyLCA5MiksXFxuICAgICAgICAyMHB4IDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjcyNiksXFxuICAgICAgICA4MHB4IDE2MHB4IDEwMHB4IHJnYmEoMCwgMCwgMCwgMC41MDcpO1xcbiAgICBwYWRkaW5nOiAwdm1pbiAydm1pbiAydm1pbiAydm1pbjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpIHJvdGF0ZVooMGRlZyk7XFxuICAgIG1hcmdpbi10b3A6IC00LjV2bWluO1xcbiAgICBoZWlnaHQ6IDkwJTtcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlIHtcXG4gICAgYmFja2dyb3VuZDogI2Q2MDUwNTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICB3aWR0aDogMjB2bWluO1xcbiAgICBoZWlnaHQ6IDE5dm1pbjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJveC1zaGFkb3c6IDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAydm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0yLjV2bWluO1xcbiAgICBib3JkZXI6IDAuNXZtaW4gc29saWQgI2FmMDAwMGExO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAzdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogLTEuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UgMHM7XFxufVxcbmJ1dHRvbiNhY3RpdmF0ZTphY3RpdmUsXFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IDAuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGUucHVzaGVkIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDIwcHggMTBweCAjZmYzYzNjLCAwIDAgMTAwcHggNTBweCAjZmYyODI4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmYwMDAwO1xcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzAwMDAwMDIwO1xcbn1cXG5cXG4uYmFzZSB7XFxuICAgIHNjYWxlOiAwLjM7XFxufVxcbi5yaWdodEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTg3LCAxODYsIDE4Nik7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYigxOTAsIDE5MCwgMTkwKTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTIyLCAxMjIsIDEyMik7XFxufVxcbi5taWRkbGVCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDE4MiwgMTgyLCAxODIpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoMTgwLCAxODAsIDE4MCk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoODAsIDgwLCA4MCk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDExOSwgMTE5LCAxMTkpO1xcbn1cXG4ubGVmdEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTg0LCAxODQsIDE4NCk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYigxODIsIDE4MSwgMTgxKTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig5MCwgOTAsIDkwKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTgsIDExOCk7XFxufVxcblxcbi5idXR0b25UZXh0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZkNmQ2ZDtcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMTUlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCBibGFjaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XFxuICAgIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMXB4IGJsYWNrO1xcbn1cXG4uYnV0dG9uVGV4dDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcblxcbi5taWRkbGVCdXR0b24gLmJ1dHRvblRleHQge1xcbiAgICBwYWRkaW5nOiAxcmVtIDEuMXJlbTtcXG59XFxuXFxuLnAxU2hpcFN0YWdlIHtcXG4gICAgZmxleDogNTtcXG4gICAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkIHJnYigxNTgsIDE1OCwgMTU4KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgcmdiKDE5OSwgMTk4LCAxOTgpO1xcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uc2hpcENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDE7XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYigyNDMsIDI0MywgMjQzKTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYig1OCwgNTgsIDU4KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoODAsIDc5LCA3OSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNTBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5zaGlwUXVldWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBmbGV4OiAzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDE4JTtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDVweCk7XFxufVxcbi5uZXh0U2hpcENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgIGluc2V0IDAgMCAxMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuLmhpZGVOZXh0IHtcXG4gICAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuLm5leHRTaGlwQ29udGFpbmVyOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggdmFyKC0tdGhlbWUtY29sb3IpLCBpbnNldCAwIDAgMTBweCB2YXIoLS10aGVtZS1jb2xvcik7XFxufVxcblxcbi5uZXh0U2hpcDpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLm5leHRTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQ2FycmllckNvbnRhaW5lcixcXG4uQmF0dGxlc2hpcENvbnRhaW5lcixcXG4uRGVzdHJveWVyQ29udGFpbmVyLFxcbi5TdWJtYXJpbmVDb250YWluZXIsXFxuLlBhdHJvbC1Cb2F0Q29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI0NhcnJpZXJPdmVybGF5LFxcbiNCYXR0bGVzaGlwT3ZlcmxheSxcXG4jRGVzdHJveWVyT3ZlcmxheSxcXG4jU3VibWFyaW5lT3ZlcmxheSxcXG4jUGF0cm9sLUJvYXRPdmVybGF5IHtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG4gICAgZmlsdGVyOiB2YXIoLS1maWx0ZXIpO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAjQ2Fycmllck92ZXJsYXksXFxuLkFJQm9hcmRDb250YWluZXIgI0JhdHRsZXNoaXBPdmVybGF5LFxcbi5BSUJvYXJkQ29udGFpbmVyICNEZXN0cm95ZXJPdmVybGF5LFxcbi5BSUJvYXJkQ29udGFpbmVyICNTdWJtYXJpbmVPdmVybGF5LFxcbi5BSUJvYXJkQ29udGFpbmVyICNQYXRyb2wtQm9hdE92ZXJsYXkge1xcbiAgICBmaWx0ZXI6IHZhcigtLW9wcG9zaXRlLWZpbHRlcik7XFxufVxcblxcbiNDYXJyaWVyLFxcbiNCYXR0bGVzaGlwLFxcbiNEZXN0cm95ZXIsXFxuI1N1Ym1hcmluZSxcXG4jUGF0cm9sLUJvYXQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnNoaXBPdmVybGF5UHVsc2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgYW5pbWF0aW9uOiBwdWxzZSAwLjdzIGVhc2Utb3V0O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgICAgIDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICB9XFxuXFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKSxcXG4gICAgICAgICAgICAwIDAgNXB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgICAgIDAgMCA1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICB9XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgLyogYW5pbWF0aW9uOiByb3RhdGUgMC40cyBlYXNlLWluLW91dDsgKi9cXG59XFxuXFxuLyogLnNoaXBPdmVybGF5Lmhvcml6b250YWwge1xcbiAgICBhbmltYXRpb246IHJvdGF0ZTEgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUuNSkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlMSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS42KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbn0gKi9cXG5cXG4jUGF0cm9sLUJvYXRPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDMpO1xcbn1cXG5cXG4uc2hpcFRpbGUge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zaGlwLmhvcml6b250YWwge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG5cXG4uZ2FtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYm9hcmRCb3JkZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJvcmRlci1ib3R0b206IDE1cHggc29saWQgcmdiKDExNiwgMTE2LCAxMTYpO1xcbiAgICBib3JkZXItcmlnaHQ6IDIwcHggc29saWQgcmdiKDEzOCwgMTM3LCAxMzcpO1xcbiAgICBib3JkZXItdG9wOiAyMHB4IHNvbGlkIHJnYigxMTcsIDExNywgMTE3KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDIwcHggc29saWQgcmdiKDEwMiwgMTAyLCAxMDIpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDE1cHggYmxhY2s7XFxuICAgIHotaW5kZXg6IDI7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTVweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxuICAgIGJvcmRlci1yaWdodDogMjBweCBzb2xpZCByZ2IoMTgyLCAxODIsIDE4Mik7XFxuICAgIGJvcmRlci10b3A6IDIwcHggc29saWQgcmdiKDUzLCA1MywgNTMpO1xcbiAgICBib3JkZXItbGVmdDogMjBweCBzb2xpZCByZ2IoNzUsIDc1LCA3NSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE0MHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG5cXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5wbGF5ZXJCb2FyZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxufVxcbi5BSUJvYXJkQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG59XFxuXFxuLkFJQm9hcmRDb250YWluZXIgLmJvYXJkIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE0MHB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLnNoYWRvd0dyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZyxcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZyB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXA6aG92ZXIsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXA6aG92ZXIsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXA6aG92ZXIsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcDpob3ZlciB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuXFxuLnRpbGUge1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxufVxcblxcbi5jZWxsIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uY2VsbDpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuXFxuLmNlbGwuaGl0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4IHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgd2lkdGg6IDI2cHg7XFxuICAgIGhlaWdodDogMjZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBvcGFjaXR5OiA2MCU7XFxufVxcblxcbi5jZWxsLmhpdDo6YmVmb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTVweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSksXFxuICAgICAgICAwIDAgMTVweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgb3BhY2l0eTogNjAlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5cXG4uY2VsbC5taXNzOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcblxcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIG9wYWNpdHk6IDcwJTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpLFxcbiAgICAgICAgMCAwIDE1cHggdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBmaWx0ZXI6IGJsdXIoMS41cHgpO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcbi5BSUJvYXJkQ29udGFpbmVyIC5jZWxsLm1pc3M6OmJlZm9yZSB7XFxuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDEwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpLFxcbiAgICAgICAgMCAwIDEwcHggdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbn1cXG5cXG4uQUlCb2FyZENvbnRhaW5lciAuY2VsbC5oaXQ6OmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5BSUJvYXJkQ29udGFpbmVyIC5jZWxsLmhpdDo6YmVmb3JlIHtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tbG93QWxwaGEtY29sb3IpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTVweCB2YXIoLS1sb3dBbHBoYS1jb2xvciksXFxuICAgICAgICAwIDAgMTVweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5jZWxsLnB1bHNlOjpiZWZvcmUge1xcbiAgICBhbmltYXRpb246IHB1bHNlMiAxcyBsaW5lYXI7XFxufVxcblxcbkBrZXlmcmFtZXMgcHVsc2UyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcblxcbiAgICA0MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgzKTtcXG4gICAgfVxcblxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgfVxcbiAgICA5MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgzKTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIH1cXG59XFxuXFxuLmNlbGxbZGF0YS1jb2w9XFxcIjBcXFwiXSB7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uY2VsbFtkYXRhLWNvbD1cXFwiOVxcXCJdIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbn1cXG4uY2VsbFtkYXRhLXJvdz1cXFwiMFxcXCJdIHtcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXG59XFxuLmNlbGxbZGF0YS1yb3c9XFxcIjlcXFwiXSB7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI1N1Ym1hcmluZSBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIGxlZnQ6IC01JTtcXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbn1cXG5cXG4uYm9hcmRTaGlwIHtcXG4gICAgei1pbmRleDogOTtcXG59XFxuXFxuLmJvYXJkU2hpcCBpbWcge1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDgsIDYpO1xcbiAgICBsZWZ0OiAzMyU7XFxuICAgIHRvcDogNDglO1xcbn1cXG5cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYuNSwgNSk7XFxuICAgIGxlZnQ6IDE4JTtcXG4gICAgdG9wOiA0NyU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRvcDogNDYlO1xcbiAgICBsZWZ0OiAyNCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LCA4KTtcXG4gICAgdG9wOiA0MyU7XFxuICAgIGxlZnQ6IC0zJTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjYsIDIpO1xcbiAgICB0b3A6IDglO1xcbiAgICBsZWZ0OiAzMiU7XFxufVxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4yLCAyKTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMywgMi41KTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIuNik7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiAxNyU7XFxufVxcblxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0b3A6IDE1JTtcXG59XFxuLnRpbGUub25Cb2FyZCB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxufVxcblxcbi5kcmFnZ2VkT3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uaW52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxufVxcblxcbi52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4ub3B0aW9uc0NvbnRhaW5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTVweCBibGFjaztcXG59XFxuLm9wdGlvbnNIb3VzaW5nIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCByZ2IoMTg3LCAxODcsIDE4Nyk7XFxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgcmdiKDg3LCA4NywgODcpO1xcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxufVxcblxcbi5odWVTbGlkZXIge1xcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNXB4IHZhcigtLXRoZW1lLWNvbG9yKSwgMCAwIDVweCB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIG9wYWNpdHk6IDAuNztcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IDAuMnM7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcXG59XFxuXFxuLmh1ZVNsaWRlcjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5odWVTbGlkZXI6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmaWx0ZXI6IGJsdXIoMXB4KSBodWUtcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbi5zbGlkZXI6Oi1tb3otcmFuZ2UtdGh1bWIge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmaWx0ZXI6IGJsdXIoMXB4KSBodWUtcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbiN2aWRlb0J0biB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMXB4KTtcXG4gICAgb3BhY2l0eTogMC44O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN2aWRlb0J0bjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbiN2aWRlb0J0bi5wYXVzZTo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiA1cHg7XFxuICAgIGhlaWdodDogMjBweDtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbn1cXG5cXG4jdmlkZW9CdG4ucGF1c2U6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiA1cHg7XFxuICAgIGhlaWdodDogMjBweDtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbn1cXG5cXG4jdmlkZW9CdG4ucGxheTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItbGVmdDogMTVweCBzb2xpZCB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IC0zcHg7XFxufVxcblxcbi5zaGlwRm9vdGVyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnN0YWdlUGFyYSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBtYXJnaW46IDFyZW07XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTtcXG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAyLjVzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldDIgMXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQyIHtcXG4gICAgZnJvbSxcXG4gICAgdG8ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7XFxuICAgIH1cXG59XFxuXFxuLndhdmVzQWx0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuXFxuICAgIHRvcDogLTEwMHB4O1xcbn1cXG5cXG4ud2F2ZXNBbHQuYW5pbWF0ZSB7XFxuICAgIGFuaW1hdGlvbjogd2F2ZSAxMHMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XFxufVxcbi5zaGlwQm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE5NCwgMTk0LCAxOTQsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IC00MDBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcbi5zaGlwQm93V29vZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxMTksIDU3LCAwKTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY0LCA3OSwgMCwgMSkgNDYlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAxMDAlXFxuICAgICk7XFxuXFxuICAgIHRvcDogLTY0MHB4O1xcbiAgICBsZWZ0OiAxNjBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSxcXG4uZmxha0JhcnJlbDIsXFxuLmZsYWtCYXJyZWwzLFxcbi5mbGFrQmFycmVsNCxcXG4uZmxha0JhcnJlbDUsXFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWwyIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDMge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcbi5mbGFrQmFycmVsNCB7XFxuICAgIHRvcDogLTkwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDUge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcblxcbi5mbGFrQ292ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogMTUwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAyMDBweDtcXG59XFxuLmZsYWtDb3ZlclRvcCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAxNTgpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE1OCwgMTU4LCAxNTgsIDEpIDElLFxcbiAgICAgICAgcmdiYSgxMTMsIDExMywgMTEzLCAxKSA0NyUsXFxuICAgICAgICByZ2JhKDExMiwgMTEyLCAxMTIsIDEpIDk5JVxcbiAgICApO1xcblxcbiAgICB0b3A6IDEwMHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuQGtleWZyYW1lcyB3YXZlIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE1JSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgIH1cXG59XFxuLkFJU3RhZ2Uge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbn1cXG5cXG4ucGxheWVyU3RhZ2Uge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbn1cXG5cXG4ucGxheWVyU3RhZ2UgLnNoaXBGb290ZXIge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uQUlTY29yZUNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogNzAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucGxheWVyU2NvcmVDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDcwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuLnNjb3JlQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCByZ2IoMTE0LCAxMTQsIDExNCk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHJnYig4NywgODcsIDg3KTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMTksIDExOSwgMTE5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNDBweCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIHBhZGRpbmc6IDAuOHJlbTtcXG59XFxuLnNjb3JlQ29udGFpbmVyLkFJU2NvcmUge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNDBweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5zaGlwQ29sIHtcXG4gICAgd2lkdGg6IDIwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQUlTdGFnZSAuc2hpcENvbCB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tb3Bwb3NpdGUtbG93QWxwaGEpO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5zaGlwQ29sIGltZzpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG59XFxuXFxuLnNoaXBDb2wgaW1nIHtcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIGZpbHRlcjogdmFyKC0tZmlsdGVyKTtcXG59XFxuXFxuLkFJU3RhZ2UgLnNoaXBDb2wgaW1nIHtcXG4gICAgZmlsdGVyOiB2YXIoLS1vcHBvc2l0ZS1maWx0ZXIpO1xcbn1cXG5cXG4udG9wU2VjdGlvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDMzJTtcXG59XFxuXFxuLm1pZFNlY3Rpb24ge1xcbiAgICBoZWlnaHQ6IDM0JTtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgICBjb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLkFJU2NvcmUgLm1pZFNlY3Rpb24ge1xcbiAgICBjb2xvcjogdmFyKC0tb3Bwb3NpdGUtY29sb3IpO1xcbn1cXG5cXG4uQUlTdGFnZSAub3B0aW9uc0hvdXNpbmcge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxufVxcblxcbi5ib3RTZWN0aW9uIHtcXG4gICAgaGVpZ2h0OiAzMyU7XFxufVxcblxcbi5zaGlwQ29sLnNoaXBTdW5rIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1vcHBvc2l0ZS1sb3dBbHBoYSk7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLW9wcG9zaXRlLWxvd0FscGhhKTtcXG59XFxuXFxuLnNoaXBDb2wuc2hpcFN1bmsgLm1pZFNlY3Rpb24ge1xcbiAgICBjb2xvcjogdmFyKC0tb3Bwb3NpdGUtY29sb3IpO1xcbn1cXG4uc2hpcENvbC5zaGlwU3VuayBpbWcge1xcbiAgICBmaWx0ZXI6IHZhcigtLW9wcG9zaXRlLWZpbHRlcik7XFxufVxcblxcbi5BSVN0YWdlIC5zaGlwQ29sLnNoaXBTdW5rIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1sb3dBbHBoYS1jb2xvcik7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWxvd0FscGhhLWNvbG9yKTtcXG59XFxuXFxuLkFJU3RhZ2UgLnNoaXBDb2wuc2hpcFN1bmsgLm1pZFNlY3Rpb24ge1xcbiAgICBjb2xvcjogdmFyKC0tdGhlbWUtY29sb3IpO1xcbn1cXG4uQUlTdGFnZSAuc2hpcENvbC5zaGlwU3VuayBpbWcge1xcbiAgICBmaWx0ZXI6IHZhcigtLWZpbHRlcik7XFxufVxcblxcbiNjb250YWluZXIgLnNoaXBDb2w6bnRoLWNoaWxkKDEpIHtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcblxcbiNjb250YWluZXIgLnNoaXBDb2w6bnRoLWNoaWxkKDUpIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbn1cXG5cXG4ub3B0aW9uc0NvbnRhaW5lci5pbkdhbWUge1xcbiAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgcmdiKDExNCwgMTE0LCAxMTQpO1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCByZ2IoODcsIDg3LCA4Nyk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTE5LCAxMTksIDExOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4OiAxO1xcbn1cXG5cXG4uaW5HYW1lIC5vcHRpb25zSG91c2luZyB7XFxuICAgIGJvcmRlci1ib3R0b206IDA7XFxuICAgIGJvcmRlci1yaWdodDogMDtcXG4gICAgYm9yZGVyLXRvcDogMDtcXG4gICAgYm9yZGVyLWxlZnQ6IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG5cXG4ubW9kZWxDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjY0NCk7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4uZ2FtZU92ZXJDb250YWluZXIge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDYwJTtcXG5cXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgICAgICAgICBjaXJjbGUgMTAwcHggYXQgdG9wIGxlZnQsXFxuICAgICAgICAgICAgICAgICMwMDAwIDk4JSxcXG4gICAgICAgICAgICAgICAgcmdiKDg4LCA4OCwgODgpXFxuICAgICAgICAgICAgKVxcbiAgICAgICAgICAgIHRvcCBsZWZ0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAxMDBweCBhdCB0b3AgcmlnaHQsICMwMDAwIDk4JSwgcmdiKDg4LCA4OCwgODgpKVxcbiAgICAgICAgICAgIHRvcCByaWdodCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgMTAwcHggYXQgYm90dG9tIGxlZnQsICMwMDAwIDk4JSwgcmdiKDg4LCA4OCwgODgpKVxcbiAgICAgICAgICAgIGJvdHRvbSBsZWZ0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgICAgICAgICBjaXJjbGUgMTAwcHggYXQgYm90dG9tIHJpZ2h0LFxcbiAgICAgICAgICAgICAgICAjMDAwMCA5OCUsXFxuICAgICAgICAgICAgICAgIHJnYig4OCwgODgsIDg4KVxcbiAgICAgICAgICAgIClcXG4gICAgICAgICAgICBib3R0b20gcmlnaHQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNTElIDUxJTtcXG5cXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5mcmFtZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA5MiU7XFxuICAgIGhlaWdodDogODUlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgIGNpcmNsZSAxMDBweCBhdCB0b3AgbGVmdCxcXG4gICAgICAgICAgICAgICAgIzAwMDAgOTglLFxcbiAgICAgICAgICAgICAgICByZ2IoMTQzLCAxNDMsIDE0MylcXG4gICAgICAgICAgICApXFxuICAgICAgICAgICAgdG9wIGxlZnQsXFxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgIGNpcmNsZSAxMDBweCBhdCB0b3AgcmlnaHQsXFxuICAgICAgICAgICAgICAgICMwMDAwIDk4JSxcXG4gICAgICAgICAgICAgICAgcmdiKDE0MywgMTQzLCAxNDMpXFxuICAgICAgICAgICAgKVxcbiAgICAgICAgICAgIHRvcCByaWdodCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgICAgICAgICAgY2lyY2xlIDEwMHB4IGF0IGJvdHRvbSBsZWZ0LFxcbiAgICAgICAgICAgICAgICAjMDAwMCA5OCUsXFxuICAgICAgICAgICAgICAgIHJnYigxNDMsIDE0MywgMTQzKVxcbiAgICAgICAgICAgIClcXG4gICAgICAgICAgICBib3R0b20gbGVmdCxcXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgICAgICAgICAgY2lyY2xlIDEwMHB4IGF0IGJvdHRvbSByaWdodCxcXG4gICAgICAgICAgICAgICAgIzAwMDAgOTglLFxcbiAgICAgICAgICAgICAgICByZ2IoMTQzLCAxNDMsIDE0MylcXG4gICAgICAgICAgICApXFxuICAgICAgICAgICAgYm90dG9tIHJpZ2h0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDUxJSA1MSU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5tYXNrIHtcXG4gICAgd2lkdGg6IDYzJTtcXG4gICAgaGVpZ2h0OiA0OCU7XFxuICAgIC13ZWJraXQtbWFzazogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAxMDBweCBhdCB0b3AgbGVmdCwgIzAwMDAgOTglLCAjMDAwKSB0b3BcXG4gICAgICAgICAgICBsZWZ0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAxMDBweCBhdCB0b3AgcmlnaHQsICMwMDAwIDk4JSwgIzAwMCkgdG9wIHJpZ2h0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAxMDBweCBhdCBib3R0b20gbGVmdCwgIzAwMDAgOTglLCAjMDAwKSBib3R0b21cXG4gICAgICAgICAgICBsZWZ0LFxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAxMDBweCBhdCBib3R0b20gcmlnaHQsICMwMDAwIDk4JSwgIzAwMCkgYm90dG9tXFxuICAgICAgICAgICAgcmlnaHQ7XFxuICAgIC13ZWJraXQtbWFzay1zaXplOiA1MSUgNTElO1xcbiAgICAtd2Via2l0LW1hc2stcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuXFxuLnRvcERpdixcXG4ubWlkRGl2LFxcbi5ib3REaXYge1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4udGl0bGVCb3JkZXIge1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoODAsIDgwLCA4MCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzEsIDEzMSwgMTMxKTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gICAgcGFkZGluZzogMCAycmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi50aXRsZUJvcmRlcjo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogMTVweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAzcHggYmxhY2s7XFxufVxcblxcbi50aXRsZUJvcmRlcjo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEycHg7XFxuICAgIGhlaWdodDogMTJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDc0NzQ3O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICByaWdodDogMTVweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAzcHggYmxhY2s7XFxufVxcblxcbi50aXRsZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGNvbG9yOiByZ2IoNDYsIDQ2LCA0Nik7XFxuICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggIzgxODE4MSwgMXB4IDJweCAxcHggIzgxODE4MSwgMXB4IDNweCAxcHggIzgxODE4MSxcXG4gICAgICAgIDFweCA0cHggMXB4ICM4MTgxODEsIDNweCA2cHggMTBweCBibGFjaztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEwcHg7XFxufVxcblxcbi53aW5TdGF0ZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGNvbG9yOiByZ2IoOTksIDk5LCA5OSk7XFxuICAgIGZvbnQtc2l6ZTogOHJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDVweCAxMHB4IDIwcHggYmxhY2s7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbn1cXG5cXG4ubmV3R2FtZUJvcmRlciB7XFxuICAgIGJvcmRlcjogNXB4IHNvbGlkIHJnYig4MCwgODAsIDgwKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1MywgMTUzLCAxNTMpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgICBwYWRkaW5nOiAwIDJyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDEwcHggYmxhY2s7XFxuICAgIGFuaW1hdGlvbjogYWxlcnQgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4ubmV3R2FtZUJvcmRlcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggMjBweCBibGFjaztcXG59XFxuXFxuLm5ld0dhbWVCb3JkZXI6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NzQ3NDc7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIHJpZ2h0OiAxNXB4O1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDNweCBibGFjaztcXG59XFxuXFxuLm5ld0dhbWVCb3JkZXI6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ3NDc0NztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogMTVweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAzcHggYmxhY2s7XFxufVxcblxcbi5uZXdHYW1lQnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgY29sb3I6IHJnYig2MSwgNjEsIDYxKTtcXG4gICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgNXB4IDEwcHggMjBweCBibGFjaztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgYWxlcnQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxODAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDE5MHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICByaWdodDogMDtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIH1cXG5cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDEwMHB4O1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICB0b3A6IC0yMHB4O1xcbiAgICAgICAgbGVmdDogLTUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICAgICAgd2lkdGg6IDM1MHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDk1MHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgICAgICB0b3A6IC01MHB4O1xcbiAgICAgICAgbGVmdDogLTgwcHg7XFxuICAgIH1cXG5cXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBoZWlnaHQ6IDYwdmg7XFxuICAgIH1cXG5cXG4gICAgLnAxR3JpZENvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleDogMTtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgIH1cXG5cXG4gICAgLmJvYXJkIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IG5vbmU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgIH1cXG4gICAgLmNlbGwge1xcbiAgICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIH1cXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRvcDogYXV0bztcXG4gICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICBib3R0b206IC01MHB4O1xcbiAgICAgICAgcmlnaHQ6IC0xMDBweDtcXG4gICAgICAgIHotaW5kZXg6IDU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0JsYWNrT3BzT25lLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaG9tZXNjcmVlbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5zcGFuIHtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbkBrZXlmcmFtZXMgdHlwaW5nIHtcXG4gICAgZnJvbSB7XFxuICAgICAgICB3aWR0aDogMDtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0IHtcXG4gICAgZnJvbSxcXG4gICAgdG8ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBncmV5O1xcbiAgICB9XFxufVxcblxcbi5zbW9rZUNvbnRhaW5lciB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiA0MCU7XFxuICAgIGxlZnQ6IDY1JTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnNtb2tlIHtcXG4gICAgICAgIGxlZnQ6IDc1JTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcXG4gICAgLnNtb2tlQ29udGFpbmVyIHtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcblxcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDVyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDRyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxuICAgIC5uZXdHYW1lIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDNyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxuICAgIC5uZXdHYW1lIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB9XFxufVxcblxcbi5zbW9rZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgd2lkdGg6IDgwcHg7XFxuICAgIGhlaWdodDogODBweDtcXG4gICAgYmFja2dyb3VuZDogIzI2MjYyNjtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoZXZlbikge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVFdmVuIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKG9kZCkge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVPZGQgMy41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoOSkge1xcbiAgICBhbmltYXRpb246IG5vbmU7XFxuICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlRXZlbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHNjYWxlKDEpO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGVPZGQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwcHgsIC01MDBweCkgc2NhbGUoMyk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbiAgICB9XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoMSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDIpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDMpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwLjhzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDQpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDUpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjZzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDYpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg3KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg4KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi44cztcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0NTUy9ob21lcGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxzQkFBc0I7SUFDdEIsNENBQTJDO0FBQy9DO0FBQ0E7SUFDSSx1QkFBdUI7SUFDdkIsNENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLFVBQVU7SUFDVixTQUFTO0lBQ1Qsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osNkJBQTZCO0lBQzdCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsNkJBQTZCO0lBQzdCLHlEQUF3RDtJQUN4RCxzQkFBc0I7SUFDdEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksY0FBYztJQUNkLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCOztnREFFNEM7QUFDaEQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHdFQUF3RTtJQUN4RSxlQUFlO0lBQ2YsMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtJQUNaO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSjs7QUFFQTtJQUNJOztRQUVJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJO1FBQ0ksU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtRQUNmLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksMkNBQTJDO0FBQy9DO0FBQ0E7SUFDSSwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0k7UUFDSSxtQ0FBbUM7UUFDbkMsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksNENBQTRDO1FBQzVDLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDZDQUE2QztRQUM3QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9CbGFja09wc09uZS50dGZcXFwiKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL1ByZXNzU3RhcnQudHRmXFxcIik7XFxufVxcblxcbioge1xcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5ob21lcGFnZUNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbG9yOiBncmV5O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5zcGFuIHtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbkBrZXlmcmFtZXMgdHlwaW5nIHtcXG4gICAgZnJvbSB7XFxuICAgICAgICB3aWR0aDogMDtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0IHtcXG4gICAgZnJvbSxcXG4gICAgdG8ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBncmV5O1xcbiAgICB9XFxufVxcblxcbi5zbW9rZUNvbnRhaW5lciB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiA0MCU7XFxuICAgIGxlZnQ6IDY1JTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnNtb2tlIHtcXG4gICAgICAgIGxlZnQ6IDc1JTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcXG4gICAgLnNtb2tlQ29udGFpbmVyIHtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcblxcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDVyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDRyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxuICAgIC5uZXdHYW1lIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuaG9tZUhlYWRlciB7XFxuICAgICAgICBmb250LXNpemU6IDNyZW07XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cmVtO1xcbiAgICB9XFxuICAgIC5uZXdHYW1lIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB9XFxufVxcblxcbi5zbW9rZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgd2lkdGg6IDgwcHg7XFxuICAgIGhlaWdodDogODBweDtcXG4gICAgYmFja2dyb3VuZDogIzI2MjYyNjtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoZXZlbikge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVFdmVuIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKG9kZCkge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVPZGQgMy41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoOSkge1xcbiAgICBhbmltYXRpb246IG5vbmU7XFxuICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlRXZlbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHNjYWxlKDEpO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGVPZGQge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwcHgsIC01MDBweCkgc2NhbGUoMyk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbiAgICB9XFxufVxcblxcbi5zbW9rZTpudGgtY2hpbGQoMSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDIpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDMpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwLjhzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDQpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDUpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjZzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDYpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg3KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg4KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi44cztcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvZm9udHMvS2FsYW0tUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1hZ2VzL21hcC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG5cXG4ubWFwIHtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgYW5pbWF0aW9uOiB1bmJsdXIgMC41cyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHVuYmx1ciB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGZpbHRlcjogYmx1cigwKTtcXG4gICAgfVxcbn1cXG4ucmVkUGluMSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MSU7XFxuICAgIGxlZnQ6IDYzJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBmaWx0ZXI6IGh1ZS1yb3RhdGUoMTMwZGVnKTtcXG59XFxuXFxuLnJlZFBpbjE6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB6LWluZGV4OiA5O1xcbn1cXG5cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxOSU7XFxuICAgIGxlZnQ6IDU3JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBmaWx0ZXI6IGh1ZS1yb3RhdGUoNzBkZWcpIGJyaWdodG5lc3MoMik7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODElO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBodWUtcm90YXRlKDEzMGRlZykgYnJpZ2h0bmVzcygxLjQpO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIGZpbHRlcjogaHVlLXJvdGF0ZSg3MGRlZykgYnJpZ2h0bmVzcygyLjQpO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygxLjQpO1xcbn1cXG5cXG4ubm90ZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA2MDBweDtcXG4gICAgaGVpZ2h0OiA2MDBweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogNSU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00ZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBmbHkgMC4xcyBsaW5lYXI7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ucGFyYUNvbnRhaW5lciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyMCU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcblxcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMjQ3KTtcXG59XFxuXFxuLnBhcmFDb250YWluZXIgcDpudGgtY2hpbGQoMSkge1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLnBhcmFDb250YWluZXIgcDpudGgtY2hpbGQoMikge1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLnBhcmFDb250YWluZXIgcDpudGgtY2hpbGQoMykge1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG5cXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4ucGFyYUNvbnRhaW5lciBwOm50aC1jaGlsZCg0KSB7XFxuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xcbn1cXG5cXG4uc3RpY2t5Tm90ZSB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogNjAwcHg7XFxufVxcblxcbi5zaGFkb3cge1xcbiAgICB3aWR0aDogMzgwcHg7XFxuXFxuICAgIGhlaWdodDogNTMwcHg7XFxuICAgIGJveC1zaGFkb3c6IDEwcHggMTBweCA1MHB4IGJsYWNrO1xcbn1cXG5cXG4jaGFyZCAucGFyYUNvbnRhaW5lciB1IHtcXG4gICAgY29sb3I6IHJnYigxOTYsIDAsIDApO1xcbn1cXG4jbWVkaXVtIC5wYXJhQ29udGFpbmVyIHUge1xcbiAgICBjb2xvcjogcmdiKDExOSwgMTE3LCAwKTtcXG59XFxuI2Vhc3kgLnBhcmFDb250YWluZXIgdSB7XFxuICAgIGNvbG9yOiByZ2IoMjgsIDEwOSwgMjgpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZseSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTcwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjElO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMiU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIzJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjIlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgxJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjQlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY1JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODclO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU4JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDkwJTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL21hcHBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRDQUE2QztBQUNqRDs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHlEQUFpRDtJQUNqRCxzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixVQUFVO0lBQ1YsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixVQUFVO0lBQ1YsdUNBQXVDO0FBQzNDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsVUFBVTtBQUNkOztBQUVBO0lBQ0ksMENBQTBDO0FBQzlDO0FBQ0E7SUFDSSx5Q0FBeUM7QUFDN0M7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLFFBQVE7SUFDUixRQUFRO0lBQ1Isd0JBQXdCO0lBQ3hCLDBCQUEwQjs7SUFFMUIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGtCQUFrQjs7SUFFbEIsWUFBWTtJQUNaLDZDQUE2QztBQUNqRDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxpQkFBaUI7O0lBRWpCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZOztJQUVaLGFBQWE7SUFDYixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0k7UUFDSSwyQkFBMkI7SUFDL0I7SUFDQTtJQUNBO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogS2FsYW07XFxuICAgIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvS2FsYW0tUmVndWxhci50dGZcXFwiKTtcXG59XFxuXFxuLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1xcXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDAuNXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDElO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgZmlsdGVyOiBodWUtcm90YXRlKDEzMGRlZyk7XFxufVxcblxcbi5yZWRQaW4xOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgei1pbmRleDogOTtcXG59XFxuXFxuLnJlZFBpbjIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTklO1xcbiAgICBsZWZ0OiA1NyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgZmlsdGVyOiBodWUtcm90YXRlKDcwZGVnKSBicmlnaHRuZXNzKDIpO1xcbn1cXG4ucmVkUGluMyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgxJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4ucmVkUGluMTpob3ZlciB7XFxuICAgIGZpbHRlcjogaHVlLXJvdGF0ZSgxMzBkZWcpIGJyaWdodG5lc3MoMS40KTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBmaWx0ZXI6IGh1ZS1yb3RhdGUoNzBkZWcpIGJyaWdodG5lc3MoMi40KTtcXG59XFxuLnJlZFBpbjM6aG92ZXIge1xcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMS40KTtcXG59XFxuXFxuLm5vdGVDb250YWluZXIge1xcbiAgICB3aWR0aDogNjAwcHg7XFxuICAgIGhlaWdodDogNjAwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDUlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNGRlZyk7XFxuICAgIGFuaW1hdGlvbjogZmx5IDAuMXMgbGluZWFyO1xcblxcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnBhcmFDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjAlO1xcbiAgICBsZWZ0OiAzMCU7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG5cXG4gICAgd2lkdGg6IDI2MHB4O1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0Nyk7XFxufVxcblxcbi5wYXJhQ29udGFpbmVyIHA6bnRoLWNoaWxkKDEpIHtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5wYXJhQ29udGFpbmVyIHA6bnRoLWNoaWxkKDIpIHtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGxldHRlci1zcGFjaW5nOiAycHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5wYXJhQ29udGFpbmVyIHA6bnRoLWNoaWxkKDMpIHtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuXFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnBhcmFDb250YWluZXIgcDpudGgtY2hpbGQoNCkge1xcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcXG59XFxuXFxuLnN0aWNreU5vdGUge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDYwMHB4O1xcbn1cXG5cXG4uc2hhZG93IHtcXG4gICAgd2lkdGg6IDM4MHB4O1xcblxcbiAgICBoZWlnaHQ6IDUzMHB4O1xcbiAgICBib3gtc2hhZG93OiAxMHB4IDEwcHggNTBweCBibGFjaztcXG59XFxuXFxuI2hhcmQgLnBhcmFDb250YWluZXIgdSB7XFxuICAgIGNvbG9yOiByZ2IoMTk2LCAwLCAwKTtcXG59XFxuI21lZGl1bSAucGFyYUNvbnRhaW5lciB1IHtcXG4gICAgY29sb3I6IHJnYigxMTksIDExNywgMCk7XFxufVxcbiNlYXN5IC5wYXJhQ29udGFpbmVyIHUge1xcbiAgICBjb2xvcjogcmdiKDI4LCAxMDksIDI4KTtcXG59XFxuXFxuQGtleWZyYW1lcyBmbHkge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjAwJSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE3MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQxJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIxJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTYwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjIlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMyU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE0MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYyJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTMwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MSU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY0JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODQlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NSU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU3JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDg3JTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1OCU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA5MCU7XFxuICAgIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLm5ld0dhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHAge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIGdyZXk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG1hcmdpbjogMCBhdXRvIGF1dG8gYXV0bztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMnMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0IDAuNzVzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtIDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBjYXJldC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggNXB4ICNhOGE4YTg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAzcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OmZvY3VzIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaGlkZSB7XFxuICAgIGFuaW1hdGlvbjogYnVybiAxcyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJ1cm4ge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAubmFtZUZvcm0gaW5wdXQge1xcbiAgICAgICAgd2lkdGg6IDgwJTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL25hbWVwYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHdFQUF3RTtBQUM1RTs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsU0FBUztJQUNULHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLCtCQUErQjtJQUMvQixtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGVBQWU7SUFDZixZQUFZO0lBQ1osNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJO0lBQ0E7SUFDQTtRQUNJLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0k7UUFDSSxVQUFVO0lBQ2Q7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG59XFxuXFxuLm5ld0dhbWVDb250YWluZXIgcCB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbi5uYW1lRm9ybSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMTBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBhZGRpbmc6IDFyZW0gMXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGNhcmV0LWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogM3B4IDNweCA1cHggI2E4YThhODtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6Zm9jdXMge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiByZ2IoNzEsIDcxLCA3MSk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5oaWRlIHtcXG4gICAgYW5pbWF0aW9uOiBidXJuIDFzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgYnVybiB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5uYW1lRm9ybSBpbnB1dCB7XFxuICAgICAgICB3aWR0aDogODAlO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWVwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYXBwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFwcGFnZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmFtZXBhZ2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYW1lcGFnZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBHYW1lIGZyb20gXCIuL3NjcmlwdHMvZ2FtZUNvbXBvbmVudHMvR2FtZS5qc1wiO1xuaW1wb3J0IFZpZXdNb2RlbCBmcm9tIFwiLi9zY3JpcHRzL1ZpZXdNb2RlbFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9zY3JpcHRzL3ZpZXdDb21wb25lbnRzL0FwcC5qc1wiO1xuXG5jb25zdCBtb2RlbCA9IG5ldyBHYW1lKCk7XG5cbmNvbnN0IHZpZXdNb2RlbCA9IG5ldyBWaWV3TW9kZWwobW9kZWwpO1xuXG5jb25zdCB2aWV3ID0gbmV3IEFwcCh2aWV3TW9kZWwsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpKTtcbiJdLCJuYW1lcyI6WyJQdWJTdWJJbnRlcmZhY2UiLCJjb25zdHJ1Y3RvciIsInZpZXdNb2RlbCIsImVsZW1lbnQiLCJvbkluaXQiLCJyZWdpc3RlciIsInNob3VsZFVwZGF0ZSIsIm9sZE1vZGVsIiwibmV3TW9kZWwiLCJnZXRFbGVtZW50IiwiVmlld01vZGVsIiwibW9kZWwiLCJwdWJzdWJzIiwicHVic3ViIiwicHVzaCIsInJlcGxhY2VDaGlsZHJlbiIsInJlbmRlciIsInVwZGF0ZU1vZGVsIiwibW9kZWxVcGRhdGVGdW5jIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwiUGxheWVyIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJBSSIsIm5hbWUiLCJkaWZmaWN1bHR5IiwiYXV0b0ZpbGxCb2FyZCIsInNoaXBRdWV1ZSIsImxlbmd0aCIsInNoaXAiLCJzaGlmdCIsIm5ld0dhbWVib2FyZCIsIm5ld1NoaXAiLCJnYW1lYm9hcmQiLCJzaGlwcyIsIkdhbWUiLCJwbGF5ZXIiLCJjdXJyZW50VHVybiIsImN1cnJlbnRQYWdlIiwibmFtZVBhZ2VJc09wZW4iLCJzdGF0ZU1lc3NhZ2UiLCJnYW1lU3RhdGUiLCJhbGxTaGlwc1BsYWNlZCIsImRyb3BRdWV1ZSIsInZpZGVvUGxheWluZyIsImxhc3RDbGlja2VkIiwibmV3R2FtZVN0YXRlIiwiaXNWYWxpZFBsYWNlbWVudCIsInJvdyIsImNvbCIsImlzSG9yaXpvbnRhbCIsInNpemUiLCJpIiwiYm9hcmQiLCJwbGFjZVNoaXAiLCJ0aWxlcyIsImNvbnNvbGUiLCJ3YXJuIiwiTWF0aCIsInJhbmRvbSIsInJhbmRSb3ciLCJmbG9vciIsInJhbmRDb2wiLCJpc1ZhbGlkIiwiY2hlY2tBbGxTaGlwc1BsYWNlZCIsInJlc2V0Qm9hcmQiLCJ0aWxlU3RhdHVzIiwicmVzZXRTaGlwcyIsImF0dGFjayIsInRpbGUiLCJnZXRTaGlwIiwiaGl0cyIsImNoZWNrU2hpcFN1bmsiLCJzdW5rIiwiY2hlY2tBbGxTaGlwc1N1bmsiLCJzaGlwTGlzdCIsImNSb3ciLCJjQ29sIiwicmFuZG9tSW5kZXgiLCJBSU1vdmVFYXN5IiwicGxheWVyR2FtZWJvYXJkIiwicmFuZFRpbGUiLCJhdHRhY2tSZXNwb25zZSIsIkFJTW92ZU1lZGl1bSIsInVuYXR0YWNrZWRUaWxlcyIsImF0dGFja2VkVGlsZXMiLCJ1bmF0dGFja2VkQmFja3RyYWNrVGlsZXMiLCJoaXRUaWxlcyIsImFkamFjZW50VW5hdHRhY2tlZFRpbGVzIiwiU2V0IiwiYWRqYWNlbnRUaWxlcyIsImdldEFkamFjZW50VGlsZXMiLCJmb3JFYWNoIiwiYWRqVGlsZSIsImFkZCIsInRhcmdldFRpbGUiLCJwb3AiLCJBSU1vdmVIYXJkIiwiaGl0U2hpcCIsImF0dGFja1Jlc3VsdCIsInNoaXBTdW5rIiwiY2xlYXIiLCJUaWxlIiwiR2FtZWJvYXJkIiwiU2hpcCIsIkhvbWVQYWdlIiwiTWFwUGFnZSIsIkdhbWVQYWdlIiwiZWxlbSIsIkFwcCIsImFwcEVsZW1lbnQiLCJwcm9wIiwiaWQiLCJjb250ZW50IiwidmVyc2lvbiIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsInRleHRDb250ZW50IiwiY2xhc3NOYW1lIiwiSFRNTCIsImlubmVySFRNTCIsInNyYyIsImZvckkiLCJmb3IiLCJ0eXBlIiwidmFsdWUiLCJwbGFjZWhvbGRlciIsInNwZWxsY2hlY2siLCJyZXF1aXJlZCIsImNoZWNrZWQiLCJocmVmIiwiYXV0b3BsYXkiLCJtdXRlZCIsImxvb3AiLCJkcmFnZ2FibGUiLCJtaW4iLCJtYXgiLCJzdGVwIiwiY2hpbGRyZW4iLCJjaGlsZCIsImFwcGVuZENoaWxkIiwiQUlCb2FyZEVsZW0iLCJkcmFnRW50ZXIiLCJib2FyZFNpemUiLCJidWlsZEJvYXJkIiwic2hhZG93R3JpZCIsImNlbGxzIiwiY2VsbCIsInRpbGVSZWYiLCJkYXRhc2V0Iiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiYm91bmQiLCJoYW5kbGVDbGljayIsImJpbmQiLCJjbGFzc0xpc3QiLCJpbmRleCIsInNoaXBFbGVtIiwiY2xpY2tlZEluZGV4IiwiYmFzZVRpbGUiLCJlbmRUaWxlIiwic3R5bGUiLCJncmlkQXJlYSIsImJvYXJkQm9yZGVyIiwiQUlnYW1lYm9hcmQiLCJhdHRSZXNwb25zZSIsImVuZW15RGVsYXkiLCJjbGlja2VkVGlsZSIsIm9sZE1vZGVsMSIsImdldENlbGwiLCJCdXR0b24iLCJidWlsZFN0YXJ0QnV0dG9uIiwiYnVpbGRSb3RhdGVCdXR0b24iLCJidWlsZEF1dG9QbGFjZUJ1dHRvbiIsImJ1aWxkVW5kb0J1dHRvbiIsInJvdGF0ZUJ1dHRvbiIsImJ1dHRvbkhvdXNpbmciLCJhdXRvUGxhY2VCdXR0b24iLCJhbGxQbGFjZWQiLCJhdXRvUGxhY2VIb3VzaW5nIiwidW5kb0J1dHRvbiIsInVuZG9CdXR0b25Ib3VzaW5nIiwic3RhcnRCdXR0b24iLCJzdGFydEJ1dHRvbkhvdXNpbmciLCJHYW1lTWVzc2FnZSIsIndhdmVzQWx0IiwiU2hpcFF1ZXVlIiwicGxheWVyQm9hcmRFbGVtIiwiUmFkYXIiLCJPcHRpb25zTWVudSIsIlNjb3JlQ29udGFpbmVyIiwid29vZCIsImJ1aWxkUGxhY2VTaGlwc1N0YWdlIiwiYnVpbGRJbkdhbWVTdGFnZSIsInNoaXBDb250YWluZXIiLCJzaGlwSW5kZXgiLCJkcmFnZ2VkU2hpcEluZGV4IiwibWVzc2FnZUNvbnRhaW5lciIsImdhbWUiLCJyYWRhckNvbnRhaW5lciIsImxlZnRCdXR0b25Db250YWluZXIiLCJtaWRkbGVCdXR0b25Db250YWluZXIiLCJyaWdodEJ1dHRvbkNvbnRhaW5lciIsImJ1dHRvbkNvbnRhaW5lciIsIm9wdGlvbnNDb250YWluZXIiLCJ3YXZlcyIsImdhbWVDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsIkFJQm9hcmRDb250YWluZXIiLCJwbGF5ZXJTY29yZUNvbnRhaW5lciIsIkFJU2NvcmVDb250YWluZXIiLCJwbGF5ZXJTdGFnZSIsIkFJU3RhZ2UiLCJuZXdHYW1lQnRuIiwibmV3R2FtZUJvcmRlciIsIndpblRleHQiLCJ3aW5TdGF0ZSIsInRpdGxlIiwidGl0bGVCb3JkZXIiLCJ0b3BEaXYiLCJtaWREaXYiLCJib3REaXYiLCJmcmFtZUNvbnRhaW5lciIsIm1hc2siLCJnYW1lT3ZlckNvbnRhaW5lciIsIm1vZGFsQ29udGFpbmVyIiwiYnVpbGRPcHRpb25zIiwidmlkZW9CdG4iLCJ2aWRlb0J0bkNsYXNzIiwiaHVlU2xpZGVyIiwic2xpZGVyVmFsdWUiLCJwYXJzZUludCIsInRhcmdldCIsInJvb3QiLCJxdWVyeVNlbGVjdG9yIiwic3RhcnRpbmdIdWUiLCJodWVSb3RhdGlvbiIsInRoZW1lQ29sb3IiLCJsb3dBbHBoYUNvbG9yIiwib3Bwb3NpdGVSb3RhdGlvbiIsIm9wcG9zaXRlVGhlbWUiLCJvcHBvc2l0ZUxvd0FscGhhVGhlbWUiLCJvcHBvc2l0ZUh1ZVJvdGF0ZSIsInNldFByb3BlcnR5Iiwic2xpZGVDb250YWluZXIiLCJvcHRpb25zSG91c2luZyIsImJ1aWxkUmFkYXIiLCJyYWRhciIsImVuZW1pZXMiLCJmcmllbmRseSIsImNhcnJpZXJTcmMiLCJiYXR0bGVzaGlwU3JjIiwiZGVzdHJveWVyU3JjIiwic3VibWFyaW5lU3JjIiwicGF0cm9sQm9hdFNyYyIsImJ1aWxkU2NvcmVDb250YWluZXIiLCJzY29yZUNvbnRhaW5lciIsInRvcCIsIm1pZCIsImJvdCIsInNoaXBJY29uIiwic2NvcmUiLCJzaGlwQ29sIiwiY2xpY2tlZEV2ZW50Iiwic2hpcE1vZGVsIiwic2hpcFB1bHNlIiwiY3JlYXRlIiwic2hpcFNyYyIsInNoaXBDbGFzcyIsImJvYXQiLCJzaGlwT3ZlcmxheSIsIm92ZXJsYXkiLCJvdmVybGF5Q2xhc3MiLCJoYW5kbGVEcmFnU3RhcnQiLCJoYW5kbGVEcmFnRW5kIiwid2lkdGgiLCJoZWlnaHQiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJidWlsZFF1ZXVlIiwic3RhZ2UiLCJuZXh0IiwicXVldWUiLCJpbmNsdWRlcyIsInByZXBlbmQiLCJoYW5kbGVEcmFnRW50ZXIiLCJoYW5kbGVEcm9wIiwiaGFuZGxlRHJhZ092ZXIiLCJoYW5kbGVEcmFnTGVhdmUiLCJkcmFnZ2VkU2hpcCIsImJhc2VDb29yZHMiLCJnZXRCYXNlVGlsZSIsImJhc2VSb3ciLCJiYXNlQ29sIiwicm93T2Zmc2V0IiwiY29sT2Zmc2V0IiwiTnVtYmVyIiwib2Zmc2V0Um93Iiwib2Zmc2V0Q29sIiwiSG9tZVBhZ2VJbnB1dCIsImhvbWVwYWdlQ29udGFpbmVyIiwibmV3R2FtZSIsImJ1aWxkRm9ybSIsImdyZWV0aW5nIiwiaW5wdXRGaWVsZCIsImJ1dHRvbiIsIm5hbWVGaWVsZCIsImZvcm1Db250YWluZXIiLCJyZWRQaW5TcmMiLCJzdGlja3lOb3RlU3JjIiwiY2xpcGJvYXJkU3JjIiwicmVkUGlucyIsInBpbiIsIm1hcCIsIm5vdGUiLCJidWlsZE5vdGUiLCJub3RlT3B0aW9ucyIsIm5vdGUxIiwibG9jYXRpb24iLCJwYXJhIiwibm90ZTIiLCJub3RlMyIsInNlbGVjdGVkT3B0aW9ucyIsInZpZXciXSwic291cmNlUm9vdCI6IiJ9