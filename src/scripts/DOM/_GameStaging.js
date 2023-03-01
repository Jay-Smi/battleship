import elem from "./elem.js";

export default class GameStaging {
    constructor(PubSub) {
        this.PubSub = PubSub;
        // this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
        this.PubSub.subscribe(
            "dataResponse",
            this.handleDataResponse.bind(this)
        );
        this.gameData = null;
        this.shipQueue = [];
        this.dragIndex = null;
        this.draggedShip = null;
        this.nextShipDirection = "column";
        this.hoveredArr = [];
    }

    handlePageChange(data) {
        if (data === "gamestaging") this.loadPlayerUI();
        if (data === "rotatenextship") this.rotateNextShip();
    }

    handleDataResponse(data) {
        if (data.hasOwnProperty("player") && data.hasOwnProperty("AI"))
            this.gameData = data;
    }

    loadPlayerUI() {
        this.PubSub.publish("dataRequest", { type: "game" });

        const board = this.buildBoard();
        const boardContainer = document.querySelector(".p1GridContainer");
        boardContainer.appendChild(board);

        const shipContainer = document.querySelector(".shipContainer");
        const shipStage = this.buildShipStage();
        shipContainer.appendChild(shipStage);
        this.renderShipStage();
        document.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
    }

    buildBoard() {
        let size = this.gameData.player.gameboard.size;

        const gameboardContainer = elem({
            prop: "div",
            className: "p1GameboardContainer",
        });

        const board = elem({ prop: "div", className: "board" });
        board.dataset.size = size;
        for (let y = 0; y < size; y++) {
            for (let x = size - 1; x >= 0; x--) {
                let tile = elem({
                    prop: "div",
                    id: `${x}${y}`,
                    className: "tile",
                });
                tile.dataset.coords = `${x},${y}`;
                tile.dataset.boat = "null";

                tile.addEventListener(
                    "dragenter",
                    this.handleDragEnter.bind(this)
                );
                tile.addEventListener("dragleave", this.dragLeave.bind(this));
                // tile.addEventListener("drop", this.drop.bind(this));
                tile.classList.add(`x${x}`);
                tile.classList.add(`y${y}`);
                board.prepend(tile);
            }
        }
        gameboardContainer.appendChild(board);

        return gameboardContainer;
    }

    //on drag enter, clear prio hover effects
    //calc hovered tiles based on where boat picked up from
    //if valid display hover effect
    //if invalid display red effect for only tiles on the board

    handleDragEnter(e) {
        // get the hovered tile
        const tile = e.target;

        // get the ship being dragged
        const shipId = e.dataTransfer.getData("text/plain");
        const ship = document.getElementById(shipId);
        console.log(ship);

        // get the tile where the ship was picked up from
        const originTile = ship.dataset.tile;

        // get the coordinates of the hovered tile
        const [x, y] = tile.dataset.coords.split(",");

        // check if the ship can be placed on the board
        this.validPlacement = this.checkPlacement(ship, originTile, x, y);

        // update the tile color
        if (this.validPlacement) {
            tile.classList.add("green");
        } else {
            tile.classList.add("red");
        }
    }

