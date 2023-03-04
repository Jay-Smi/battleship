import elem from "../elem.js";
import GameUI from "./gameUIView.js";
import Board from "./boardView.js";
import ShipQueue from "./shipQueueView.js";

export default class GameView {
    constructor(PubSub, container, state) {
        this.PubSub = PubSub;

        this.currentState = state;

        this.container = container;

        // Builds UI, clears container, and appends itself
        this.UI = new GameUI(this.PubSub, this.container);

        // build and display the player's ship queue
        this.playerShipQueue = this.currentState.player.shipQueue;
        this.shipQueue = new ShipQueue(this.PubSub, this.playerShipQueue);

        //build and display the player's board
        this.playerBoard = this.currentState.player.gameboard;
        this.playerBoard = new Board(
            this.playerBoard,
            this.PubSub,
            this.shipQueue
        );
    }

    updateView(newState) {
        this.currentState = newState;
    }

    placeShip(newState) {
        this.playerBoard.updateView(newState.player.gameboard.board);
        this.playerBoard.ships.push(this.shipQueue.ships.shift());
        this.shipQueue.updateQueue(newState.player.shipQueue);
    }

    updateShipQueue(newQueue) {
        this.shipQueue.updateQueue(newQueue);
    }
    // initShipQueue() {
    //     const shipList = this.currentState;
    //     console.log(shipList);
    // }

    loadPlayerBoard() {}

    updatePlayerBoard(newState) {
        this.currentState = newState;
        this.playerBoard.updateView(this.currentState.player.gameboard);
    }
}
