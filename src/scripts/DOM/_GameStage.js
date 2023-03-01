import elem from "./elem.js";

export default class GameStaging {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
        this.PubSub.subscribe(
            "dataResponse",
            this.handleDataResponse.bind(this)
        );

        this.playerBoard = null;
        this.gameData = null;
        this.orientation;
        this.shipQueue = [];
        this.currentShip = null;
    }

    handlePageChange(data) {
        if (data === "gamestaging") this.loadPlayerUI();
        // if (data === "rotatenextship") this.rotateNextShip();
    }

    handleDataResponse(data) {
        if (data.hasOwnProperty("player") && data.hasOwnProperty("AI"))
            this.gameData = data;
    }

    loadPlayerUI() {
        this.PubSub.publish("dataRequest", { type: "game" });

        this.buildShipQueue();
        this.buildBoard();
    }

    buildBoard() {
        const gridContainer = document.querySelector(".p1GridContainer");

        const board = elem({ prop: "div", className: "playerBoard" });

        gridContainer.appendChild(board);

        const boardSize = this.gameData.player.gameboard.size;

        this.playerBoard = new Board(board, this.shipQueue, boardSize);
    }

    buildShipQueue() {
        const shipContainer = document.querySelector(".shipContainer");
        const stageGrid = elem({ prop: "div", className: "stageGrid" });
        const shipList = this.gameData.player.allShips;
        const shipQueue = elem({ prop: "div", className: "shipQueue" });
        const nextShip = elem({ prop: "div", className: "nextShipContainer" });

        const ships = [];

        shipList.forEach((ship) => {
            const shipContainer = elem({
                prop: "div",
                className: `${ship.name}`,
            });
            const boat = new Ship(ship.name, ship.length, shipContainer);
            ships.push(boat);
        });
        this.shipQueue = new ShipQueue(ships, this.playerBoard);
        stageGrid.appendChild(shipQueue);
        stageGrid.appendChild(nextShip);
        shipContainer.appendChild(stageGrid);
        this.shipQueueRender(this.shipQueue, nextShip, shipQueue);
    }

    shipQueueRender(shipQueue, nextContainer, queueContainer) {
        queueContainer.innerHTML = "";
        nextContainer.innerHTML = "";
        for (const ship of shipQueue.ships) {
            if (ship === shipQueue.ships[0]) {
                nextContainer.appendChild(ship.element);
            } else {
                queueContainer.prepend(ship.element);
            }
        }
    }
}

class Board {
    constructor(element, shipQueue, size) {
        this.element = element;
        this.size = size;
        this.ships = [];
        this.shipQueue = shipQueue;
        this.initialize();
    }