    dragEnter1(e) {
        e.preventDefault();
        this.removeHighlights();
        //returns length of ship with matching name
        const draggedShipLength = this.gameData.player.allShips
            .filter((ship) => {
                return ship.name === this.draggedShip;
            })
            .map((ship) => ship.length);

        //
        let baseCoords;
        if (this.nextShipDirection === "column") {
            baseCoords = Number(e.target.id) + Number(this.dragIndex);
        } else if (this.nextShipDirection === "row") {
            baseCoords = Number(e.target.id) - this.dragIndex * 10;
        }
        let newCoords = baseCoords.toString().padStart(2, "0");

        let hoveredCoords = [];

        if (this.nextShipDirection === "column") {
            for (let i = 0; i < draggedShipLength; i++) {
                hoveredCoords[i] = Number(newCoords) - i;
            }
        } else if (this.nextShipDirection === "row") {
            for (let i = 0; i < draggedShipLength; i++) {
                hoveredCoords[i] = Number(newCoords) + i * 10;
            }
        }

        let validity = this.checkValidity(hoveredCoords);
        // console.log(validity);
        if (validity) {
            for (let tile of hoveredCoords) {
                let coordString = tile.toString().padStart(2, "0");
                let grid = document.querySelector(
                    `[data-x="${coordString[0]}"][data-y="${coordString[1]}"]`
                );
                grid.classList.toggle("draggedOver");
            }
        } else {
            let validCoords = this.splitValid(hoveredCoords);

            for (let tile of validCoords) {
                if (tile < 0 || tile > 99) continue;
                let coordString = tile.toString().padStart(2, "0");
                let grid = document.querySelector(
                    `[data-x="${coordString[0]}"][data-y="${coordString[1]}"]`
                );
                grid.classList.toggle("invalidPlacement");
            }
        }
        this.hoveredArr.push({ coords: hoveredCoords, validity: validity });
    }

    removeHighlights() {
        let highlighted = document.querySelectorAll(".draggedOver");
        let invalid = document.querySelectorAll(".invalidPlacement");

        [...highlighted].forEach((elem) => {
            elem.classList.remove("draggedOver");
        });

        [...invalid].forEach((elem) => {
            elem.classList.remove("invalidPlacement");
        });
    }

    splitValid(coords) {
        const valid = [];

        if (this.nextShipDirection === "column") {
            return this.getNumbersWithSameTenth(coords);
        } else if (this.nextShipDirection === "row") {
            return this.getNumbersWithSameFirstDigit(coords);
        }
    }

    getNumbersWithSameFirstDigit(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return [];
        }

        const firstNumberDigit = numbers[0].toString().padStart(2, "0")[1];
        const filteredNumbers = numbers.filter((number) => {
            const numberDigit = number.toString().padStart(2, "0")[1];
            return numberDigit === firstNumberDigit;
        });

