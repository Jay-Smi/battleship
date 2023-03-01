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

        this.gameData = null;

        this.playerBoard = null;

        this.shipQueue = null;
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

        this.playerBoard = new Board(
            this.gameData.player.gameboard.size,
            this.PubSub
        );

        this.shipQueue = new ShipQueue(
            this.playerBoard,
            this.gameData.player.allShips
        );

        this.playerBoard.updateQueue(this.shipQueue);

        gameContainer.appendChild(this.playerBoard.element);
    }
}
