import Player from "./old/player.js";
import AI from "./old/AI.js";

export default class Game {
    constructor(PubSub) {
        this.player = new Player();
        this.AI = new AI();
        this.currentTurn = "player";
        this.currentPage = "homePage";
        this.stateMessage = "";

        this.PubSub = PubSub;

        //used to handle all events before view gets updated
        this.eventQueue = [];

        //listen for any event
        this.PubSub.subscribe("event", this.handleEvents.bind(this));

        //publishes the initial state
        this.PubSub.publish("modelChanged", this.getState());
    }

    //creates new object based on current data
    getState() {
        return {
            currentPage: this.currentPage,
            player: this.player.getState(),
            AI: this.AI.getState(),
            currentTurn: this.currentTurn,
            stateMessage: this.stateMessage,
        };
    }

    //accepts array of event objects
    //adds all events to eventQueue
    handleEvents(events) {
        this.eventQueue.push(...events);
        this.executeEvents();
    }

    //then executes all of the events BEFORE updating the model
    executeEvents() {
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            switch (event.type) {
                case "pageChange":
                    this.changePage(event.data);
                    break;
                case "formSubmit":
                    this.player.setName(event.data);
                    break;
                case "changeMessage":
                    this.stateMessage = event.data;
                    break;
                case "difficultySubmit":
                    this.AI.setDifficulty(event.data);
                    break;

                default:
                    console.warn(`Unrecognized event type: ${event}`);
                    break;
            }
        }

        //aanounce the model has changed, (view updates)
        this.PubSub.publish("modelChanged", this.getState());
    }

    changePage(page) {
        this.currentPage = page;
        if (page === "game") {
            this.turn = "player";
            this.stateMessage = "";
        }
    }

    placeShip(player, ship, coords) {
        if (player === "player") {
            this.player.placeShip(ship, coords);
        } else {
            this.ai.placeShip(ship, coords);
        }
    }

    attack(coords) {
        if (this.turn === "player") {
            const result = this.ai.receiveAttack(coords);
            if (result === "hit" && this.ai.allShipsSunk()) {
                this.stateMessage = "Player wins!";
            } else if (result === "hit") {
                this.stateMessage = "Hit! Player goes again";
            } else if (result === "miss") {
                this.stateMessage = "Miss! AI's turn";
                this.turn = "ai";
            }
        } else {
            const result = this.player.receiveAttack(coords);
            if (result === "hit" && this.player.allShipsSunk()) {
                this.stateMessage = "AI wins!";
            } else if (result === "hit") {
                this.stateMessage = "Hit! AI goes again";
            } else if (result === "miss") {
                this.stateMessage = "Miss! Player's turn";
                this.turn = "player";
            }
        }
    }
}