        return filteredNumbers;
    }

    getNumbersWithSameTenth(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return [];
        }

        const firstNumberTenth = Math.floor(numbers[this.dragIndex] / 10) * 10;
        const filteredNumbers = numbers.filter((number) => {
            const numberTenth = Math.floor(number / 10) * 10;
            return numberTenth === firstNumberTenth;
        });

        return filteredNumbers;
    }

    checkValidity(hoveredCoords) {
        let validity;

        if (this.nextShipDirection === "column") {
            validity =
                this.isWithinSameTenth(hoveredCoords) &&
                hoveredCoords.some((el) => {
                    return el >= 0 || el < 100;
                }) &&
                hoveredCoords.some((el) => {
                    let k = el.toString().padStart(2, "0");
                    let boardCheck =
                        this.gameData.player.gameboard.board[k[0]][k[1]]
                            .ship === null;
                    return boardCheck;
                });
        } else if (this.nextShipDirection === "row") {
            validity =
                this.hasSameLastDigit(hoveredCoords) &&
                hoveredCoords.some((el) => {
                    return el >= 0 || el < 100;
                }) &&
                hoveredCoords.some((el) => {
                    if (el > 0 || el < 100) return false;
                    let k = el.toString().padStart(2, "0");

                    let boardCheck =
                        this.gameData.player.gameboard.board[k[0]][k[1]]
                            .ship === null;
                    return boardCheck;
                });
        }
        return validity;
    }

    isWithinSameTenth(numbers) {
        if (!Array.isArray(numbers)) {
            return false;
        }
        if (numbers.length === 0) {
            return false;
        }
        const minNumber = Math.min(...numbers);
        const maxNumber = Math.max(...numbers);
        const range = maxNumber - minNumber;
        if (range === 9) {
            return true;
        }
        const firstNumber = Math.floor(numbers[0] / 10);
        for (let i = 1; i < numbers.length; i++) {
            const currentNumber = Math.floor(numbers[i] / 10);
            if (currentNumber !== firstNumber) {
                return false;
            }
        }
        return true;
    }

    hasSameLastDigit(numbers) {
        if (
            numbers.some((num) => {
                num >= 0 || num < 100;
            })
        ) {
            return false;
        }
        if (!Array.isArray(numbers)) {
            return false;
        }
        if (numbers.length === 0) {
            return false;
        }
        const lastDigit = numbers[0] % 10;
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] % 10 !== lastDigit) {
                return false;
            }
        }
        return true;
    }

    dragLeave(e) {
        e.preventDefault();
    }

    // drop(e) {
    //     e.preventDefault();
    //     this.removeHighlights();
    //     const hovered = this.hoveredArr.pop();

    //     this.PubSub.publish("shipPlaced");
    //     for (let tile of hovered.coords) {
    //         if (tile < 0 || tile > 99) continue;

    //         let coordString = tile.toString().padStart(2, "0");

    //         let grid = document.querySelector(
    //             `[data-x="${coordString[0]}"][data-y="${coordString[1]}"]`
    //         );

    //         grid.classList.remove("draggedOver");
    //         grid.style.backgroundColor = "red";
    //     }
    // }

    buildShipStage() {
        const stageGrid = elem({ prop: "div", className: "stageGrid" });
        const shipList = this.gameData.player.allShips;
        const shipQueue = elem({ prop: "div", className: "shipQueue" });
        const nextShip = elem({ prop: "div", className: "nextShipContainer" });
        stageGrid.appendChild(shipQueue);
        stageGrid.appendChild(nextShip);
        for (let i = 0; i < shipList.length; i++) {
            const shipContainer = elem({
                prop: "div",
                className: `${shipList[i].name}Container`,
                id: shipList[i].name,
            });
            shipContainer.dataset.size = shipList[i].length;
            shipContainer.dataset.orientation = this.nextShipDirection;
            for (let j = 0; j < shipList[i].length; j++) {
                const tile = elem({
                    prop: "div",
                    id: `${j}`,
                    className: `shipTile`,
                });
                tile.dataset.tile = j;
                tile.addEventListener("mousedown", (e) => {
                    this.dragIndex = e.target.id;
                });
                shipContainer.appendChild(tile);
            }

            const children = Array.from(shipContainer.children);
            shipContainer.addEventListener("dragstart", (e) => {
                this.draggedShip = e.target.id;
                shipContainer.classList.add("dragging");

                children.forEach((child) => {
                    child.draggable = false;
                    child.style.width = "50px";
                    child.style.height = "50px";
                    setTimeout(() => {
                        child.style.width = "30px";
                        child.style.height = "30px";
                    }, 0);
                });
            });
            shipContainer.addEventListener("dragend", () => {
                shipContainer.classList.remove("dragging");
            });

            if (i === 0) {
                shipContainer.draggable = true;
                shipContainer.style.flexDirection = this.nextShipDirection;
                shipContainer.classList.add("nextShip");
                shipContainer.classList.add("vertical");

                // nextShip.appendChild(shipContainer);
            } else {
                // shipQueue.prepend(shipContainer);
            }
            this.shipQueue.push(shipContainer);
        }

        return stageGrid;
    }

    renderShipStage() {
        const stage = document.querySelector(".shipQueue");
        const next = document.querySelector(".nextShipContainer");

        for (let i = 0; i < this.shipQueue.length; i++) {
            if (i === 0) {
                next.appendChild(this.shipQueue[i]);
            } else {
                stage.prepend(this.shipQueue[i]);
            }
        }
    }

    rotateNextShip() {
        const nextShip = document.querySelector(".nextShip");

        if (nextShip.style.flexDirection === "column") {
            nextShip.style.flexDirection = "row";
            nextShip.classList.remove("vertical");
            nextShip.classList.add("horizontal");
            this.nextShipDirection = "row";
        } else {
            nextShip.style.flexDirection = "column";
            nextShip.classList.remove("horizontal");
            nextShip.classList.add("vertical");
            this.nextShipDirection = "column";
        }
    }
}