    initialize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.coords = `${x},${y}`;
                cell.dataset.tile = "";
                cell.addEventListener(
                    "dragenter",
                    this.handleDragEnter.bind(this)
                );
                this.element.appendChild(cell);
            }
        }
    }

    handleDragEnter(e) {
        e.preventDefault();

        const { x, y } = this.getCellCoordinates(e.target);
        const ship = this.shipQueue.getCurrentShip();
        const { size, orientation } = ship;

        // Get the tiles that the ship would occupy if placed here
        const tiles = this.getTilesForShip(size, orientation, x, y);

        // Check if the ship placement is valid
        const isValidPlacement = this.isShipPlacementValid(tiles);

        // Highlight the cells green or red depending on the validity of the placement
        for (const tile of tiles) {
            const cell = this.getCell(tile.x, tile.y);
            cell.classList.toggle("valid", isValidPlacement);
            cell.classList.toggle("invalid", !isValidPlacement);
        }
    }

    getCellCoordinates(cell) {
        const x = cell.cellIndex;
        const y = cell.parentNode.rowIndex;
        return { x, y };
    }

    getCell(x, y) {
        const cells = Array.from(this.element.querySelectorAll(".cell"));
        const index = y * 10 + x;
        return cells[index];
    }

    getTilesForShip(size, orientation, x, y) {
        const tiles = [];

        for (let i = 0; i < size; i++) {
            const tileX = orientation === "horizontal" ? x + i : x;
            const tileY = orientation === "vertical" ? y + i : y;
            tiles.push({ x: tileX, y: tileY });
        }

        return tiles;
    }

    isShipPlacementValid(tiles) {
        // Check if any of the tiles are out of bounds or overlap with an existing ship
        for (const tile of tiles) {
            if (tile.x < 0 || tile.x >= 10 || tile.y < 0 || tile.y >= 10) {
                return false;
            }

            for (const ship of this.ships) {
                for (const tile2 of ship.tiles) {
                    if (tile.x === tile2.x && tile.y === tile2.y) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    placeShip(x, y) {
        const ship = this.shipQueue.getCurrentShip();
        const { size, orientation } = ship;

        // Get the tiles that the ship would occupy if placed here
        const tiles = this.getTilesForShip(size, orientation, x, y);

        // Add the ship to the board and update its tiles
        this.ships.push(ship);
        ship.tiles = tiles;

        // Update the cells with the ship's tiles
        for (const tile of tiles) {
            const cell = this.getCell(tile.x, tile.y);
            cell.classList.add("ship");
            cell.dataset.shipId = ship.id;
        }

        // Advance to the next ship in the queue
        this.shipQueue.advance();
    }
}

// class Board {
//     constructor(size, element) {
//         this.size = size;
//         this.element = element;
//         this.tiles = [];
//         this.create();
//     }

//     create() {
//         for (let y = 0; y < this.size; y++) {
//             for (let x = 0; x < this.size; x++) {
//                 const tile = document.createElement("div");
//                 tile.classList.add("tile");
//                 tile.dataset.coords = `${x},${y}`;
//                 tile.dataset.tile = "";
//                 tile.addEventListener(
//                     "dragenter",
//                     this.handleDragEnter.bind(this)
//                 );
//                 this.element.appendChild(tile);
//             }
//         }
//     }

//     handleDragEnter(e) {
//         e.preventDefault();
//         e.stopPropagation();

//         const boatId = e.dataTransfer.getData("text/plain");
//         console.log(boatId);
//         const boat = document.getElementById(boatId);
//         console.log(boat);
//         const tile = e.target;
//         console.log(tile);
//         const coords = tile.dataset.coords.split(",").map(Number);
//         const direction = boat.classList.contains("horizontal")
//             ? "horizontal"
//             : "vertical";
//         const tiles = [];

//         for (let i = 0; i < boat.dataset.size; i++) {
//             let x = coords[0];
//             let y = coords[1];

//             if (direction === "horizontal") {
//                 x += i;
//             } else {
//                 y += i;
//             }

//             const tile = this.tiles.find(
//                 (t) => t.dataset.coords === `${x},${y}`
//             );
//             tiles.push(tile);
//         }

//         const isValidPlacement = tiles.every((t) => t && !t.dataset.boat);

//         if (isValidPlacement) {
//             tiles.forEach((t) => t.classList.add("valid"));
//         } else {
//             tiles.forEach((t) => t.classList.add("invalid"));
//         }
//     }
// }

class ShipQueue {
    constructor(ships) {
        this.ships = ships;
        this.board = board;
        this.currentShip = this.ships[0];
        this.rotateButton = document.querySelector(".rotateButton");
        this.rotateButton.addEventListener(
            "click",
            this.handleRotate.bind(this)
        );
    }

    next(board) {
        if (this.ships.length > 0) {
            this.currentShip = this.ships.shift();
            this.currentShip.element.classList.add("active");
            board.element.classList.add("placing");
        } else {
            this.currentShip = null;
            board.element.classList.remove("placing");
        }
    }

    handleRotate() {
        if (this.currentShip) {
            this.currentShip.rotate();
        }
    }

    getCurrentShip() {
        return this.currentShip;
    }
}

class Ship {
    constructor(id, size, element) {
        this.id = id;
        this.size = size;
        this.element = element;
        this.tiles = [];
        this.isHorizontal = false;
        this.element.setAttribute("draggable", "true");
        this.element.classList.add("vertical");
        this.fill();
        this.element.addEventListener("dragstart", (e) => {
            this.handleDragStart(e, this).bind(this);
        });

        // this.element.addEventListener("dragend", () => {
        //     shipContainer.classList.remove("dragging");
        // });
    }

    handleDragStart(e) {
        e.dataTransfer.setData("text/plain", this.id);
        this.element.classList.add("dragging");

        this.tiles.forEach((tile) => {
            tile.style.width = "50px";
            tile.style.height = "50px";
            setTimeout(() => {
                tile.style.width = "30px";
                tile.style.height = "30px";
            }, 0);
        });
    }

    fill() {
        for (let i = 0; i < this.size; i++) {
            const tile = elem({ prop: "div", className: "shipTile" });
            tile.dataset.boat = this.id;
            tile.dataset.tile = i;
            tile.draggable = false;
            this.element.appendChild(tile);
            this.tiles.push(tile);
        }
    }

    rotate() {
        this.isHorizontal = !this.isHorizontal;
        this.element.classList.toggle("horizontal", this.isHorizontal);
        this.element.classList.toggle("vertical", !this.isHorizontal);
    }

    placeOnBoard(board, row, col) {
        const placed = board.placeShip(this, row, col);
        if (placed) {
            this.tiles.forEach((tile) => {
                board
                    .getCellElement(tile.dataset.row, tile.dataset.col)
                    .appendChild(tile);
            });
        }
        return placed;
    }
}
