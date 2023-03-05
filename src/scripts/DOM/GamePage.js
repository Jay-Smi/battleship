import GameUI from "./gameElements/GameUI.js";
// import Board from "./boardView.js";
import ShipQueue from "./gameElements/ShipQueue.js";
import PubSubInterface from "../PubSubInterface.js";
import GameMessage from "./gameElements/GameMessage.js";

export default class GamePage extends PubSubInterface {
    constructor(viewModel) {
        super(viewModel);

        this.UI = null;

        this.message = null;

        this.shipQueue = null;

        //build and display the player's board

        // this.playerBoard = new Board(viewModel);
        this.onInit();
    }

    onInit() {
        super.onInit();
    }

    shouldUpdate(oldModel, newModel) {
        // changed to game page
        return (
            newModel.currentPage === "gamePage" &&
            oldModel.currentPage !== "gamePage" &&
            newModel.gameState === "placeShips"
        );
    }

    render(model) {
        if (!this.UI) {
            this.UI = new GameUI(this.viewModel);
        }
        if (!this.message) {
            this.message = new GameMessage(
                this.viewModel,
                this.UI.messageContainer
            );
        }
        // if (!this.shipQueue) {
        //     this.shipQueue = new ShipQueue(
        //         this.viewModel,
        //         this.UI.shipContainer
        //     );
        // }
    }

    updateView(newState) {}

    placeShip(newState) {}

    updateShipQueue(newQueue) {}
    // initShipQueue() {
    //     const shipList = this.currentState;
    //     console.log(shipList);
    // }

    loadPlayerBoard() {}

    updatePlayerBoard(newState) {}
}
