import elem from "./elem.js";
import Board from "./Board.js";
import ShipQueue from "./ShipQueue.js";

//class takes over once player UI is built
//handles building the visible gameboards
//based on the game data it requests upon instantiation
//player interaction while placing ships
//
export default class GameStaging {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
        this.PubSub.subscribe(
            "dataResponse",
            this.handleDataResponse.bind(this)
        );

        //requested through data request
        this.gameData = null;

        //board object accepts parent elem,
        //maintains reference to current ship for dragenter
        //list of ships once placed???
        //the shipQueue????
        //dragenter logic
        this.playerBoard = null;

        //accepts a list of ships and a board
        //manages current ship
        //has .next() .handleRotate() .getCurrentShip()
        //converts the ship info into ship objects
        this.shipQueue = null;

        //this.shipList??? maybe needed? maybe ships
        //stored in queue than passed to board
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
        //sends out request for data once Gamestage is reached
        this.PubSub.publish("dataRequest", { type: "game" });

        const gameContainer = document.querySelector(".game");

        this.playerBoard = new Board(this.gameData.player.gameboard.size);

        this.shipQueue = new ShipQueue(
            this.playerBoard,
            this.gameData.player.allShips
        );

        this.playerBoard.updateQueue(this.shipQueue);

        gameContainer.appendChild(this.playerBoard.element);
    }
}
