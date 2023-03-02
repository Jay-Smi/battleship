import elem from "./elem.js";
import GameUI from "./gameUIDOM.js";
import Board from "./boardDOM.js";
import ShipQueue from "./shipQueueDOM.js";

export default class GameView {
    constructor(PubSub, container, state) {
        this.PubSub = PubSub;

        this.currentState = state;

        this.container = container;

        // Builds UI, clears container, and appends itself
        this.UI = new GameUI(this.PubSub, this.container);

        // build and display the player's ship queue
        this.playerShipQueue = this.currentState.player.shipQueue;
        this.shipQueue = new ShipQueue(this.playerShipQueue);

        //build and display the player's board
        this.playerBoard = this.currentState.player.gameboard;
        this.playerBoard = new Board(
            this.playerBoard,
            this.PubSub,
            this.shipQueue
        );
    }

    updateView(changed) {}

    initShipQueue() {
        const shipList = this.currentState;
        console.log(shipList);
    }

    loadPlayerBoard() {}

    renderPlayerBoard() {}
}